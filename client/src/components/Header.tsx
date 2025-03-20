import logo from "../assets/logo_darkTheme.png";

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-center align-items-center">
        <img
          src={logo}
          alt="WTSM"
          className="header-img"
          style={{ height: "90px" }}
        />
        <h1 className="m-1">WareHouse and Transport Management System</h1>
      </nav>
    </header>
  );
};

export default Header;
