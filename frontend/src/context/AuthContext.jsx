import React, { createContext, useState, useEffect } from "react";
import BASE_URL from "./apiConfig";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for token in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchUser(token);
    }
  }, [loggedIn]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setLoggedIn(true);
      fetchUser(token); // Fetch the logged-in user's information
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, {
        name,
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setLoggedIn(true);
      fetchUser(token); // Fetch the logged-in user's information
    } catch (error) {
      console.error("Register failed", error);
    }
  };


    const logout = () => {
      localStorage.removeItem("token");
      setLoggedIn(false);
      setUser(null);
      window.location.reload()
    };

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid
        logout(); // Clear token and state
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
