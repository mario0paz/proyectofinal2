const mongoose = require("mongoose");

const asignaturaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  docente: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  periodo: { type: String, required: true }
});

module.exports = mongoose.model("Asignatura", asignaturaSchema);