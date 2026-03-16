import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Asignaturas from "./pages/Asignaturas";
import Actividades from "./pages/Actividades";
import Calificaciones from "./pages/Calificaciones";
import Rendimiento from "./pages/Rendimiento";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* APP PROTEGIDA (requiere login) */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>

          <Route path="/dashboard" element={<Dashboard />} />

          {/* SOLO ADMIN */}
          <Route
            path="/usuarios"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <Usuarios />
              </RoleRoute>
            }
          />

          {/* DOCENTE */}
          <Route
            path="/asignaturas"
            element={
              <RoleRoute allowedRoles={["docente"]}>
                <Asignaturas />
              </RoleRoute>
            }
          />

          <Route
            path="/actividades"
            element={
              <RoleRoute allowedRoles={["docente"]}>
                <Actividades />
              </RoleRoute>
            }
          />

          <Route
            path="/calificaciones"
            element={
              <RoleRoute allowedRoles={["docente", "estudiante"]}>
                <Calificaciones />
              </RoleRoute>
            }
          />

          <Route
            path="/rendimiento"
            element={
              <RoleRoute allowedRoles={["docente", "estudiante"]}>
                <Rendimiento />
              </RoleRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;