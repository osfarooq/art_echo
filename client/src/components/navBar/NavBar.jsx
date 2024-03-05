import "./navBar.scss";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import Logout from "../Logout/Logout";

const NavBar = (user) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);


  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>ArtEcho.</span>
        </Link>
        <HomeRoundedIcon />
        {darkMode ? (
          <DarkModeRoundedIcon onClick={toggle} />
        ) : (
          <WbSunnyRoundedIcon onClick={toggle} />
        )}
        <GridViewRoundedIcon />
        <div className="search">
          <SearchRoundedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Logout />
        <PersonRoundedIcon />
        <EmailRoundedIcon />
        <NotificationsRoundedIcon />
        <div className="user">
          <img src={currentUser.profilePicture} alt="profile pic" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
