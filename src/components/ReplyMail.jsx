import { useContext, useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { EmailContext } from "../context/EmailContext";
import { jwtDecode } from "jwt-decode";
import { sendEmail } from "../apis/emails/sendEmail";
import { validateEmail } from "../apis/emails/validateEmail";
import { nanoid } from "nanoid";

const ReplyEmail = ({ show, handleClose }) => {
  const { state, dispatch } = useContext(EmailContext);
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [validationResults, setValidationResults] = useState({
    to: null,
    cc: null,
    bcc: null,
  });
  const [sendDisabled, setSendDisabled] = useState(true);
  const [invalidEmails, setInvalidEmails] = useState({
    to: [],
    cc: [],
    bcc: [],
  });
  const [fetchController, setFetchController] = useState(null); // State to hold AbortController instance
  const [alertMessage, setAlertMessage] = useState("");

  const email = state.replyEmail.email;
  const mode = state.replyEmail.mode;

  const { email: currentUserEmail } = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    // Cleanup function to cancel fetch requests when component unmounts
    return () => {
      if (fetchController) {
        fetchController.abort();
      }
    };
  }, [fetchController]);

  useEffect(() => {
    if (email) {
      setTo(
        mode === "replyAll"
          ? `${email.from};${email.to};${email.cc}`
          : email.from
      );
      setSubject(
        mode === "forward" ? `Fwd: ${email.subject}` : `Re: ${email.subject}`
      );

      const formattedDate = new Date(email.createdAt).toLocaleString();

      setBody(
        mode === "forward"
          ? `\n\n--- Forwarded message ---\nFrom: ${email.from}\nTo: ${email.to}\nReceived: ${formattedDate}\n\n${email.body}`
          : `\n\n--- Original message ---\nFrom: ${email.from}\nTo: ${email.to}\nReceived: ${formattedDate}\n\n${email.body}`
      );
    }
  }, [email, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmail = {
      id: nanoid(10),
      from: currentUserEmail,
      to,
      cc,
      bcc,
      subject,
      body,
    };

    try {
      const controller = new AbortController();
      setFetchController(controller); // Save the controller to state

      const savedEmail = await sendEmail(newEmail, controller); // Pass controller to API call function
      dispatch({ type: "ADD_EMAIL", folder: "sent", payload: savedEmail });
      handleClose();

      // Clear form fields
      setTo("");
      setCc("");
      setBcc("");
      setSubject("");
      setBody("");
      setValidationResults({
        to: null,
        cc: null,
        bcc: null,
      });
      setInvalidEmails({
        to: [],
        cc: [],
        bcc: [],
      });
      setSendDisabled(true); // Reset send button to disabled state
      setAlertMessage(""); // Clear any alert message
    } catch (error) {
      console.error("Failed to send email:", error);
      setAlertMessage(error?.response?.data?.msg || "Failed, Please try again"); // Set error alert message
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "to") setTo(value);
    else if (name === "cc") setCc(value);
    else if (name === "bcc") setBcc(value);
  };

  const handleBlur = async (field) => {
    const validateField = async (emails) => {
      if (!emails.trim()) return { code: 1 }; // Skip validation if empty
      try {
        const result = await validateEmail(emails, fetchController); // Pass controller to API call function
        return result.code === 1
          ? { code: 1 }
          : { code: 0, invalidEmails: result.invalidEmails };
      } catch (error) {
        return { code: 0, invalidEmails: [] };
      }
    };

    let fieldResult;
    if (field === "to") {
      fieldResult = await validateField(to);
      setValidationResults((prevResults) => ({
        ...prevResults,
        to: fieldResult.code === 1 ? "success" : "error",
      }));
      setInvalidEmails((prevInvalidEmails) => ({
        ...prevInvalidEmails,
        to: fieldResult.code === 0 ? fieldResult.invalidEmails : [],
      }));
    } else if (field === "cc") {
      fieldResult = await validateField(cc);
      setValidationResults((prevResults) => ({
        ...prevResults,
        cc: fieldResult.code === 1 ? "success" : "error",
      }));
      setInvalidEmails((prevInvalidEmails) => ({
        ...prevInvalidEmails,
        cc: fieldResult.code === 0 ? fieldResult.invalidEmails : [],
      }));
    } else if (field === "bcc") {
      fieldResult = await validateField(bcc);
      setValidationResults((prevResults) => ({
        ...prevResults,
        bcc: fieldResult.code === 1 ? "success" : "error",
      }));
      setInvalidEmails((prevInvalidEmails) => ({
        ...prevInvalidEmails,
        bcc: fieldResult.code === 0 ? fieldResult.invalidEmails : [],
      }));
    }

    setSendDisabled(
      validationResults.to === "error" ||
        validationResults.cc === "error" ||
        validationResults.bcc === "error"
    );
  };

  // Reset send button state whenever validation results change
  useEffect(() => {
    setSendDisabled(
      validationResults.to === "error" ||
        validationResults.cc === "error" ||
        validationResults.bcc === "error"
    );
  }, [validationResults]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "reply" && "Reply"}
          {mode === "replyAll" && "Reply All"}
          {mode === "forward" && "Forward"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
          <Form.Group controlId="to">
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="text"
              name="to"
              placeholder="Enter recipient's email(s) separated by semicolon"
              value={to}
              onChange={handleInputChange}
              onBlur={() => handleBlur("to")}
              isInvalid={validationResults.to === "error"}
              isValid={validationResults.to === "success"}
              required
            />
            {validationResults.to === "error" && (
              <Form.Control.Feedback type="invalid">
                Some email addresses are invalid.
              </Form.Control.Feedback>
            )}
            {validationResults.to === "success" && (
              <Form.Control.Feedback type="valid">
                All email addresses are valid.
              </Form.Control.Feedback>
            )}
            {invalidEmails.to.length > 0 && (
              <Alert variant="danger">
                Invalid Emails: {invalidEmails.to.join(", ")}
              </Alert>
            )}
          </Form.Group>
          <Button variant="link" onClick={() => setShowCcBcc(!showCcBcc)}>
            {showCcBcc ? "Hide CC/BCC" : "Show CC/BCC"}
          </Button>
          {showCcBcc && (
            <>
              <Form.Group controlId="cc">
                <Form.Label>CC:</Form.Label>
                <Form.Control
                  type="text"
                  name="cc"
                  placeholder="Enter CC email(s) separated by semicolon"
                  value={cc}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("cc")}
                  isInvalid={validationResults.cc === "error"}
                  isValid={validationResults.cc === "success"}
                />
                {validationResults.cc === "error" && (
                  <Form.Control.Feedback type="invalid">
                    Some email addresses are invalid.
                  </Form.Control.Feedback>
                )}
                {validationResults.cc === "success" && (
                  <Form.Control.Feedback type="valid">
                    All email addresses are valid.
                  </Form.Control.Feedback>
                )}
                {invalidEmails.cc.length > 0 && (
                  <Alert variant="danger">
                    Invalid Emails: {invalidEmails.cc.join(", ")}
                  </Alert>
                )}
              </Form.Group>
              <Form.Group controlId="bcc">
                <Form.Label>BCC:</Form.Label>
                <Form.Control
                  type="text"
                  name="bcc"
                  placeholder="Enter BCC email(s) separated by semicolon"
                  value={bcc}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("bcc")}
                  isInvalid={validationResults.bcc === "error"}
                  isValid={validationResults.bcc === "success"}
                />
                {validationResults.bcc === "error" && (
                  <Form.Control.Feedback type="invalid">
                    Some email addresses are invalid.
                  </Form.Control.Feedback>
                )}
                {validationResults.bcc === "success" && (
                  <Form.Control.Feedback type="valid">
                    All email addresses are valid.
                  </Form.Control.Feedback>
                )}
                {invalidEmails.bcc.length > 0 && (
                  <Alert variant="danger">
                    Invalid Emails: {invalidEmails.bcc.join(", ")}
                  </Alert>
                )}
              </Form.Group>
            </>
          )}
          <Form.Group controlId="subject">
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Body:</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter email body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="primary" type="submit" disabled={sendDisabled}>
            Send
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ReplyEmail.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ReplyEmail;
