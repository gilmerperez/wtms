import "../styles/NavigationBar.css";
import AuthService from "../utils/auth";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const handleSignOut = () => {
    AuthService.logout();
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logoSection">
        <img
          src="assets\logos\logo_noBg.png"
          alt="WTMS Logo"
          className="logo"
        />
      </div>

      {/* Navigation Links */}
      <div className="links">
        {location.pathname !== "/landing" && (
          <Link
            to="/landing"
            className={`link ${
              location.pathname === "/landing" ? "activeLink" : ""
            }`}
          >
            Dashboard
          </Link>
        )}
        <Link
          to="/fleet"
          className={`link ${
            location.pathname === "/fleet" ? "activeLink" : ""
          }`}
        >
          Fleet Management
        </Link>
        <Link
          to="/user-mgt"
          className={`link ${
            location.pathname === "/user-mgt" ? "activeLink" : ""
          }`}
        >
          User Management
        </Link>
        <Link
          to="/warehouse"
          className={`link ${
            location.pathname === "/warehouse" ? "activeLink" : ""
          }`}
        >
          Warehouse Management
        </Link>
      </div>

      {/* Sign Out Button */}
      <button onClick={handleSignOut} className="signOutButton">
        Sign Out
      </button>
    </div>
  );
};

export default NavigationBar;
