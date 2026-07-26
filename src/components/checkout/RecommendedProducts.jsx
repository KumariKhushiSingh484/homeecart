function RecommendedProducts({
  products = [],
  addToCart,
  showToast,
  remainingPV,
}) {
  if (!products.length) return null;

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">
        🛍 Customers also add these
      </h3>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
           <div className="h-16 w-16 overflow-hidden rounded-lg border bg-gray-100">
  {product.image ? (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-2xl">
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

                <p className="text-sm text-gray-500">
                  ₹{product.sellingPrice}
                </p>

                <p className="text-sm font-medium text-green-700">
                  {product.pv} PV
                </p>
                <p className="mt-1 text-xs text-orange-600">
  {remainingPV - product.pv > 0
    ? `Need only ${remainingPV - product.pv} PV after adding`
    : "🎉 Checkout unlocked"}
</p>
              </div>
            </div>

           <button
  onClick={() => {
  addToCart(product);

  showToast(
    "success",
    `${product.name} added to cart`
  );
}}
  className="..."
>
  ➕ Add to Cart
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedProducts;