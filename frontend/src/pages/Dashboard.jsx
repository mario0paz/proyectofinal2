import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [usuarios, setUsuarios] = useState([]);

  const [asignaturasDocente, setAsignaturasDocente] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(null);

  const [statsDocente, setStatsDocente] = useState({
    estudiantes: 0,
    actividades: 0,
    calificaciones: 0
  });

  // ESTUDIANTE
  const [misAsignaturas, setMisAsignaturas] = useState(0);
  const [misCalificaciones, setMisCalificaciones] = useState(0);
  const [miPromedio, setMiPromedio] = useState(0);

  const [graficaNotas, setGraficaNotas] = useState({
    labels: [],
    datasets: []
  });

  const cargarDatos = async () => {

    try {

      const resUsuarios = await api.get("/usuarios");
      setUsuarios(resUsuarios.data);

      const resAsignaturas = await api.get("/asignaturas");
      const asignaturas = resAsignaturas.data;

      const resCalificaciones = await api.get("/calificaciones");
      const calificaciones = resCalificaciones.data;

      // DOCENTE
      if (usuario?.rol === "docente") {

        const asignaturasDelDocente = asignaturas.filter(
          a => a.docente && a.docente._id === usuario._id
        );

        setAsignaturasDocente(asignaturasDelDocente);

        if (asignaturasDelDocente.length > 0) {

          const primera = asignaturasDelDocente[0];

          setAsignaturaSeleccionada(primera);

          setStatsDocente({
            estudiantes: primera.estudiantes?.length || 0,
            actividades: 0,
            calificaciones: 0
          });

        }

      }

      // ESTUDIANTE
      if (usuario?.rol === "estudiante") {

        const asignaturasDelEstudiante = asignaturas.filter(a =>
          a.estudiantes?.some(e => e._id === usuario._id)
        );

        setMisAsignaturas(asignaturasDelEstudiante.length);

        const misNotas = calificaciones.filter(
          c => c.estudiante && c.estudiante._id === usuario._id
        );

        setMisCalificaciones(misNotas.length);

        if (misNotas.length > 0) {

          const suma = misNotas.reduce((acc, n) => acc + n.nota, 0);
          const promedio = suma / misNotas.length;

          setMiPromedio(promedio.toFixed(2));

          const labels = misNotas.map(n => n.actividad?.nombre || "Actividad");
          const notas = misNotas.map(n => n.nota);

          setGraficaNotas({
            labels,
            datasets: [
              {
                label: "Mis notas",
                data: notas
              }
            ]
          });

        }

      }

    } catch (error) {

      console.error("Error cargando dashboard", error);

    }

  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cambiarAsignatura = (id) => {

    const asignatura = asignaturasDocente.find(a => a._id === id);

    setAsignaturaSeleccionada(asignatura);

    setStatsDocente({
      estudiantes: asignatura.estudiantes?.length || 0,
      actividades: 0,
      calificaciones: 0
    });

  };

  const cardStyle = {
    background: "#1e293b",
    color: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "260px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
  };

  return (

    <div>

      <h1>Dashboard</h1>

      <p>
        Bienvenido <strong>{usuario?.nombre}</strong>
      </p>

      <div style={{
        display: "flex",
        gap: "25px",
        marginTop: "30px",
        flexWrap: "wrap"
      }}>

        {/* ADMIN */}

        {usuario?.rol === "admin" && (

          <>
            <div style={cardStyle}>
              <h1>{usuarios.length}</h1>
              <p>Total Usuarios</p>
            </div>

            <div style={cardStyle}>
              <h1>{usuarios.filter(u => u.rol === "estudiante").length}</h1>
              <p>Estudiantes</p>
            </div>

            <div style={cardStyle}>
              <h1>{usuarios.filter(u => u.rol === "docente").length}</h1>
              <p>Docentes</p>
            </div>

            <div style={cardStyle}>
              <h1>{usuarios.length}</h1>
              <p>Usuarios Activos</p>
            </div>
          </>

        )}

        {/* DOCENTE */}

        {usuario?.rol === "docente" && (

          <div style={{ width: "100%" }}>

            <h3>Seleccionar Asignatura</h3>

            <select
              style={{ padding: "10px", marginTop: "10px" }}
              onChange={(e) => cambiarAsignatura(e.target.value)}
              value={asignaturaSeleccionada?._id || ""}
            >

              {asignaturasDocente.map(a => (

                <option key={a._id} value={a._id}>
                  {a.nombre}
                </option>

              ))}

            </select>

            <div style={{
              display: "flex",
              gap: "25px",
              marginTop: "30px"
            }}>

              <div style={cardStyle}>
                <h1>{statsDocente.estudiantes}</h1>
                <p>Estudiantes</p>
              </div>

              <div style={cardStyle}>
                <h1>{statsDocente.actividades}</h1>
                <p>Actividades</p>
              </div>

              <div style={cardStyle}>
                <h1>{statsDocente.calificaciones}</h1>
                <p>Calificaciones</p>
              </div>

            </div>

          </div>

        )}

        {/* ESTUDIANTE */}

        {usuario?.rol === "estudiante" && (

          <>
            <div style={cardStyle}>
              <h1>{miPromedio}</h1>
              <p>Promedio General</p>
            </div>

            <div style={cardStyle}>
              <h1>{misCalificaciones}</h1>
              <p>Mis Calificaciones</p>
            </div>

            <div style={cardStyle}>
              <h1>{misAsignaturas}</h1>
              <p>Asignaturas Matriculadas</p>
            </div>
          </>

        )}

      </div>

      {/* GRAFICA SOLO ESTUDIANTE */}

      {usuario?.rol === "estudiante" && (

        <div style={{
          marginTop: "40px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "12px"
        }}>

          <h3 style={{ color: "white" }}>
            Progreso de Calificaciones
          </h3>

          <Bar data={graficaNotas} />

        </div>

      )}

    </div>

  );

}

export default Dashboard;