import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import { useState } from "react";

const UserForm = (props) => {
  const [formValue, setFormValue] = useState({});
  const [validated, setValidated] = useState(false);

  const handleInputChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const user = { ...formValue };

    props.onCreateUser(user);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h5>General</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            required
            name="firstName"
            onBlur={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            required
            name="lastName"
            onBlur={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formInitials">
          <Form.Label>Initials</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="initials"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            required
            name="name"
            onBlur={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid full name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formDisplayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="displayName"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="description"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formOffice">
          <Form.Label>Office</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="office"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formTelephone">
          <Form.Label>Telephone number</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="telephoneNumber"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            className="form-control"
            type="email"
            name="email"
            onBlur={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid e-mail address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formWebpage">
          <Form.Label>Web page</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="webPage"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <h5>Address</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formStret">
          <Form.Label>Street</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="street"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPOBox">
          <Form.Label>P.O Box</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="postOfficeBox"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="city"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formState">
          <Form.Label>State / province</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="state"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPostalCode">
          <Form.Label>Zip / Postal Code</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="postalCode"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCountry">
          <Form.Label>Country / region</Form.Label>
          <Form.Select name="country" onChange={handleInputChange}>
            <option></option>
            <option value="1">Brazil</option>
            <option value="2">United States</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <h5>Account</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formUserPrincipal">
          <Form.Label>User logon name</Form.Label>
          <InputGroup>
            <Form.Control
              className="form-control"
              type="text"
              name="logonName"
              onBlur={handleInputChange}
            />
            <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formSamAccountName">
          <Form.Label>User logon name (pre-Windows 2000)</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="samAccountName"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formAccountExpirationDate">
          <Form.Label>Account Expires</Form.Label>
          <Form.Control
            className="form-control"
            type="date"
            name="accountExpirationDate"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formMustChangePassword">
          <Form.Check
            type="switch"
            id="mustChangePassword"
            label="User must change password at next logon"
            name="mustChangePassword"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCannotChangePassword">
          <Form.Check
            type="switch"
            id="cannotChangePassword"
            label="User cannot change password"
            name="userCannotChangePassword"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPassWordNeverExpires">
          <Form.Check
            type="switch"
            id="passwordNeverExpires"
            label="Password never expires"
            name="passwordNeverExpires"
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formReversibleEncryption">
          <Form.Check
            type="switch"
            id="reversibleEncryption"
            label="Store password using reversible encryption"
            name="allowReversiblePasswordEncryption"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formAccountDisabled">
          <Form.Check
            type="switch"
            id="accountDisabled"
            label="Account is disabled"
            name="enabled"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formSmartCard">
          <Form.Check
            type="switch"
            id="smartCard"
            label="Smart card is required for interactive logon"
            name="allowReversiblePasswordEncryption"
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
      <h5>Profile</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formProfilePath">
          <Form.Label>Profile Path</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="profilePath"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formLogonScript">
          <Form.Label>Logon script</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="logonScript"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <h5>Telephones</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formHomePhone">
          <Form.Label>Home</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="homeTelephoneNumber"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPager">
          <Form.Label>Pager</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="pager"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formMobileNumber">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="mobile"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formFaxNumber">
          <Form.Label>Fax</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="fax"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formIPNumber">
          <Form.Label>IP phone</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="iPPhone"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="notes"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <h5>Organization</h5>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formJobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="jobTitle"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="department"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCompany">
          <Form.Label>Company</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="company"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="formEmployeeId">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="employeeId"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formEmployeeNumber">
          <Form.Label>Employee Number</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="employeeNumber"
            onBlur={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formEmployeeType">
          <Form.Label>Employee Type</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="employeeType"
            onBlur={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Button variant="success" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default UserForm;
