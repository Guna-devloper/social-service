import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import "./DonorsPage.css"; // Import the CSS file

const DonorsPage = () => {
  const [donors, setDonors] = useState([]);
  const [upcomingCamps, setUpcomingCamps] = useState([]); // Store upcoming camps
  const navigate = useNavigate();

  const handleDonate = () => {
    navigate("/donatenow");
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const db = getFirestore();
        const donorsCollection = collection(db, "donate-register"); // Fetch from "donate-register"
        const donorSnapshot = await getDocs(donorsCollection);
        const donorList = donorSnapshot.docs.map(doc => doc.data()); // Extract data from Firestore docs
        setDonors(donorList);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    };

    const fetchUpcomingCamps = async () => {
      try {
        const db = getFirestore();
        const campsCollection = collection(db, "upcoming_camps"); // Fetch from "upcoming_camps"
        const campSnapshot = await getDocs(campsCollection);
        const campList = campSnapshot.docs.map(doc => doc.data()); // Extract data from Firestore docs
        setUpcomingCamps(campList);
      } catch (error) {
        console.error("Error fetching upcoming camps:", error);
      }
    };

    fetchDonors();
    fetchUpcomingCamps();
  }, []);

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
          {donors.length > 0 ? (
            donors.map((donor, index) => (
              <div className="donor-profile" key={index}>
                {/* Default avatar if profilePic is missing */}
                <img
                  src={donor.profilePic || "https://via.placeholder.com/100"}
                  alt={donor.name}
                  className="donor-profile-pic"
                />
                <div className="donor-details">
                  <h4>{donor.name}</h4>
                  <p>Donated: ₹{donor.donationAmount}</p>
                  <p>Donation Type: {donor.donationType}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading donors...</p>
          )}
        </div>
      </section>

      <section className="donation-tracker">
        <h3>Donation Tracker</h3>
        <div className="tracker-stats">
          <div className="tracker-item">
            <h4>Total Donations</h4>
            <p>
              ₹{donors.reduce((total, donor) => total + (parseFloat(donor.donationAmount) || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="tracker-item">
            <h4>Upcoming Camps</h4>
            <p>{upcomingCamps.length}</p> {/* Dynamically displaying number of upcoming camps */}
          </div>
          <div className="tracker-item">
            <h4>Donors Contributing</h4>
            <p>{donors.length}</p>
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
