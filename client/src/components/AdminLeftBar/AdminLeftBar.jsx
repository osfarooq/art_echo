import "./adminLeftBar.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Logout from "../Logout/Logout";

const AdminLeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleProfileDirect = async (event) => {
    event.preventDefault();
    navigate("/profile/" + currentUser.id);
  };

  const handleMarketDirect = async (event) => {
    event.preventDefault();
    navigate("/Market/");
  };

  const handleArtworksDirect = async (event) => {
    event.preventDefault();
    navigate("/artworks/");
  };

  const handleEventsDirect = async (event) => {
    event.preventDefault();
    navigate("/events/");
  };

  return (
    <div className="AdminLeftBar">
      <div className="container">
        <div className="menu">
          <div className="search">
            <SearchRoundedIcon />
            <input type="text" placeholder="Search..." />
          </div>

          <div className="user">
            <img
              src={currentUser.profilePicture}
              alt="profile Pic"
              onClick={handleProfileDirect}
            />
            <span onClick={handleProfileDirect}>{currentUser.name}</span>
          </div>

          <div className="header">
            <span>Artist</span>
            <hr />
          </div>

          <div className="item">
            <span>View All Artists</span>
            <a>&gt;</a>
          </div>
          <div className="item">
            <span>Verify Artists</span>
            <a>&gt;</a>
          </div>
          <div className="item">
            <span>Add/Remove</span>
            <a>&gt;</a>
          </div>

          <div className="menu">
            <div className="header">
              <span>Posts</span>
              <hr />
            </div>

            <div className="item">
              <span>Delete Comment</span>
              <a>&gt;</a>
            </div>
            <div className="item">
              <span>Flagged Post</span>
              <a>&gt;</a>
            </div>
            <div className="item">
              <span>Delete Post</span>
              <a>&gt;</a>
            </div>
          </div>

          <div className="menu">
            <div className="header">
              <span>Posts</span>
              <hr />
            </div>

            <div className="item">
              <span>Delete Comment</span>
              <a>&gt;</a>
            </div>
            <div className="item">
              <span>Flagged Post</span>
              <a>&gt;</a>
            </div>
            <div className="item">
              <span>Delete Post</span>
              <a>&gt;</a>
            </div>
          </div>
          <hr/>
          <div className="left-bottom">
            <div className="log-out">
              <img src={currentUser.profilePicture} alt="profile Pic" />
              <Logout />
            </div>
            <span className="mini">Artecho Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftBar;
