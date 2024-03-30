import { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    if (inputs.email !== inputs.confirmEmail) {
      setErr("Email addresses do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setSuccessMessage("Registration successful!");
      setErr(null); // Clear any previous errors
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Art Echo.</h1>
          <p>
            "ArtEcho: Connect. Share. Inspire. The social media app for
            artists."
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Confirm Email"
              name="confirmEmail"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && <p className="error">{err}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
