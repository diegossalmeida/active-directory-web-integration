import { useParams, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import useHttp from "../hooks/use-http";
import { getUser, updateUser, deleteUser } from "../api/users-api";

import { Container, Modal, Button, Toast, ToastContainer } from "react-bootstrap";
import UserForm from "../components/users/UserForm";

const EditUser = () => {
  const params = useParams();
  const { samAccountName } = params;

  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const [showErrors, setShowErrors] = useState(false);
  const [showToast, setShowToast] = useState(queryParams.get("showSuccessMessage") === "ok");

  const {
    sendRequest: getRequest,
    status: getStatus,
    data: user,
    error: getError,
  } = useHttp(getUser);

  const {
    sendRequest: updateRequest,
    status: updateStatus,
    error: updateError,
    errorMessages: updateErrorMessages,
  } = useHttp(updateUser);

  const { sendRequest: deleteRequest, status: deleteStatus } =
    useHttp(deleteUser);

  useEffect(() => {
    getRequest(samAccountName);
  }, [getRequest, samAccountName]);

  useEffect(() => {
    if (updateStatus === "completed") {
      if (updateError) {
        setShowErrors(true);
      } else {
        setShowToast(true);
      }
    }
  }, [updateStatus, updateError]);

  useEffect(() => {
    if (deleteStatus === "completed") {
      history.push("/users");
    }
  }, [deleteStatus, history]);

  const handleClose = () => setShowErrors(false);

  const handleUpdateUser = (user) => {
    updateRequest(user);
  };

  const handleDeleteUser = (user) => {
    deleteRequest(user);
  };

  if (getStatus === "pending") {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  if (getError) {
    return (
      <Container>
        <p>User not found!</p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <h1>Edit user</h1>
        <h6 className="text-secondary mb-3">
          Edit user's attribute on Active Directory.
        </h6>
        {showToast && (
          <ToastContainer className="position-fixed mt-3" position="top-end">
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              bg="success"
            >
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>User record has been saved!</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
        <UserForm
          user={user}
          onSaveUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          processing={
            (updateStatus && updateStatus === "pending") ||
            (deleteStatus && deleteStatus === "pending")
          }
        />
      </Container>
      <Modal show={showErrors} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Validation error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {updateErrorMessages &&
              updateErrorMessages.map((m, i) => <li key={i}>{m}</li>)}
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

export default EditUser;
