import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsEnvelope, BsLock } from "react-icons/bs";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { email, password } = formData;

  // Handle input change and update form data
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Login Successful", formData);
      setErrors({});
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={5}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
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

              <Button type="submit" className="mt-4 w-100" variant="primary">
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;
