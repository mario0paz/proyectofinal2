import { useEffect, useState } from "react";
import axios from "axios";

function Asignaturas() {

  const API_ASIGNATURAS = "http://localhost:3000/api/asignaturas";
  const API_USUARIOS = "http://localhost:3000/api/usuarios";

  const [asignaturas, setAsignaturas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [nombre, setNombre] = useState("");
  const [docente, setDocente] = useState("");
  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState([]);

  const docentes = usuarios.filter(u => u.rol === "docente");
  const estudiantes = usuarios.filter(u => u.rol === "estudiante");

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(API_USUARIOS);
      setUsuarios(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerAsignaturas = async () => {
    try {
      const res = await axios.get(API_ASIGNATURAS);
      setAsignaturas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
    obtenerAsignaturas();
  }, []);

  const toggleEstudiante = (id) => {

    if (estudiantesSeleccionados.includes(id)) {

      setEstudiantesSeleccionados(
        estudiantesSeleccionados.filter(e => e !== id)
      );

    } else {

      setEstudiantesSeleccionados([
        ...estudiantesSeleccionados,
        id
      ]);

    }

  };

  const crearAsignatura = async () => {

    if (!nombre || !docente) {
      alert("Debes ingresar nombre y docente");
      return;
    }

    try {

      await axios.post(API_ASIGNATURAS, {
        nombre,
        docente,
        estudiantes: estudiantesSeleccionados
      });

      setNombre("");
      setDocente("");
      setEstudiantesSeleccionados([]);

      obtenerAsignaturas();

    } catch (error) {

      console.error(error);

    }

  };

  const eliminarAsignatura = async (id) => {

    try {

      await axios.delete(`${API_ASIGNATURAS}/${id}`);
      obtenerAsignaturas();

    } catch (error) {

      console.error(error);

    }

  };

  const card = {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "10px",
    color: "white",
    marginBottom: "30px"
  };

  const button = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  };

  return (

    <div>

      <h1>Asignaturas</h1>

      {/* FORMULARIO */}

      <div style={card}>

        <h2>Crear Asignatura</h2>

        <div style={{ marginTop: "15px" }}>

          <input
            type="text"
            placeholder="Nombre de asignatura"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />

        </div>

        <div style={{ marginTop: "15px" }}>

          <select
            value={docente}
            onChange={(e) => setDocente(e.target.value)}
            style={{ padding: "8px", width: "260px" }}
          >

            <option value="">
              Seleccionar docente
            </option>

            {docentes.map(d => (

              <option key={d._id} value={d._id}>
                {d.nombre}
              </option>

            ))}

          </select>

        </div>

        <div style={{ marginTop: "20px" }}>

          <h3>Matricular estudiantes</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,150px)",
            gap: "10px",
            marginTop: "10px"
          }}>

            {estudiantes.map(e => (

              <label
                key={e._id}
                style={{
                  background: "#334155",
                  padding: "8px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >

                <input
                  type="checkbox"
                  checked={estudiantesSeleccionados.includes(e._id)}
                  onChange={() => toggleEstudiante(e._id)}
                />

                {" "} {e.nombre}

              </label>

            ))}

          </div>

        </div>

        <button
          onClick={crearAsignatura}
          style={{
            ...button,
            background: "#3b82f6",
            color: "white"
          }}
        >
          Crear Asignatura
        </button>

      </div>

      {/* TABLA */}

      <div style={card}>

        <h2>Lista de Asignaturas</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px"
          }}
        >

          <thead style={{ background: "#334155" }}>

            <tr>
              <th style={{ padding: "10px" }}>Asignatura</th>
              <th>Docente</th>
              <th>Estudiantes</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {asignaturas.map(a => (

              <tr key={a._id} style={{ textAlign: "center" }}>

                <td style={{ padding: "10px" }}>
                  {a.nombre}
                </td>

                <td>
                  {a.docente?.nombre || "Sin docente"}
                </td>

                <td>
                  {a.estudiantes?.length || 0}
                </td>

                <td>

                  <button
                    onClick={() => eliminarAsignatura(a._id)}
                    style={{
                      ...button,
                      background: "#ef4444",
                      color: "white"
                    }}
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Asignaturas;