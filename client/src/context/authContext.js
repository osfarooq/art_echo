import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );

      // Assuming that the login response includes user data with a roleType property
      const userData = res.data;

      // Store the user data including roleType in the currentUser state
      setCurrentUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
