import { Link } from "react-router-dom";

function Navbar() {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "18px"
  };

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#111",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      position: "fixed",
      left: "0",
      top: "0"
    }}>
      <h2 style={{ color: "white" }}>Sistema</h2>

      <Link style={linkStyle} to="/dashboard">Dashboard</Link>
      <Link style={linkStyle} to="/usuarios">Usuarios</Link>
      <Link style={linkStyle} to="/asignaturas">Asignaturas</Link>
      <Link style={linkStyle} to="/actividades">Actividades</Link>
      <Link style={linkStyle} to="/calificaciones">Calificaciones</Link>
      <Link style={linkStyle} to="/rendimiento">Rendimiento</Link>
    </div>
  );
}

export default Navbar;