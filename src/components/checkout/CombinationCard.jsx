function CombinationCard({
  products = [],
  addToCart,
  showToast,
}) {
  if (!products.length) return null;

  const totalPV = products.reduce(
    (sum, product) => sum + Number(product.pv || 0),
    0
  );

  const handleAddAll = () => {
    products.forEach((product) => {
      addToCart(product);
    });

    showToast(
      "success",
      "Recommended combination added to cart."
    );
  };

  return (
    <div
      className="
        mt-5
        rounded-2xl
        border
        border-green-200
        bg-green-50
        p-5
      "
    >
      <h3 className="text-lg font-bold text-green-800">
        ⭐ Best Combination
      </h3>

      <p className="mt-1 text-sm text-green-700">
        Add these together to reach your
        purchase target faster.
      </p>

      <div className="mt-5 space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-white
              p-3
              shadow-sm
            "
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-lg border bg-gray-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    📦
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold">
                  {product.name}
                </h4>

                <p className="text-xs text-gray-500">
                  {product.weight} {product.unit}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹{product.sellingPrice}
              </p>

              <p className="text-sm text-green-700">
                {product.pv} PV
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          rounded-xl
          bg-white
          p-4
        "
      >
        <span className="font-semibold">
          Total PV
        </span>

        <span className="text-xl font-bold text-green-700">
          {totalPV}
        </span>
      </div>

      <button
        onClick={handleAddAll}
        className="
          mt-5
          w-full
          rounded-xl
          bg-green-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-green-700
        "
      >
        🛒 Add Both to Cart
      </button>
    </div>
  );
}

export default CombinationCard;