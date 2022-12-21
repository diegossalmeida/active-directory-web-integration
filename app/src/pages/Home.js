import { Alert, Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-5">
      <Alert variant="info">
        <Alert.Heading>Welcome!</Alert.Heading>
        <p>
          This is a sample React app for managing Microsoft Active Directory user.
        </p>
        <p>It has sample UI that can be used to search, create, update and delete users.</p>
        <hr />
        <p className="mb-0">Hope it helps you!</p>
      </Alert>
    </Container>
  );
};

export default Home;
