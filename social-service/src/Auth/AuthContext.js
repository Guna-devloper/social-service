// src/Auth/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Services/Firebase'; // Assuming firebase is correctly initialized
import { onAuthStateChanged } from 'firebase/auth';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component that wraps the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up an authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when auth state changes
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth state
export const useAuth = () => {
  return useContext(AuthContext); // Provide the user data
};
