import React from "react";
import "../index.css";
import { Link, useLocation } from "react-router-dom";

const Card = ({ item }) => {
  const { pathname } = useLocation();
  const path = "/" + pathname.split("/")[1];

  return (path === "/create-product" && item) ||
    (path === "/edit-product" && item.urlImg) ? (
    <>
      <section class="mx-auto w-fit pt-5 pb-5 border p-5 rounded-lg">
        <div class="w-72 h-fit group">
          <div class="relative overflow-hidden">
            <img
              class=" h-80 w-full object-cover"
              src={
                !item.urlImg[0]
                  ? "https://www.fruve.sectechfield.com//media/productImages/imagen-no-disponible.png"
                  : item.urlImg[0]
              }
              alt=""
            />
            <div class="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Link to={`/products/${item.id}`}>
                <button class="bg-black text-white py-2 px-5" disabled>Ver mas</button>
              </Link>
            </div>
          </div>
          <h2 class="mt-3 text-xl capitalize group-hover:underline cursor-pointer text-slate-100">
            {item.name.length > 35 ? item.name.slice(0, 60) + "..." : item.name}
          </h2>
          <p class="text-xl mt-2 ml-1 inline-block">
            ${item.price}
          </p>
        </div>
      </section>
    </>
  ) : (
    <section class="mx-auto w-fit pt-5 pb-5">
      <div class="w-72 h-fit group">
        <div class="relative overflow-hidden">
          <img
            class=" h-80 w-full object-cover"
            src={
              !item.urlImg[0]
                ? "https://www.fruve.sectechfield.com//media/productImages/imagen-no-disponible.png"
                : item.urlImg[0]
            }
            alt=""
          />
          <div class="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to={`/products/${item.id}`}>
              <button class="bg-black text-white py-2 px-5">Ver mas</button>
            </Link>
          </div>
        </div>
        <h2 class="mt-3 text-xl capitalize group-hover:underline cursor-pointer text-slate-100">
          {item.name.length > 35 ? item.name.slice(0, 60) + "..." : item.name}
        </h2>
        <del class="text-red-700 mt-2 text-xl">
          ${item.price - (item.price % 15)}
        </del>
        <p class="text-xl mt-2 ml-1 inline-block"> | </p>
        <p class="text-xl mt-2 ml-1 inline-block text-white"> ${item.price}</p>
      </div>
    </section>
  );
};

export default Card;
