import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { sizeSetter } from "../utils/utils";
import { Toaster, toast } from "sonner";
import "../index.css"

const Content = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.user.value);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((response) => setProduct(response.data))
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
    <div>
      <div style={{ marginLeft: "8%" }}>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <Toaster richColors position="top-center" />
      <div style={{ margin: "2% 8%"}}>
      <div><button type="button" class="btn btn-link" onClick={()=>navigate(-1)}>Volver</button></div>
        <div className="row">
          <div className="col-sm-6 mb-3 mb-sm-0 contenedor-imagen-detallada">
            <div className="card" style={{ width: "90%" }}>
              <div className="card-body">
                <div
                  id="carouselExampleIndicators"
                  className="carousel carousel-dark slide"
                >
                  <div className="carousel-inners"></div>
                  <div className="carousel-inner">
                    {product.urlImg?.map((img, i) => {
                      return (
                        <div className="carousel-item active" key={i}>
                          <img src={img} className="d-block w-100" alt="..." height={550}/>
                        </div>
                      );
                    })}
                  </div>
                  {
                   product.urlImg && product.urlImg.length > 1 ? (
                      <>
                      <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Anterior</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Siguiente</span>
                  </button>
                      </>

                    ) : ""
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body" style={{ lineHeight: "2.5" }}>
                <h2 className="card-title" style={{ lineHeight: "inherit" }}>

                  {product.name}
                </h2>
                <h1 className="card-title" style={{ lineHeight: "inherit" }}>
                  {" "}
                  {product.price}$
                </h1>
                <h5 className="card-text" style={{ lineHeight: "1.8" }}>
                  Equipo: {product.team}
                </h5>
                <h5 className="card-text" style={{ lineHeight: "1.8" }}>
                  País: {product.country}
                </h5>
                <h5 className="card-text" style={{ lineHeight: "1.8" }}>
                  Año: {product.year}
                </h5>
                <h5 className="card-text" style={{ lineHeight: "1.8" }}>
                  Talle: {product.size && sizeSetter(product.size)}
                </h5>
                <h5 className="card-text" style={{ lineHeight: "1.8" }}>
                  Stock disponible: {product.stock}
                </h5>
                <h5 className="card-text" style={{ lineHeight: "1.8" }}>
                  {product.description}
                </h5>

                <div className="d-grid gap-2">
                  {usuario.isAdmin ? (
                    <div className="container-buttons">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={handleDeleteProduct}
                      >
                        Eliminar Producto
                      </button>
                      <button
                        className="btn btn-warning"
                        type="button"
                        onClick={() => navigate(`/edit-product/${id}`)}
                      >
                        Editar Producto
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <h5 className="card-text" style={{ lineHeight: "1.8" }}>
                    Cantidad:
                  </h5>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Cantidad"
                    value={quantity}
                    style={{ maxWidth: "10%" }}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                    max={product.stock}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      handleAddToCart(quantity);
                    }}
                    disabled={product.stock === 0 || quantity > product.stock}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
