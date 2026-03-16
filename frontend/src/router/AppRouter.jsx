import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Usuarios from "../pages/Usuarios";
import Asignaturas from "../pages/Asignaturas";
import Actividades from "../pages/Actividades";
import Calificaciones from "../pages/Calificaciones";
import Rendimiento from "../pages/Rendimiento";
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/asignaturas" element={<Asignaturas />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/calificaciones" element={<Calificaciones />} />
        <Route path="/rendimiento" element={<Rendimiento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;