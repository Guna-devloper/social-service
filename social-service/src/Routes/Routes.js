// src/routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports
import ProtectedRoute from "./../Auth/ProtectedRoute";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import CampsPage from "../Pages/CampsPage";
import DonorsPage from "../Pages/DonorsPage";
import PageNotFound from "../Pages/PageNotFound";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Dashboard from "../Dashboard/Dashboard";
import { AuthProvider } from "../Auth/AuthContext";
import RegisterPage from "../Pages/RegisterPage";
import DonateNowPage from "../Pages/DonateNowPage";
import { ToastContainer } from "react-toastify";
// Component Imports

const AppRoutes = () => {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/camps" element={<CampsPage />} />
        <Route path="/donors" element={<DonorsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/donatenow" element={<DonateNowPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />

    </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
