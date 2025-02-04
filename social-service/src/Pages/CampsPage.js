import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./CampsPage.css";

const CampsPage = () => {
  const [camps, setCamps] = useState([]); // State to store fetched camps
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate(); 
  const db = getFirestore(); // Initialize Firestore

  // Fetch camps from Firestore
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "camps"));
        const campList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCamps(campList); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };

    fetchCamps();
  }, []);

  // Filter camps based on selection
  const filteredCamps = camps.filter(camp => filter === "all" || camp.type === filter);

  return (
    <div className="camps-container">
      <header className="camps-header">
        <h1>Our Camps</h1>
        <p>We organize various blood and eye donation camps across the country. Check out the upcoming camps and join us to make a difference!</p>
      </header>

      <div className="camps-filter">
        <label htmlFor="camp-filter">Filter by Type: </label>
        <select id="camp-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Camps</option>
          <option value="blood">Blood Donation</option>
          <option value="eye">Eye Donation</option>
        </select>
      </div>

      <div className="camps-list">
        <h3>Upcoming Camps</h3>
        {filteredCamps.length > 0 ? (
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
        ) : (
          <p className="no-camps">No camps available.</p>
        )}
      </div>

      {/* Add Camp Button */}
      <div className="add-camp-section">
        <h3>Want to Organize a Camp?</h3>
        <p>Start your own blood or eye donation camp and make a difference!</p>
        <button className="add-camp-button" onClick={() => navigate("/addcamp")}>Add Camp</button>
      </div>
    </div>
  );
};

export default CampsPage;
