using ActiveDirectory.WebAPI.Helpers;
using ActiveDirectory.WebAPI.Models;
using FluentValidation;
using System.DirectoryServices.AccountManagement;

namespace ActiveDirectory.WebAPI.Validators
{
    public class UpdateUserValidator : UserValidator
    {
        public UpdateUserValidator(IAccountManagementHelper accountManagementHelper)
            :base(accountManagementHelper)
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .Must((u, n) => Exists(u, IdentityType.Name, n) == false)
                .WithMessage((x, n) => $"There is already an user with Name '{n}'");

            RuleFor(x => x.SamAccountName)
                .NotEmpty()
                .Must((u, s) => Exists(u, IdentityType.SamAccountName, s) == false)
                .WithMessage((x, s) => $"There is already an user with SamAccountName '{s}'");
        }

        private bool Exists(User user, IdentityType identityType, string samAccountName)
        {
            using var context = AccountManagementHelper.GetPrincipalContext();

            using var existingUser = UserPrincipal.FindByIdentity(context, identityType, samAccountName);

            return existingUser != null && existingUser.Guid != user.ObjectId;
        }
    }
}
