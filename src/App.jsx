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
import HeroCarousel from "./components/HeroCarousel";
import { useCart } from "./context/CartContext";
function App() {
  const [products, setProducts] = useState([]);
  
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const {
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
  toast,
  setToast,
} = useCart();

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
  setShowCart={setShowCart}
  logo={logo}
/>
<CartToast
  toast={toast}
  setToast={setToast}
  setShowCart={setShowCart}
/>
      {/* Search */}
     {/* <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/> */}

      {/* Offer Banner */}
    <HeroCarousel />
      {/* Categories */}
      <Categories />

      {/* Products */}
<ProductGrid
  filteredProducts={filteredProducts}
  addToCart={addToCart}
/>
<CartModal
  showCart={showCart}
  setShowCart={setShowCart}
  setShowCheckout={setShowCheckout}
  cartItems={cartItems}
  addToCart={addToCart}
  removeFromCart={removeFromCart}
/>
{/* Cart Items */}
<OrderSuccessModal
  orderPlaced={orderPlaced}
  placedOrder={placedOrder}
  generateInvoice={() => generateInvoice(placedOrder)}
  clearCart={clearCart}
  setShowCart={setShowCart}
  setOrderPlaced={setOrderPlaced}
/>
      {/* Footer */}
     {showCheckout && (
  <Checkout
    showCheckout={showCheckout}
    setShowCheckout={setShowCheckout}
    cartItems={cartItems}
    clearCart={clearCart}
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