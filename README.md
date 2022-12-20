# ASP.NET Core Web API + React sample for managing Microsoft Active Directory objects

This sample demonstrates using the ASP.NET Core Web API and React library for managing Microsoft Active Directory objects: create, read, update and delete users, update user's password etc.

## Code of note

The project is split into two folders: [**api**](/api) and [**app**](/app) folder.

### api folder

This folder contains an ASP.NET Core Web API project sample which uses System.DirectoryServices.AccountManagement.dll for managing Active Directory users.

The API is only compatible with Windows operating system.

> Note: To understand ASP.NET Core project structure, see [ASP.NET documentarion](https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0).

- [User.cs](/api/ActiveDirectory.WebAPI/Models/User.cs). Strongly typed wrapper for Active Directory user.

- [UsersController.cs](/api/ActiveDirectory.WebAPI/Controllers/UsersController.cs). Contains methods that manipulate an Active Directory user, as well as some data validation logic.

### app folder

This folder contains a React app sample for managing Active Directory users' attributes.

> Note: To understande React project structure, see [Create React App documentation](https://create-react-app.dev/docs/getting-started).

## Questions and comments

You can send me your questions and suggestions in the [Issues](https://github.com/diegossalmeida/active-directory-web-integration/issues) section of this repository.

## Additional resources

- [Create a web API with ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-6.0)

- [Microsoft Active Directory attributes documenation](https://learn.microsoft.com/en-us/windows/win32/adschema/attributes-all)

## License

This project is [MIT licensed](LICENSE).