import { Container, Nav, Navbar, NavItem, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React App
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title="Users" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to="/users">
              Search
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/users/new-user">
              Create
            </NavDropdown.Item>
          </NavDropdown>
          <NavItem>
            <Nav.Link as={Link} to="/test">
              Test
            </Nav.Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
