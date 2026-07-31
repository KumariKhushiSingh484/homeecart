import { ShoppingCart } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useShopping } from "../../context/ShoppingContext";

function FloatingCartBar() {
  const {
    cartCount,
    cartSubtotal,
  } = useCart();

  const { openCart } = useShopping();

  if (cartCount === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <button
        onClick={openCart}
        className="
          flex
          w-full
          max-w-md
          items-center
          justify-between
          rounded-2xl
          bg-green-600
          px-5
          py-4
          text-white
          shadow-2xl
          transition-all
          duration-300
          hover:bg-green-700
          active:scale-[0.98]
        "
      >
        <div className="flex items-center gap-3">
          <ShoppingCart size={22} />

          <div className="text-left">
            <p className="text-xs opacity-90">
              {cartCount} Item{cartCount > 1 ? "s" : ""}
            </p>

            <p className="font-bold">
              ₹{cartSubtotal}
            </p>
          </div>
        </div>

        <span className="font-semibold">
          View Cart →
        </span>
      </button>
    </div>
  );
}

export default FloatingCartBar;