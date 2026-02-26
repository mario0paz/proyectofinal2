const mongoose = require("mongoose");

const actividadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ["examen", "tarea", "foro", "proyecto"], required: true },
  ponderacion: { type: Number, required: true },
  asignatura: { type: mongoose.Schema.Types.ObjectId, ref: "Asignatura", required: true },
  fechaEntrega: Date
});

module.exports = mongoose.model("Actividad", actividadSchema);