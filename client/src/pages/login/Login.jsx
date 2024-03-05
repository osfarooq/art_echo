import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
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
    event.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  }; 

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello Artists.</h1>
          <p>
            "ArtEcho: Connect. Share. Inspire. The social media app for
            artists."
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <span>Are you an Admin?</span>
          <Link to="/AdminLogin">
            <button>Login as Admin</button>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
