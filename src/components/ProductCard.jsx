import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Badge from "./ui/Badge";
import Card from "./ui/Card";
import QuantitySelector from "./cart/QuantitySelector";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const sellingPrice = Number(product.sellingPrice || 0);
  const mrp = Number(product.mrp || 0);

  const discount =
    mrp > sellingPrice
      ? Math.round(
          ((mrp - sellingPrice) / mrp) * 100
        )
      : 0;

  const savings =
    mrp > sellingPrice
      ? mrp - sellingPrice
      : 0;

  const inStock =
    Number(product.stock || 0) > 0;

  return (
    <Card
      hover
      padding="none"
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        transition-all
        duration-300
      "
    >
      {/* Clickable Area */}

      <div
        onClick={() =>
          navigate(`/product/${product.id}`)
        }
        className="cursor-pointer"
      >
        {/* Discount Badge */}

        <div className="absolute left-3 top-3 z-10">
          {discount > 0 && (
            <Badge variant="success">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist */}

        <button
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow
            backdrop-blur
            transition
            hover:bg-white
          "
        >
          <Heart
            size={17}
            className="text-gray-500"
          />
        </button>

        {/* Product Image */}

        <div
          className="
            flex
            h-32
            items-center
            justify-center
            bg-white
            p-4
          "
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="
                h-full
                w-full
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                rounded-xl
                bg-gray-100
                text-sm
                text-gray-400
              "
            >
              No Image
            </div>
          )}
        </div>

        {/* Content */}

        <div className="space-y-2 p-3">
          {/* Name */}

          <h3
            className="
              min-h-[38px]
              line-clamp-2
              text-sm
              font-semibold
              leading-5
              text-gray-900
            "
          >
            {product.name}
          </h3>

          {/* Weight */}

          <span
            className="
              inline-block
              rounded-full
              bg-gray-100
              px-2
              py-0.5
              text-[11px]
              font-medium
              text-gray-600
            "
          >
            {product.weight} {product.unit}
          </span>

          {/* Price */}

          <div>
            <div className="flex items-center gap-2">
              <span
                className="
                  text-xl
                  font-bold
                  text-green-700
                "
              >
                ₹{sellingPrice}
              </span>

              {mrp > sellingPrice && (
                <span
                  className="
                    text-sm
                    text-gray-400
                    line-through
                  "
                >
                  ₹{mrp}
                </span>
              )}
            </div>

            {savings > 0 && (
              <p
                className="
                  text-xs
                  font-medium
                  text-green-600
                "
              >
                Save ₹{savings}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action */}

      <div className="px-3 pb-3">
        {inStock ? (
          <QuantitySelector
            product={product}
          />
        ) : (
          <div
            className="
              rounded-lg
              bg-red-50
              py-2
              text-center
              text-sm
              font-semibold
              text-red-600
            "
          >
            Out of Stock
          </div>
        )}
      </div>
    </Card>
  );
}

export default ProductCard;