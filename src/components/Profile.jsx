import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/user";
import { Toaster, toast } from "sonner";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditMode(true);
    setEditedUser(user);
  };

  const handleBackClick = () => {
    setIsEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    axios
      .put(`/api/users/${user.id}`, editedUser)
      .then((response) => {
        dispatch(loginUser(response.data));
        toast.success("El usuario ha sido editado correctamente");
        setIsEditMode(false);
      })
      .catch((error) => {
        toast.error("No se pudo actualizar los datos");
      });
  };

  return (
    <>
      <div>
        <Toaster richColors position="top-center" />

        <div className="w-fit mx-auto py-5 ">
          <h3 className="text-white text-3xl font-medium">
            {user.isAdmin ? "Perfil de Administrador" : "Perfil de Usuario"}
          </h3>
        </div>

        <div className="text-white ">
          {!isEditMode ? (
            <>
              <div className="w-fit mx-auto p-10 text-lg ">
                <p className="pb-2">
                  <strong>Nombre: </strong>
                  {user.name}
                </p>
                <p className="pb-2">
                  <strong>Apellido: </strong>
                  {user.lastName}
                </p>
                <p className="pb-2">
                  <strong>Dirección: </strong>
                  {user.lastName}
                </p>
              </div>
              <div className="w-fit mx-auto">
                <button
                  className="text-white px-5 py-3 rounded-xl bg-blue-700"
                  onClick={handleEditClick}
                >
                  Editar
                </button>
              </div>
            </>
          ) : (
            <div className="w-80 mx-auto">
              <div className="pb-5">
                <label htmlFor="" className="text-lg text-white">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name || ""}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  class="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="pb-5">
                <label htmlFor="" className="text-lg text-white">
                  Apellido:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={editedUser.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                  class="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="" className="text-lg text-white">
                  Dirección:
                </label>
                <input
                  type="text"
                  name="address"
                  value={editedUser.address || ""}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                  class="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="w-fit mx-auto mt-10">
                <button
                  className="text-white px-5 py-3 rounded-xl bg-blue-700"
                  onClick={handleSaveClick}
                >
                  Guardar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
