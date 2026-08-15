import { useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  console.log(location.state);

  const {
    orderId,
    customer,
    items,
    total,
  } = location.state || {};

  return (
<div className="success-page">
<h1>✅ Order Placed Successfully</h1>
<h2>
  Order Number: #{orderId}
</h2>
<h2>Customer Details</h2>
<p>
<strong>Name:</strong> {customer?.name}
</p>
<p>
<strong>Phone:</strong> {customer?.phone}
</p>
<p>
<strong>Address:</strong> {customer?.address}
</p>
<p>
<strong>Area:</strong> {customer?.area}
</p>
<h2>Order Summary</h2>
{items?.map((item) => (
<div key={item.id}>
<p>
{item.name} × {item.quantity}
</p>
</div>
))}
<h3>Total: Rs {total}</h3>
<h3>Status: Pending</h3>
</div>
);
}
export default OrderSuccess;