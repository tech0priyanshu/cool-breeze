import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched orders:", data); // ✅ See structure of `items`
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 mb-4 rounded-md shadow-sm bg-white"
          >
            <h3 className="font-bold mb-2">Order ID: {order._id}</h3>
            <p className="mb-1">
              <span className="font-semibold">Payment:</span>{" "}
              {order.shippingInfo?.paymentMethod}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  order.shippingInfo?.status === "Placed"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {order.shippingInfo?.status}
              </span>
            </p>
            <ul className="list-disc ml-5 mb-2">
              {Object.values(order.items || {}).map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500">
              Created: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
