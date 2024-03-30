import "./leftBar.scss";

import Friends from "../../assets/1.png";
import Market from "../../assets/3.png";
import Timeline from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gallery from "../../assets/gallery.png";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleProfileDirect = async (event) => {
    event.preventDefault();
    navigate("/profile/" + currentUser.id);
  };

  const handleFriendsDirect = async (event) => {
    event.preventDefault();
    navigate("/Friends/");
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

  const handleGalleryEventDirect = async (event) => {
    event.preventDefault();
    navigate("/VRGallery/");
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePicture}
              alt="profile Pic"
              onClick={handleProfileDirect}
            />
            <span onClick={handleProfileDirect}>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" onClick={handleFriendsDirect} />
            <span onClick={handleFriendsDirect}>Friends</span>
          </div>
          <div className="item">
            <img src={Market} alt="" onClick={handleMarketDirect} />
            <span onClick={handleMarketDirect}>Marketplace</span>
          </div>
          <div className="item">
            <img src={Timeline} alt="" onClick={handleArtworksDirect} />
            <span onClick={handleArtworksDirect}>Art Timeline</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={Events} alt="" onClick={handleEventsDirect} />
            <span onClick={handleEventsDirect}>Events</span>
          </div>
          <div className="item" onClick={handleGalleryEventDirect}>
            <img src={Gallery} alt="3D gallery link" />
            <span>Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
