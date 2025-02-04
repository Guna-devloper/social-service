// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext"; // Import useAuth hook
import { auth } from "../Services/Firebase"; // Import auth for sign out
import "./Header.css"; // Import the CSS file

const Header = () => {
  const { user } = useAuth(); // Get the user from AuthContext

  const handleLogout = () => {
    auth.signOut(); // Sign out the user
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Hope Horizon</Link>
      </div>
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/camps" className="link">Camps</Link>
        <Link to="/donors" className="link">Donors</Link>
        <Link to="/contact" className="link">Contact</Link>

        {/* Conditionally render Login or Dashboard based on user authentication */}
        {user ? (
          <>
            <Link to="/dashboard" className="link">Dashboard</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="link">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
