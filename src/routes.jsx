import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/ResetPassword";

import MyNavbar from "./pages/Navigationbar";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<PasswordReset />} />
        <Route
          path="/mail/*"
          element={<ProtectedRoute component={<MainLayout />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
