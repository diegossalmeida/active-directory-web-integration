using System.Configuration;
using System.DirectoryServices.AccountManagement;

namespace ActiveDirectory.WebAPI.Helpers
{
    public class AccountManagementHelper : IAccountManagementHelper
    {
        public AccountManagementHelper(IConfiguration configuration)
        {
            var section = configuration.GetSection("ActiveDirectorySettings");

            if (section == null)
                throw new ConfigurationErrorsException("There no configuration for ActiveDirectorySettings on appsettings.json.");

            var children = section.GetChildren();

            if (children == null)
                throw new ConfigurationErrorsException("There no configuration for DomainName, Container, UserName and Password for ActiveDirectorySettings section on appsettings.json.");

            if (children.Any(x => x.Key == "DomainName") == false)
                throw new ConfigurationErrorsException("There is no domain name (ActiveDirectorySettings.DomainName) configured on appsettings.json.");

            if (children.Any(x => x.Key == "Container") == false)
                throw new ConfigurationErrorsException("There is no domain container name (ActiveDirectorySettings.Container) configured on appsettings.json.");

            if (children.Any(x => x.Key == "UserName") == false)
                throw new ConfigurationErrorsException("There is no domain user name (ActiveDirectorySettings.UserName) configured on appsettings.json.");

            if (children.Any(x => x.Key == "Password") == false)
                throw new ConfigurationErrorsException("There is no domain user password (ActiveDirectorySettings.Password) configured on appsettings.json.");

            DomainName = section.GetSection("DomainName").Value;
            Container = section.GetSection("Container").Value;
            UserName = section.GetSection("UserName").Value;
            Password = section.GetSection("Password").Value;
        }

        public string? DomainName { get; private set; }

        public string? Container { get; private set; }

        public string? UserName { get; private set; }

        public string? Password { get; set; }

        public PrincipalContext GetPrincipalContext()
        {
            if (string.IsNullOrEmpty(DomainName))
                throw new ArgumentException("The value set for domain name (ActiveDirectorySettings.DomainName) on appsettings.json can not be null or empty.");

            if (string.IsNullOrEmpty(Container))
                throw new ArgumentException("The value set for container name (ActiveDirectorySettings.Container) on appsettings.json can not be null or empty.");

            if (string.IsNullOrEmpty(UserName))
                throw new ArgumentException("The value set for user name (ActiveDirectorySettings.UserName) on appsettings.json can not be null or empty.");

            if (string.IsNullOrEmpty(Password))
                throw new ArgumentException("The value set for user password (ActiveDirectorySettings.Password) on appsettings.json can not be null or empty.");

            return new PrincipalContext(ContextType.Domain, DomainName, Container, UserName, Password);
        }
    }
}
