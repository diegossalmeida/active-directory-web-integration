import { Table, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const UsersList = (props) => {
  const users = props.users || [];

  return (
    <div className="mt-3">
      {users.length > 0 && (
        <Table striped bordered hover>
          <caption>
            <b>{users.length}</b> {users.length === 1 ? "user" : "users"} found
          </caption>
          <thead>
            <tr>
              <th className="text-center">Username</th>
              <th className="text-center">First Name</th>
              <th className="text-center">Last Name</th>
              <th className="text-center">E-mail</th>
              <th className="text-center">Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.objectId}>
                <td className="text-center">
                  <NavLink to={"/users/" + u.samAccountName}>
                  {u.samAccountName}
                  </NavLink>
                </td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.employeeID}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {users.length === 0 && (
        <Alert key="primary" variant="primary">
          <center>No users found!</center>
        </Alert>
      )}
    </div>
  );
};

export default UsersList;
