import { Container, Button, Row, Col } from "react-bootstrap";
import heroImage from "../assets/heroImg.webp";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row className="align-items-center justify-content-center">
          <Col md={6}>
            <div className="text-center text-xl-start">
              <h1 className="text-wrap hero-title">
                Secure, smart, and easy to use email
              </h1>
              <p
                className="hero-text"
                style={{ maxWidth: "40rem", margin: "auto" }}
              >
                Get more done with Gmail. Now integrated with Google Chat,
                Google Meet, and more, all in one place.
              </p>
              <Button
                variant="primary"
                className="hero-button mt-3"
                style={{ padding: "10px 20px" }}
                as={Link}
                to="/register"
              >
                Get Started
              </Button>
            </div>
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <img src={heroImage} alt="Hero" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
