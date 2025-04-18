import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <p><strong>ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status || 'Pending'}</p>
            <p><strong>Items:</strong></p>
            <ul className="pl-6 list-disc">
              {Array.isArray(order.items) ? (
                order.items.map((item, idx) => (
                  <li key={idx}>{item.name} - {currency(item.price)} × {item.quantity}</li>
                ))
              ) : (
                <li>No items found</li>
              )}
            </ul>
            <p><strong>Total:</strong> {currency(order.totalAmount)}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Shipping Info:</strong> {order.shippingInfo?.name} ({order.shippingInfo?.email})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
