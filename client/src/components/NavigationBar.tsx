import { Link } from "react-router-dom";
import login from "../utils/login";


/* Set the width of the side navigation to 250px */
function openNav() {
  const sidenav = document.getElementById("mySidenav");
  if (sidenav) {
    sidenav.style.width = "250px";
  }
}
  const sidenav = document.getElementById("mySidenav");
  if (sidenav) {
    sidenav.style.width = "0";
  }
/* Set the width of the side navigation to 0 */
function closeNav() {
  const sidenav = document.getElementById("mySidenav");
  if (sidenav) {
    sidenav.style.width = "0";
  }
}


const  NavigationBar = () => {
  return (
 <>
 <div className="topnav">
  
    <div/>
    <div id="mySidenav" className="sidenav">
      <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
      <a href="/">Dashboard</a>
      <a href="/usermgt">User Management</a>
      <a href="/warehouse">Warehouse Management</a>
      <a href="/fleet">Fleet Management</a>
    </div>
    <span onClick={() => openNav()}>open</span>
      </div>
    </>
);
}

export default NavigationBar;
