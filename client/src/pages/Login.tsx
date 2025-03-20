import "../styles/Login.css";
import { useState } from "react";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { error }] = useMutation<
    { login: { token: string } },
    { email: string; password: string }
  >(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      if (data?.login?.token) {
        AuthService.login(data.login.token);
        window.location.assign("/landing");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="loginTitle">Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
        {error && <p className="error">Invalid email or password.</p>}
        <p className="signupLink">
          New user? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
