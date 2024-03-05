import "./logout.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Logout = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logout();
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className="logout" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
