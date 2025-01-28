import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      user.reload()
        .then(() => {
          console.log("User state refreshed:", user.displayName);
        })
        .catch((err) => {
          console.error("Error refreshing user state:", err.message);
        });
    }
  }, [user]);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!user) {
    navigate("/login");
  }

  const handleLogout = () => {
    auth.signOut();
    toast.success("You have been logged out!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="user-profile">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-pic"
        />
        <h1>Welcome, {user?.displayName || "No Name Provided"}!</h1>
        <p>Email: {user?.email}</p>
        <p>UID: {user?.uid}</p>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>You donated blood on 01/10/2025</li>
          <li>You signed up for the Eye Donation camp on 01/05/2025</li>
          <li>You made a donation of $50 on 12/15/2024</li>
        </ul>
      </div>

      <div className="statistics">
        <h2>Your Statistics</h2>
        <div className="stat-item">
          <span>Total Donations:</span>
          <span>5</span>
        </div>
        <div className="stat-item">
          <span>Total Amount Donated:</span>
          <span>$150</span>
        </div>
      </div>

      <div className="logout-section">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
