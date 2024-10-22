import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsPerson, BsEnvelope, BsLock } from "react-icons/bs";
import { signup } from "../redux/actions/userActions";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSignup = useSelector((state) => state?.userSignup);
  const { loading, error, userInfo } = userSignup;

  // Redirect if signup is successful
  useEffect(() => {
    if (userInfo) {
      navigate("/login"); 
    }
  }, [navigate, userInfo]);

  // Handle input change and update form data
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Dispatch the signup action
      dispatch(
        signup({
          fname: firstName,
          lname: lastName,
          email,
          password,
        })
      );
      setErrors({});
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={5}>
          <Card className="p-4 shadow-sm">
            <h3 className="text-center mb-4">Sign Up</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsPerson />
                  </span>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    isInvalid={!!errors.firstName}
                    required
                  />
                  {errors.firstName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="lastName" className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsPerson />
                  </span>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    isInvalid={!!errors.lastName}
                    required
                  />
                  {errors.lastName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsEnvelope />
                  </span>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                    required
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsLock />
                  </span>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    isInvalid={!!errors.password}
                    required
                  />
                  {errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsLock />
                  </span>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    isInvalid={!!errors.confirmPassword}
                    required
                  />
                  {errors.confirmPassword && (
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  )}
                </div>
              </Form.Group>

              <Button type="submit" className="mt-4 w-100" variant="primary">
                {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              Already a user? <Link to="/login">Login</Link>
            </div>

            {Object.keys(errors).length > 0 && (
              <Alert variant="danger" className="mt-3">
                Please fix the errors above to continue.
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
