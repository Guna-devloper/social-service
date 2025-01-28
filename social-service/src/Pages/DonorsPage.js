// src/pages/Donors.js
import React from "react";
import "./DonorsPage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const DonorsPage = () => {
  const navigate= useNavigate()
  const handleDonate = () =>{
    navigate("/donatenow")
  }
  // Sample donor data
  const donors = [
    {
      name: "Guna",
      donationAmount: "$500",
      donationDate: "January 15, 2025",
      profilePic: "https://via.placeholder.com/150",
    },
    {
      name: "Vignesh",
      donationAmount: "$300",
      donationDate: "February 5, 2025",
      profilePic: "https://via.placeholder.com/150",
    },
    {
      name: "Arul",
      donationAmount: "$800",
      donationDate: "March 1, 2025",
      profilePic: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="donors-container">
      <h1>Our Donors</h1>
      <p>
        We appreciate all our donors who contribute their time, resources, and effort to make these camps a success.
        Here are some of our most dedicated donors.
      </p>

      <section className="donor-profile-section">
        <h3>Top Donors</h3>
        <div className="donor-profile-list">
          {donors.map((donor, index) => (
            <div className="donor-profile" key={index}>
              <img src={donor.profilePic} alt={donor.name} className="donor-profile-pic" />
              <div className="donor-details">
                <h4>{donor.name}</h4>
                <p>Donated: {donor.donationAmount}</p>
                <p>Donation Date: {donor.donationDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="donation-tracker">
        <h3>Donation Tracker</h3>
        <div className="tracker-stats">
          <div className="tracker-item">
            <h4>Total Donations</h4>
            <p>$1,600</p>
          </div>
          <div className="tracker-item">
            <h4>Upcoming Camps</h4>
            <p>3</p>
          </div>
          <div className="tracker-item">
            <h4>Donors Contributing</h4>
            <p>5</p>
          </div>
        </div>
      </section>

      <section className="donor-cta">
        <h3>Want to Contribute?</h3>
        <p>Your donation helps fund life-changing initiatives. Become a donor today!</p>
        <button className="cta-button" onClick={handleDonate}>Donate Now</button>
      </section>
    </div>
  );
};

export default DonorsPage;
