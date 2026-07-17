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

  return (
    <Card
      hover
      padding="none"
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-3xl
      "
    >
      {/* Clickable Area */}

      <div
        onClick={() =>
          navigate(`/product/${product.id}`)
        }
        className="cursor-pointer"
      >
        {/* Top Badges */}

        <div className="absolute left-3 top-3 z-10">

          {discount > 0 && (
            <Badge variant="success">
              {discount}% OFF
            </Badge>
          )}

        </div>

        {/* Wishlist Placeholder */}

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
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white
            shadow
            transition
            hover:bg-gray-100
          "
        >
          <Heart
            size={18}
            className="text-gray-500"
          />
        </button>

        {/* Image */}

        <div
          className="
            flex
            h-40
            items-center
            justify-center
            bg-white
            p-5
          "
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
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
                rounded-2xl
                bg-gray-100
                text-gray-400
              "
            >
              No Image
            </div>
          )}
        </div>

        {/* Content */}

        <div className="space-y-3 p-4">

          {/* Product Name */}

          <h3
            className="
              min-h-[44px]
              line-clamp-2
              text-sm
              font-semibold
              text-gray-900
            "
          >
            {product.name}
          </h3>

          {/* Weight */}

          <div>

            <span
              className="
                rounded-full
                bg-gray-100
                px-3
                py-1
                text-xs
                font-medium
                text-gray-600
              "
            >
              {product.weight} {product.unit}
            </span>

          </div>

          {/* Price */}

          <div>

            <div className="flex items-center gap-2">

              <span
                className="
                  text-2xl
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
                  mt-1
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

      {/* Quantity */}

      <div className="px-4 pb-4">

        <QuantitySelector
          product={product}
        />

      </div>

    </Card>
  );
}

export default ProductCard;