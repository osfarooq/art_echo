import "./adminNavBar.scss";
import { Link } from "react-router-dom";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";


const AdminNavBar = (user) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);


  return (
    <div className="AdminNavBar">
      <div className="left">
      <Link to="/" style={{ textDecoration: "none" }}>
          <span>ArtEcho</span>
          <b>__</b>
          <a>Admin</a>
        </Link>
        <div className="darkModeIcon">
        {darkMode ? (
          <DarkModeRoundedIcon onClick={toggle} />
        ) : (
          <WbSunnyRoundedIcon onClick={toggle} />
        )}
        </div>
        {/* <div className="search">
          <SearchRoundedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      <div className="right">
        <div className="user">
          <img src={currentUser.profilePicture} alt="profile pic" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
