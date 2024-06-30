import { useContext } from "react";
import { EmailContext } from "../context/EmailContext";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaReply, FaReplyAll, FaForward } from "react-icons/fa";

const EmailView = ({ folder, onReply, onReplyAll, onForward }) => {
  const { state } = useContext(EmailContext);
  const { selectedEmail } = state[folder];

  let email;

  if (folder !== "trash") {
    email = state[folder].emails.find(
      (email) => email.id === state[folder].selectedEmail
    );
  } else {
    email = selectedEmail;
  }

  if (!email) {
    return <div>No email selected</div>;
  }

  const formattedDate = new Date(email.createdAt).toLocaleString();

  return (
    <Card className="email-view">
      <Card.Header>
        <h4>{email.subject}</h4>
        <p>Folder: {folder}</p>
        <p>
          Received at: <strong>{formattedDate}</strong>
        </p>
      </Card.Header>
      <Card.Body>
        <p>
          <strong>From:</strong> {email.from}
        </p>
        <p>
          <strong>To:</strong> {email.to}
        </p>
        {email.cc && (
          <p>
            <strong>CC:</strong> {email.cc}
          </p>
        )}
        {email.bcc && (
          <p>
            <strong>BCC:</strong> {email.bcc}
          </p>
        )}
        <p>{email.body}</p>
        {folder !== "trash" && (
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={onReply}>
              <FaReply /> Reply
            </Button>
            <Button variant="outline-secondary" onClick={onReplyAll}>
              <FaReplyAll /> Reply All
            </Button>
            <Button variant="outline-success" onClick={onForward}>
              <FaForward /> Forward
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

EmailView.propTypes = {
  folder: PropTypes.string.isRequired,
  onReply: PropTypes.func,
  onReplyAll: PropTypes.func,
  onForward: PropTypes.func,
};

export default EmailView;
