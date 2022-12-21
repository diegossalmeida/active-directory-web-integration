import { Container } from "react-bootstrap";
import UserForm from "../components/users/UserForm";

const NewUser = () => {
  const handleCreateUser = (user) => {
    console.log(user);
  };

  return (
    <Container>
      <h1>Create new user</h1>
      <h6 className="text-secondary mb-3">
        Create a new user on Active Directory.
      </h6>
      <UserForm onCreateUser={handleCreateUser} />
    </Container>
  );
};

export default NewUser;
