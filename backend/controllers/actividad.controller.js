const Actividad = require("../models/actividad");

exports.crearActividad = async (req, res) => {
  try {
    const actividad = new Actividad(req.body);
    await actividad.save();
    res.status(201).json(actividad);
  } catch (error) {
    res.status(500).json({ error: "Error al crear actividad" });
  }
};

exports.obtenerActividades = async (req, res) => {
  const actividades = await Actividad.find().populate("asignatura");
  res.json(actividades);
};