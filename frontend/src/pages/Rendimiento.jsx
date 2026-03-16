import { useEffect, useState } from "react";
import axios from "axios";

function Rendimiento() {

  const API_ASIGNATURAS = "http://localhost:3000/api/asignaturas";
  const API_ACTIVIDADES = "http://localhost:3000/api/actividades";
  const API_CALIFICACIONES = "http://localhost:3000/api/calificaciones";

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [asignaturas, setAsignaturas] = useState([]);
  const [asignatura, setAsignatura] = useState("");

  const [actividades, setActividades] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);

  const [resultados, setResultados] = useState([]);

  // Obtener asignaturas
  const obtenerAsignaturas = async () => {

    try {

      const res = await axios.get(API_ASIGNATURAS);

      let data = res.data;

      if (usuario?.rol === "docente") {
        data = data.filter(a => a.docente && a.docente._id === usuario._id);
      }

      setAsignaturas(data);

    } catch (error) {

      console.error("Error cargando asignaturas", error);

    }

  };

  const obtenerDatos = async () => {

    try {

      const resAct = await axios.get(API_ACTIVIDADES);
      const resCal = await axios.get(API_CALIFICACIONES);

      setActividades(resAct.data);
      setCalificaciones(resCal.data);

    } catch (error) {

      console.error("Error cargando datos", error);

    }

  };

  useEffect(() => {

    obtenerAsignaturas();
    obtenerDatos();

  }, []);

  const calcularRendimiento = (idAsignatura) => {

    const acts = actividades.filter(
      a => a.asignatura && a.asignatura._id === idAsignatura
    );

    const cals = calificaciones.filter(
      c => c.asignatura && c.asignatura._id === idAsignatura
    );

    const estudiantes = {};

    cals.forEach(c => {

      const id = c.estudiante._id;

      if (!estudiantes[id]) {
        estudiantes[id] = {
          nombre: c.estudiante.nombre,
          total: 0
        };
      }

      const actividad = acts.find(a => a._id === c.actividad._id);

      if (actividad) {

        const peso = actividad.ponderacion / 100;

        estudiantes[id].total += c.nota * peso;

      }

    });

    const lista = Object.values(estudiantes);

    setResultados(lista);

  };

  const cambiarAsignatura = (id) => {

    setAsignatura(id);

    calcularRendimiento(id);

  };

  const card = {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "10px",
    color: "white",
    marginBottom: "30px"
  };

  return (

    <div>

      <h1>Rendimiento</h1>

      <div style={card}>

        <h2>Seleccionar Asignatura</h2>

        <select
          value={asignatura}
          onChange={(e) => cambiarAsignatura(e.target.value)}
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

      <div style={card}>

        <h2>Promedios</h2>

        {resultados.length === 0 ? (

          <p>No hay datos para mostrar.</p>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "15px"
            }}
          >

            <thead style={{ background: "#334155" }}>

              <tr>
                <th style={{ padding: "10px" }}>Estudiante</th>
                <th>Promedio</th>
              </tr>

            </thead>

            <tbody>

              {resultados.map((r, index) => (

                <tr key={index} style={{ textAlign: "center" }}>

                  <td style={{ padding: "10px" }}>
                    {r.nombre}
                  </td>

                  <td>
                    {r.total.toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default Rendimiento;