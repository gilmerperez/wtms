import AuthService from "../utils/auth";
import { Link, useLocation } from "react-router-dom";

// Styles
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff8c42", // Orange background
    padding: "10px 20px",
    width: "100%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  logoSection: {
    flex: 1, // Takes up space for the logo
  },
  logo: {
    height: "40px",
  },
  links: {
    display: "flex",
    gap: "20px", // Space between links
  },
  link: {
    color: "#000", // Black text
    fontWeight: "bold",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "2px solid transparent", // Transparent border by default
    transition: "all 0.3s ease",
  },
  activeLink: {
    backgroundColor: "#e67e22", // Darker orange for active link
    border: "2px solid #000", // Black border for active link
  },
  signOutButton: {
    backgroundColor: "#000", // Black background
    color: "#ff8c42", // Orange text
    fontWeight: "bold",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginLeft: "20px",
  },
};

const NavigationBar = () => {
  const location = useLocation(); // Get the current route location
  const handleSignOut = () => {
    AuthService.logout();
  };

  return (
    <div style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logoSection}>
        <img src="/logo.png" alt="WTMS Logo" style={styles.logo} />
      </div>

      {/* Navigation Links */}
      <div style={styles.links}>
        {location.pathname !== "/landing" && (
          <Link
            to="/landing"
            style={{
              ...styles.link,
              ...(location.pathname === "/landing" && styles.activeLink),
            }}
          >
            Dashboard
          </Link>
        )}
        <Link
          to="/fleet"
          style={{
            ...styles.link,
            ...(location.pathname === "/fleet" && styles.activeLink),
          }}
        >
          Fleet Management
        </Link>
        <Link
          to="/user-mgt"
          style={{
            ...styles.link,
            ...(location.pathname === "/user-mgt" && styles.activeLink),
          }}
        >
          User Management
        </Link>
        <Link
          to="/warehouse"
          style={{
            ...styles.link,
            ...(location.pathname === "/warehouse" && styles.activeLink),
          }}
        >
          Warehouse Management
        </Link>
      </div>

      {/* Sign Out Button */}
      <button onClick={handleSignOut} style={styles.signOutButton}>
        Sign Out
      </button>
    </div>
  );
};

export default NavigationBar;
