import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { dateSetter } from "../utils/utils";

const HistoryItem = ({ cart, i }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/cart/${cart.id}`)
      .then((result) => result.data)
      .then((data) => {
        setCartProducts(data);
      })
      .catch((err) => console.log(err));
  }, [cart]);

  return (
    <tr
      key={cart.id}

      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
    >
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xl"
      >
        {i + 1}
      </th>
      <td class="px-6 py-4 text-lg">{dateSetter(cart.createdAt)}</td>
      <td class="px-6 py-4">
        <ul className="text-base">
          {cartProducts?.map((item) => {
            return (
              <li style={{ width: "50%", margin: "0 auto" }} key={cart.id}>
                {item.name} (x{item.cart_products.quantity})
              </li>
            );
          })}
        </ul>
      </td>
      <td class="px-6 py-4 text-xl text-slate-300">${cart.total}</td>
    </tr>
  );
};

export default HistoryItem;
