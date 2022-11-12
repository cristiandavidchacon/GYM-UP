// React
import { useState } from "react";

// Next
// import Link from "next/link";

// Next UI
import { Button, Input } from "@nextui-org/react";

// Styles
import "./Login.css";
// import SEO from "../components/SEO/SEO";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Navigate, Link } from "react-router-dom";
// import { useRouter } from "next/router";

function Login() {
  const { userData, signIn } = useAuth();

  // const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signIn(credentials.email, credentials.password);
    } catch (error) {
      console.log(error);
    }
    console.log(credentials);
  };

  if (userData) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      {/* <SEO title="Inicio de Sesi&oacute;n" /> */}
      <div className="login">
        <form onSubmit={handleSignIn} className="login__form">
          <h1 className="login__form__title">Iniciar Sesi&oacute;n</h1>
          <Input
            name="email"
            labelPlaceholder="Correo institucional"
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
            Iniciar Sesi&oacute;n
          </Button>
          <div className="register">
            <p className="register__text">
              ¿A&uacute;n no tienes una cuenta?
              <Link to="/register">
                <span className="register__link">Registrate</span>
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

export default Login;
