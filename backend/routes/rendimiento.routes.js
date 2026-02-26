const express = require("express");
const router = express.Router();
const rendimientoController = require("../controllers/rendimiento.controller");

router.get("/:estudianteId", rendimientoController.calcularRendimiento);

module.exports = router;