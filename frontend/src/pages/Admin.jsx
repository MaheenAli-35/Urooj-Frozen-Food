import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [filter, setFilter] = useState("All");

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

const filteredOrders = orders.filter(
  (order) =>
    filter === "All" ||
    order.status === filter
);

const totalOrders = orders.length;

const pendingOrders = orders.filter(
  (order) => order.status === "Pending"
).length;

const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered"
).length;

const preparingOrders = orders.filter(
  (order) => order.status === "Preparing"
).length;

const outForDeliveryOrders = orders.filter(
  (order) => order.status === "Out For Delivery"
).length;

  return (
    <div className="admin-page">
      <h1 className="admin-title">
  Admin Dashboard
</h1>

      <div className="stats-container">

  <div className="stat-card total-card">
  <h3>Total Orders</h3>
  <p>{totalOrders}</p>
</div>

<div className="stat-card pending-card">
  <h3>Pending</h3>
  <p>{pendingOrders}</p>
</div>

<div className="stat-card delivered-card">
  <h3>Delivered</h3>
  <p>{deliveredOrders}</p>
</div>

<div className="stat-card preparing-card">
  <h3>Preparing</h3>
  <p>{preparingOrders}</p>
</div>

<div className="stat-card delivery-card">
  <h3>Out For Delivery</h3>
  <p>{outForDeliveryOrders}</p>
</div>

</div>

      <div className="filter-buttons">

  <button
    className={
      filter === "All"
        ? "active-filter"
        : ""
    }
    onClick={() => setFilter("All")}
  >
    All
  </button>

  <button
    className={
      filter === "Pending"
        ? "active-filter"
        : ""
    }
    onClick={() => setFilter("Pending")}
  >
    Pending
  </button>

  <button
    className={
      filter === "Preparing"
        ? "active-filter"
        : ""
    }
    onClick={() => setFilter("Preparing")}
  >
    Preparing
  </button>

  <button
    className={
      filter === "Out For Delivery"
        ? "active-filter"
        : ""
    }
    onClick={() =>
      setFilter("Out For Delivery")
    }
  >
    Out For Delivery
  </button>

  <button
    className={
      filter === "Delivered"
        ? "active-filter"
        : ""
    }
    onClick={() => setFilter("Delivered")}
  >
    Delivered
  </button>

</div>

      {filteredOrders.length === 0 ? (
  <p>No orders found.</p>
) : (
  <div className="orders-grid">
    {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="order-card"
          >
            <h3>Order #{order.id}</h3>

              <p className="order-date">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </p>

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
                ))}
      </div>
    )}
    </div>
  );
}

export default Admin;