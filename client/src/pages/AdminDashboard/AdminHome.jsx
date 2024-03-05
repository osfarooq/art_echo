import "./adminHome.scss";
import AdminNavBar from "../../components/AdminNavBar/AdminNavBar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

import { Navigate, Outlet, RouterProvider } from "react-router-dom";
import "../../index.css";
import "../../App.scss";
import "../../style.scss";
import AdminLeftBar from "../../components/AdminLeftBar/AdminLeftBar";
import AdminDashboard from "./AdminDashboard";

const AdminHome = () => {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  console.log(darkMode);

  return (
    // <div className={`theme-${darkMode ? "dark" : "light"}`}>
    //   <AdminNavBar />
    //   <div style={{ display: "flex" }}>
    //     <AdminLeftBar />

    //     <div style={{ flex: 6 }}>
    //       <AdminDashboard/>
    //     </div>
    //   </div>
    // </div>

    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <AdminNavBar />
        <div style={{ display: "flex" }}>
          <AdminLeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AdminHome;
