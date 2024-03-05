import "./pendingUsers.scss";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const PendingUsers = () => {
    const [pUsers, setPUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const { currentUser } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await makeRequest.get(
            "http://localhost:8800/api/artworks/getPendingArt"
          ); // Corrected route
          setPUsers(Object.values(response.data)); // Convert object-like structure to array
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    console.log("Users:", pUsers); // Add this line to check the value of users
  
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
          <span> Here's a list of all Artworks pending for approval </span>
        </div>
        <div className="container">
          <ul>
            {pUsers.map((user) => (
              <li key={user.id}>
                <div>
                  <img src={user.picturePath} alt="profile pic" />
                  <span>{user.name}</span>
                  <a>{user.status === "pending" ? "PENDING" : "Approved"}</a>
  
                  {/* <div className="buttons">
                    <button className="delete-button">Delete User</button>
                    <button className="posts-page">View User Posts</button>
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default PendingUsers;

