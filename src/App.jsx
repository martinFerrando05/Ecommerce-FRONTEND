import React from "react";
import { Route, Routes, useLocation } from "react-router";
import Grid from "./commons/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";
import LoginForm from "./components/login/LoginForm";
import { loginUser } from "./redux/user";
import { useDispatch } from "react-redux";
import Content from "./components/productDetails/Content";
import Cart from "./components/Cart";
import SearchResults from "./components/SearchResults";
import History from "./components/History";
import Checkout from "./components/checkout/Checkout";
import ProductForm from "./components/ProductForm";
import EditCategories from "./components/category/EditCategories";
import Categories from "./components/Categories";
import Profile from "./components/Profile";
import Carousel from "./components/carousel/Carousel";
import ProtectedUrl from "./commons/ProtectedUrl";


function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    axios
      .get("/api/users/me", { withCredentials: true })
      .then((user) => {
        dispatch(loginUser(user.data.payload));
      })
      .catch((err) => console.error(err));

    axios.get("/api/products").then((response) => setProducts(response.data));
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get(`/api/categories`)
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);

  const isSearchResultsPage = location.pathname === "/search-results";

  return (
    <div>
      <Navbar categories={categories} />
      <div className=" ">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <Grid
                  items={products}
                  title={
                    isSearchResultsPage
                      ? "Resultados de la búsqueda"
                      : "¡TODOS NUESTROS PRODUCTOS!"
                  }
                />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<Content />} />
          <Route
            path="/create-product"
            element={
              <ProtectedUrl>
                <ProductForm />
              </ProtectedUrl>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedUrl>
                <ProductForm />
              </ProtectedUrl>
            }
          />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/categories/:type" element={<Categories />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/edit-categories"
            element={
              <ProtectedUrl>
                <EditCategories categories={categories} />
              </ProtectedUrl>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
