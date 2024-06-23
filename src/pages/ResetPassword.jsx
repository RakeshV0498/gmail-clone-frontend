import { useEffect, useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import {
  FaLock,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import logo from "/gmail.svg"; // Replace with your logo path
import { resetPassword } from "../apis/auth/resetPassword";

function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (passwords.password !== passwords.confirmPassword) {
      setValidationError("Passwords do not match");
    } else {
      try {
        const response = await resetPassword(token, passwords.password);
        setSuccessMessage(response.message);
        setPasswords({
          password: "",
          confirmPassword: "",
        });
        setValidationError("");
      } catch (error) {
        console.error("Error resetting password:", error);
        setErrorMessage(error.response?.data?.message || "An error occurred");
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000); // Navigate to login after 5 seconds

      return () => clearTimeout(timer); // Clear the timer on component unmount
    }
  }, [successMessage, navigate]);

  return (
    <Container fluid className="d-flex align-items-center p-0">
      <Row className="w-100 m-0">
        <Col
          md={6}
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center p-2"
          style={{ minHeight: "30vh" }}
        >
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
          <h1>Reset Your Password</h1>
          <p className="p-2 text-center fw-medium">
            Don&apos;t worry, we&apos;ll help you reset it. Just enter your new
            password.
          </p>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center p-4 shadow-lg"
          style={{ minHeight: "50vh" }}
        >
          <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={passwords.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              {validationError && (
                <Alert variant="danger" className="mt-2">
                  <FaExclamationCircle className="mr-1" />
                  {validationError}
                </Alert>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-3 w-100 fw-bold"
            >
              Reset
            </Button>
            {successMessage && (
              <Alert variant="success" className="mt-2">
                <FaCheckCircle className="mr-1" />
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="danger" className="mt-2">
                <FaExclamationCircle className="mr-1" />
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

PasswordReset.propTypes = {
  token: PropTypes.string,
};

export default PasswordReset;
