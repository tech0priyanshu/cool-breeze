import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, products, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  const delivery_fee = 150;

  // Flatten cart items into an array with product + size + quantity
  const itemsInCart = [];

  for (const productId in cartItems) {
    const product = products.find((p) => p._id === productId);
    if (!product) continue;

    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        itemsInCart.push({ ...product, size, quantity });
      }
    }
  }

  const getSubtotal = () => {
    return itemsInCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const totalAmount = getSubtotal() + delivery_fee;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {itemsInCart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 flex-grow">
            {itemsInCart.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price * item.quantity}</p>
                <div className="mt-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold border-b pb-3 mb-4">
              CART TOTAL
            </h2>
            <div className="flex justify-between mb-2">
              <span>Sub Total</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Fee</span>
              <span>₹{delivery_fee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <button
             onClick={() => navigate('/place-order')}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
