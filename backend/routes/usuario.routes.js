const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");


router.post("/", usuarioController.crearUsuario);

router.get("/", usuarioController.obtenerUsuarios);

router.put("/:id", usuarioController.actualizarUsuario);

router.delete("/:id", usuarioController.eliminarUsuario);

router.post("/login", usuarioController.login);


module.exports = router;