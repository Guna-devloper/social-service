// src/pages/CampsPage.js
import React, { useState } from "react";
import "./CampsPage.css"; // Import the CSS file
import { Link } from "react-router-dom";
const CampsPage = () => {
  const [filter, setFilter] = useState("all");

  const camps = [
    { id: 1, type: "blood", name: "Blood Donation Camp", date: "January 15, 2025", location: "Coimbatore" },
    { id: 2, type: "eye", name: "Eye Donation Camp", date: "February 20, 2025", location: "Chennai" },
    { id: 3, type: "blood", name: "Blood Donation Camp", date: "March 5, 2025", location: "Salem" },
    { id: 4, type: "eye", name: "Eye Donation Camp", date: "April 10, 2025", location: "Tiruppur" },
  ];

  const filteredCamps = camps.filter(camp => filter === "all" || camp.type === filter);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="camps-container">
      <header className="camps-header">
        <h1>Our Camps</h1>
        <p>We organize various blood and eye donation camps across the country. Check out the upcoming camps and join us to make a difference!</p>
      </header>

      <div className="camps-filter">
        <label htmlFor="camp-filter">Filter by Type: </label>
        <select id="camp-filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All Camps</option>
          <option value="blood">Blood Donation</option>
          <option value="eye">Eye Donation</option>
        </select>
      </div>

      <div className="camps-list">
  <h3>Upcoming Camps</h3>
  <ul>
    {filteredCamps.map((camp) => (
      <li key={camp.id} className="camp-item">
        <h4>{camp.name}</h4>
        <p>Date: {camp.date}</p>
        <p>Location: {camp.location}</p>
        <Link to={`/register?type=${camp.type}`} className="camp-join-button">Join Now</Link>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
};

export default CampsPage;
