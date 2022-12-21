import { Alert, Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Alert key="warning" variant="warning">
      <Alert.Heading>Ops!</Alert.Heading>
        <center>404 - Page not found!</center>
      </Alert>
    </Container>
  );
};

export default NotFound;
