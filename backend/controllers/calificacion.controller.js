const Calificacion = require("../models/calificacion");

exports.crearCalificaciones = async (req, res) => {

  try {

    const { calificaciones } = req.body;

    if (!Array.isArray(calificaciones) || calificaciones.length === 0) {

      return res.status(400).json({
        error: "No hay calificaciones para guardar"
      });

    }

    const resultado = await Calificacion.insertMany(calificaciones);

    res.status(201).json(resultado);

  } catch (error) {

    console.error("Error guardando calificaciones:", error);

    res.status(500).json({
      error: error.message
    });

  }

};


exports.obtenerCalificaciones = async (req, res) => {

  try {

    const calificaciones = await Calificacion
      .find()
      .populate("estudiante", "nombre")
      .populate("actividad", "nombre")
      .populate("asignatura", "nombre");

    res.json(calificaciones);

  } catch (error) {

    res.status(500).json({
      error: "Error obteniendo calificaciones"
    });

  }

};