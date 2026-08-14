import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

function Products() {
  const {
    addToCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const renderProductCard = (product) => (
    <div className="product-card" key={product.id}>
      <div className="image-placeholder">
        Image Here
      </div>

      <h3>{product.name}</h3>

      <p>{product.pack}</p>

      <p>Rs {product.price}</p>

      {cartItems.find((item) => item.id === product.id) ? (
        <div className="quantity-controls">
          <button
            onClick={() => decreaseQuantity(product.id)}
          >
            -
          </button>

          <span>
            {
              cartItems.find(
                (item) => item.id === product.id
              ).quantity
            }
          </span>

          <button
            onClick={() => increaseQuantity(product.id)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      )}
    </div>
  );

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <h2 className="category-heading">
        Samosa & Rolls
      </h2>

      <div className="products-grid">
        {products
          .filter(
            (product) =>
              product.category === "Samosa & Rolls"
          )
          .map(renderProductCard)}
      </div>

      <h2 className="category-heading">
        Kabab & Cutlets
      </h2>

      <div className="products-grid">
        {products
          .filter(
            (product) =>
              product.category === "Kabab & Cutlets"
          )
          .map(renderProductCard)}
      </div>

      <h2 className="category-heading">
        Fries
      </h2>

      <div className="products-grid">
        {products
          .filter(
            (product) =>
              product.category === "Fries"
          )
          .map(renderProductCard)}
      </div>

      <h2 className="category-heading">
        Kofta & Nuggets
      </h2>

      <div className="products-grid">
        {products
          .filter(
            (product) =>
              product.category === "Kofta & Nuggets"
          )
          .map(renderProductCard)}
      </div>

      <h2 className="category-heading">
        Other Items
      </h2>

      <div className="products-grid">
        {products
          .filter(
            (product) =>
              product.category === "Other Items"
          )
          .map(renderProductCard)}
      </div>
    </div>
  );
}

export default Products;