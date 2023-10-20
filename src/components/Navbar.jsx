import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logoRFC from "../assets/[removal.ai]_d49ecfa2-f5d0-4920-a10a-02f5dd4e81fa-retro-football-club-logo-7ed5062e40c8b53c0fc2.png";
import axios from "axios";
import { onSubmitReload } from "../utils/utils.js";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import LoginForm from "./LoginForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ categories }) => {
  const usuario = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [login, setDisplayLogin] = useState(false);

  const handleOpenLogin = () => {
    setDisplayLogin(!login);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchName.length === 0
      ? toast.error("Debes ingresar una búsqueda")
      : navigate(`/search-results?name=${searchName}`);
    setSearchName("");
  };

  const handleLogout = () => {
    axios.post("/api/users/logout").then(() => {
      toast.success("Has cerrado sesión");
      setTimeout(() => {
        navigate("/");
        onSubmitReload();
      }, 1500);
    });
  };

  return (
    <>
      {/* <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#d8d8d8" }}
    >
      <Toaster richColors position="top-center" />
      <div className="container-fluid">
        <Link to={"/"}>
          <img
            className="navbar-brand"
            src={LogoRFC}
            alt="RFC"
            width="70"
            height="80"
          />
        </Link>

        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            className="btn btn-outline-dark"
            type="submit"
            onClick={handleSearch}
          >
            Buscar
          </button>

          <div className="dropdown ml-2">
            <button
              className="btn btn-outline-dark dropdown-toggle"
              type="button"
              id="categoriasDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ marginLeft: "5%" }}
            >
              Categorías
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoriasDropdown">
              {categories[0] ? (
                categories?.map((category, i) => {
                  return (
                    <li key={i}>
                      <Link to={`/categories/${category.type.toLowerCase()}`}>
                        <button className="dropdown-item">
                          {category.type}
                        </button>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li>
                  <p>No hay categorias</p>
                </li>
              )}
              {usuario.isAdmin ? (
                <>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to={"/edit-categories"}>
                      <button className="dropdown-item">
                        Editar Categorias
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </form>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            {usuario.name ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <strong>{usuario.name}</strong>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to={"/cart"}>
                      <button className="dropdown-item">Ver tu carrito</button>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/history"}>
                      <button className="dropdown-item">Compras</button>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/profile"}>
                      <button className="dropdown-item">Perfil</button>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {usuario.isAdmin ? (
                    <li>
                      <Link to={"/create-product"}>
                        <button className="dropdown-item">
                          Crear Producto
                        </button>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Desloguearse
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to={"/login"}>
                  <button type="button" className="btn btn-dark">
                    <strong>Acceder</strong>
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav> */}

      <nav class="bg-white shadow dark:bg-gray-800 z-10">
        <Toaster richColors position="top-center" />
        <div class=" px-6 mx-auto container pt-2 pb-2">
          <div class="lg:flex lg:items-center">
            <div class="flex items-center justify-between ">
              <Link to={"/"}>
                <img class="" src={logoRFC} alt="" width={65} height={45} />
              </Link>
            </div>

            <div class="absolute z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between">
              <div class="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-7 lg:-mx-4 lg:flex-row lg:items-center">
                <a
                  href="#"
                  class="text-lg mt-2  transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:bg-gray-900 p-2 rounded"
                >
                  Inicio
                </a>
                <ul className="flex items-center">
                  <li>
                    <Menu as="div" className="relative inline-block text-left">
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      ></Transition>
                    </Menu>
                  </li>
                  <li>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="">
                          <p
                            href=""
                            className="text-lg mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:bg-gray-900 p-2 rounded"
                          >
                            Categorias ▼
                          </p>
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute mt-2 w- w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                          {categories[0]
                            ? categories.map((category, i) => {
                                return (
                                  <Link
                                    to={`/categories/${category.type.toLowerCase()}`}
                                  >
                                    <div className="py-1" key={i}>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <p
                                            href="#"
                                            className={classNames(
                                              active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                              "block px-4 py-2 text-lg cursor-pointer"
                                            )}
                                          >
                                            {category.type}
                                          </p>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Link>
                                );
                              })
                            : ""}

                          {usuario.isAdmin ? (
                            <>
                              <hr />
                              <Link to={`/edit-categories`}>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <p
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-900",
                                          "block px-4 py-2 text-lg cursor-pointer"
                                        )}
                                      >
                                        Editar/Crear
                                      </p>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Link>
                            </>
                          ) : (
                            ""
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </li>
                </ul>

                <form>
                  <div class="flex">
                    <div class="relative w-full">
                      <input
                        type="search"
                        id="search-dropdown"
                        class="block p-2.5 w-full z-20 text-lg text-gray-900 bg-gray-50 rounded-lg border-none border-l-gray-50 border-l-2 border border-gray-300  dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:text-white "
                        placeholder="Camiseta de River Plate..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        class="absolute top-0 px-5 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSearch}
                      >
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="relative">
                <ul className="flex items-center">
                  {usuario.name ? (
                    <>
                      <Link to={"/cart"}>
                        <li style={{ color: "#fff" }}>
                          <TiShoppingCart className="w-20 h-10 cursor-pointer" />
                        </li>
                      </Link>
                      <li>
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          ></Transition>
                        </Menu>
                      </li>
                      <li>
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className="text-white text-lg">
                              {usuario.name}
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right right-0 absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <p
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-lg cursor-pointer"
                                      )}
                                    >
                                      Ajustes
                                    </p>
                                  )}
                                </Menu.Item>
                                <Link to={"/history"}>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <p
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-lg cursor-pointer"
                                        )}
                                      >
                                        Mis Compras
                                      </p>
                                    )}
                                  </Menu.Item>
                                </Link>
                                {usuario.isAdmin ? (
                                  <Link to={"/create-product"}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <p
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-lg cursor-pointer"
                                          )}
                                        >
                                          Crear Producto
                                        </p>
                                      )}
                                    </Menu.Item>
                                  </Link>
                                ) : (
                                  ""
                                )}
                                <Menu.Item>
                                  {({ active }) => (
                                    <p
                                      onClick={handleLogout}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-lg text-red-500	cursor-pointer"
                                      )}
                                    >
                                      Cerrar Sesion
                                    </p>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button
                        className="text-lg border-b text-white"
                        onClick={handleOpenLogin}
                      >
                        Acceder
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {login ? (
          <LoginForm
            handleOpenLogin={handleOpenLogin}
            setDisplayLogin={setDisplayLogin}
          />
        ) : (
          ""
        )}
      </nav>
    </>
  );
};

export default Navbar;
