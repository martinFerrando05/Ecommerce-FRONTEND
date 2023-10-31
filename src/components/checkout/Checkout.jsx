import React, { useEffect, useState } from "react";
import logoRFC from "../../assets/Retro Football Club Logo.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { containsNumbers, containsLetters } from "../../utils/utils";
import { Toaster, toast } from "sonner";

const Checkout = () => {
  const [cartId, setCartId] = useState("");
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryStreets, setDeliveryStreets] = useState("");
  const [deliveryZipCode, setDeliveryZipCode] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [reciever, setReciever] = useState("");
  const [cardCompany, setCardCompany] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [cardName, setCardName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((response) => {
        setCartId(response.data.cart.id);
        setCartProducts(response.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckout = () => {
    axios
      .put(`/api/cart/${cartId}`, {
        deliveryAddress,
        deliveryStreets, 
        deliveryZipCode,
        deliveryCity,
        reciever,
        cardCompany,
        cardNumber,
        cardCode,
        cardName,
        phoneNumber,
        completed: true,
      })
      .then(() => {
        toast.success("Tu compra fue realizada con éxito. Revisa tu email.");
        setTimeout(() => {
          navigate("/history");
        }, 1500);
      })
      .catch((err) => {
        toast.error("No se pudo realizar la compra");
        console.log(err);
      });

    if (cartProducts.length > 0) {
      cartProducts.map((product) => {
        const prodId = product.id;

        const remainingStock = {
          stock: product.stock - product.cart_products.quantity,
        };

        axios
          .put(`/api/products/${prodId}`, remainingStock)
          .then((response) => console.log("RESPUESTA", response))
          .catch((error) => {
            alert(error);
          });
      });
    }
  };

  return (
    <>
      <section class="bg-white lg:h-screen">
        <div class="lg:flex lg:h-full lg:w-full lg:justify-around" >
          <section class="relative lg:flex flex-grow items-center justify-center bg-gray-900  xl:col-span-6 hidden">
            <img
              alt="Night"
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/71559988612153.5ddbe6a085156.jpg"
              class="absolute inset-0 h-full w-full object-cover opacity-80 "
            />

            <div class=" lg:relative flex flex-col justify-center items-center  lg:p-12">
              <a class="block text-white" href="/">
                <span class="sr-only"></span>
                <img
                  src={logoRFC}
                  alt=""
                  width={180}
                  height={100}
                  className="rounded-full"
                />
              </a>

              <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Ya casi es tuyo ⚽
              </h2>

              <p class="mt-4 leading-relaxed text-white/90 text-lg w-5/6 text-center">
                De parte del equipo de Retro Futbol Club, queremos agradecerte
                por confiar en nosotros.
              </p>
            </div>
          </section>

          <main class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7  xl:col-span-6 flex-grow" style={{border:"1px solid yellow"}}>
            <div class="max-w-xl ">
              <div class="relative lg:-mt-16 block ">
                <h1 class="mt-2 text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Formulario de Pago
                </h1>
                <p className="text-zinc-600">
                  No compartiremos tu informacion con nadie.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheckout();
                }}
                action="#"
                class="mt-8 grid grid-cols-6 gap-6"
              >
                <div class="col-span-6 sm:col-span-3">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Direccion
                  </label>
                  <input
                    type="text"
                    placeholder="Calle Real 433"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
                    required
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (!containsNumbers(e.target.value)) {
                          toast.error("La dirección no es válida");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Entre Calles
                  </label>
                  <input
                    type="text"
                    placeholder="Mariano Moreno y Alvear"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setDeliveryStreets(e.target.value)}
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    placeholder="Buenos Aires"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setDeliveryCity(e.target.value)}
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Codigo Postal
                  </label>
                  <input
                    type="number"
                    placeholder="1614"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setDeliveryZipCode(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (
                          e.target.value.length !== 4 ||
                          containsLetters(e.target.value)
                        ) {
                          toast.error("El código postal no es válido");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div class="col-span-6">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Nombre completo de quien recibe el producto
                  </label>
                  <input
                    type="text"
                    placeholder="Gustavo Hernan Martinelli"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setReciever(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (containsNumbers(e.target.value)) {
                          toast.error("El nombre no puede contener números");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div class="col-span-6">
                  <hr />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="HeadlineAct"
                    class="block mb-2 text-gray-900 font-medium text-lg"
                  >
                    Tarjeta
                  </label>

                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    class="block w-full px-2 py-[10px] mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onClick={(e) => setCardCompany(e.target.id)}
                  >
                    <option value="AA">Mastercard</option>
                    <option value="JM" selected>
                      Visa
                    </option>
                    <option value="SRV">Plus</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Numero de Tarjeta (Sin espacios)
                  </label>
                  <input
                    type="number"
                    placeholder="55554444333322225555"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setCardNumber(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (
                          e.target.value.length !== 16 ||
                          containsLetters(e.target.value)
                        ) {
                          toast.error("El n° de tarjeta no es válido");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Numero de telefono (Sin espacios)
                  </label>
                  <input
                    type="number"
                    placeholder="1140404040"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (
                          e.target.value.length !== 10 ||
                          containsLetters(e.target.value)
                        ) {
                          toast.error("El número de celular no es válida");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block mb-2 text-gray-900 font-medium text-lg">
                    Codigo de seguridad
                  </label>
                  <input
                    type="number"
                    placeholder="435"
                    class="block w-full px-5 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-500  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    onChange={(e) => setCardCode(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value) {
                        if (
                          e.target.value.length !== 3 ||
                          containsLetters(e.target.value)
                        ) {
                          toast.error("El código de seguridad no es válido");
                          return (e.target.value = "");
                        }
                      }
                    }}
                  />
                </div>

                <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button type="submit" class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 w-full lg:auto">
                    Finalizar Compra
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Checkout;
