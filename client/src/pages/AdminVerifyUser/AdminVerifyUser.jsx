import "./adminVerifyUser.scss";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const AdminVerifyUsers = () => {
  const [pendingUser, setpendingUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest.get("http://localhost:8800/api/users/getpendingUsers");
        console.log("Response data:", response.data); // Log the response data
        setpendingUser(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  console.log("Users", pendingUser);

  const handleApprove = async (id) => {
    try {
      await makeRequest.post(
        "http://localhost:8800/api/users/approveUser/" + id
      );
      const response = await makeRequest.get(
        "http://localhost:8800/api/users/getpendingUsers"
      );
      setpendingUser(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await makeRequest.get(`http://localhost:8800/api/artworks/download/${filename}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading artwork:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Approve-Users">
      <div className="header">
        <h1>Unverified Users</h1>
        <span>Here's a list of all Users pending for approval along with their artworks!</span>
      </div>
      <div className="container">
        <ul>
          {pendingUser.map((user) => (
            <li key={user.id}>
              <div>
                <img src={"./upload/" + user.picturePath} alt="art pic" />
                <p>{user.name}</p>
                <span>{user.status}</span>
              </div>
              <div className="buttons">
                <button
                  className="approve"
                  onClick={() => handleApprove(user.id)}
                >
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space1"></div>
      
    </div>
  );
};

export default AdminVerifyUsers;
