// src/pages/RegisterPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { db, addDoc, collection } from "../Services/Firebase"; // Import Firebase functions
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./RegisterPage.css";

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Initialize useNavigate hook
  
  const [campType, setCampType] = useState(""); // To store the type of camp (blood/eye)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");
    
    if (!type) {
      // If no type is provided, navigate back to the previous page or show an error
      navigate("/camps");  // Redirect to camps page
    } else {
      setCampType(type); // Set the campType if the parameter is found
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save data to Firebase Firestore
      const docRef = await addDoc(collection(db, "registrations"), {
        name,
        email,
        contact,
        campType,
      });
      
      // Show success message with Toastify
      toast.success("Thank you for registering! Your details have been saved.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the form
      setName("");
      setEmail("");
      setContact("");
      setMessage("");
    } catch (e) {
      // Show error message with Toastify if something goes wrong
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="register-container">
      <h1>{campType === "blood" ? "Blood Donation" : "Eye Donation"} Registration</h1>
      <p>Please fill in the form below to register for the {campType === "blood" ? "Blood Donation" : "Eye Donation"} camp.</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your contact number"
          />
        </div>

        {campType === "eye" && (
          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Why do you want to donate your eye?"
            />
          </div>
        )}

        <button type="submit" className="register-button">
          Register Now
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
