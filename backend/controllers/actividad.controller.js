const Actividad = require("../models/actividad");

exports.crearActividad = async (req, res) => {

  try {

    const actividad = new Actividad(req.body);

    await actividad.save();

    res.status(201).json(actividad);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error creando actividad"
    });

  }

};

exports.obtenerActividades = async (req, res) => {

  try {

    const actividades = await Actividad
      .find()
      .populate("asignatura", "nombre");

    res.json(actividades);

  } catch (error) {

    res.status(500).json({
      error: "Error obteniendo actividades"
    });

  }

};

exports.eliminarActividad = async (req, res) => {

  try {

    await Actividad.findByIdAndDelete(req.params.id);

    res.json({
      mensaje: "Actividad eliminada"
    });

  } catch (error) {

    res.status(500).json({
      error: "Error eliminando actividad"
    });

  }

};