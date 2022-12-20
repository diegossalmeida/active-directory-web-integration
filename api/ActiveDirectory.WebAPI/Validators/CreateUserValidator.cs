using ActiveDirectory.WebAPI.Helpers;
using ActiveDirectory.WebAPI.Models;
using FluentValidation;
using System.DirectoryServices.AccountManagement;

namespace ActiveDirectory.WebAPI.Validators
{
    public class CreateUserValidator : UserValidator
    {
        public CreateUserValidator(IAccountManagementHelper accountManagementHelper)
            :base(accountManagementHelper)
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .Must(n => Exists(IdentityType.Name, n) == false)
                .WithMessage((x, n) => $"There is already an user with Name '{n}'");

            RuleFor(x => x.SamAccountName)
                .NotEmpty()
                .Must(s => Exists(IdentityType.SamAccountName, s) == false)
                .WithMessage((x, s) => $"There is already an user with SamAccountName '{s}'");
        }

        private bool Exists(IdentityType identityType, string samAccountName)
        {
            using var context = AccountManagementHelper.GetPrincipalContext();

            using var existingUser = UserPrincipal.FindByIdentity(context, identityType, samAccountName);

            return existingUser != null;
        }
    }
}
