import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar as NavbarComp, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { useNavigate } from "react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <NavbarComp
      className="navbar navbar-expand-lg bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <LinkContainer to="/">
          <NavbarComp.Brand className="navbar-brand">
            E-commerce Cart
          </NavbarComp.Brand>
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

            {userInfo ? (
              // If user is logged in, show their email/username and logout option
              <NavDropdown title={userInfo.email || userInfo.username} id="user-nav-dropdown">
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <NavDropdown.Divider />
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </NavDropdown>
            ) : (
              // If user is not logged in, show login/signup options
              <NavDropdown title="New User?" id="auth-nav-dropdown">
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </NavDropdown>
            )}
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
