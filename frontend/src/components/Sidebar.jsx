import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) return null;

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    display: "block",
    marginBottom: "10px"
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <h2>Sistema</h2>

        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          👤 {usuario.nombre}
        </p>

        <Link style={linkStyle} to="/dashboard">
          Dashboard
        </Link>

        {usuario.rol === "admin" && (
          <>
            <Link style={linkStyle} to="/usuarios">
              Usuarios
            </Link>
          </>
        )}

        {usuario.rol === "docente" && (
          <>
            <Link style={linkStyle} to="/asignaturas">
              Asignaturas
            </Link>

            <Link style={linkStyle} to="/actividades">
              Actividades
            </Link>

            <Link style={linkStyle} to="/calificaciones">
              Calificaciones
            </Link>

            <Link style={linkStyle} to="/rendimiento">
              Rendimiento
            </Link>
          </>
        )}

        {usuario.rol === "estudiante" && (
          <>
            <Link style={linkStyle} to="/calificaciones">
              Mis calificaciones
            </Link>

            <Link style={linkStyle} to="/rendimiento">
              Mi rendimiento
            </Link>
          </>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Sidebar;