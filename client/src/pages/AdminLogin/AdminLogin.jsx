import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./adminLogin.scss";

const AdminLogin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      await login(inputs);
      event.preventDefault(); // Prevent default form submission behavior
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="AdminLogin">
      <div className="card">
        <div className="left">
          <h1>Echo Admin.</h1>
          <p>"Welcome to Echo Admin"</p>
          <span>Aren't an Admin?</span>
          <Link to="/login">
            <button>Login as Artist</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}> {/* Use onSubmit event for form submission */}
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <div>{err}</div>}
            <button type="submit">Login</button> {/* Use type="submit" for submit button */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
