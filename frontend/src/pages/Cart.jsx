import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No products added.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>

              <h3>{item.name}</h3>

              <p>{item.pack}</p>

              <p>Rs {item.price}</p>

              <div>
                <button onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>

                <span> {item.quantity} </span>

                <button onClick={() => increaseQuantity(item.id)}>
                  +
                </button>
              </div>

              <p>
                Subtotal: Rs {item.price * item.quantity}
              </p>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>

            </div>
          ))}

          <h2>Total: Rs {total}</h2>
          <Link
              to="/checkout"
              className="checkout-link"
            >
              Proceed To Checkout
            </Link>
        </>
      )}
    </div>
  );
}

export default Cart;