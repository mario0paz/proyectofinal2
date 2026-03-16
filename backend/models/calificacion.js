const mongoose = require("mongoose");

const calificacionSchema = new mongoose.Schema({

  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  asignatura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asignatura",
    required: true
  },

  actividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actividad",
    required: true
  },

  nota: {
    type: Number,
    required: true
  },

  periodo: {
    type: String,
    required: true
  },

  retroalimentacion: {
    type: String
  }

});

module.exports = mongoose.model("Calificacion", calificacionSchema);