const Usuario = require("../models/usuario");

exports.crearUsuario = async (req, res) => {
  try {

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.status(201).json(usuario);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: error.message });

  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {

    const usuarios = await Usuario.find();
    res.json(usuarios);

  } catch (error) {

    res.status(500).json({ error: "Error al obtener usuarios" });

  }
};

exports.actualizarUsuario = async (req, res) => {
  try {

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(usuarioActualizado);

  } catch (error) {

    res.status(500).json({ error: "Error al actualizar usuario" });

  }
};

exports.eliminarUsuario = async (req, res) => {
  try {

    await Usuario.findByIdAndDelete(req.params.id);

    res.json({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {

    res.status(500).json({ error: "Error al eliminar usuario" });

  }
};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    if (usuario.password !== password) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      });
    }

    res.json({
      mensaje: "Login correcto",
      usuario
    });

  } catch (error) {

    res.status(500).json({
      error: "Error en el login"
    });

  }
};