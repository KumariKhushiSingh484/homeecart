import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartToast from "../components/CartToast";
import CartModal from "../components/CartModal";
import Checkout from "../pages/Checkout";
import OrderSuccessModal from "../components/OrderSuccessModal";

import logo from "../assets/logo.png";

import { useCart } from "../context/CartContext";

function CustomerLayout({ children }) {
  const {
    toast,
    setToast,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Global Navigation */}
      <Navbar logo={logo} />

      {/* Global Toast */}
      <CartToast
        toast={toast}
        setToast={setToast}
      />

      {/* Global Shopping Flow */}
      <CartModal />

      <Checkout />

      <OrderSuccessModal />

      {/* Current Page */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default CustomerLayout;