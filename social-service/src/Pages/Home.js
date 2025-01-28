// src/pages/HomePage.js
import React from "react";
import "./Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">Welcome to Social Service App</h1>
        <p className="homepage-subtitle">
          Your trusted platform for organizing and participating in blood and eye camps.
        </p>
        <button className="homepage-ctaButton">Join a Camp</button>
      </header>

      <section className="homepage-features">
        <h2 className="homepage-sectionTitle">Why Choose Us?</h2>
        <div className="homepage-featureList">
          <div className="homepage-featureItem">
            <h3 className="homepage-featureTitle">Organize Camps</h3>
            <p className="homepage-featureDescription">
              Easily schedule and promote blood and eye donation camps.
            </p>
          </div>
          <div className="homepage-featureItem">
            <h3 className="homepage-featureTitle">Find Donors</h3>
            <p className="homepage-featureDescription">
              Access a database of registered donors in your area.
            </p>
          </div>
          <div className="homepage-featureItem">
            <h3 className="homepage-featureTitle">Real-time Updates</h3>
            <p className="homepage-featureDescription">
              Receive instant notifications for upcoming camps and events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
