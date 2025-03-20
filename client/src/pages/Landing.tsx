// Styles
const styles: { main: React.CSSProperties; heading: React.CSSProperties } = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "black",
  },
};

const Landing = () => {
  return (
    <main style={styles.main}>
      <h1 style={styles.heading}>
        Welcome to the Warehouse and Transport Management System
      </h1>
    </main>
  );
};

export default Landing;
