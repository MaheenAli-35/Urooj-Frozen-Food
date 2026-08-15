import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Checkout() {

  const { cartItems, clearCart } = useContext(CartContext);

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    address: "",
    area: "",
    notes: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Save Customer
    const { data: customerData, error: customerError } =
      await supabase
        .from("customers")
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            address: formData.address,
            area: formData.area,
            notes: formData.notes,
          },
        ])
        .select();

    if (customerError) throw customerError;

    const customerId = customerData[0].id;

    // Save Order
    const { data: orderData, error: orderError } =
      await supabase
        .from("orders")
        .insert([
          {
            customer_id: customerId,
            total_amount: total,
            status: "Pending",
          },
        ])
        .select();

    if (orderError) throw orderError;

    const orderId = orderData[0].id;

    // Save Order Items
    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: orderItemsError } =
      await supabase
        .from("order_items")
        .insert(orderItems);

    if (orderItemsError) throw orderItemsError;

    const successData = {
      orderId,
          customer: formData,
          items: cartItems,
          total,
        };

        navigate("/order-success", {
          state: successData,
        });

         clearCart();

  } catch (error) {
  console.error("FULL ERROR:", error);

  alert(
    error?.message ||
    JSON.stringify(error, null, 2)
  );
}
};

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="whatsapp"
          placeholder="WhatsApp Number"
          value={formData.whatsapp}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Special Instructions"
          value={formData.notes}
          onChange={handleChange}
        />

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <p key={item.id}>
              {item.name} x {item.quantity}
            </p>
          ))}

          <h3>Total: Rs {total}</h3>
        </div>

        <button type="submit">
          Place Order
        </button>

      </form>
    </div>
  );
}

export default Checkout;