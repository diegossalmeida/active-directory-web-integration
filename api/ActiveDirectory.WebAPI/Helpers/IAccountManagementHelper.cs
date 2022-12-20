using ActiveDirectory.WebAPI.Models;
using System.DirectoryServices.AccountManagement;

namespace ActiveDirectory.WebAPI.Helpers
{
    public interface IAccountManagementHelper
    {
        /// <summary>
        /// Domain name set on appsettings.json file
        /// </summary>
        string? DomainName {  get; }

        /// <summary>
        /// Container name set on appsettings.json file
        /// </summary>
        string? Container { get; }

        /// <summary>
        /// User name set on appsettings.json file
        /// </summary>
        string? UserName { get; }

        /// <summary>
        /// Returns a PrincipalContext based on application configuraiton
        /// </summary>
        /// <returns></returns>
        PrincipalContext GetPrincipalContext();
    }
}
