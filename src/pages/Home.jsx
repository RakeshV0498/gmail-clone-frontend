import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsBoxArrowInRight } from "react-icons/bs";
import heroImage from "../assets/heroImg.webp";
import logo from "/gmail.svg";

const Home = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="gmail-logo"
              style={{ height: "30px", marginRight: "10px" }}
            />
            Gmail Clone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto gap-3">
              <Button variant="outline-primary" className="mr-2">
                <BsFillPersonFill /> Login
              </Button>
              <Button variant="primary">
                <BsBoxArrowInRight /> Sign Up
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row className="align-items-center justify-content-center">
          <Col md={6}>
            <div className="text-center text-xl-start">
              <h1
                className="text-wrap"
                style={{ fontSize: "4.5rem", lineHeight: "1.2" }}
              >
                Secure, smart, and easy to use email
              </h1>
              <p style={{ fontSize: "1.5rem" }}>
                Get more done with Gmail. Now integrated with Google Chat,
                Google Meet, and more, all in one place.
              </p>
              <Button
                variant="primary"
                style={{ fontSize: "1.5rem", padding: "10px 20px" }}
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
