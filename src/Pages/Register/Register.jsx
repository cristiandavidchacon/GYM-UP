// React
import { useState } from "react";

// Next
// import Link from "next/link";

// Next UI
import { Button, Input } from "@nextui-org/react";

// Styles
import "../Login/Login.css";
// import SEO from "../components/SEO/SEO";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Navigate, Link } from "react-router-dom";

// import { useRouter } from "next/router";

// import db from "../config/firebase";

import db from "../../Config/firebase";

import { doc, setDoc } from "firebase/firestore";

function Register() {
  const { userData, signUp } = useAuth();

  // const router = useRouter();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    codigo: "",
    role: "U",
    password: "",
    turn: "",
  });

  // handle input change
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signUp(credentials.email, credentials.password);
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async (id) => {
    await setDoc(doc(db, "users", id), {
      name: credentials.name,
      email: credentials.email,
      role: credentials.role,
      codigo: credentials.codigo,
      uID: userData.uid,
      turn: credentials.turn,
    });
  };

  if (userData) {
    setData(userData.uid);
    return <Navigate to="/home" />;
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSignUp} className="login__form">
          <h1 className="login__form__title">Registrate ahora!</h1>
          <Input
            name="name"
            labelPlaceholder="Nombre Completo"
            fullWidth
            required
            clearable
            onChange={handleChange}
            className="login__form__input"
          />
          <Input
            name="email"
            labelPlaceholder="Correo institucional"
            fullWidth
            required
            clearable
            onChange={handleChange}
            className="login__form__input"
          />
          <Input
            name="codigo"
            labelPlaceholder="Codigo del estudiante"
            fullWidth
            required
            clearable
            onChange={handleChange}
            className="login__form__input"
          />
          <Input.Password
            name="password"
            labelPlaceholder="Contrase&ntilde;a"
            fullWidth
            required
            onChange={handleChange}
            className="login__form__input"
          />

          <Button type="submit" className="login__form__button">
            Registrate
          </Button>
          <div className="register">
            <p className="register__text">
              ¿Ya tienes una cuenta?
              <Link to="/login">
                <span className="register__link">Inicia sesi&oacute;n</span>
              </Link>
            </p>
          </div>
        </form>
        <div className="login__image">
          <div className="login__image__container">
            <img src="/sport1.svg" alt="Deporte y salud" width="100%" />
          </div>
          <img src="/logo.png" alt="UAO Logo" width="200px" />
        </div>
      </div>
    </>
  );
}

export default Register;
