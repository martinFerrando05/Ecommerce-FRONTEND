import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import logoRFC from "../assets/[removal.ai]_d49ecfa2-f5d0-4920-a10a-02f5dd4e81fa-retro-football-club-logo-7ed5062e40c8b53c0fc2.png";
import { onSubmitReload } from "../utils/utils";

const LoginForm = ({ handleOpenLogin, setDisplayLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: email,
        password: password,
      })
      .then(() => {
        setDisplayLogin(false);
        onSubmitReload();
        navigate("/");
        toast.success("Bienvenido! Has iniciado sesión");
      })

      .catch((err) => {
        console.log(err);
        toast.error("Email o contraseña incorrectos");
      });
  };

  return (
    <>
      {/* <div className="retroForm">
      <Toaster richColors position="top-center" />
      <form onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChangeEmail}
            required
          />
          <div id="emailHelp" className="form-text">
            No compartiremos tus datos con nadie
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChangePassword}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
      <br></br>
      <p>No tienes una cuenta?</p>
      <Link to={"/register"}>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </Link>
    </div> */}

      <div className="fixed backdrop-blur-sm h-screen w-full flex flex-col pb-64 justify-center items-center z-10">
        <div
          style={{ height: "390px" }}
          class=" w-4/12 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 "
        >
          <div class="px-6 py-4">
            <div class="flex justify-center mx-auto">
              <img class=" w-20 h-18" src={logoRFC} alt="" />
            </div>

            <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Formulario de Inicio de Sesion
            </h3>

            <form>
              <div class="w-full mt-4">
                <input
                  class="block w-full px-4 py-2 mt-2  text-stone-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  placeholder="Email"
                  aria-label="Email Address"
                  onChange={onChangeEmail}
                  required
                />
              </div>

              <div class="w-full mt-4">
                <input
                  class="block w-full px-4 py-2 mt-2  text-stone-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  placeholder="Contraseña"
                  aria-label="Password"
                  onChange={onChangePassword}
                  required
                />
              </div>

              <div class="flex items-center justify-center mt-9">
                <button
                  onClick={handleLogin}
                  class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Iniciar Sesion
                </button>
              </div>
            </form>
          </div>

          <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span class="text-sm text-gray-600 dark:text-gray-200">
              No tienes una cuenta?
            </span>
            <Link to={"/register"}>
              <p
                class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                onClick={handleOpenLogin}
              >
                Registrarme
              </p>
            </Link>
          </div>
        </div>
        <div class="flex items-center justify-center mt-4">
          <button
            onClick={handleOpenLogin}
            class="px-6 py-4 text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 font-bold rounded-full hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
