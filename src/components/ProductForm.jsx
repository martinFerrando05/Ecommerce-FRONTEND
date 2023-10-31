import React, { useEffect, useState } from "react";
import "../index.css";
import Card from "../commons/Card";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import { Toaster, toast } from "sonner";

const initialProductInfo = {
  urlImg: "",
  name: "",
  description: "",
  size: "",
  country: "",
  team: "",
  year: "",
  categoryId: "",
  stock: "",
  price: "",
};

const ProductForm = () => {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(initialProductInfo);
  // useParams
  const { id } = useParams();
  let { pathname } = useLocation();
  const path = "/" + pathname.split("/")[1];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (path === "/edit-product") {
      axios.get(`/api/products/${id}`).then((res) => {
        setProductInfo(res.data);
      });
    } else {
      setProductInfo(initialProductInfo);
    }

    axios.get("/api/categories").then((res) => setCategories(res.data));
  }, [path, id]);

  const sizesArray = (value) => {
    const sizes = value.split(",");
    const sizesToUppercase = sizes.map((el) => el.toUpperCase().trim());
    return sizesToUppercase;
  };

  const urlsArray = (value) => {
    const images = value.split(",");
    const imagesTrimmed = images.map((el) => el.trim());
    return imagesTrimmed;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "size") {
      const sizesArrayValue = sizesArray(value);
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        [name]: sizesArrayValue,
      }));
    } else if (name === "urlImg") {
      const urlsArrayValue = urlsArray(value);
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        [name]: urlsArrayValue,
      }));
    } else {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (path === "/edit-product") {
      axios
        .put(`/api/products/admin/${id}`, productInfo)
        .then(() => {
          toast.success("Cambios hechos correctamente");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Algo salió mal, intentalo de nuevo");
        });
    } else {
      axios
        .post("/api/products/create", productInfo)
        .then(() => {
          toast.success("Producto creado");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Ha ocurrido un problema. No se pudo crear el producto");
        });
    }
  };

  return (
    <>
      <div>
        <button type="button" class="btn btn-link" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <div className=" flex lg:flex-row lg:items-center flex-col-reverse lg:p-12 lg:justify-around " >
        <Toaster richColors position="top-center" />
        <div className="contenedor-crear-producto p-4">
          <form onSubmit={handleSubmit}>
            {Object.keys(initialProductInfo).map((key, i) => (
              <div key={i} className="py-4">
                <label htmlFor={key} className="text-lg text-slate-200">
                  {key === "size"
                    ? "Talles:"
                    : key === "urlImg"
                    ? "Url de Imagenes:"
                    : key === "price"
                    ? "Precio:"
                    : key === "name"
                    ? "Titulo:"
                    : key === "description"
                    ? "Descripcion:"
                    : key === "team"
                    ? "Equipo:"
                    : key === "country"
                    ? "Pais:"
                    : key === "year"
                    ? "Año:"
                    : key === "stock"
                    ? "Stock:"
                    : key === "categoryId"
                    ? "Categoria:"
                    : ""}
                </label>

                {key === "urlImg" ? (
                  <textarea
                    id={key}
                    cols="30"
                    rows="5"
                    name={key}
                    onChange={handleInputChange}
                    value={productInfo[key]}
                    class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                    placeholder="http://urlimagen/img.jpg,http://urlimagen/img2.jpg"
                    required
                  ></textarea>
                ) : key === "categoryId" ? (
                  <div class="input-group mb-3">
                    <select
                      onChange={handleInputChange}
                      name={key}
                      style={{borderRadius:"8px"}}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="inputGroupSelect02"
                      required
                    >
                      <option selected></option>
                      {categories?.map((el) => {
                        return <option value={el.id}>{el.type}</option>;
                      })}
                    </select>
                  </div>
                ) : (
                  <input
                    type={
                      key === "price"
                        ? "number"
                        : key === "year"
                        ? "number"
                        : key === "stock"
                        ? "number"
                        : "text"
                    }
                    id={key}
                    name={key}
                    value={productInfo[key]}
                    onChange={handleInputChange}
                    required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Ej: ${
                      key === "size"
                        ? "XS, S, M, L, XL"
                        : key === "price"
                        ? "2500"
                        : key === "name"
                        ? "Camiseta de la Seleccion Brasilera"
                        : key === "description"
                        ? "La camiseta que se uso para el mundial 2002, sin duda una de las mas iconicas"
                        : key === "team"
                        ? "Seleccion Brasilera de Futbol"
                        : key === "country"
                        ? "Brasil"
                        : key === "year"
                        ? "2002"
                        : key === "stock"
                        ? "150"
                        : key === "categoryId"
                        ? "2"
                        : ""
                    }`}
                  ></input>
                )}
                {key === "size" ? (
                  <small className="text-slate-200">
                    <strong>SEPARAR CADA TALLE CON COMAS</strong>
                  </small>
                ) : key === "urlImg" ? (
                  <small className="text-slate-200">
                    <strong>SEPARAR CADA URL CON COMAS</strong>
                  </small>
                ) : (
                  ""
                )}
              </div>
            ))}
            <button type="submit" className="btn btn-dark my-5 w-full lg:w-auto text-white">
              {path === "/edit-product"
                ? "Actualizar Producto"
                : "Agregar producto"}
            </button>
          </form>
        </div>
       
          <Card item={productInfo} />
      </div>
    </>
  );
};

export default ProductForm;
