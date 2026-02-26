const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/seguimiento_academico");
    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.error("❌ Error al conectar la base de datos", error);
  }
};

module.exports = conectarDB;