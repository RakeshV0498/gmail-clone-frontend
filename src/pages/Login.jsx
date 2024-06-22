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
import logo from "/gmail.svg"; // Replace with your logo path
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
    <Container fluid className="vh-100 d-flex align-items-center p-0">
      <Row className="w-100 m-0 ">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center p-4  bg-light-subtle"
          style={{ minHeight: "50vh", marginTop: "5rem" }}
        >
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mt-3"
            style={{ maxWidth: "150px" }}
          />
          <h1 className="text-center">Welcome Back!</h1>
          <p className="text-center">Please login to your account.</p>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center bg-white p-4 shadow-lg fw-bold"
          style={{ minHeight: "50vh" }}
        >
          <Form
            onSubmit={handleSubmit}
            className="w-100"
            style={{ maxWidth: "400px" }}
          >
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
                  className="shadow-sm rounded"
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
                  className="shadow-sm rounded"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shadow-sm rounded-end "
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
                className="user-select-none"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 shadow-sm rounded mb-3 fw-bold"
            >
              Login
            </Button>
            <div className="mt-3 text-center fw-bold">
              Don&apos;t have an account?{" "}
              <Link
                className="text-primary d-block d-md-inline"
                style={{ fontWeight: 700 }}
                to="/signup"
              >
                Click here to register
              </Link>
            </div>
            <div className="mt-3 text-center fw-bold">
              Forgot your password?{" "}
              <Link
                className="text-primary d-block d-md-inline"
                style={{ fontWeight: 700 }}
                to="/forgot-password"
              >
                Click here to reset
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
