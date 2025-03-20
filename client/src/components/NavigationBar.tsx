import AuthService from "../utils/auth";
import { Link, useLocation } from "react-router-dom";

// Styles
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff8c42",
    padding: "10px 20px",
    width: "100%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  links: {
    display: "flex",
    gap: "20px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  link: {
    color: "#000",
    fontWeight: "bold",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
  },
  activeLink: {
    backgroundColor: "#e67e22",
    border: "2px solid #000",
  },
  signOutButton: {
    backgroundColor: "#000",
    color: "#ff8c42",
    fontWeight: "bold",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginLeft: "auto",
  },
};

const NavigationBar = () => {
  const location = useLocation();
  const handleSignOut = () => {
    AuthService.logout();
  };

  return (
    <div style={styles.navbar}>
      {/* Navigation Links */}
      <div style={styles.links as React.CSSProperties}>
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
