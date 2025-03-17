import React, { useState } from "react";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

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
  loginBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center" as "center",
  },
  loginTitle: {
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
  signupLink: {
    marginTop: "10px",
    color: "#ff8c42",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { error }] = useMutation<
    { login: { token: string } },
    { email: string; password: string }
  >(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { email: username, password },
      });

      if (data?.login?.token) {
        AuthService.login(data.login.token); // Save token and redirect
        window.location.assign('/landing'); // Redirect to Landing page
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
      </div>

      <div style={styles.loginBox}>
        <h1 style={styles.loginTitle}>Login</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {error && <p style={styles.error}>Invalid username or password.</p>}
        <p style={styles.signupLink}>
          New user? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
