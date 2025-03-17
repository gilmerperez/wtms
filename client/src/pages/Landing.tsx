import AuthService from "../utils/auth";
import { useState, useEffect } from "react";

const Landing = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Fetch user data from the token
    const profile = AuthService.getProfile();
    if (profile) {
      setUser({ username: profile.data.username });
    }
  }, []);

  return (
    <main>
      <h1>Landing</h1>
      {AuthService.loggedIn() ? (
        <>
          <p>Welcome, {user?.username}!</p>
          <p>You are now logged in.</p>
        </>
      ) : (
        <>
          <p>Welcome to the Landing Page</p>
          <p>Please log in or sign up to continue.</p>
        </>
      )}
    </main>
  );
};

export default Landing;
