import { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import logo from "/gmail.svg"; // Replace with your logo path

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    console.log(email);

    // try {
    //   const response = await forgotPassword(email);
    //   setMessage(response.msg);
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 5000);
    // } catch (err) {
    //   console.log(err);
    //   setError(err?.response?.data?.msg);
    // }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center p-0">
      <Row className="w-100 m-0">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center p-2"
          style={{ minHeight: "40vh", marginTop: "1rem" }}
        >
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-3"
            style={{ maxWidth: "150px" }}
          />
          <h1 className="text-center">Forgot Your Password?</h1>
          <p className="text-center fw-medium">
            Don&apos;t worry, we&apos;ll help you reset it. Just enter your
            email below and follow the instructions.
          </p>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center p-4"
          style={{ minHeight: "50vh" }}
        >
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <h2 className="text-center mb-4">Forgot Password</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FaEnvelope />
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
