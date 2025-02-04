import React, { useState } from "react";
import { auth } from "../Services/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Auth Profile with displayName
      await updateProfile(user, {
        displayName: name,
      });

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid,
      });

      toast.success("Signup Successful! Welcome, " + name, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      toast.error("Signup Failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      {error && <p className="signup-error">{error}</p>}
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="signup-footer">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
