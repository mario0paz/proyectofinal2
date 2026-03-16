import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/usuarios/login", {
        correo,
        password
      });

      const usuario = res.data.usuario;

      localStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/dashboard");

    } catch (error) {

      alert("Credenciales incorrectas");

    }

  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0f172a"
    }}>

      <form
        onSubmit={handleLogin}
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "10px",
          width: "300px",
          color: "white"
        }}
      >

        <h2 style={{ textAlign: "center" }}>
          Sistema Académico
        </h2>

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Iniciar sesión
        </button>

      </form>

    </div>

  );

}

export default Login;