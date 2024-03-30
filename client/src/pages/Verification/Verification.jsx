import "./verification.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

import { Navigate, Outlet, RouterProvider } from "react-router-dom";
import "../../index.css";
import "../../App.scss";
import "../../style.scss";


const Verification = () => {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  console.log(darkMode);

  return (

    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Verification;
