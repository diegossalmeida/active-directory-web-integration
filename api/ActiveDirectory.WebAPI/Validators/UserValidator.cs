using ActiveDirectory.WebAPI.Extensions;
using ActiveDirectory.WebAPI.Helpers;
using ActiveDirectory.WebAPI.Models;
using FluentValidation;

namespace ActiveDirectory.WebAPI.Validators
{
    public abstract class UserValidator : AbstractValidator<User>
    {
        protected readonly IAccountManagementHelper AccountManagementHelper;

        public UserValidator(IAccountManagementHelper accountManagementHelper)
        {
            AccountManagementHelper = accountManagementHelper;

            RuleFor(x => x)
                .NotNull()
                .WithName("User");

            // Empty strings are not supported by Active Directory

            RuleFor(x => x.FirstName)
                .NotEmptyString();

            RuleFor(x => x.Initials)
                .NotEmptyString();

            RuleFor(x => x.LastName)
                .NotEmptyString();

            RuleFor(x => x.DisplayName)
                .NotEmptyString();

            RuleFor(x => x.Description)
                .NotEmptyString();

            RuleFor(x => x.Office)
                .NotEmptyString();

            RuleFor(x => x.TelephoneNumber)
                .NotEmptyString();

            RuleFor(x => x.Email)
                .NotEmptyString();

            RuleFor(x => x.WebPage)
                .NotEmptyString();

            RuleFor(x => x.Street)
                .NotEmptyString();

            RuleFor(x => x.PostOfficeBox)
                .NotEmptyString();

            RuleFor(x => x.City)
                .NotEmptyString();

            RuleFor(x => x.State)
                .NotEmptyString();

            RuleFor(x => x.PostalCode)
                .NotEmptyString();

            RuleFor(x => x.Country)
                .NotEmptyString();

            RuleFor(x => x.LogonName)
                .NotEmptyString();

            RuleFor(x => x.ProfilePath)
                .NotEmptyString();

            RuleFor(x => x.LogonScript)
                .NotEmptyString();

            RuleFor(x => x.HomeTelephoneNumber)
                .NotEmptyString();

            RuleFor(x => x.Pager)
                .NotEmptyString();

            RuleFor(x => x.Mobile)
                .NotEmptyString();

            RuleFor(x => x.Fax)
                .NotEmptyString();

            RuleFor(x => x.IPPhone)
                .NotEmptyString();

            RuleFor(x => x.Notes)
                .NotEmptyString();

            RuleFor(x => x.JobTitle)
                .NotEmptyString();

            RuleFor(x => x.Department)
                .NotEmptyString();

            RuleFor(x => x.Company)
                .NotEmptyString();

            RuleFor(x => x.EmployeeId)
                .NotEmptyString();

            RuleFor(x => x.EmployeeNumber)
                .NotEmptyString();

            RuleFor(x => x.EmployeeType)
                .NotEmptyString();
        }
    }
}
