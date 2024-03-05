//import PendingUsers from "../PendingUsers/PendingUsers";
import "./manageUsers.scss";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const ManageUsers = () => {
  const [pendingArt, setPendingArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest.get(
          "http://localhost:8800/api/artworks/getPendingArt"
        );
        console.log(`habshiyaan nu salam ++ ${response.data}`);
        setPendingArt(response.data); // Convert object-like structure to array
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log("Artworks", pendingArt); // Add this line to check the value of users

  const handleApprove = async (id) => {
    try {
      await makeRequest.post(
        "http://localhost:8800/api/artworks/approveArtwork/" + id
      );
      // Assuming you want to refresh the list after approval
      const response = await makeRequest.get(
        "http://localhost:8800/api/artworks/getPendingArt"
      );
      setPendingArt(response.data);
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
    <div className="Manage-Users">
      <div className="header">
        <h1>Artwork List</h1>
        <span> Here's a list of all Artworks pending for approval </span>
      </div>
      <div className="container">
        <ul>
          {pendingArt.map((art) => (
            <li key={art.id}>
              <div>
                <img src={"./upload/" + art.picturePath} alt="art pic" />
                <span>{art.status}</span>
              </div>
              <div className="buttons">
                <button className="approve" onClick={() => handleApprove(art.id)}>Approve</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;
