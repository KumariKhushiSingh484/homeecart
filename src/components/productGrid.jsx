import ProductCard from "./ProductCard";

function ProductGrid({
  title = "Products",
  products = [],
  filteredProducts,
  addToCart,
}) {
  // Support both old and new architecture
  const displayProducts = filteredProducts ?? products;
  console.log("products:", products);
console.log("filteredProducts:", filteredProducts);
console.log("displayProducts:", displayProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {title}
      </h2>

      {displayProducts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <p className="text-xl text-gray-500">
            No products found 😢
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;