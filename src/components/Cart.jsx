import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [noProductsMessage, setNoProductsMessage] = useState(false);
  const navigate = useNavigate()

  const axiosData = async () => {
    try {
      const response = await axios.get("/api/cart");
      response["data"]["items"].sort((a, b) => a["id"] - b["id"]);
      setTotalPrice(response.data.cart.total);
      setCartItems(response.data.items);
    } catch (error) {
      toast.error("Tu carrito esta vacío");
    }
  };

  useEffect(() => {
    axiosData();
  }, []);

  const handleDeleteFromCart = async (id) => {
    await axios.delete(`/api/cart/${id}`);
    axiosData();
  };

  const handleAddToCart = async (id) => {
    await axios.post(`/api/cart/${id}`);
    axiosData();
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setNoProductsMessage(true);
    } else {
      setNoProductsMessage(false);
    }
  }, [cartItems]);

  return (
    <>
      {/* <div style={{ textAlign: "center", margin: "2%" }}>
        <h1>Carrito de compras</h1>
      </div>
      <div className="carrito">
        <Toaster richColors position="top-center" />
        <div className="list-group" style={{ width: "40%" }}>
          {cartItems?.map((item, i) => (
            <div style={{ borderBottom: "1px solid white" }} key={i}>
              <div className="list-group-item list-group-item-action active">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{item.name}</h5>
                  <p>${item.price}</p>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => {
                      if (item.cart_products.quantity < item.stock) {
                        handleAddToCart(item.id);
                      }
                    }}
                    disabled={item.cart_products.quantity >= item.stock}
                  >
                    ➕
                  </button>
                </div>
                <p className="mb-1">{item.description}</p>
                <small>Cantidad: {item.cart_products.quantity}</small>
                <br />

                <div className="d-flex w-100 justify-content-between">
                  <small>Stock disponible: {item.stock}</small>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      padding: "10px 0px 10px 0px",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        handleDeleteFromCart(item.id);
                      }}
                    >
                      ➖
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {noProductsMessage ? (
          <div className="contenedor-pagar">
            <h1>No tienes productos en el carrito.</h1>
            <Link to={"/"}>
              <button
                type="button"
                className="btn btn-dark"
                style={{ marginTop: "10%" }}
              >
                Volver al inicio
              </button>
            </Link>
          </div>
        ) : (
          <div className="contenedor-pagar">
            <h1>El total a pagar por tus productos es de:</h1>
            <h1 style={{ marginTop: "10%" }}>${totalPrice}</h1>
            {cartItems.length ? (
              <>
              <Link to={"/checkout"}>
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ marginTop: "10%" }}
                >
                  Ir a Pagar
                </button>
              </Link>
              <Link to={"/"}>
              <button
                type="button"
                className="btn btn-dark"
                style={{ marginTop: "10%" }}
              >
                Volver al inicio
              </button>
            </Link>
            </>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ marginTop: "10%" }}
                  disabled
                >
                  Ir a Pagar
                </button>
                <p className="mt-3">
                  Primero debes agregar productos al carrito.
                </p>
              </div>
            )}
          </div>
        )}
      </div> */}
      <div
        className="w-full h-full flex flex-col items-center container justify-center pt-28 pb-28"
        style={{ margin: "0 auto" }}
      >
        <Toaster richColors position="top-center" />
        <h1 className="text-5xl text-white font-bold right-0 mb-10">
          Mi carrito de Compras
        </h1>
        <div className="w-4/6">
          <p className="mb-3 text-white">PRODUCTOS</p>
          <hr />
        </div>
        <br className=" bg-white" />

        {cartItems?.map((item, i) => {
          return (
            <div
              className="bg-white w-4/6 mb-1 mt-2 rounded-lg flex flex-wrap"
              key={i}
            >
              <img src={item.urlImg[0]} alt="" width={180} height={8} />
              <div className="flex flex-col">
                <h4 className="text-black text-xl pt-1 font-bold">
                  {item.name}
                </h4>
                <p className="text-black">{item.description}</p>
                <div className="flex flex-row items-start mt-20">
                  <button
                    className="bg-gray-200 py-2 px-5 rounded-lg text-blue-500 text-3xl"
                    onClick={() => {
                      handleDeleteFromCart(item.id);
                    }}
                  >
                    -
                  </button>
                  <span className="py-4 px-6 text-xl text-black rounded-lg">
                    {item.cart_products.quantity}
                  </span>
                  <button
                    className="bg-gray-200 py-2 px-4 rounded-lg text-blue-500 text-3xl"
                    onClick={() => {
                      if (item.cart_products.quantity < item.stock) {
                        handleAddToCart(item.id);
                      }
                    }}
                    disabled={item.cart_products.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="w-4/6 h-[180px] mt-7 bg-gray-400 flex flex-col items-center pl-40 pr-40 justify-center">
          <div className="w-full flex flex-col">
            <div className="flex justify-between w-full text-zinc-700">
              <h3>Costo de envio</h3>
              <p>$500</p>
            </div>
            <div className="flex justify-between w-full text-zinc-700">
              <h3>Impuestos</h3>
              <p>$225</p>
            </div>
            <div className="flex justify-between w-full text-black text-xl">
              <h3>Total</h3>
              <p>${parseInt(totalPrice) + 500 + 225}</p>
            </div>
          </div>
          <hr className="w-full mb-3 mt-3" />
          <button
            onClick={()=> navigate("/checkout")}
            class="flex items-center justify-center w-full px-6 py-3 text-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-black hover:bg-zinc-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            <span>Realizar Compra </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
