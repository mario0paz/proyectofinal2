const Rendimiento = require("../models/rendimiento");
const Calificacion = require("../models/calificacion");

exports.calcularRendimiento = async (req, res) => {
  try {
    const { estudianteId } = req.params;

    const calificaciones = await Calificacion.find({ estudiante: estudianteId });

    if (calificaciones.length === 0) {
      return res.status(404).json({ mensaje: "No hay calificaciones" });
    }

    const suma = calificaciones.reduce((acc, c) => acc + c.nota, 0);
    const promedio = suma / calificaciones.length;

    let rendimiento = await Rendimiento.findOne({ estudiante: estudianteId });

    if (rendimiento) {
      rendimiento.rendimientoTotal = promedio;
      await rendimiento.save();
    } else {
      rendimiento = new Rendimiento({
        estudiante: estudianteId,
        rendimientoParcial: promedio,
        rendimientoTotal: promedio
      });
      await rendimiento.save();
    }

    res.json({ promedio });

  } catch (error) {
    res.status(500).json({ error: "Error al calcular rendimiento" });
  }
};