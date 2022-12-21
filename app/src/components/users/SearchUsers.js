import { useRef } from "react";
import useHttp from "../../hooks/use-http";
import { Form, Button, Row, InputGroup, Col } from "react-bootstrap";
import { getUsers } from "../../api/users-api";
import UsersList from "./UsersList";

const SearchUsers = () => {
  const fisrtNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const employeeIDRef = useRef();

  const { sendRequest, status, data } = useHttp(getUsers);

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest({
      firstName: fisrtNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      employeeID: employeeIDRef.current.value,
    });
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              ref={fisrtNameRef}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              ref={lastNameRef}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formEmail">
            <Form.Label>E-mail</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="text"
                ref={emailRef}
              />
              <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formEmployeeID">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              ref={employeeIDRef}
            />
          </Form.Group>
        </Row>
        <Button
          variant="primary"
          type="submit"
          disabled={status === "pending" ? true : false}
        >
          {status !== "pending" && "Search"}
          {status === "pending" && "Searching..."}
        </Button>
      </Form>
      
      {data && <UsersList users={data} />}
    </>
  );
};

export default SearchUsers;
