const Calificacion = require("../models/calificacion");

exports.crearCalificacion = async (req, res) => {
  try {
    const calificacion = new Calificacion(req.body);
    await calificacion.save();
    res.status(201).json(calificacion);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar calificación" });
  }
};

exports.obtenerCalificaciones = async (req, res) => {
  const calificaciones = await Calificacion.find()
    .populate("estudiante")
    .populate("asignatura")
    .populate("actividad");

  res.json(calificaciones);
};