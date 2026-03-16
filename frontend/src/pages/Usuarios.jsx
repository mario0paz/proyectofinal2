import { useEffect, useState } from "react";
import api from "../services/api";

function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "estudiante"
  });

  const [editandoId, setEditandoId] = useState(null);

  const obtenerUsuarios = async () => {
    try {

      const res = await api.get("/usuarios");
      setUsuarios(res.data);

    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };


  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editandoId) {

        await api.put(`/usuarios/${editandoId}`, form);

      } else {

        await api.post("/usuarios", form);

      }

      setForm({
        nombre: "",
        correo: "",
        password: "",
        rol: "estudiante"
      });

      setEditandoId(null);

      obtenerUsuarios();

    } catch (error) {
      console.error("Error al guardar usuario", error);
    }

  };

  const editarUsuario = (usuario) => {

    setForm({
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.password,
      rol: usuario.rol
    });

    setEditandoId(usuario._id);

  };

  const eliminarUsuario = async (id) => {

    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");

    if (!confirmar) return;

    try {

      await api.delete(`/usuarios/${id}`);

      obtenerUsuarios();

    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }

  };


  return (

    <div>

      <h1>Usuarios</h1>


      {/* FORMULARIO */}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
        >

          <option value="admin">Admin</option>

          <option value="docente">Docente</option>

          <option value="estudiante">Estudiante</option>

        </select>


        <button type="submit">

          {editandoId ? "Actualizar Usuario" : "Crear Usuario"}

        </button>

      </form>


      <br />


      {/* TABLA */}

      <table border="1" cellPadding="10">

        <thead>
          <tr>

            <th>Nombre</th>

            <th>Correo</th>

            <th>Rol</th>

            <th>Acciones</th>

          </tr>
        </thead>

        <tbody>

          {usuarios.map((usuario) => (

            <tr key={usuario._id}>

              <td>{usuario.nombre}</td>

              <td>{usuario.correo}</td>

              <td>{usuario.rol}</td>

              <td>

                <button onClick={() => editarUsuario(usuario)}>
                  Editar
                </button>

                <button onClick={() => eliminarUsuario(usuario._id)}>
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Usuarios;