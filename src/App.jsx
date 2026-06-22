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
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const addToCart = (product) => {
  const existingItem = cartItems.find(
    (item) => item.name === product.name
  );

  if (existingItem) {
    setCartItems(
      cartItems.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    setCartItems([
      ...cartItems,
      { ...product, quantity: 1 },
    ]);
  }

  setToast(product);

setTimeout(() => {
  setToast(null);
}, 3000);
};
 const removeFromCart = (index) => {
  const updatedCart = [...cartItems];

  if (updatedCart[index].quantity > 1) {
    updatedCart[index].quantity -= 1;
    setCartItems([...updatedCart]);
  } else {
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  }
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
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

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
{toast && (
  <div className="fixed top-5 right-5 bg-white p-4 rounded-xl shadow-2xl z-50 w-80 animate-pulse">

    <div className="flex justify-between items-center">

      <div className="flex gap-3 items-center">

  <img
    src={toast.image}
    alt={toast.name}
    className="w-16 h-16 object-contain"
  />

  <div className="flex-1">
    <p className="font-bold text-green-600">
      ✓ {toast.name} added to cart
    </p>

    <button
      onClick={() => {
        setShowCart(true);
        setToast(null);
      }}
      className="text-green-600 font-semibold mt-1"
    >
      View Cart →
    </button>
  </div>

  <button
    onClick={() => setToast(null)}
    className="text-gray-500 text-xl"
  >
    ✕
  </button>

</div>

      <button
        onClick={() => setToast(null)}
        className="text-gray-500 text-xl"
      >
        ✕
      </button>

    </div>

  </div>
)}
      {/* Search */}
      <div className="p-5">
       <input
  type="text"
  placeholder="Search groceries..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
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
         {filteredProducts.length === 0 ? (
  <h2 className="col-span-3 text-center text-red-500 text-2xl">
    No products found 😢
  </h2>
) : (
  filteredProducts.map((product) => (
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
  addToCart(product)
}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
                    ))
)}
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
  ₹{item.price} × {item.quantity}
</p>
              </div>

              <div className="flex gap-2">
  <button
    onClick={() => removeFromCart(index)}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    -
  </button>

  <span className="font-bold">
    {item.quantity}
  </span>

  <button
    onClick={() => addToCart(item)}
    className="bg-green-500 text-white px-3 py-1 rounded"
  >
    +
  </button>
</div>
            </div>
          ))}

          <div className="mt-4 border-t pt-4">

  <div className="flex justify-between">
    <span>Subtotal</span>

    <span>
      ₹
      {cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )}
    </span>
  </div>

  <div className="flex justify-between mt-2">
    <span>Delivery</span>

    <span>
      {cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) >= 500 ? (
        <span className="text-green-600 font-bold">
          FREE 🎉
        </span>
      ) : (
        "₹40"
      )}
    </span>
  </div>

  <div className="flex justify-between mt-4 text-2xl font-bold">
    <span>Total</span>

    <span>
      ₹
      {cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) +
        (cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) >= 500
          ? 0
          : 40)}
    </span>
  </div>

</div>
<button
  onClick={() => setOrderPlaced(true)}
  className="w-full bg-green-600 text-white py-3 rounded-xl mt-5 text-lg font-bold hover:bg-green-700"
>
  Place Order
</button>
        </>
      )}
    </div>
  </div>
)}
{orderPlaced && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-2xl text-center w-96">

      <h2 className="text-3xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h2>

      <p className="mt-4 text-lg">
        🚴 Delivery in 10 minutes
      </p>

      <p className="mt-2 text-gray-500">
        Thank you for shopping with HomeEcart ❤️
      </p>

      <button
        onClick={() => {
          setCartItems([]);
          setShowCart(false);
          setOrderPlaced(false);
        }}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
      >
        Continue Shopping
      </button>

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