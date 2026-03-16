import { useEffect, useState } from "react";
import axios from "axios";

function Actividades() {

  const API_ACTIVIDADES = "http://localhost:3000/api/actividades";
  const API_ASIGNATURAS = "http://localhost:3000/api/asignaturas";

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [actividades, setActividades] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [ponderacion, setPonderacion] = useState("");
  const [asignatura, setAsignatura] = useState("");

  const obtenerAsignaturas = async () => {
    try {
      const res = await axios.get(API_ASIGNATURAS);

      let data = res.data;

      if (usuario?.rol === "docente") {
        data = data.filter(a => a.docente && a.docente._id === usuario._id);
      }

      setAsignaturas(data);

    } catch (error) {
      console.error("Error obteniendo asignaturas", error);
    }
  };

  const obtenerActividades = async () => {
    try {
      const res = await axios.get(API_ACTIVIDADES);
      setActividades(res.data);
    } catch (error) {
      console.error("Error obteniendo actividades", error);
    }
  };

  useEffect(() => {
    obtenerAsignaturas();
    obtenerActividades();
  }, []);

  const crearActividad = async () => {

    if (!nombre || !tipo || !ponderacion || !asignatura) {
      alert("Debes completar todos los campos");
      return;
    }

    try {

      await axios.post(API_ACTIVIDADES, {
        nombre,
        tipo,           // examen | tarea | foro | proyecto
        ponderacion,
        asignatura
      });

      setNombre("");
      setTipo("");
      setPonderacion("");
      setAsignatura("");

      obtenerActividades();

    } catch (error) {

      console.error("Error creando actividad", error);

    }

  };

  const eliminarActividad = async (id) => {

    try {

      await axios.delete(`${API_ACTIVIDADES}/${id}`);
      obtenerActividades();

    } catch (error) {

      console.error("Error eliminando actividad", error);

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

      <h1>Actividades</h1>

      {/* FORMULARIO */}

      <div style={card}>

        <h2>Crear Actividad</h2>

        <div style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Nombre de actividad"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{ padding: "8px", width: "260px" }}
          >

            <option value="">
              Seleccionar tipo
            </option>

            <option value="examen">
              Examen
            </option>

            <option value="tarea">
              Tarea
            </option>

            <option value="foro">
              Foro
            </option>

            <option value="proyecto">
              Proyecto
            </option>

          </select>

        </div>

        <div style={{ marginTop: "15px" }}>
          <input
            type="number"
            placeholder="Ponderación (%)"
            value={ponderacion}
            onChange={(e) => setPonderacion(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>

          <select
            value={asignatura}
            onChange={(e) => setAsignatura(e.target.value)}
            style={{ padding: "8px", width: "260px" }}
          >

            <option value="">
              Seleccionar asignatura
            </option>

            {asignaturas.map(a => (
              <option key={a._id} value={a._id}>
                {a.nombre}
              </option>
            ))}

          </select>

        </div>

        <button
          onClick={crearActividad}
          style={{
            ...button,
            background: "#3b82f6",
            color: "white"
          }}
        >
          Crear Actividad
        </button>

      </div>

      {/* TABLA */}

      <div style={card}>

        <h2>Lista de Actividades</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px"
          }}
        >

          <thead style={{ background: "#334155" }}>

            <tr>
              <th style={{ padding: "10px" }}>Actividad</th>
              <th>Tipo</th>
              <th>Asignatura</th>
              <th>Ponderación</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {actividades.map(a => (

              <tr key={a._id} style={{ textAlign: "center" }}>

                <td style={{ padding: "10px" }}>
                  {a.nombre}
                </td>

                <td>
                  {a.tipo}
                </td>

                <td>
                  {a.asignatura?.nombre || "Sin asignatura"}
                </td>

                <td>
                  {a.ponderacion} %
                </td>

                <td>

                  <button
                    onClick={() => eliminarActividad(a._id)}
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

export default Actividades;