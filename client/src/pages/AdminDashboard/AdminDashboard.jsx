import React from "react";
//import { Link } from "reactrouter-dom";
import "./adminDashboard.scss";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="AdminDashboard">
      <h1>Admin Dashboard</h1>
      <span>Welcome back, {currentUser.name}! 👋</span>
      <div className="card-container">
        <Link to="/AdminUsers" style={{ textDecoration: 'none' }}>
          <div className="card">
            {/* <Link to="/admin/Artists" > */}
            <h2>Manage Users</h2>
            <p>View, edit, and delete users</p>
            {/* </Link> */}
          </div>
        </Link>
        <Link to="/ManageUsers" style={{ textDecoration: 'none' }}>
        <div className="card">
          {/* <Link to="/admin/Events" > */}
          <h2>Manage Gallery Artworks</h2>
          <p>Approve, edit & Delete artworks for the Gallery.</p>
          {/* </Link> */}
        </div>
        </Link>
        <Link to="/VerifyUsers" style={{ textDecoration: 'none' }}>
          <div className="card">
            {/* <Link to="/admin/Artists" > */}
            <h2>Verify Artists</h2>
            <p>Verify Artist Accounts.</p>
            {/* </Link> */}
          </div>
        </Link>
        <div className="card">
          {/* <Link to="/admin/Users" > */}
          <h2>Manage Orders</h2>
          <p>View and update order status</p>
          {/* </Link> */}
        </div>


      </div>

      <div className="card-container"></div>
      <div className="card-container"></div>
      <div className="card-container"></div>
      <div className="card-container"></div>
    </div>
  );
};

export default AdminDashboard;
