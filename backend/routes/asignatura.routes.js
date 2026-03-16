const express = require("express");
const router = express.Router();

const asignaturaController = require("../controllers/asignatura.controller");

router.post("/", asignaturaController.crearAsignatura);
router.get("/", asignaturaController.obtenerAsignaturas);

module.exports = router;