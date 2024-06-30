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
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../apis/auth/login";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();
    try {
      const response = await userSignIn(loginData);
      if (response.code === 1) {
        localStorage.setItem("Authenticated", "true");
        localStorage.setItem("token", response.user);
        navigate("/mail/inbox");
      } else {
        setMessage(response.message || "Login failed");
      }
    } catch (error) {
      setMessage(
        error?.response?.data?.msg || "Something went wrong, try again later"
      );
    }
  };

  return (
    <Container fluid className=" vh-100 d-flex align-items-center p-0">
      <Row className=" vh-100 w-100">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center p-4 bg-light-subtle"
          style={{ minHeight: "30vh" }}
        >
          <Container className="d-flex flex-column align-items-center">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid mt-2"
              style={{ maxWidth: "150px" }}
            />
            <h1 className="text-center">Welcome Back!</h1>
            <p className="text-center">Please login to your account.</p>
          </Container>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center bg-white p-4 shadow-lg fw-bold"
          style={{ minHeight: "50vh" }}
        >
          <Form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
            {message && <div className="alert alert-danger">{message}</div>}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <InputGroup>
                <FormControl
                  type="email"
                  name="email"
                  value={loginData.email}
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
                  value={loginData.password}
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
                to="/register"
              >
                Click here to register
              </Link>
            </div>
            <div className="mt-3 text-center fw-bold">
              Forgot your password?{" "}
              <Link
                className="text-primary d-block d-md-inline"
                style={{ fontWeight: 700 }}
                to="/forgotPassword"
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
