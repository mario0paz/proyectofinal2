import { useEffect, useState } from "react";
import axios from "axios";

function Calificaciones() {

  const API_ASIGNATURAS = "http://localhost:3000/api/asignaturas";
  const API_ACTIVIDADES = "http://localhost:3000/api/actividades";
  const API_CALIFICACIONES = "http://localhost:3000/api/calificaciones";

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [asignaturas, setAsignaturas] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);

  const [asignatura, setAsignatura] = useState("");
  const [actividad, setActividad] = useState("");
  const [periodo, setPeriodo] = useState("1");

  const [estudiantes, setEstudiantes] = useState([]);
  const [notas, setNotas] = useState({});

  // Obtener asignaturas
  const obtenerAsignaturas = async () => {
    try {

      const res = await axios.get(API_ASIGNATURAS);

      let data = res.data;

      if (usuario?.rol === "docente") {
        data = data.filter(a => a.docente && a.docente._id === usuario._id);
      }

      if (usuario?.rol === "estudiante") {
        data = data.filter(a =>
          a.estudiantes.some(e => e._id === usuario._id)
        );
      }

      setAsignaturas(data);

    } catch (error) {
      console.error("Error cargando asignaturas", error);
    }
  };

  // Obtener actividades
  const obtenerActividades = async (idAsignatura) => {
    try {

      const res = await axios.get(API_ACTIVIDADES);

      const filtradas = res.data.filter(
        a => a.asignatura && a.asignatura._id === idAsignatura
      );

      setActividades(filtradas);

    } catch (error) {
      console.error("Error cargando actividades", error);
    }
  };

  // Obtener calificaciones
  const obtenerCalificaciones = async () => {
    try {

      const res = await axios.get(API_CALIFICACIONES);
      setCalificaciones(res.data);

    } catch (error) {
      console.error("Error cargando calificaciones", error);
    }
  };

  // Obtener estudiantes de la asignatura
  const obtenerEstudiantes = (idAsignatura) => {

    const asignaturaSeleccionada = asignaturas.find(
      a => a._id === idAsignatura
    );

    const lista = asignaturaSeleccionada?.estudiantes || [];

    setEstudiantes(lista);

    const inicial = {};
    lista.forEach(e => {
      inicial[e._id] = "";
    });

    setNotas(inicial);

  };

  useEffect(() => {

    obtenerAsignaturas();
    obtenerCalificaciones();

  }, []);

  const cambiarAsignatura = (id) => {

    setAsignatura(id);
    setActividad("");

    obtenerActividades(id);
    obtenerEstudiantes(id);

  };

  const cambiarNota = (idEstudiante, valor) => {

    setNotas({
      ...notas,
      [idEstudiante]: valor
    });

  };

  // Guardar calificaciones (solo docente)
  const guardarCalificaciones = async () => {

    if (!actividad) {
      alert("Selecciona una actividad");
      return;
    }

    try {

      const datos = estudiantes.map(e => ({
        estudiante: e._id,
        asignatura: asignatura,
        actividad: actividad,
        nota: Number(notas[e._id]) || 0,
        periodo: periodo
      }));

      await axios.post(API_CALIFICACIONES, {
        calificaciones: datos
      });

      alert("Calificaciones guardadas");

      obtenerCalificaciones();

    } catch (error) {

      console.error("Error guardando calificaciones", error);

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

      <h1>Calificaciones</h1>

      {/* SELECTORES */}

      <div style={card}>

        <h2>Seleccionar</h2>

        <select
          value={asignatura}
          onChange={(e) => cambiarAsignatura(e.target.value)}
          style={{ padding: "8px", width: "260px", marginTop: "10px" }}
        >

          <option value="">Seleccionar asignatura</option>

          {asignaturas.map(a => (
            <option key={a._id} value={a._id}>
              {a.nombre}
            </option>
          ))}

        </select>

        {usuario?.rol === "docente" && (

          <>
            <select
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
              style={{ padding: "8px", width: "260px", marginTop: "10px" }}
            >

              <option value="">Seleccionar actividad</option>

              {actividades.map(a => (
                <option key={a._id} value={a._id}>
                  {a.nombre}
                </option>
              ))}

            </select>

            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              style={{ padding: "8px", width: "260px", marginTop: "10px" }}
            >
              <option value="1">Periodo 1</option>
              <option value="2">Periodo 2</option>
              <option value="3">Periodo 3</option>
              <option value="4">Periodo 4</option>
            </select>
          </>
        )}

      </div>

      {/* TABLA */}

      <div style={card}>

        <h2>Notas</h2>

        {usuario?.rol === "docente" ? (

          <>
            <table style={{ width: "100%", marginTop: "15px" }}>
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>

                {estudiantes.map(e => (

                  <tr key={e._id}>

                    <td>{e.nombre}</td>

                    <td>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={notas[e._id] || ""}
                        onChange={(ev) => cambiarNota(e._id, ev.target.value)}
                      />

                    </td>

                  </tr>

                ))}

              </tbody>
            </table>

            <button
              onClick={guardarCalificaciones}
              style={{ ...button, background: "#22c55e", color: "white" }}
            >
              Guardar Calificaciones
            </button>

          </>

        ) : (

          <table style={{ width: "100%", marginTop: "15px" }}>

            <thead>
              <tr>
                <th>Asignatura</th>
                <th>Actividad</th>
                <th>Nota</th>
              </tr>
            </thead>

            <tbody>

              {calificaciones
                .filter(c => c.estudiante._id === usuario._id)
                .map(c => (

                  <tr key={c._id}>

                    <td>{c.asignatura.nombre}</td>
                    <td>{c.actividad.nombre}</td>
                    <td>{c.nota}</td>

                  </tr>

                ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default Calificaciones;