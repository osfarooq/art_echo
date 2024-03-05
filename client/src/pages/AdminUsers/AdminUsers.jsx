import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import "./adminUsers.scss";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest.get(
          "http://localhost:8800/api/users/allUsers"
        ); // Corrected route
        setUsers(Object.values(response.data)); // Convert object-like structure to array
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log("Users:", users); // Add this line to check the value of users

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Admin-Users">
      <div className="header">
        <h1>User List</h1>
        <span> Here's a list of all the users on the app! </span>
      </div>
      <div className="container">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <img src={user.profilePicture} alt="profile pic" />
                <span>{user.name}</span>
                <a>{user.roleType === "artist" ? "Artist" : "ADMIN"}</a>
                <p>Email: {user.email}</p>

                <div className="buttons">
                  <button className="delete-button">Delete User</button>
                  <button className="posts-page">View User Posts</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminUsers;
