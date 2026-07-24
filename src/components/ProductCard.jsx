import { Heart, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Badge from "./ui/Badge";
import Card from "./ui/Card";
import QuantitySelector from "./cart/QuantitySelector";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const sellingPrice = Number(product.sellingPrice || 0);
  const mrp = Number(product.mrp || 0);
  const pv = Number(product.pv || 0);
  const stock = Number(product.stock || 0);

  const inStock = stock > 0;

  const discount =
    mrp > sellingPrice
      ? Math.round(
          ((mrp - sellingPrice) / mrp) * 100
        )
      : 0;
return (
  <Card
    hover
    padding="none"
    className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-gray-100
      bg-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
  >
          {/* Clickable Area */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="flex h-full cursor-pointer flex-col"
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute left-3 top-3 z-20">
            <Badge
              variant="success"
              className="px-2 py-0.5 text-[10px] font-semibold"
            >
              {discount}% OFF
            </Badge>
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="
            absolute
            right-3
            top-3
            z-20
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-sm
            transition-all
            duration-200
            hover:scale-105
            hover:shadow-md
          "
        >
          <Heart
            size={16}
            className="text-gray-500" />
        </button>

       {/* Product Image */}
<div
  className="
    aspect-square
    w-full
    overflow-hidden
    bg-white
    p-3
  "
>
  {product.image ? (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="
  h-full
  w-full
  object-cover
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
        flex-col
        items-center
        justify-center
        rounded-xl
        bg-gray-50
        text-gray-400
      "
    >
      <Package
        size={48}
        strokeWidth={1.5}
      />

      <span className="mt-2 text-xs">
        No Image Available
      </span>
    </div>
  )}
</div>
        {/* Content */}
        <div className="flex flex-col px-4 pb-4">
          {/* Product Name */}
          <h3
  className="
    mt-2
    line-clamp-2
    text-[15px]
    font-semibold
    leading-5
    text-gray-900
  "
>
            {product.name}
          </h3>

          {/* Weight + MRP */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {product.weight} {product.unit}
            </span>

            {mrp > sellingPrice && (
              <span className="text-xs font-medium text-gray-400 line-through">
                ₹{mrp}
              </span>
            )}
          </div>

          {/* Selling Price + PV */}
          <div className="mt-1 flex items-center justify-between">
            <span
              className="
                text-xl
                font-bold
                tracking-tight
                text-gray-900
              "
            >
              ₹{sellingPrice}
            </span>

            {pv > 0 && (
              <span
                className="
                  text-sm
                  font-semibold
                  text-green-600
                "
              >
                PV ₹{pv}
              </span>
            )}
          </div>

          {/* Add Button */}
          <div className="mt-4">
            {inStock ? (
              <QuantitySelector
                product={product}
                size="sm"
              />
            ) : (
              <div
                className="
                  rounded-lg
                  bg-red-50
                  py-2
                  text-center
                  text-xs
                  font-semibold
                  text-red-600
                "
              >
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;