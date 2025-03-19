import "../styles/Signup.css";
import { useState } from "react";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Admin" | "Manager" | "Driver">("Admin");
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          username,
          email,
          password,
          role,
          status: "active",
        },
      });

      if (data?.addUser?.token) {
        AuthService.login(data.addUser.token);
        window.location.assign("/landing");
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-top-bar">
        <img
          src="assets\logos\logo_noBg.png"
          alt="WTMS Logo"
          className="signup-logo"
        />
      </div>

      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "Admin" | "Manager" | "Driver")
            }
            className="signup-input"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Driver">Driver</option>
          </select>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        {error && (
          <p className="signup-error">Error during signup. Please try again.</p>
        )}
        <p className="signup-login-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
