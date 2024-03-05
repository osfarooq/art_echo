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
          <h2>Manage Market Artworks</h2>
          <p>Add, edit, and delete products</p>
          {/* </Link> */}
        </div>
        </Link>

        <div className="card">
          {/* <Link to="/admin/Users" > */}
          <h2>Manage Orders</h2>
          <p>View and update order status</p>
          {/* </Link> */}
        </div>

        <div className="card">
          {/* <Link to="/admin/Users" > */}

          {/* </Link> */}
        </div>

        <div className="card">
          {/* <Link to="/admin/Users" > */}
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
