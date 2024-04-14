import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "../../features/AccessControl/Login";
import Home from "../../pages/Home";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Navbar";
import { useState } from "react";
import AdminPage from "../../pages/AdminPage";

export default function AppRouter() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSideBarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <Router>
      <Header isOpen={sidebarOpen} toggleSidebar={handleSideBarToggle} />
      <div className="fixed">
        <Sidebar isOpen={sidebarOpen} toggleIsOpen={handleSideBarToggle} />
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
