import { useEffect, useState, useContext } from "react";
import { makeRequest } from "../../axios";
import "./friends.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchFriends(currentUser.id);
  }, []);

  const fetchFriends = async (userId) => {
    try {
      const response = await makeRequest.get(
        `http://localhost:8800/api/relationships/friends/${userId}`
      );
      const friendsData = response.data;
      const friendsWithUserData = await Promise.all(
        friendsData.map(async (friend) => {
          try {
            const userDataResponse = await fetchUser(friend);
            return {
              ...friend,
              userData: userDataResponse,
            };
          } catch (error) {
            console.error("Error fetching user:", error);
            return friend; // Return friend data without user data if user fetch fails
          }
        })
      );
      setFriends(friendsWithUserData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/users/find/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const handleDelete = async (userId) => {
    try {
      await makeRequest.delete(
        `http://localhost:8800/api/relationships/${userId}`
      );
      setFriends(friends.filter((friend) => friend.id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="friends">
      <div className="header">
        <h1>Friends List</h1>
        <span> Here's a list of all your friends! </span>
      </div>
      <div className="container">
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <div>
                <img src={friend.userData.profilePicture} alt="profile pic" />
                <span>{friend.userData.name}</span>
                <p>Email: {friend.userData.email}</p>
                <div className="buttons">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(friend.id)}
                  >
                    Unfriend
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
