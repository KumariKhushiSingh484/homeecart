import { useState } from "react";

import logo from "./assets/logo.png";

import atta from "./assets/products/aata.jpg";
import tea from "./assets/products/tea.jpg";
import maggi from "./assets/products/maggi.jpg";
import oil from "./assets/products/oil.jpg";
import parleg from "./assets/products/parleg.jpg";
import surf from "./assets/products/surf.jpg";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const removeFromCart = (index) => {
  const updatedCart = [...cartItems];
  updatedCart.splice(index, 1);
  setCartItems(updatedCart);
};

  const categories = [
    "Atta & Rice 🌾",
    "Tea & Coffee ☕",
    "Snacks 🍪",
    "Beverages 🥤",
    "Personal Care 🧴",
    "Household 🏠",
  ];

  const products = [
    {
      name: "Aashirvaad Atta",
      image: atta,
      price: 249,
      mrp: 299,
      discount: "17% OFF",
    },
    {
      name: "Tata Tea Premium",
      image: tea,
      price: 145,
      mrp: 180,
      discount: "20% OFF",
    },
    {
      name: "Maggi",
      image: maggi,
      price: 14,
      mrp: 18,
      discount: "22% OFF",
    },
    {
      name: "Fortune Oil",
      image: oil,
      price: 159,
      mrp: 190,
      discount: "16% OFF",
    },
    {
      name: "Parle-G",
      image: parleg,
      price: 10,
      mrp: 12,
      discount: "17% OFF",
    },
    {
      name: "Surf Excel",
      image: surf,
      price: 225,
      mrp: 275,
      discount: "18% OFF",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <header className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="HomeEcart"
              className="w-16 h-16 rounded"
            />

            <div>
              <h1 className="text-3xl font-bold">
                HomeEcart
              </h1>

              <p className="text-sm">
                📍 Dehri-On-Sone
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold">
              👤 Login
            </button>

            <button
  onClick={() => setShowCart(true)}
  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
>
  🛒 Cart ({cartItems.length})
</button>
          </div>

        </div>
      </header>

      {/* Search */}
      <div className="p-5">
        <input
          type="text"
          placeholder="Search groceries..."
          className="w-full p-4 rounded-xl border bg-white"
        />
      </div>

      {/* Offer Banner */}
      <div className="mx-5 bg-green-500 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold">
          Special Offer 🎉
        </h2>

        <p className="mt-2">
          Get exciting discounts on daily essentials.
        </p>
      </div>

      {/* Categories */}
      <div className="p-5">
        <h2 className="text-3xl font-bold mb-5">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="p-5">
        <h2 className="text-3xl font-bold mb-5">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "contain",
                }}
              />

              <h3 className="font-bold text-lg text-center mt-3">
                {product.name}
              </h3>

              <div className="text-center mt-3">
                <span className="text-green-600 font-bold text-xl">
                  ₹{product.price}
                </span>

                <span className="line-through text-gray-500 ml-2">
                  ₹{product.mrp}
                </span>
              </div>

              <div className="text-center mt-2 text-red-500 font-semibold">
                {product.discount}
              </div>

              <button
               onClick={() =>
  setCartItems([...cartItems, product])
}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
{/* Cart Items */}

{showCart && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Shopping Cart
        </h2>

        <button
          onClick={() => setShowCart(false)}
          className="text-red-500 font-bold"
        >
          ✖
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border-b py-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.name}
                </p>

                <p>
                  ₹{item.price}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4 text-xl font-bold">
            Total: ₹
            {cartItems.reduce(
              (total, item) => total + item.price,
              0
            )}
          </div>
        </>
      )}
    </div>
  </div>
)}
      {/* Footer */}
      <footer className="bg-green-600 text-white text-center p-4 mt-10">
        © 2026 HomeEcart | Sabse Sasta Nahi To Paise Wapas
      </footer>

    </div>
  );
}

export default App;