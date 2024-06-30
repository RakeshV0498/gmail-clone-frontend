import { useContext, useEffect, useState } from "react";
import { EmailContext } from "../context/EmailContext";
import EmailList from "./EmailList";
import EmailView from "./EmailView";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { getAllEmails } from "../apis/emails/allEmails";
import { addStar } from "../apis/emails/starEmail";
import ReplyEmail from "./ReplyMail";

const AllEmails = () => {
  const { state, dispatch } = useContext(EmailContext);
  const { emails, selectedEmail } = state.all;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmails, setTotalEmails] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const emailsPerPage = 10;

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const { emails, totalEmails } = await getAllEmails(
          currentPage,
          emailsPerPage
        );
        dispatch({ type: "SET_ALL_EMAILS", emails });
        setTotalEmails(totalEmails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmails();
  }, [dispatch, currentPage]);

  const handleEmailClick = (id) => {
    dispatch({ type: "SELECT_EMAIL", id, folder: "all" });
  };

  const handleStarToggle = async (id) => {
    try {
      await addStar(id, "inbox");
      dispatch({ type: "TOGGLE_STAR", id, folder: "all" });
    } catch (error) {
      console.error("Failed to toggle star status", error);
    }
  };

  const handleReply = () => {
    dispatch({
      type: "REPLY_EMAIL",
      mode: "reply",
      email: selectedEmail,
      folder: "all",
    });
    setShowReply(true);
  };

  const handleReplyAll = () => {
    dispatch({
      type: "REPLY_EMAIL",
      mode: "replyAll",
      email: selectedEmail,
      folder: "all",
    });
    setShowReply(true);
  };

  const handleForward = () => {
    dispatch({
      type: "REPLY_EMAIL",
      mode: "forward",
      email: selectedEmail,
      folder: "all",
    });
    setShowReply(true);
  };

  const handleCloseReply = () => setShowReply(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalEmails / emailsPerPage);

  return (
    <Container fluid>
      <Row>
        <Col lg={6} md={12} sm={12}>
          <EmailList
            emails={emails}
            handleEmailClick={handleEmailClick}
            handleStarToggle={handleStarToggle}
          />
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
        <Col lg={6} md={12} sm={12}>
          {selectedEmail && (
            <EmailView
              folder="all"
              onReply={handleReply}
              onReplyAll={handleReplyAll}
              onForward={handleForward}
            />
          )}
          <ReplyEmail show={showReply} handleClose={handleCloseReply} />
        </Col>
      </Row>
    </Container>
  );
};
export default AllEmails;
