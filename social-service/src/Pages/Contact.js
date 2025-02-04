import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import emailjs SDK
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send("service_02ii6yg", "template_2i3ymq6", templateParams, "EaaaoIoQ9bmrlUoTE")
      .then(
        (response) => {
          console.log("Email sent successfully", response);
          alert("Message sent successfully!"); // Show success message
        },
        (error) => {
          console.error("Email sending failed", error);
          alert("Failed to send the message. Please try again later."); // Show error message
        }
      );

    // Reset form after sending email
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        Feel free to reach out for queries or to organize a blood/eye donation camp.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className="contact-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="contact-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          className="contact-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit" className="contact-button">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
