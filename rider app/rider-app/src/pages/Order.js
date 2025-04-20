// src/pages/Orders.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import Navbar from '../components/Navbar';

function Orders() {
  const [orders, setOrders] = useState([]);
  const riderId = localStorage.getItem('riderId');

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`http://localhost:5000/api/rider/orders/${riderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('riderToken')}`
        }
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, [riderId]);

  return (
    <div>
      <Navbar />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
