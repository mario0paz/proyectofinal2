const express = require("express");
const router = express.Router();
const actividadController = require("../controllers/actividad.controller");

router.post("/", actividadController.crearActividad);
router.get("/", actividadController.obtenerActividades);

module.exports = router;