import { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  InputGroup,
  Tooltip,
  OverlayTrigger,
  Popover,
  Overlay,
} from "react-bootstrap";
import {
  BsBoxArrowInRight,
  BsFillPersonFill,
  BsSearch,
  BsBoxArrowRight,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Avatar from "react-avatar";
import logo from "/gmail.svg";

function MyNavbar() {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("Authenticated"));
  const [user, setUser] = useState(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const { firstName, lastName, email } = decoded;
        setUser({
          firstName: firstName || "First Name", // Provide fallback values
          lastName: lastName || "Last Name", // Provide fallback values
          email: email || "email@example.com", // Provide fallback values
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, [isAuthenticated]);

  const handleAvatarClick = () => {
    setShowPopover(!showPopover);
  };

  const handleLogout = () => {
    localStorage.removeItem("Authenticated");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user ? `${user.firstName} ${user.lastName}` : "User"}
      <br />
      {user ? user.email : "email@example.com"}
    </Tooltip>
  );

  const popover = (
    <Popover id="popover-basic" className="custom-popover">
      <Popover.Header as="h3">User Information</Popover.Header>
      <Popover.Body>
        <p>
          <strong>First Name:</strong> {user?.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        {isAuthenticated && (
          <Button
            variant="outline-danger"
            onClick={handleLogout}
            className="w-100 mt-2"
          >
            <BsBoxArrowRight /> Logout
          </Button>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-nav">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="gmail-logo"
              style={{ height: "30px", marginRight: "10px" }}
            />
            <span
              className={`d-none d-lg-inline ${
                isAuthenticated ? "d-none" : ""
              }`}
            >
              Gmail Clone
            </span>
          </Navbar.Brand>
          {isAuthenticated && (
            <Form className="d-none d-lg-flex flex-grow-1 mx-3">
              <InputGroup className="w-100">
                <InputGroup.Text>
                  <BsSearch />
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="rounded"
                  aria-label="Search"
                />
              </InputGroup>
            </Form>
          )}
          <Nav className="align-items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  className="mr-2"
                >
                  <BsFillPersonFill /> Login
                </Button>
                <Button as={Link} to="/register" variant="primary">
                  <BsBoxArrowInRight /> Sign Up
                </Button>
              </>
            ) : (
              <>
                <Form className="d-lg-none my-2 w-100">
                  <InputGroup className="w-100">
                    <InputGroup.Text>
                      <BsSearch />
                    </InputGroup.Text>
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="rounded"
                      aria-label="Search"
                    />
                  </InputGroup>
                </Form>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <div
                    ref={avatarRef}
                    className="avatar-wrapper"
                    style={{ position: "relative" }}
                  >
                    <Avatar
                      name={
                        user ? `${user.firstName} ${user.lastName}` : "User"
                      }
                      size="40"
                      round
                      onClick={handleAvatarClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </OverlayTrigger>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      {user && (
        <Overlay
          show={showPopover}
          target={avatarRef.current}
          placement="bottom"
          container={avatarRef.current}
          containerPadding={20}
          rootClose
          onHide={() => setShowPopover(false)}
        >
          {popover}
        </Overlay>
      )}
    </>
  );
}

export default MyNavbar;
