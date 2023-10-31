import React, { useState } from "react";
import logoRFC from "../../assets/[removal.ai]_d49ecfa2-f5d0-4920-a10a-02f5dd4e81fa-retro-football-club-logo-7ed5062e40c8b53c0fc2.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import "./navbar.css";
import {
  MdDensityMedium,
  MdOutlineSearch,
  MdClose,
  MdPersonOutline,
} from "react-icons/md"; // OpenMenu y Lupa
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { onSubmitReload } from "../../utils/utils";
import { Link } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import { registeredUser } from "../../redux/registered";
import { cartOpened } from "../../redux/openCart";
import Cart from "../Cart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ categories }) => {
  const usuario = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [sidebar, showSidebar] = useState(false);
  const isRegistered = useSelector(
    (store) => store.registered.value.isRegistered
  );
  const openCart = useSelector((store) => store.openCart.value.isOpen);
  const dispatch = useDispatch();

  const handleRegisteredDispatch = () => {
    dispatch(registeredUser(!isRegistered));
  };

  const handleDisplayCartDispatch = () => {
    dispatch(cartOpened(!openCart));
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

  const handleShowSidebar = () => {
    showSidebar(!sidebar);
  };

  return (
    <>
      <nav className="bg-gray-800 z-10 shadow">
        <div className="px-6 mx-auto sm:container pt-2 pb-2">
          <Toaster richColors position="top-center" />
          <div class="flex">
            <div class="flex items-center justify-between w-28">
              <Link to={"/"}>
                {" "}
                <img class="" src={logoRFC} alt="" width={65} height={45} />
              </Link>
            </div>

            <div className="lg:flex flex justify-between items-center w-full">
              <div className="">
                <div class="flex searchSection items-center text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-7 lg:-mx-4 lg:flex-row w-[120%] gap-1">
                  <Link to={"/"}>
                    <p
                      href="#"
                      class="text-lg mt-2 sm:mt-0  transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:bg-gray-900 p-2 rounded"
                    >
                      Inicio
                    </p>
                  </Link>
                  <ul className="flex items-center">
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
                          <Menu.Button className="">
                            <p
                              href=""
                              className="text-lg mt-2 sm:mt-0 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:bg-gray-900 p-2 rounded "
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
                          <Menu.Items className="origin-top-right z-10 absolute mt-2 w- w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
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
                            {usuario && usuario.isAdmin ? (
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
                    <div class="flex items-center">
                      <div class="relative w-full sm:w-44 lg:w-full">
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
              </div>

              {/* Carrito y Nombre */}
              <div class="relative">
                <ul className="flex items-center">
                  {usuario && usuario.name && (
                    <li style={{ color: "#fff" }}>
                      <TiShoppingCart
                        className="sm:w-20 sm:h-10 w-10 h-8 cursor-pointer"
                        onClick={handleDisplayCartDispatch}
                      />
                    </li>
                  )}
                  <li>
                    <Menu as="div" className="relative inline-block text-left ">
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
                      className="relative inline-block text-left z-10"
                    >
                      <div>
                        {usuario && usuario.name ? (
                          <Menu.Button className="text-white text-lg pl-1 h-16 mr-3 cursor-pointer">
                            <MdPersonOutline className="sm:w-10 sm:h-10 w-8 h-8 cursor-pointer" />
                          </Menu.Button>
                        ) : (
                          <button
                            className="text-lg border-b text-white mb-1 mr-3"
                            onClick={handleRegisteredDispatch}
                          >
                            Acceder
                          </button>
                        )}
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
                            <Link to={"/profile"}>
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
                            </Link>
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
                            {usuario && usuario.isAdmin ? (
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
                  <li className="hidden openMenu" onClick={handleShowSidebar}>
                    <MdDensityMedium className="sm:w-8 sm:ml-2 sm:h-10 w-7 h-8 cursor-pointer fill-white" />
                  </li>
                  <li>
                    <button>{/* ACCEDER */}</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR*/}
        {sidebar && (
          <ul className="fixed w-full bg-gray-900 p-2 z-10">
            <li
              onClick={handleShowSidebar}
              className="py-3 w-full flex justify-end px-4"
            >
              <MdClose className="w-10 h-8 cursor-pointer fill-slate-50" />
            </li>
            <li className="px-3 mt-2 py-3 mb-2">
              <form onSubmit={handleSearch}>
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
            </li>
            <Link to={"/"}>
              <li
                onClick={handleShowSidebar}
                className="py-3 w-full px-6 hover:bg-slate-800 mb-2 cursor-pointer hover:rounded-lg"
              >
                Inicio
              </li>
            </Link>
            <ul className="flex items-center">
              <li className="py-3 w-full px-6 hover:bg-slate-800 mb-2 cursor-pointer hover:rounded-lg">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button>Categorias ▼</Menu.Button>
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
                    <Menu.Items className="origin-top-right z-10 absolute mt-2 w- menu rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      {categories[0]
                        ? categories.map((category, i) => {
                            return (
                              <Link
                                to={`/categories/${category.type.toLowerCase()}`}
                              >
                                <div
                                  className="py-1"
                                  key={i}
                                  onClick={handleShowSidebar}
                                >
                                  <Menu.Item>
                                    {({ active }) => (
                                      <p
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-base lg:text-lg cursor-pointer"
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
                            <div className="py-1" onClick={handleShowSidebar}>
                              <Menu.Item>
                                {({ active }) => (
                                  <p
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-900",
                                      "block px-4 py-2 cursor-pointer text-base lg:text-lg"
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
          </ul>
        )}
        {isRegistered && <LoginForm />}
        {openCart && <Cart />}
      </nav>
    </>
  );
};

export default Navbar;
