import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo-gmail.png"; // Replace with your logo path
import { Link } from "react-router-dom";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Form submitted:", formState);
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <h1 className="text-center">Welcome Back!</h1>
          <p className="text-center">Please login to your account.</p>
        </Col>
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Form onSubmit={handleSubmit} className="w-75">
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <InputGroup>
                <FormControl
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Show Password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <div className="mt-3 text-center">
              <p>
                Don&apos;t have an account?
                <Link
                  style={{ fontWeight: 700 }}
                  to="/signup"
                  className="d-block"
                >
                  Click here to register
                </Link>
              </p>
              <p>
                Forgot your password? <br />
                <Link
                  style={{ fontWeight: 700 }}
                  to="/forgot-password"
                  className="d-block"
                >
                  Click here to reset
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
