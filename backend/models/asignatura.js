const mongoose = require("mongoose");

const asignaturaSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  estudiantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
    }
  ]

});

module.exports = mongoose.model("Asignatura", asignaturaSchema);