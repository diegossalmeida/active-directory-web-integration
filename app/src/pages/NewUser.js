import { Container, Modal, Button } from "react-bootstrap";
import UserForm from "../components/users/UserForm";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { addUser } from "../api/users-api";

const NewUser = () => {
  const { sendRequest, status, data, error, errorMessages } = useHttp(addUser);
  const [showErrors, setShowErrors] = useState(false);

  const history = useHistory();

  const handleCreateUser = (user) => {
    sendRequest(user);
  };

  const handleClose = () => setShowErrors(false);

  useEffect(() => {
    if (status === "completed") {
      if (error) {
        setShowErrors(true);
      } else {
        history.push(`/users/${data.samAccountName}/?showSuccessMessage=ok`);
      }
    }
  }, [status, error, data, history]);

  return (
    <>
      <Container>
        <h1>Create new user</h1>
        <h6 className="text-secondary mb-3">
          Create a new user on Active Directory.
        </h6>
        <UserForm
          onSaveUser={handleCreateUser}
          processing={status && status === "pending"}
        />
      </Container>
      <Modal show={showErrors} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Validation error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {errorMessages && errorMessages.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewUser;
