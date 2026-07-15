import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const savings =
    Number(product.mrp || 0) - Number(product.sellingPrice || 0);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer overflow-hidden"
    >
      {/* Product Image */}
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-bold text-lg text-center min-h-[56px]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-center mt-3">
          <span className="text-green-600 font-bold text-2xl">
            ₹{product.sellingPrice}
          </span>

          {product.mrp > product.sellingPrice && (
            <span className="line-through text-gray-500 ml-2">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {/* Savings */}
        {savings > 0 && (
          <div className="text-center text-red-500 font-semibold mt-1">
            Save ₹{savings}
          </div>
        )}

        {/* Weight */}
        <div className="text-center text-gray-500 text-sm mt-2">
          {product.weight} {product.unit}
        </div>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation
            addToCart(product);
          }}
          className="mt-5 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;