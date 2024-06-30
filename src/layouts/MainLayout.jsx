import { Row, Col } from "react-bootstrap";
import { EmailProvider } from "../context/EmailContext";
import { Route, Routes } from "react-router-dom";

import SecondaryNavbar from "../components/SecondaryNavbar";
import Sidebar from "../components/Sidebar";
import Inbox from "../components/Inbox";
import SentItems from "../components/SentItems";
import Starred from "../components/Starred";
import Trash from "../components/Trash";
import Drafts from "../components/Drafts";
import AllEmails from "../components/AllEmail";

const MainLayout = () => {
  return (
    <EmailProvider>
      <SecondaryNavbar />
      <Row>
        <Col lg={2} md={4} sm={5}>
          <Sidebar />
        </Col>
        <Col lg={10} md={8} sm={7}>
          <Routes>
            <Route path="inbox" element={<Inbox />} />
            <Route path="sent" element={<SentItems />} />
            <Route path="starred" element={<Starred />} />
            <Route path="trash" element={<Trash />} />
            <Route path="drafts" element={<Drafts />} />
            <Route path="all" element={<AllEmails />} />
          </Routes>
        </Col>
      </Row>
    </EmailProvider>
  );
};

export default MainLayout;
