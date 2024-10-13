import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar as NavbarComp, NavDropdown } from "react-bootstrap";

const Navbar = () => {
  return (
    <NavbarComp className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <LinkContainer to="/">
          <NavbarComp.Brand className="navbar-brand">E-commerce Cart</NavbarComp.Brand>
        </LinkContainer>
        <NavbarComp.Toggle aria-controls="navbarColor02" />
        <NavbarComp.Collapse id="navbarColor02">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            <NavDropdown title="New User?" id="basic-nav-dropdown">
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
              <NavDropdown.Divider />
              <Nav.Link>Logout</Nav.Link>
            </NavDropdown>
          </Nav>
          <form className="d-flex">
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </NavbarComp.Collapse>
      </div>
    </NavbarComp>
  );
};

export default Navbar;
