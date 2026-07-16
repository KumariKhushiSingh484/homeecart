import { ShoppingCart } from "lucide-react";

function CartButton({
  cartCount = 0,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        relative
        flex
        items-center
        gap-2
        rounded-2xl
        border
        border-green-600
        bg-white
        px-4
        py-2.5
        text-green-700
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-green-50
        hover:shadow-md
      "
    >
      <ShoppingCart size={20} />

      <span className="hidden font-semibold sm:block">
        Cart
      </span>

      {cartCount > 0 && (
        <span
          className="
            absolute
            -right-2
            -top-2
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-xs
            font-bold
            text-white
            ring-2
            ring-white
          "
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>
  );
}

export default CartButton;