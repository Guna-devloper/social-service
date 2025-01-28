import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { db, addDoc, collection } from "../Services/Firebase"; // Import Firebase functions
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./RegisterPage.css";

const DonateNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Initialize useNavigate hook
  
  const [campType, setCampType] = useState(""); // To store the type of camp (blood/eye)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [donationAmount, setDonationAmount] = useState(""); // Donation amount state
  const [donationType, setDonationType] = useState(""); // Donation type state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save data to Firebase Firestore
      const docRef = await addDoc(collection(db, "donate-register"), {
        name,
        email,
        contact,
        donationAmount,   // Add donation amount to Firestore
        donationType,     // Add donation type to Firestore
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
      setDonationAmount("");
      setDonationType("");
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
      <h1>Donate Now</h1>
      <p>Please fill in the form below to register for the Blood and Eye Donation.</p>

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

        <div className="form-group">
          <label>Donation Amount</label>
          <input
            type="number"
            required
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter donation amount"
          />
        </div>

        <div className="form-group">
          <label>Donation Type</label>
          <select
            required
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
          >
            <option value="">Select Donation Type</option>
            <option value="Blood">Blood Donation</option>
            <option value="Eye">Eye Donation</option>
          </select>
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default DonateNowPage;
