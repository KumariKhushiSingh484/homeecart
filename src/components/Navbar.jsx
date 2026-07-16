import Logo from "./navbar/Logo";
import SearchBar from "./navbar/SearchBar";
import CartButton from "./navbar/CartButton";
import AccountMenu from "./navbar/AccountMenu";

import { useCart } from "../context/CartContext";
import { useCustomer } from "../context/CustomerContext";
import { useShopping } from "../context/ShoppingContext";

function Navbar({ logo }) {
  const { cartCount } = useCart();

  const { openCart } = useShopping();

  const {
    customer,
    loadingCustomer,
  } = useCustomer();

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-200
        bg-white/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          gap-6
          px-5
        "
      >
        {/* Logo */}

        <Logo logo={logo} />

        {/* Search */}

        <SearchBar />

        {/* Right Side */}

        <div className="ml-auto flex items-center gap-4">

          <AccountMenu
            customer={customer}
            loadingCustomer={loadingCustomer}
          />

          <CartButton
            cartCount={cartCount}
            onClick={openCart}
          />

        </div>
      </div>
    </header>
  );
}

export default Navbar;