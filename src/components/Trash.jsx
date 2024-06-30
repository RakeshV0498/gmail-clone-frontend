import { useContext, useState, useEffect } from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import EmailList from "./EmailList";
import EmailView from "./EmailView";

import { EmailContext } from "../context/EmailContext";
import { deleteEmail } from "../apis/emails/deleteEmail";
import SecondaryNavbar from "./SecondaryNavbar";
import { getTrashEmails } from "../apis/emails/trashEmail";
import { addStar } from "../apis/emails/starEmail";

const Trash = () => {
  const { state, dispatch } = useContext(EmailContext);
  const { emails, selectedEmail } = state.trash;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmails, setTotalEmails] = useState(0);
  const emailsPerPage = 10;

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const { emails, totalEmails } = await getTrashEmails(
          currentPage,
          emailsPerPage
        );
        dispatch({ type: "SET_TRASH_EMAILS", folder: "trash", emails }); // Update state with fetched emails
        setTotalEmails(totalEmails); // Update total email count
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmails();
  }, [dispatch, currentPage, emails.length]); // Adjust dependencies as needed

  const handleEmailClick = (id) => {
    dispatch({ type: "SELECT_EMAIL_TRASH", folder: "trash", id });
  };

  const handleStarToggle = async (id) => {
    try {
      await addStar(id, "trash");
      dispatch({ type: "TOGGLE_STAR", id, folder: "trash" });
    } catch (error) {
      console.error("Failed to toggle star status", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedEmail) {
        await deleteEmail(selectedEmail.id);
        dispatch({
          type: "DELETE_EMAILS",
          folder: "trash",
          id: selectedEmail.id,
        });
      }
    } catch (error) {
      console.error("Failed to delete email", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalEmails / emailsPerPage);

  return (
    <Container fluid>
      {state.trash.selectedEmails.length > 0 && (
        <SecondaryNavbar folder="trash" handleDelete={handleDelete} />
      )}
      <Row>
        <Col lg={6} md={12} sm={12}>
          <EmailList
            folder="trash"
            emails={emails}
            handleEmailClick={handleEmailClick}
            handleStarToggle={handleStarToggle}
            handleDelete={handleDelete}
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
          {selectedEmail && <EmailView folder="trash" />}
        </Col>
      </Row>
    </Container>
  );
};

export default Trash;
