import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/Firebase";
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState(""); // Store user name
  const [recentActivities, setRecentActivities] = useState([]); // Store user activities
  const [donations, setDonations] = useState(0); // Store total donations count
  const [donatedAmount, setDonatedAmount] = useState(0); // Store total amount donated
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    if (user) {
      user.reload()
        .then(() => console.log("User state refreshed:", user.email))
        .catch((err) => console.error("Error refreshing user state:", err.message));

      // Fetch username if not in auth
      if (user.displayName) {
        setUserName(user.displayName);
      } else {
        const fetchUserName = async () => {
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              setUserName(userDoc.data().name || "No Name Provided");
            } else {
              setUserName("User");
            }
          } catch (err) {
            console.error("Error fetching user name:", err);
            setUserName("User");
          }
        };
        fetchUserName();
      }

      // Fetch user activities from Firestore
      const fetchUserActivities = async () => {
        try {
          const activitiesRef = collection(db, "user_activities");
          const q = query(activitiesRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const activities = querySnapshot.docs.map(doc => doc.data());
          setRecentActivities(activities);
        } catch (err) {
          console.error("Error fetching user activities:", err);
        }
      };

      // Fetch user statistics (total donations, donated amount)
      const fetchUserStatistics = async () => {
        try {
          const userStatsDoc = await getDoc(doc(db, "user_statistics", user.uid));
          if (userStatsDoc.exists()) {
            const stats = userStatsDoc.data();
            setDonations(stats.totalDonations || 0);
            setDonatedAmount(stats.totalAmountDonated || 0);
          }
        } catch (err) {
          console.error("Error fetching user statistics:", err);
        }
      };

      // Fetch total donated amount from Donors page
      const fetchTotalDonatedAmount = async () => {
        try {
          const donorsRef = collection(db, "donate-register"); // Assuming this is the correct collection name
          const donorSnapshot = await getDocs(donorsRef);
          const totalAmount = donorSnapshot.docs.reduce(
            (total, doc) => total + (parseFloat(doc.data().donationAmount) || 0),
            0
          );
          setDonatedAmount(totalAmount.toFixed(2)); // Update total amount donated
        } catch (err) {
          console.error("Error fetching donation data:", err);
        }
      };

      fetchUserActivities();
      fetchUserStatistics();
      fetchTotalDonatedAmount();
    }
  }, [user, db]);

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
        <h1>Welcome, {userName}!</h1>
        <p>Email: {user?.email}</p>
        <p>UID: {user?.uid}</p>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        {recentActivities.length > 0 ? (
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>
                {activity.action} on {activity.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activities found.</p>
        )}
      </div>

      <div className="statistics">
        <h2>Your Statistics</h2>
        <div className="stat-item">
          <span>Total Donations:</span>
          <span>{donations}</span>
        </div>
        <div className="stat-item">
          <span>Total Amount Donated:</span>
          <span>₹{donatedAmount}</span>
        </div>
      </div>

      <div className="logout-section">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
