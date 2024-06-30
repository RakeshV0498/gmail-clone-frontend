import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import EmailList from "./EmailList";
import ComposeEmail from "./ComposeEmail";
import { EmailContext } from "../context/EmailContext";
import { getDraftEmails } from "../apis/emails/draftEmail";

const Drafts = () => {
  const { state, dispatch } = useContext(EmailContext);
  const { emails, selectedEmail } = state.drafts;
  const [showCompose, setShowCompose] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmails, setTotalEmails] = useState(0);
  const emailsPerPage = 10;

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const { emails, totalEmails } = await getDraftEmails(
          currentPage,
          emailsPerPage
        );
        dispatch({ type: "SET_DRAFTS_EMAILS", emails });
        setTotalEmails(totalEmails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmails();
  }, [dispatch, currentPage]);

  const handleEmailClick = (id) => {
    dispatch({ type: "SELECT_EMAIL", id, folder: "drafts" });
    setShowCompose(true);
  };

  const handleStarToggle = (id) => {
    dispatch({ type: "TOGGLE_STAR", id, folder: "drafts" });
  };

  const handleCloseCompose = () => {
    setShowCompose(false);
  };

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
          {showCompose && selectedEmail && (
            <ComposeEmail
              show={showCompose}
              handleClose={handleCloseCompose}
              draftData={selectedEmail}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Drafts;
