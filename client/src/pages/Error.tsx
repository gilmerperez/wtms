import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Oops!</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
        Sorry, an unexpected error has occurred.
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#555" }}>
        <i>{error.statusText || error.message}</i>
      </p>
      <a
        href="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Go Back Home
      </a>
    </div>
  );
}