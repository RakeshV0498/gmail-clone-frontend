import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import heroImage from "../assets/heroImg.webp";
import { useNavigate } from "react-router-dom";

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  padding: 50px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .hero-content {
    flex: 1;
    padding: 20px;

    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  }

  .hero-image {
    flex: 1;
    img {
      max-width: 100%;
      height: auto;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href={navigate("/")}>
            <FaGoogle /> Gmail Clone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button variant="outline-primary" className="mr-2">
                Login
              </Button>
              <Button variant="primary">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <HeroSection>
        <Container>
          <Row>
            <Col md={6} className="hero-content">
              <h1>Welcome to Gmail Clone</h1>
              <p>Your simple and efficient email solution.</p>
              <Button variant="primary">Get Started</Button>
            </Col>
            <Col md={6} className="hero-image">
              <img src={heroImage} alt="Hero" />
            </Col>
          </Row>
        </Container>
      </HeroSection>
    </>
  );
};

export default Home;
