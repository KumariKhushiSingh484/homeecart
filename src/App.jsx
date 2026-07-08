//import { logoBase64 } from "./logoBase64";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import logo from "./assets/logo.png";
import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";
import CartModal from "./components/CartModal";
import OrderSuccessModal from "./components/OrderSuccessModal";
import CartToast from "./components/CartToast";
import OfferBanner from "./components/OfferBanner";
import Footer from "./components/Footer";
import { generateInvoice } from "./utils/invoice/generateInvoice";
import { generateOrderNumber } from "./utils/order/generateOrderNumber";
import AdminLogin from "./pages/AdminLogin";
function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("Selected Category:", selectedCategory);
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productList);
      console.log(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);
  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);
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
  "Atta & Rice",
  "Tea & Coffee",
  "Snacks",
  "Beverages",
  "Personal Care",
  "Household",
];
  
  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
//return <Login />;
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar
  cartItems={cartItems}
  setShowCart={setShowCart}
  logo={logo}
/>
<CartToast
  toast={toast}
  setToast={setToast}
  setShowCart={setShowCart}
/>
      {/* Search */}
     <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

      {/* Offer Banner */}
    <OfferBanner />
      {/* Categories */}
      <Categories
  categories={categories}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>

      {/* Products */}
<ProductGrid
  filteredProducts={filteredProducts}
  addToCart={addToCart}
/>
<CartModal
  showCart={showCart}
  setShowCart={setShowCart}
  cartItems={cartItems}
  addToCart={addToCart}
  removeFromCart={removeFromCart}
/>
{/* Cart Items */}
<OrderSuccessModal
  orderPlaced={orderPlaced}
  placedOrder={placedOrder}
  generateInvoice={() => generateInvoice(placedOrder)}
  setCartItems={setCartItems}
  setShowCart={setShowCart}
  setOrderPlaced={setOrderPlaced}
/>
      {/* Footer */}
      {!showCart && cartItems.length > 0 && (
 <Checkout
  cartItems={cartItems}
  setCartItems={setCartItems}
  setOrderPlaced={setOrderPlaced}
  setOrderNumber={setOrderNumber}
  setPlacedOrder={setPlacedOrder}
/>
)}
      <Footer />
    </div>
  );
}

export default App;