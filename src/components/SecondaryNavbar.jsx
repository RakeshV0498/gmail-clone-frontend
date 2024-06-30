import { useContext } from "react";
import { Navbar, Nav, Button, FormCheck } from "react-bootstrap";
import { BsTrash, BsArrowRepeat } from "react-icons/bs";
import { EmailContext } from "../context/EmailContext";
import { moveToTrash } from "../apis/emails/trashEmail";
import PropTypes from "prop-types";

const SecondaryNavbar = ({ folder, handleDelete }) => {
  const { state, dispatch } = useContext(EmailContext);
  const { emails, selectedEmails } = state[folder] || {
    emails: [],
    selectedEmails: [],
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      dispatch({ type: "SELECT_EMAILS", folder, selectedEmails: [] });
    } else {
      dispatch({
        type: "SELECT_EMAILS",
        folder,
        selectedEmails: emails.map((email) => email.id),
      });
    }
  };

  const handleDefaultDelete = async () => {
    try {
      for (const emailId of selectedEmails) {
        await moveToTrash(emailId);
      }
      dispatch({ type: "DELETE_EMAILS", folder });
    } catch (error) {
      console.error("Failed to delete emails", error);
    }
  };

  const handleRefresh = () => {
    location.reload();
  };

  // Determine which function to use for delete action
  const handleDeleteAction = handleDelete || handleDefaultDelete;

  if (selectedEmails.length === 0) {
    return null; // Don't render the navbar if no emails are selected
  }

  return (
    <Navbar bg="light" variant="light" className="mb-2 align-items-center">
      <Nav className="ml-auto d-flex align-items-center gap-3">
        <Nav.Item className="d-flex align-items-center">
          <FormCheck
            type="checkbox"
            inline
            checked={selectedEmails.length === emails.length}
            onChange={handleSelectAll}
          />
          Select All
        </Nav.Item>
        <Nav.Item>
          <Button variant="outline-danger" onClick={handleDeleteAction}>
            <BsTrash /> Delete
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button variant="outline-primary" onClick={handleRefresh}>
            <BsArrowRepeat /> Refresh
          </Button>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

SecondaryNavbar.propTypes = {
  folder: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default SecondaryNavbar;
