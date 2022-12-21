import { Container } from "react-bootstrap";
import SearchUsers from "../components/users/SearchUsers";

const Users = () => {
  return (
    <Container>
      <h1>Search Users</h1>
      <h6 className="text-secondary mb-3">
        Search users on Active Directory based on name, e-mail or employee ID.
      </h6>
      <SearchUsers />
    </Container>
  );
};

export default Users;
