import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles = [] }) {
  const usuarioStr = localStorage.getItem("usuario");

  if (!usuarioStr) {
    return <Navigate to="/" />;
  }

  const usuario = JSON.parse(usuarioStr);

  if (!allowedRoles.includes(usuario.rol)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default RoleRoute;