import PropTypes from "prop-types";
import { ListGroup, FormCheck, Button, Col, Row, Card } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useContext } from "react";
import { EmailContext } from "../context/EmailContext";

// Utility function to format the date
const formatEmailDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const today = now.toDateString();
  const yesterday = new Date(now.setDate(now.getDate() - 1)).toDateString();

  if (date.toDateString() === today) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (date.toDateString() === yesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (date >= new Date(now.setDate(now.getDate() - now.getDay()))) {
    return `${date.toLocaleDateString("en-US", {
      weekday: "short",
    })}, ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};

const EmailList = ({ emails, folder, handleEmailClick, handleStarToggle }) => {
  const { state, dispatch } = useContext(EmailContext);
  const { selectedEmails } = state[folder] || { selectedEmails: [] };

  const handleSelectEmail = (id) => {
    if (selectedEmails.includes(id)) {
      dispatch({
        type: "SELECT_EMAILS",
        folder,
        selectedEmails: selectedEmails.filter((emailId) => emailId !== id),
      });
    } else {
      dispatch({
        type: "SELECT_EMAILS",
        folder,
        selectedEmails: [...selectedEmails, id],
      });
    }
  };

  return (
    <ListGroup>
      {emails.map((email) => {
        const formattedDate = formatEmailDate(email.createdAt);
        const isSelected = selectedEmails.includes(email.id);
        return (
          <Card
            key={email.id}
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleEmailClick(email.id)}
          >
            <div className="d-flex flex-column p-3">
              <Row className="align-items-center justify-content-evenly">
                <Col className="d-flex justify-content-between align-items-center">
                  <FormCheck
                    type="checkbox"
                    inline
                    checked={isSelected}
                    onChange={() => handleSelectEmail(email.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <p className="mb-0">
                    {email.folder === "sent"
                      ? "To: " + email.to
                      : "From: " + email.from}
                  </p>
                  <p className="mb-0">{formattedDate}</p>
                  <Button
                    variant="link"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStarToggle(email.id);
                    }}
                  >
                    {email.starred ? <BsStarFill color="gold" /> : <BsStar />}
                  </Button>
                </Col>
              </Row>
              <Row className="text-center mt-1">
                <Card.Text>{email.subject}</Card.Text>
              </Row>
            </div>
          </Card>
        );
      })}
    </ListGroup>
  );
};

EmailList.propTypes = {
  emails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      starred: PropTypes.bool.isRequired,
      subject: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEmailClick: PropTypes.func.isRequired,
  handleStarToggle: PropTypes.func.isRequired,
  folder: PropTypes.string,
};

export default EmailList;
