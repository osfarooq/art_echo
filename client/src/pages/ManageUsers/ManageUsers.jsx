import "./manageUsers.scss";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const ManageUsers = () => {
  const [pendingArt, setPendingArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await makeRequest.get(
          "http://localhost:8800/api/artworks/getPendingArt"
        );
        setPendingArt(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  console.log("Artworks", pendingArt);

  const handleApprove = async (id) => {
    try {
      await makeRequest.post(
        "http://localhost:8800/api/artworks/approveArtwork/" + id
      );
      const response = await makeRequest.get(
        "http://localhost:8800/api/artworks/getPendingArt"
      );
      setPendingArt(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await makeRequest.get(`http://localhost:8800/api/download/${filename}`, { responseType: 'blob' });
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
    <div className="Manage-Users">
      <div className="header">
        <h1>Artwork List</h1>
        <span>Here's a list of all Artworks pending for approval for the Gallery.</span>
      </div>
      <div className="container">
        <ul>
          {pendingArt.map((art) => (
            <li key={art.id}>
              <div className="art">
                <img src={"./upload/" + art.picturePath} alt="art pic" />
                <span>{art.status}</span>
              </div>
              <div className="buttons">
                <button
                  className="approve"
                  onClick={() => handleApprove(art.id)}
                >
                  Approve
                </button>
                <button
                  className="download"
                  onClick={() => handleDownload(art.picturePath)}
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space1"></div>
      <div className="iframe">
        <iframe
          src="https://www.spatial.io/embed/artechos-Immersive-Room-65e6b4148bb5d78596868bba?share=2306142571205511430"
          width="1200px"
          height="640px"
          allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
        ></iframe>
      </div>
    </div>
  );
};

export default ManageUsers;
