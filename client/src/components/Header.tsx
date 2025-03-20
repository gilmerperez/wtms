// import React from "react";
import logo from "../assets/logo_noBg.png";


const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="navbar navbar-expand-lg navbar-dark">
      {/* <div className="container d-flex justify-content-between align-items-center">
      Left Image */}
          <img src={logo} alt="WTSM" className="header-img" style={{ height: "80px" }} />
        
          <h1 className="m-1">WareHouse and Transport Management System</h1>
          
          {/* Right Image
          <img src={logo} alt="WTSM" className="header-img" style={{ height: "40px" }} />
        </div> */}
      </nav>
    </header>
  );
};

export default Header;

