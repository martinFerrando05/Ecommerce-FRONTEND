import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { cartOpened } from "../redux/openCart";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [noProductsMessage, setNoProductsMessage] = useState(false);
  const navigate = useNavigate();
  const openCart = useSelector((store) => store.openCart.value.isOpen);
  const dispatch = useDispatch();

  console.log(cartItems);

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

  const handleDisplayCartDispatch = () => {
    dispatch(cartOpened(!openCart));
  };

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
      {/* <div
        className="w-full h-full flex mx-auto flex-col items-center container justify-center pt-28 pb-28"
        style={{border:"1px solid red"}}
      >
        <Toaster richColors position="top-center" />
        <h1 className="text-3xl lg:text-5xl text-white font-bold right-0 mb-10">
          Mi carrito de Compras
        </h1>
        <div className="w-full  sm:w-4/6">
          <p className="mb-3 text-white">PRODUCTOS</p>
          <hr />
        </div>
        <br className=" bg-white" />

        {cartItems?.map((item, i) => {
          return (
            <div
              className="bg-white  sm:w-4/6 mb-1 mt-2 rounded-lg flex sm:flex-wrap"
              key={i}
            >
              <img src={item.urlImg[0]} alt="" className="w-[100px] h-[40%] lg:w-[180px] lg:h-[100%]" />
              <div className="flex flex-col">
                <h4 className="text-black text-lg lg:text-xl pt-1 font-bold">
                  {item.name}
                </h4>
                <p className="text-black hidden sm:block">{item.description}</p>
                <div className="flex flex-row items-start mt-2 sm:mt-20" style={{border:"1px solid red"}}>
                  <button
                    className="bg-gray-200 text-lg px-4 py-1 sm:py-2 sm:px-5 rounded-lg text-blue-500 sm:text-3xl"
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
                    className="bg-gray-200 text-lg px-4 py-1 sm:py-2 sm:px-5 rounded-lg text-blue-500 sm:text-3xl"
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
      </div> */}
      <div
        class="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
              <div class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full w-full flex-col overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6 bg-gray-800 text-white">
                    <div class="flex items-start justify-between">
                      <h2 class="text-lg font-medium " id="slide-over-title">
                        Mi carrito
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-white hover:text-gray-500"
                          onClick={handleDisplayCartDispatch}
                        >
                          <span class="absolute -inset-0.5"></span>
                          <span class="sr-only">Close panel</span>
                          <svg
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          {!cartItems.length && (
                            <div className="w-fit mx-auto">
                              <h3 className="text-2xl mt-3 font-semibold">
                                Agrega productos a tu carrito.
                              </h3>
                            </div>
                          )}
                          {cartItems?.map((item) => {
                            return (
                              <li class="flex py-6 ">
                                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.urlImg[0]}
                                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                    class="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div class="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <Link to={"/products/" + item.id}>
                                      <div class="flex justify-between text-base font-medium  ">
                                        <h3 className="border-b ">
                                          <a href="#">{item.name}</a>
                                        </h3>
                                        <p class="ml-4">${item.price}</p>
                                      </div>
                                    </Link>
                                    <p class="mt-1 text-sm ">{item.team}</p>
                                  </div>
                                  <div class="flex flex-1 items-end justify-between  text-sm">
                                    <p class="">
                                      Cntd: {item.cart_products.quantity}
                                    </p>

                                    <div class="flex">
                                      <button
                                        type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => {
                                          handleDeleteFromCart(item.id);
                                        }}
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-900 text-white">
                    <div class="flex justify-between text-base font-medium ">
                      <p>TOTAL</p>
                      <p>${totalPrice}</p>
                    </div>
                    <p class="mt-0.5 text-sm ">Envio gratis</p>
                    <div class="mt-6">
                      <Link to={"/checkout"}>
                        <button
                          href="#"
                          class="flex items-center justify-center w-full  border border-transparent bg-blue-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-800 "
                          disabled={cartItems.length == 0}
                        >
                          Ir a Pagar
                        </button>
                      </Link>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm ">
                      <p>
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={handleDisplayCartDispatch}
                        >
                          Seguir comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
