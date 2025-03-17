import React, { useState } from "react";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  topBar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#ff8c42",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed" as "fixed",
    top: 0,
  },
  logo: {
    height: "40px",
  },
  signupBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center" as "center",
  },
  signupTitle: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ff8c42",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    padding: "10px",
    backgroundColor: "#ff8c42",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  loginLink: {
    marginTop: "10px",
    color: "#ff8c42",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Admin" | "Manager" | "Driver">("Admin");
  const [addUser, { error }] = useMutation<
    { addUser: { token: string } },
    {
      input: {
        username: string;
        email: string;
        password: string;
        role: string;
      };
    }
  >(ADD_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          input: {
            username,
            email,
            password,
            role,
          },
        },
      });

      if (data?.addUser?.token) {
        AuthService.login(data.addUser.token); // Save token and redirect
        window.location.assign("/landing"); // Redirect to Landing page
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <img src="assets\logos\logo_noBg.png" alt="WTMS Logo" style={styles.logo} />
      </div>

      <div style={styles.signupBox}>
        <h1 style={styles.signupTitle}>Sign Up</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "Admin" | "Manager" | "Driver")
            }
            style={styles.input}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Driver">Driver</option>
          </select>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        {error && (
          <p style={styles.error}>Error during signup. Please try again.</p>
        )}
        <p style={styles.loginLink}>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
