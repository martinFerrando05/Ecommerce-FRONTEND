import axios from "axios";
import React, { useState } from "react";
import { onSubmitReload } from "../../utils/utils";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router";

const EditCategories = ({ categories }) => {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(-1);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!newCategory) return toast.error("Debe ingresar una categoria");
    axios
      .post(`/api/categories/create`, {
        type: newCategory,
      })
      .then(() => {
        toast.success("Categoria creada!");
        // onSubmitReload();
        setTimeout(() => {
          onSubmitReload();
        }, 1500);
      });
  };

  const handleDelete = (category) => {
    axios.delete(`/api/categories/${category.id}`).then(() => {
      toast.success("Categoria eliminada!");
      setTimeout(() => {
        onSubmitReload();
      }, 1500);
    });
  };

  const handleEditClick = (index) => {
    setEditingCategoryIndex(index);
    setNewCategory(categories[index].type);
  };

  const handleSaveClick = (category) => {
    axios
      .put(`/api/categories/${category.id}`, {
        type: newCategory,
      })
      .then(() => {
        toast.success("Categoría actualizada!");
        setEditingCategoryIndex(-1);
        setTimeout(() => {
          onSubmitReload();
        }, 1500);
      });
  };

  return (
    <>
      <div
        className="container flex flex-col justify-center items-center pt-10 p-4"
        style={{ margin: "0 auto" }}
      >
        <Toaster richColors position="top-center" />
        <h1
          className="text-5xl text-white font-bold right-0 mb-10"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Categorias
        </h1>

        {/*  */}

        <form className="gap-6 mt-8 sm:w-4/6 sm:p-0 mb-5 w-full p-2" >
          <label
            htmlFor="default-search"
            class="block mb-2 text-white  text-xl"
          >
            Ingresar el nombre de la nueva categoria 
          </label>
          <div class="relative">
            <input
              type="search"
              id="default-search"
              class="block text-sm sm:text-lg w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Camisetas"
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
            <button
              type="submit"
              onClick={() => handleSubmit()}
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  text-sm sm:text-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Añadir 
            </button>
          </div>
        </form>

        <div class="sm:w-4/6 w-full  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"  >
          {categories.map((category, i) => {
            return (
              <div className="flex flex-row border-b border-gray-600 hover:bg-gray-600 items-center">
                {editingCategoryIndex === i ? (
                  <div class="relative w-full m-1">
                    <input
                      type="search"
                      id="default-search"
                      class="block text-lg w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Camisetas"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      onClick={() => {
                        if (!newCategory)
                          return alert("Debe agregar un nombre de categoría");
                        handleSaveClick(category);
                      }}
                      class="text-black absolute right-2.5 bottom-3.5 sm:bottom-2.5 bg-lime-600 focus:ring-4 focus:outline-none  font-medium rounded-lg sm:text-base text-sm lg:text-lg px-4 py-2"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <a
                      href="#"
                      aria-current="true"
                      class="block w-full lg:text-lg sm:text-base text-sm pt-4 pb-4  px-4 py-2 border-gray-200 cursor-pointer hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600  dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white rounded-t-lg"
                    >
                      {category.type}
                    </a>

                    <div class="inline-flex  shadow-sm mx-4">
                      <button
                        class="inline-block p-3 text-white focus:relative"
                        title="Edit Product"
                        onClick={() => handleEditClick(i)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-8 w-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>

                      <button
                        class="inline-block p-3 text-white focus:relative"
                        title="Delete Product"
                        onClick={() => handleDelete(category)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-8 w-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EditCategories;
