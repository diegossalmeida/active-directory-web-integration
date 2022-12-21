import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const UserForm = (props) => {
  const defaultState = {
    objectId: "00000000-0000-0000-0000-000000000000",
    firstName: "",
    lastName: "",
    initials: "",
    name: "",
    displayName: "",
    description: "",
    office: "",
    telephoneNumber: "",
    email: "",
    webPage: "",
    street: "",
    postOfficeBox: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    logonName: "",
    samAccountName: "",
    accountExpirationDate: "",
    mustChangePassword: true,
    userCannotChangePassword: false,
    passwordNeverExpires: false,
    allowReversiblePasswordEncryption: false,
    enabled: true,
    smartcardLogonRequired: false,
    profilePath: "",
    logonScript: "",
    homeTelephoneNumber: "",
    pager: "",
    mobile: "",
    fax: "",
    ipPhone: "",
    notes: "",
    jobTitle: "",
    department: "",
    company: "",
    employeeId: "",
    employeeNumber: "",
    employeeType: "",
  };

  const [formValue, setFormValue] = useState(defaultState);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (props.user) {
      let updatedValues = { ...props.user };

      Object.keys(updatedValues).forEach(
        (k) =>
          (updatedValues[k] = updatedValues[k] === null ? "" : updatedValues[k])
      );

      if (updatedValues.accountExpirationDate) {
        updatedValues.accountExpirationDate = new Date(
          updatedValues.accountExpirationDate
        )
          .toISOString()
          .substring(0, 10);
      }

      setFormValue(updatedValues);
    }
  }, [props.user, setFormValue]);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? !formValue[event.target.name]
        : event.target.value;

    setFormValue({
      ...formValue,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const user = { ...formValue };

      Object.keys(user).forEach(
        (k) => (user[k] = user[k] === "" ? null : user[k])
      );

      if (props.onSaveUser) props.onSaveUser(user);
    }

    setValidated(true);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const user = { ...formValue };

    if (props.onDeleteUser) props.onDeleteUser(user);
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
            onChange={handleInputChange}
            value={formValue.firstName}
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
            onChange={handleInputChange}
            value={formValue.lastName}
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
            onChange={handleInputChange}
            value={formValue.initials}
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
            onChange={handleInputChange}
            value={formValue.name}
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
            onChange={handleInputChange}
            value={formValue.displayName}
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
            onChange={handleInputChange}
            value={formValue.description}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formOffice">
          <Form.Label>Office</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="office"
            onChange={handleInputChange}
            value={formValue.office}
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
            onChange={handleInputChange}
            value={formValue.telephoneNumber}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            className="form-control"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formValue.email}
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
            onChange={handleInputChange}
            value={formValue.webPage}
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
            onChange={handleInputChange}
            value={formValue.street}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPOBox">
          <Form.Label>P.O Box</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="postOfficeBox"
            onChange={handleInputChange}
            value={formValue.postOfficeBox}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="city"
            onChange={handleInputChange}
            value={formValue.city}
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
            onChange={handleInputChange}
            value={formValue.state}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPostalCode">
          <Form.Label>Zip / Postal Code</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="postalCode"
            onChange={handleInputChange}
            value={formValue.postalCode}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCountry">
          <Form.Label>Country / region</Form.Label>
          <Form.Select
            name="country"
            onChange={handleInputChange}
            value={formValue.country}
          >
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
              required
              name="logonName"
              onChange={handleInputChange}
              value={formValue.logonName}
            />
            <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Please provide a valid user logon name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formSamAccountName">
          <Form.Label>User logon name (pre-Windows 2000)</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            required
            name="samAccountName"
            onChange={handleInputChange}
            value={formValue.samAccountName}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid user logon name (pre-Windows 2000).
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formAccountExpirationDate">
          <Form.Label>Account Expires</Form.Label>
          <Form.Control
            className="form-control"
            type="date"
            name="accountExpirationDate"
            onChange={handleInputChange}
            value={formValue.accountExpirationDate}
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
            checked={formValue.mustChangePassword}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCannotChangePassword">
          <Form.Check
            type="switch"
            id="cannotChangePassword"
            label="User cannot change password"
            name="userCannotChangePassword"
            onChange={handleInputChange}
            checked={formValue.userCannotChangePassword}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPassWordNeverExpires">
          <Form.Check
            type="switch"
            id="passwordNeverExpires"
            label="Password never expires"
            name="passwordNeverExpires"
            onChange={handleInputChange}
            checked={formValue.passwordNeverExpires}
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
            checked={formValue.allowReversiblePasswordEncryption}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formAccountDisbled">
          <Form.Check
            type="switch"
            id="AccountDisbled"
            label="Account is disabled"
            name="enabled"
            onChange={handleInputChange}
            checked={!formValue.enabled}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formSmartCard">
          <Form.Check
            type="switch"
            id="smartCard"
            label="Smart card is required for interactive logon"
            name="smartcardLogonRequired"
            onChange={handleInputChange}
            checked={formValue.smartcardLogonRequired}
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
            onChange={handleInputChange}
            value={formValue.profilePath}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formLogonScript">
          <Form.Label>Logon script</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="logonScript"
            onChange={handleInputChange}
            value={formValue.logonScript}
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
            onChange={handleInputChange}
            value={formValue.homeTelephoneNumber}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formPager">
          <Form.Label>Pager</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="pager"
            onChange={handleInputChange}
            value={formValue.pager}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formMobileNumber">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="mobile"
            onChange={handleInputChange}
            value={formValue.mobile}
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
            onChange={handleInputChange}
            value={formValue.fax}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formIPNumber">
          <Form.Label>IP phone</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="ipPhone"
            onChange={handleInputChange}
            value={formValue.ipPhone}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="notes"
            onChange={handleInputChange}
            value={formValue.notes}
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
            onChange={handleInputChange}
            value={formValue.jobTitle}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="department"
            onChange={handleInputChange}
            value={formValue.department}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formCompany">
          <Form.Label>Company</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="company"
            onChange={handleInputChange}
            value={formValue.company}
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
            onChange={handleInputChange}
            value={formValue.employeeId}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formEmployeeNumber">
          <Form.Label>Employee Number</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="employeeNumber"
            onChange={handleInputChange}
            value={formValue.employeeNumber}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formEmployeeType">
          <Form.Label>Employee Type</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="employeeType"
            onChange={handleInputChange}
            value={formValue.employeeType}
          />
        </Form.Group>
      </Row>
      <Button variant="success" type="submit" disabled={props.processing}>
        Save
      </Button>{" "}
      {formValue.objectId &&
        formValue.objectId !== "00000000-0000-0000-0000-000000000000" && (
          <Button
            variant="danger"
            type="button"
            onClick={handleDelete}
            disabled={props.processing}
          >
            Delete
          </Button>
        )}
    </Form>
  );
};

export default UserForm;
