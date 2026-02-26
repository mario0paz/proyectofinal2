const express = require("express");
const router = express.Router();
const calificacionController = require("../controllers/calificacion.controller");

router.post("/", calificacionController.crearCalificacion);
router.get("/", calificacionController.obtenerCalificaciones);

module.exports = router;