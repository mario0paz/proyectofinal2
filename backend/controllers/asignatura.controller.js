const Asignatura = require("../models/asignatura");

exports.crearAsignatura = async (req, res) => {
  try {
    const asignatura = new Asignatura(req.body);
    await asignatura.save();
    res.status(201).json(asignatura);
  } catch (error) {
    res.status(500).json({ error: "Error al crear asignatura" });
  }
};

exports.obtenerAsignaturas = async (req, res) => {
  const asignaturas = await Asignatura.find().populate("docente");
  res.json(asignaturas);
};