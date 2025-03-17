import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

const NavigationBar = () => {
  const handleSignOut = () => {
    AuthService.logout();
  };

  return (
    <div className="topnav">
      <div id="mySidenav" className="sidenav">
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={() => closeNav()}
        >
          &times;
        </a>
        <Link to="/landing">Dashboard</Link>
        <Link to="/fleet">Fleet Management</Link>
        <Link to="/user-mgt">User Management</Link>
        <Link to="/warehouse">Warehouse Management</Link>
        <button
          onClick={handleSignOut}
          style={{ marginTop: "10px", color: "#ff8c42" }}
        >
          Sign Out
        </button>
      </div>
      <span onClick={() => openNav()}>☰</span>
    </div>
  );
};

// Helper functions to open/close the navigation bar
function openNav() {
  const sidenav = document.getElementById("mySidenav");
  if (sidenav) {
    sidenav.style.width = "250px";
  }
}

function closeNav() {
  const sidenav = document.getElementById("mySidenav");
  if (sidenav) {
    sidenav.style.width = "0";
  }
}

export default NavigationBar;
