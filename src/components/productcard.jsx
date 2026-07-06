function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
        }}
      />

      <h3 className="font-bold text-sm md:text-lg text-center mt-3">
        {product.name}
      </h3>

      <div className="text-center mt-3">
        <span className="text-green-600 font-bold text-lg md:text-xl">
          ₹{product.price}
        </span>

        <span className="line-through text-gray-500 ml-2">
          ₹{product.mrp}
        </span>
      </div>

      <div className="text-center mt-2 text-red-500 font-semibold">
        {product.discount}
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;