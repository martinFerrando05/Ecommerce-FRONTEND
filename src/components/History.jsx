import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HistoryItem from "../commons/HistoryItem";
import { Link } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    axios
      .get(`/api/users/${user.id}/history`)
      .then((response) => setHistory(response.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <>
      {/* <div style={{ textAlign: "center", margin: "2%" }}>
      <h1>Tu historal de compras</h1>

      <div className="table-history">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Productos</th>
              <th scope="col">Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((cart, i) => {
              return <HistoryItem cart={cart} i={i} />;
            })}
          </tbody>
        </table>
      </div>

      <div className="contenedor">
        <Link to={"/"}>
          <button type="button" className="btn btn-dark">
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div> */}

      <div className="container pt-20" style={{ margin: "0 auto" }}>
        <h1
          className="text-center text-5xl text-white font-bold right-0 mb-10"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Mi historial de Compras
        </h1>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className=" text-center">
                <th scope="col" class="px-6 py-3">
                  N° de compra
                </th>
                <th scope="col" class="px-6 py-3">
                  Fecha de compra
                </th>
                <th scope="col" class="px-6 py-3">
                  Productos
                </th>
                <th scope="col" class="px-6 py-3">
                  Precio Final
                </th>
              </tr>
            </thead>
            <tbody>
              {history?.map((cart, i) => {
                return <HistoryItem cart={cart} i={i} />;
              })}
            </tbody>
          </table>
        </div>

        <div className="flex w-full justify-center mt-10">
          <Link to={"/"}>
            <button type="button" className="btn btn-dark">
              Volver al Inicio
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default History;
