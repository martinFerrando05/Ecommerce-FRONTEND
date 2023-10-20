import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { sizeSetter } from "../utils/utils";
import { Toaster, toast } from "sonner";
import "../index.css";

const Content = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.user.value);

  const [amount, setAmount] = useState(1);
  const [activeImg, setActiveImage] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setActiveImage(response.data.urlImg[0]);
      })

      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (quantity) => {
    if (quantity > product.stock) {
      toast.error("No hay suficiente stock disponible.");
    } else {
      axios
        .post(`/api/cart/${product.id}`, { quantity })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/");
        })
        .catch(() => {
          toast.error("No se registró un usuario logueado");
          navigate("/login");
        });
    }
  };

  const handleDeleteProduct = () => {
    axios
      .delete(`/api/products/admin/${id}`)
      .then(() => {
        toast.success("Producto eliminado correctamente");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Ha ocurrido un problema. El producto no pudo ser eliminado. Intentelo de nuevo."
        );
      });
  };

  return (
    <>
      <div className="w-[60%] m-auto mt-10 pt-11">
        <Toaster richColors position="top-center" />
        <div className="flex flex-col justify-between lg:flex-row gap-16 ">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover"
            />
            <div className="flex flex-row h-24">
              {product.urlImg &&
                product.urlImg.map((img, i) => {
                  return (
                    <img
                      src={img}
                      key={i}
                      alt=""
                      className="w-24 h-24 mr-4 rounded-md cursor-pointer"
                      onClick={() => setActiveImage(img)}
                    />
                  );
                })}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-gray-200 font-semibold">Retro FC</span>
              <h1 className="text-4xl text-white font-bold pt-3">
                {product.name}
              </h1>
            </div>
            <p className=" text-slate-300 text-lg pt-3">
              {product.description}
            </p>
            <span className=" text-gray-200 font-semibold">
              Disponible en talle {product.size && sizeSetter(product.size)}
            </span>

            <h6 className="text-3xl font-semibold text-white">
              $ {product.price}
            </h6>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className={`bg-gray-200 py-2 px-5 rounded-lg text-blue-500 text-3xl ${
                    quantity <= 1 && "bg-gray-400 transition-all"
                  }`}
                  onClick={() => {
                    setQuantity(parseInt(quantity - 1));
                  }}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="py-4 px-6 text-xl rounded-lg">{quantity}</span>
                <button
                  className={`bg-gray-200 py-2 px-4 rounded-lg text-blue-500 text-3xl ${
                    quantity >= product.stock && "bg-gray-400 transition-all"
                  }`}
                  onClick={() => {
                    setQuantity(parseInt(quantity + 1));
                  }}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button
                className={`bg-blue-500 text-white font-semibold py-3 px-16 rounded-xl h-full ${
                  quantity >= product.stock && "bg-blue-700 transition-all"
                }`}
                onClick={() => {
                  handleAddToCart(quantity);
                }}
                disabled={quantity >= product.stock}
              >
                Añadir al carrito
              </button>
            </div>
            {usuario.isAdmin && (
              <div className="flex flex-col gap-3 w-[85%]">
                <button
                  className={`bg-amber-400 text-black font-semibold py-3 px-16 rounded-xl h-full`}
                  onClick={() => navigate(`/edit-product/${id}`)}
                >
                  Editar Producto
                </button>
                <button
                  className={`bg-red-600 text-white font-semibold py-3 px-16 rounded-xl h-full`}
                  onClick={handleDeleteProduct}
                >
                  Eliminar Producto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
