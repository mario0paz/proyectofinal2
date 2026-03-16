const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  password: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ["admin", "docente", "estudiante"], 
    default: "estudiante",
    required: true 
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);