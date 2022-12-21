using ActiveDirectory.WebAPI.Extensions;
using ActiveDirectory.WebAPI.Helpers;
using ActiveDirectory.WebAPI.Models;
using ActiveDirectory.WebAPI.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Globalization;

namespace ActiveDirectory.WebAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Produces("application/json")]
    public class UsersController : ControllerBase
    {
        private readonly IAccountManagementHelper accountManagementHelper;

        public UsersController(IAccountManagementHelper accountManagementHelper)
        {
            this.accountManagementHelper = accountManagementHelper;
        }

        [HttpGet("{samAccountName}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Get(string samAccountName)
        {
            if (string.IsNullOrEmpty(samAccountName))
                return NotFound();

            using var context = accountManagementHelper.GetPrincipalContext();

            using var userPrincipal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, samAccountName);

            if (userPrincipal == null)
                return NotFound();

            var user = MapUserPrincipalToUser(userPrincipal);

            return Ok(user);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<User>))]
        public ActionResult<IEnumerable<User>> GetAll(string? firstName, string? lastName, string? email, string? employeeId)
        {
            if (string.IsNullOrEmpty(firstName)
                && string.IsNullOrEmpty(lastName)
                && string.IsNullOrEmpty(email)
                && string.IsNullOrEmpty(employeeId))
                return Ok(Enumerable.Empty<User>());

            using var context = accountManagementHelper.GetPrincipalContext();

            using var queryFilter = new UserPrincipal(context);

            if (string.IsNullOrEmpty(firstName) == false)
                queryFilter.GivenName = $"*{firstName}*";

            if (string.IsNullOrEmpty(lastName) == false)
                queryFilter.Surname = $"*{lastName}*";

            if (string.IsNullOrEmpty(email) == false)
                queryFilter.EmailAddress = $"*{email}*";

            if (string.IsNullOrEmpty(employeeId) == false)
                queryFilter.EmployeeId = $"*{employeeId}*";

            using var searcher = new PrincipalSearcher(queryFilter);

            var users = searcher.FindAll();

            if (users.Any())
            {
                return Ok(users.Select(p => MapUserPrincipalToUser((UserPrincipal)p)).ToList());
            }

            return Ok(Enumerable.Empty<User>());
        }


        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ModelStateDictionary))]
        [HttpPost]
        public ActionResult<User> Post([FromBody] User user)
        {
            var validator = new CreateUserValidator(accountManagementHelper);

            validator.Validate(user, ModelState);

            if (ModelState.IsValid)
            {
                using var context = accountManagementHelper.GetPrincipalContext();

                using var userPrincipal = new UserPrincipal(context);

                userPrincipal.Name = user.Name;

                // Update UserPrincipal attributes
                UpdateUserPrincipalAttributes(userPrincipal, user);

                userPrincipal.Save();

                // Set all other properties that are no exposed by UserPrincipal class
                using var directoryEntry = (DirectoryEntry)userPrincipal.GetUnderlyingObject();

                // Update attributes
                UpdateDirectoryEntryAttributes(directoryEntry, user);

                directoryEntry.CommitChanges();

                user.ObjectId = directoryEntry.Guid;

                return CreatedAtAction(nameof(Get), new { samaccountname = user.SamAccountName }, user);
            }

            return BadRequest(ModelState);
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ModelStateDictionary))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut("{samAccountName}")]
        public ActionResult<User> Put(string samAccountName, [FromBody] User user)
        {
            if (string.IsNullOrEmpty(samAccountName))
                return NotFound();

            using var context = accountManagementHelper.GetPrincipalContext();

            using var userPrincipal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, samAccountName);

            if (userPrincipal == null)
                return NotFound();

            user.ObjectId = userPrincipal.Guid ?? Guid.Empty;

            var validator = new UpdateUserValidator(accountManagementHelper);

            validator.Validate(user, ModelState);

            if (ModelState.IsValid)
            {
                var oldName = userPrincipal.Name;

                // Update UserPrincipal attributes
                UpdateUserPrincipalAttributes(userPrincipal, user);

                userPrincipal.Save();

                using var directoryEntry = (DirectoryEntry)userPrincipal.GetUnderlyingObject();

                // Clear all existing value before setting new values
                ClearDirectoryEntryAttributes(directoryEntry);

                // Update attributes
                UpdateDirectoryEntryAttributes(directoryEntry, user);

                directoryEntry.CommitChanges();

                if (oldName != user.Name)
                    directoryEntry.Rename($"CN={user.Name}");

                return Ok(user);
            }

            return BadRequest(ModelState);
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{samAccountName}")]
        public ActionResult Delete(string samAccountName)
        {
            if (string.IsNullOrEmpty(samAccountName))
                return NotFound();

            using var context = accountManagementHelper.GetPrincipalContext();

            using var userPrincipal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, samAccountName);

            if (userPrincipal == null)
                return NotFound();

            userPrincipal.Delete();

            return Ok();
        }

        private static User MapUserPrincipalToUser(UserPrincipal userPrincipal)
        {
            using var directoryEntry = (DirectoryEntry)userPrincipal.GetUnderlyingObject();

            return new User
            {
                ObjectId = userPrincipal.Guid ?? Guid.Empty,

                // General
                Name = userPrincipal.Name,
                FirstName = userPrincipal.GivenName,
                LastName = userPrincipal.Surname,
                DisplayName = userPrincipal.DisplayName,
                Description = userPrincipal.Description,
                TelephoneNumber = userPrincipal.VoiceTelephoneNumber,
                Email = userPrincipal.EmailAddress,

                // Account
                Enabled = userPrincipal.Enabled.HasValue ? userPrincipal.Enabled.Value : false,
                LogonName = userPrincipal.UserPrincipalName,
                SamAccountName = userPrincipal.SamAccountName,
                AccountExpirationDate = userPrincipal.AccountExpirationDate,
                UserCannotChangePassword = userPrincipal.UserCannotChangePassword,
                PasswordNeverExpires = userPrincipal.PasswordNeverExpires,
                AllowReversiblePasswordEncryption = userPrincipal.AllowReversiblePasswordEncryption,
                SmartcardLogonRequired = userPrincipal.SmartcardLogonRequired,

                // Profile
                LogonScript = userPrincipal.ScriptPath,

                // Organization
                EmployeeId = userPrincipal.EmployeeId,

                // Gets all other properties that are no exposed by UserPrincipal class

                // General
                Initials = directoryEntry.Properties[UserPrincipalAttributes.Initials].Value?.ToString(),
                Office = directoryEntry.Properties[UserPrincipalAttributes.Office].Value?.ToString(),
                WebPage = directoryEntry.Properties[UserPrincipalAttributes.WebPage].Value?.ToString(),

                // Address
                Street = directoryEntry.Properties[UserPrincipalAttributes.Street].Value?.ToString(),
                PostOfficeBox = directoryEntry.Properties[UserPrincipalAttributes.PostOfficeBox].Value?.ToString(),
                City = directoryEntry.Properties[UserPrincipalAttributes.City].Value?.ToString(),
                State = directoryEntry.Properties[UserPrincipalAttributes.State].Value?.ToString(),
                PostalCode = directoryEntry.Properties[UserPrincipalAttributes.PostalCode].Value?.ToString(),
                Country = directoryEntry.Properties[UserPrincipalAttributes.Country].Value?.ToString(),

                // Profile
                ProfilePath = directoryEntry.Properties[UserPrincipalAttributes.ProfilePath].Value?.ToString(),

                // Telephones
                HomeTelephoneNumber = directoryEntry.Properties[UserPrincipalAttributes.HomePhone].Value?.ToString(),
                Pager = directoryEntry.Properties[UserPrincipalAttributes.Pager].Value?.ToString(),
                Mobile = directoryEntry.Properties[UserPrincipalAttributes.MobilePhone].Value?.ToString(),
                Fax = directoryEntry.Properties[UserPrincipalAttributes.FaxPhone].Value?.ToString(),
                IPPhone = directoryEntry.Properties[UserPrincipalAttributes.IPPhone].Value?.ToString(),
                Notes = directoryEntry.Properties[UserPrincipalAttributes.Notes].Value?.ToString(),

                // Organization
                JobTitle = directoryEntry.Properties[UserPrincipalAttributes.Title].Value?.ToString(),
                Department = directoryEntry.Properties[UserPrincipalAttributes.Department].Value?.ToString(),
                Company = directoryEntry.Properties[UserPrincipalAttributes.Company].Value?.ToString(),
                EmployeeNumber = directoryEntry.Properties[UserPrincipalAttributes.EmployeeNumber].Value?.ToString(),
                EmployeeType = directoryEntry.Properties[UserPrincipalAttributes.EmployeeType].Value?.ToString(),
            };
        }

        private static void UpdateDirectoryEntryAttributes(DirectoryEntry directoryEntry, User user)
        {
            // General
            directoryEntry.Properties[UserPrincipalAttributes.Initials].Value = user.Initials;
            directoryEntry.Properties[UserPrincipalAttributes.Office].Value = user.Office;
            directoryEntry.Properties[UserPrincipalAttributes.WebPage].Value = user.WebPage;

            // Address
            directoryEntry.Properties[UserPrincipalAttributes.Street].Value = user.Street;
            directoryEntry.Properties[UserPrincipalAttributes.PostOfficeBox].Value = user.PostOfficeBox;
            directoryEntry.Properties[UserPrincipalAttributes.City].Value = user.City;
            directoryEntry.Properties[UserPrincipalAttributes.State].Value = user.State;
            directoryEntry.Properties[UserPrincipalAttributes.PostalCode].Value = user.PostalCode;

            if (user.Country != null)
            {
                var info = new RegionInfo(user.Country);

                directoryEntry.Properties[UserPrincipalAttributes.Country].Value = info.TwoLetterISORegionName;
                directoryEntry.Properties[UserPrincipalAttributes.CountryName].Value = info.DisplayName;
                directoryEntry.Properties[UserPrincipalAttributes.CountryCode].Value = info.NumericIsoCode();
            }

            // Profile
            directoryEntry.Properties[UserPrincipalAttributes.ProfilePath].Value = user.ProfilePath;

            // Telephones
            directoryEntry.Properties[UserPrincipalAttributes.HomePhone].Value = user.HomeTelephoneNumber;
            directoryEntry.Properties[UserPrincipalAttributes.Pager].Value = user.Pager;
            directoryEntry.Properties[UserPrincipalAttributes.MobilePhone].Value = user.Mobile;
            directoryEntry.Properties[UserPrincipalAttributes.FaxPhone].Value = user.Fax;
            directoryEntry.Properties[UserPrincipalAttributes.IPPhone].Value = user.IPPhone;
            directoryEntry.Properties[UserPrincipalAttributes.Notes].Value = user.Notes;

            // Organization
            directoryEntry.Properties[UserPrincipalAttributes.Title].Value = user.JobTitle;
            directoryEntry.Properties[UserPrincipalAttributes.Department].Value = user.Department;
            directoryEntry.Properties[UserPrincipalAttributes.Company].Value = user.Company;
            directoryEntry.Properties[UserPrincipalAttributes.EmployeeNumber].Value = user.EmployeeNumber;
            directoryEntry.Properties[UserPrincipalAttributes.EmployeeType].Value = user.EmployeeType;
        }

        private static void UpdateUserPrincipalAttributes(UserPrincipal userPrincipal, User user)
        {
            // General
            userPrincipal.GivenName = user.FirstName;
            userPrincipal.Surname = user.LastName;
            userPrincipal.DisplayName = user.DisplayName;
            userPrincipal.Description = user.Description;
            userPrincipal.VoiceTelephoneNumber = user.TelephoneNumber;
            userPrincipal.EmailAddress = user.Email;

            // Account
            userPrincipal.Enabled = user.Enabled;
            userPrincipal.UserPrincipalName = user.LogonName;
            userPrincipal.SamAccountName = user.SamAccountName;
            userPrincipal.AccountExpirationDate = user.AccountExpirationDate?.ToUniversalTime();
            userPrincipal.UserCannotChangePassword = user.UserCannotChangePassword;
            userPrincipal.PasswordNeverExpires = user.PasswordNeverExpires;
            userPrincipal.AllowReversiblePasswordEncryption = user.AllowReversiblePasswordEncryption;
            userPrincipal.SmartcardLogonRequired = user.SmartcardLogonRequired;

            if (user.MustChangePassword)
                userPrincipal.ExpirePasswordNow();

            // Profile
            userPrincipal.ScriptPath = string.IsNullOrEmpty(user.LogonScript) ? null : user.LogonScript;

            // Organization
            userPrincipal.EmployeeId = user.EmployeeId;
        }

        private static void ClearDirectoryEntryAttributes(DirectoryEntry directoryEntry)
        {
            // General
            directoryEntry.Properties[UserPrincipalAttributes.Initials].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.Office].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.WebPage].Clear();

            // Address
            directoryEntry.Properties[UserPrincipalAttributes.Street].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.PostOfficeBox].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.City].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.State].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.PostalCode].Clear();

            directoryEntry.Properties[UserPrincipalAttributes.Country].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.CountryName].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.CountryCode].Clear();

            // Profile
            directoryEntry.Properties[UserPrincipalAttributes.ProfilePath].Clear();

            // Telephones
            directoryEntry.Properties[UserPrincipalAttributes.HomePhone].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.Pager].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.MobilePhone].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.FaxPhone].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.IPPhone].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.Notes].Clear();

            // Organization
            directoryEntry.Properties[UserPrincipalAttributes.Title].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.Department].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.Company].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.EmployeeNumber].Clear();
            directoryEntry.Properties[UserPrincipalAttributes.EmployeeType].Clear();
        }
    }
}
