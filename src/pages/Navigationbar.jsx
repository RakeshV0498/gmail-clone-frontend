import { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsBoxArrowInRight, BsFillPersonFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import logo from "/gmail.svg";

function MyNavbar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExpanded(false); // Collapse navbar when route changes
  }, [location]);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      expanded={expanded}
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" onClick={toggleNavbar}>
          <img
            src={logo}
            alt="gmail-logo"
            style={{ height: "30px", marginRight: "10px" }}
          />
          Gmail Clone
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleNavbar}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto gap-3">
            <Button
              as={Link}
              to="/login"
              variant="outline-primary"
              className="mr-2"
              onClick={toggleNavbar}
            >
              <BsFillPersonFill /> Login
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="primary"
              onClick={toggleNavbar}
            >
              <BsBoxArrowInRight /> Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
