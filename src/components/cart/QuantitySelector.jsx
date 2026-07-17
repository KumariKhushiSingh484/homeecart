import { Minus, Plus } from "lucide-react";

import { useCart } from "../../context/CartContext";

import Button from "../ui/Button";

function QuantitySelector({
  product,
  size = "md",
}) {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getProductQuantity,
  } = useCart();

  const quantity = getProductQuantity(product.id);

  // Inventory
  const stock = product.stock ?? Infinity;

  // Business Rule
  const maximumOrderQuantity =
    product.maximumOrderQuantity ?? 10;

  // Customer cannot exceed either stock or configured limit
  const effectiveMaxQuantity = Math.min(
    stock,
    maximumOrderQuantity
  );

  const isOutOfStock = stock <= 0;

  const isMaxReached =
    quantity >= effectiveMaxQuantity;

  const sizeClasses = {
    sm: {
      button: "h-9 text-sm",
      icon: 16,
    },
    md: {
      button: "h-10",
      icon: 18,
    },
    lg: {
      button: "h-12 text-lg",
      icon: 20,
    },
  };

  const currentSize =
    sizeClasses[size] || sizeClasses.md;

  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="secondary"
        className={`w-full ${currentSize.button}`}
      >
        Out of Stock
      </Button>
    );
  }

  if (quantity === 0) {
    return (
      <Button
        className={`w-full ${currentSize.button}`}
        onClick={(event) => {
          event.stopPropagation();
          addToCart(product);
        }}
      >
        + ADD
      </Button>
    );
  }

  return (
    <div
      onClick={(event) =>
        event.stopPropagation()
      }
      className="
        flex
        h-10
        items-center
        justify-between
        rounded-full
        border
        border-green-600
        bg-green-50
        px-2
      "
    >
      <button
        onClick={() =>
          decreaseQuantity(product.id)
        }
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          text-green-700
          transition
          hover:bg-green-100
        "
      >
        <Minus size={currentSize.icon} />
      </button>

      <span className="font-bold text-green-700">
        {quantity}
      </span>

      <button
        disabled={isMaxReached}
        onClick={() =>
          increaseQuantity(product.id)
        }
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          text-green-700
          transition
          hover:bg-green-100
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Plus size={currentSize.icon} />
      </button>
    </div>
  );
}

export default QuantitySelector;