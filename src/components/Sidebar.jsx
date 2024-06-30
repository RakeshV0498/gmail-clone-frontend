import { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, Button } from "react-bootstrap";
import {
  BsInbox,
  BsStar,
  BsTrash,
  BsPencilSquare,
  BsSend,
  BsFillArchiveFill,
  BsList,
  BsListCheck,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css"; // Ensure you create this CSS file
import ComposeEmail from "./ComposeEmail";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleCompose = () => {
    setShowCompose(!showCompose);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <Button variant="link" className="toggle-btn mt-3" onClick={handleToggle}>
        {isOpen ? <BsListCheck /> : <BsList />}
      </Button>
      {isOpen ? (
        <>
          <ListGroup>
            <Button
              variant="primary"
              className="compose-btn mt-auto"
              onClick={handleCompose}
            >
              <BsPencilSquare className="me-2" /> Compose
            </Button>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/inbox"
              active={location.pathname === "/mail/inbox"}
            >
              <BsInbox className="sidebar-icon" /> {isOpen && "Inbox"}
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/sent"
              active={location.pathname === "/mail/sent"}
            >
              <BsSend className="sidebar-icon" /> {isOpen && "Sent"}
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/drafts"
              active={location.pathname === "/mail/drafts"}
            >
              <BsPencilSquare className="sidebar-icon" /> {isOpen && "Drafts"}
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/starred"
              active={location.pathname === "/mail/starred"}
            >
              <BsStar className="sidebar-icon" /> {isOpen && "Starred"}
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/trash"
              active={location.pathname === "/mail/trash"}
            >
              <BsTrash className="sidebar-icon" /> {isOpen && "Trash"}
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/all"
              active={location.pathname === "/mail/all"}
            >
              <BsFillArchiveFill className="sidebar-icon" />{" "}
              {isOpen && "All Mail"}
            </ListGroup.Item>
          </ListGroup>
        </>
      ) : (
        <>
          <ListGroup>
            <Button
              variant="light"
              className="compose-btn mt-auto"
              onClick={handleCompose}
            >
              <BsPencilSquare className="me-2" />{" "}
            </Button>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/inbox"
              active={location.pathname === "/mail/inbox"}
            >
              <BsInbox className="sidebar-icon" />
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/sent"
              active={location.pathname === "/mail/sent"}
            >
              <BsSend className="sidebar-icon" />
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/drafts"
              active={location.pathname === "/mail/drafts"}
            >
              <BsPencilSquare className="sidebar-icon" />
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/starred"
              active={location.pathname === "/mail/starred"}
            >
              <BsStar className="sidebar-icon" />
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/trash"
              active={location.pathname === "/mail/trash"}
            >
              <BsTrash className="sidebar-icon" />
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/mail/all"
              active={location.pathname === "/mail/all"}
            >
              <BsFillArchiveFill className="sidebar-icon" />
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
      <ComposeEmail show={showCompose} handleClose={handleCompose} />
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
  handleCompose: PropTypes.func,
};

export default Sidebar;
