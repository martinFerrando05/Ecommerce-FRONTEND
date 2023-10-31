import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { containsNumbers } from "../../utils/utils";
import { Toaster, toast } from "sonner";
import registerImage from "../../assets/Diseño sin título (2).png";
import { registeredUser } from "../../redux/registered";
import "./register.css"
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isRegistered = useSelector(store=> store.registered.value.isRegister)

  const handleRegisteredDispatch = () =>{
    dispatch(registeredUser(!isRegistered))
  }

  const validateForm = (e) => {
    e.preventDefault();

    if (containsNumbers(name)) {
      toast.error("El nombre no puede contener números");
      return;
    }

    if (containsNumbers(lastName)) {
      toast.error("El apellido no puede contener números");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Debe ingresar un correo electrónico válido");
      return;
    }

    if (password !== password2) {
      toast.error("No coinciden las contraseñas. Intentelo nuevamente");
      return;
    }
    if (password.length < 6 || !containsNumbers(password)) {
      toast.error(
        "La contraseña debe contener al menos 6 caracteres y al menos 1 numero"
      );
      return;
    }

    handleSubmit();
  };

  const handleSubmit = () => {
    axios
      .post("/api/users/register", {
        name,
        lastName,
        email,
        userName,
        password,
        address,
      })
      .then(() => {
        toast.success("Usuario Creado");
        navigate("/");
        handleRegisteredDispatch()
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ese correo electronico ya esta registrado");
      });
  };

  return (
    <>
      <section className="bg-white">
        <Toaster richColors position="top-center" />
        <div className="flex justify-center items-center ">
          <div className="hidden lg:block lg:w-2/5">
            <img
              src={registerImage}
              className="w-[790px] lg:h-[90vh] xl:h-[100vh]"
              alt=""
              style={{ height: "90vh", width: "790px" }}
            />
          </div>
          <div className="flex items-center form-size sm:h-screen lg:h-auto w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                Hazte una cuenta y disfruta de multiples beneficios.
              </h1>

              <p className="mt-4 text-gray-500">
                No compartiremos tu informacion con nadie.
              </p>
              <form
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
                onSubmit={validateForm}
              >
                <div>
                  <label class="block mb-2 text-gray-900  text-xl">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    class="block w-full px-5 py-3 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (containsNumbers(name)) {
                          toast.error("El nombre no puede contener números");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div>
                  <label class="text-xl block mb-2 text-gray-900 ">
                    Apellido
                  </label>
                  <input
                    type="text"
                    placeholder="Snow"
                    class="block w-full px-5 py-3 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (containsNumbers(lastName)) {
                          toast.error("El apellido no puede contener números");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div>
                  <label class="text-xl block mb-2 text-gray-900 ">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    placeholder="John444"
                    class="block w-full px-5 py-3 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label class="text-xl block mb-2 text-gray-900 ">Email</label>
                  <input
                    type="email"
                    placeholder="johnsnow@example.com"
                    class="block w-full px-5 py-3 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (!email.includes("@")) {
                          toast.error(
                            "Debe ingresar un correo electrónico válido"
                          );
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div>
                  <label class="text-xl block mb-2 text-gray-900 ">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Minimo 6 caracteres"
                    class="block w-full px-5 py-3 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (password.length < 6 || !containsNumbers(password)) {
                          toast.error(
                            "La contraseña debe contener al menos 6 caracteres y al menos 1 numero"
                          );
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div>
                  <label class="text-xl block mb-2 text-gray-900 ">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    class="block w-full px-5 py-3 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setPassword2(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (password !== password2) {
                          toast.error(
                            "No coinciden las contraseñas. Intentelo nuevamente"
                          );
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <button class="flex items-center justify-between w-full px-6 py-3 text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  <span>Registrarme </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
