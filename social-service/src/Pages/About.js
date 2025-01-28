// src/pages/About.js
import React from "react";
import "./About.css"; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p className="about-subheading">
          We are dedicated to organizing blood and eye donation camps, ensuring that the process is efficient and impactful.
        </p>
      </header>

      <section className="about-content">
        <p>
          Welcome to our Social Service App. We organize and manage blood and eye donation camps to help those in need.
          Our goal is to make the process easy and efficient, providing help to those who need it the most.
        </p>
        <p>
          Join us in making a difference in people's lives through donations, awareness campaigns, and volunteer efforts.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to save lives and improve the quality of life for individuals in need through community-driven initiatives.
        </p>
      </section>

      <section className="about-contact">
        <h2>Get Involved</h2>
        <p>Want to make a difference? Join our upcoming camps and become a part of the change.</p>
      </section>
    </div>
  );
};

export default About;
