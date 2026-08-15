import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
  .from("orders")
  .select(`
    *,
    customers (
      name,
      phone,
      address,
      area
        )
        `)
  .order("created_at", { ascending: false });

  console.log("DAT*:", data);
  console.log("ERROR:", error);

    if (error) {
      console.error(error);
    } else {
      setOrders(data);
    }
  }

  useEffect(() => {
  fetchOrderItems();
}, []);

async function fetchOrderItems() {
  const { data, error } = await supabase
    .from("order_items")
    .select("*");

  if (error) {
    console.error(error);
  } else {
    setOrderItems(data);
  }
}

  async function updateStatus(orderId, newStatus) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status: newStatus,
    })
    .eq("id", orderId)
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(JSON.stringify(error, null, 2));
  } else {
    fetchOrders();
  }
}

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="order-card"
          >
            <h3>Order #{order.id}</h3>

            <p>
              Total: Rs {order.total_amount}
            </p>

            <p>
                Status:

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Preparing">
                    Preparing
                  </option>

                  <option value="Out For Delivery">
                    Out For Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </p>

            <p>
              Customer: {order.customers?.name}
            </p>

            <p>
              Phone: {order.customers?.phone}
            </p>

            <p>
              Address: {order.customers?.address}
            </p>

            <p>
              Area: {order.customers?.area}
            </p>
            <h4>Products Ordered</h4>
                {orderItems
                  .filter(
                    (item) =>
                      item.order_id === order.id
                  )
                  .map((item) => (
                    <div key={item.id}>
                      <p>
                        {item.product_name} × {item.quantity}
                      </p>

                      <p>
                        Rs {item.unit_price}
                      </p>
                    </div>
                ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;