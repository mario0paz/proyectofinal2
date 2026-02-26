const express = require("express");
const cors = require("cors");
const conectarDB = require("./database");

// Inicializar app
const app = express();

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas del sistema
app.use("/api/usuarios", require("./routes/usuario.routes"));
app.use("/api/asignaturas", require("./routes/asignatura.routes"));
app.use("/api/actividades", require("./routes/actividad.routes"));
app.use("/api/calificaciones", require("./routes/calificacion.routes"));
app.use("/api/rendimiento", require("./routes/rendimiento.routes"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 API del Sistema de Seguimiento Académico funcionando correctamente");
});

// Puerto
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});