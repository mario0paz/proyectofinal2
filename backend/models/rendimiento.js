const mongoose = require("mongoose");

const rendimientoSchema = new mongoose.Schema({
  estudiante: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Usuario", 
    required: true 
  },
  rendimientoParcial: Number,
  rendimientoTotal: Number
});

module.exports = mongoose.model("Rendimiento", rendimientoSchema);