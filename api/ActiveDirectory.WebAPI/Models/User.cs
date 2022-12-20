namespace ActiveDirectory.WebAPI.Models
{
    public class User
    {
        /// <summary>
        /// The unique identifier for an object.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-objectguid"/>
        /// </summary>
        public Guid ObjectId { get; set; } = Guid.Empty;

        /// <summary>
        /// The Relative Distinguished Name (RDN) of an object. 
        /// An RDN is the relative portion of a distinguished name (DN), which uniquely identifies an LDAP object.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-name"/>
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// The logon name used to support clients and servers running earlier versions of the operating system, such as Windows NT 4.0, Windows 95, Windows 98, and LAN Manager.
        /// This attribute must be 20 characters or less to support earlier clients, and cannot contain any of these characters:
        /// <![CDATA["/ \ [ ] : ; | = , + * ? < >]]>
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-samaccountname"/>
        /// </summary>
        public string SamAccountName { get; set; } = string.Empty;

        /// <summary>
        /// Contains the given name (first name) of the user.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-givenname"/>
        /// </summary>
        public string? FirstName { get; set; }

        /// <summary>
        /// Contains the initials for parts of the user's full name. 
        /// This may be used as the middle initial in the Windows Address Book.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-initials"/>
        /// </summary>
        public string? Initials { get; set; }

        /// <summary>
        /// This attribute contains the family or last name for a user.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-sn"/>
        /// </summary>
        public string? LastName { get; set; }

        /// <summary>
        /// The display name for an object. 
        /// This is usually the combination of the users first name, middle initial, and last name.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-displayname"/>
        /// </summary>
        public string? DisplayName { get; set; }

        /// <summary>
        /// Contains the description to display for an object. 
        /// This value is restricted as single-valued for backward compatibility in some cases but is allowed to be multi-valued in others.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-description"/>
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Contains the office location in the user's place of business.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-physicaldeliveryofficename"/>
        /// </summary>
        public string? Office { get; set; }

        /// <summary>
        /// The primary telephone number.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-telephonenumber"/>
        /// </summary>
        public string? TelephoneNumber { get; set; }

        /// <summary>
        /// The list of email addresses for a contact.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-mail"/>
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// A web page that is the primary landing page of a website.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-wwwhomepage"/>
        /// </summary>
        public string? WebPage { get; set; }

        /// <summary>
        /// The street address.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-street"/>
        /// </summary>
        public string? Street { get; set; }

        /// <summary>
        /// The post office box number for this object.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-postofficebox"/>
        /// </summary>
        public string? PostOfficeBox { get; set; }

        /// <summary>
        /// Represents the name of a locality, such as a town or city.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-l"/>
        /// </summary>
        public string? City { get; set; }

        /// <summary>
        /// The name of a user's state or province.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-st"/>
        /// </summary>
        public string? State { get; set; }

        /// <summary>
        /// The postal or zip code for mail delivery.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-postalcode"/>
        /// </summary>
        public string? PostalCode { get; set; }

        /// <summary>
        /// The country/region in the address of the user. 
        /// The country/region is represented as a 2-character code based on ISO-3166.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-c"/>
        /// </summary>
        public string? Country { get; set; }

        /// <summary>
        /// This attribute contains the UPN that is an Internet-style login name for a user based on the Internet standard RFC 822. 
        /// The UPN is shorter than the distinguished name and easier to remember. By convention, this should map to the user email name.
        /// The value set for this attribute is equal to the length of the user's ID and the domain name.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-userprincipalname"/>
        /// </summary>
        public string? LogonName { get; set; }

        /// <summary>
        /// The user's password in UTF-8 format.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-userpassword"/>
        /// </summary>
        public string? Password { get; set; }

        /// <summary>
        /// This attribute is used to signify whether a given crossRef is enabled.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-enabled"/>
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// The date when the account expires. 
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-accountexpires"/>
        /// </summary>
        public DateTime? AccountExpirationDate { get; set; }

        /// <summary>
        /// Permits resetting a password on a user account.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/r-user-force-change-password"/>
        /// </summary>
        public bool MustChangePassword { get; set; }

        /// <summary>
        /// Permits changing password on user account.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/r-user-change-password"/>
        /// </summary>
        public bool UserCannotChangePassword { get; set; }

        /// <summary>
        /// Indicates whether the password for the account that this attribute references has expired. 
        /// True if the password has expired; otherwise, False.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-msds-userpasswordexpired"/>
        /// </summary>
        public bool PasswordNeverExpires { get; set; }

        /// <summary>
        /// Password-reversible encryption status for user accounts.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-msds-passwordreversibleencryptionenabled"/>
        /// </summary>
        public bool AllowReversiblePasswordEncryption { get; set; }

        /// <summary>
        /// <see href="https://learn.microsoft.com/en-us/troubleshoot/windows-server/identity/useraccountcontrol-manipulate-account-properties"/>
        /// </summary>
        public bool SmartcardLogonRequired { get; set; }

        /// <summary>
        /// Specifies a path to the user's profile. 
        /// This value can be a null string, a local absolute path, or a UNC path.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-profilepath"/>
        /// </summary>
        public string? ProfilePath { get; set; }

        /// <summary>
        /// This attribute specifies the path for the user's logon script.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-scriptpath"/>
        /// </summary>
        public string? LogonScript { get; set; }

        /// <summary>
        /// The user's main home phone number.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-homephone"/>
        /// </summary>
        public string? HomeTelephoneNumber { get; set; }

        /// <summary>
        /// The primary pager number.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-pager"/>
        /// </summary>
        public string? Pager { get; set; }

        /// <summary>
        /// The primary mobile phone number.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-mobile"/>
        /// </summary>
        public string? Mobile { get; set; }

        /// <summary>
        /// Contains telephone number of the user's business fax machine.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-facsimiletelephonenumber"/>
        /// </summary>
        public string? Fax { get; set; }

        /// <summary>
        /// The TCP/IP address for the phone. Used by Telephony.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-ipphone"/>
        /// </summary>
        public string? IPPhone { get; set; }

        /// <summary>
        /// Free text for notes on object.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-notes"/>
        /// </summary>
        public string? Notes { get; set; }

        /// <summary>
        /// Contains the user's job title. 
        /// This property is commonly used to indicate the formal job title, such as Senior Programmer, rather than occupational class, such as programmer. 
        /// It is not typically used for suffix titles such as Esq. or DDS.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-title"/>
        /// </summary>
        public string? JobTitle { get; set; }

        /// <summary>
        /// Contains the name for the department in which the user works.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-department"/>
        /// </summary>
        public string? Department { get; set; }

        /// <summary>
        /// The user's company name.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-company"/>
        /// </summary>
        public string? Company { get; set; }

        /// <summary>
        /// The ID of an employee.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-employeeid"/>
        /// </summary>
        public string? EmployeeId { get; set; }

        /// <summary>
        /// The number assigned to an employee other than the ID.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-employeenumber"/>
        /// </summary>
        public string? EmployeeNumber { get; set; }

        /// <summary>
        /// The job category for an employee.
        /// <see href="https://learn.microsoft.com/en-us/windows/win32/adschema/a-employeetype"/>
        /// </summary>
        public string? EmployeeType { get; set; }
    }
}
