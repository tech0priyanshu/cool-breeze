// src/components/OrderCard.jsx
import axios from 'axios';

function OrderCard({ order }) {
  const updateStatus = async (status) => {
    await axios.put(`http://localhost:5000/api/rider/order-status/${order._id}`, {
      status
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('riderToken')}`
      }
    });
    window.location.reload();
  };

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">Order #{order._id}</h3>
      <p><strong>Customer:</strong> {order.customerName}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <div className="mt-3 space-x-2">
        <button onClick={() => updateStatus('Delivered')} className="bg-green-500 text-white px-2 py-1 rounded">Delivered</button>
        <button onClick={() => updateStatus('Undelivered')} className="bg-yellow-500 text-white px-2 py-1 rounded">Undelivered</button>
      </div>
    </div>
  );
}

export default OrderCard;
