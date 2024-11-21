import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });

  
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("https://linkorg-voip.vercel.app/api/v1/users/login", { email, password });
      const { userid, firstName, lastName, email: userEmail, phone, address, token } = response.data;
      localStorage.setItem("user", JSON.stringify({ userid, firstName, lastName, userEmail, phone, address }));
      localStorage.setItem("token", token);

      setUser({ userid, firstName, lastName, userEmail, phone, address });
      setFlashMessage({ type: "success", message: "Login Successful. Welcome Back!" });
      window.location.href = "/dashboard";
      return true;
    } catch (error) {
      console.error("Login Error:", error);
      setFlashMessage({ type: "error", message: error.response?.data?.message || "Login failed. Please try again later." });
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => setFlashMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  return (
    <UserContext.Provider value={{ user, setUser, flashMessage, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
