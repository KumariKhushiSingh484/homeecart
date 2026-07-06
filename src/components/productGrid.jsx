import ProductCard from "./ProductCard";

function ProductGrid({ filteredProducts, addToCart }) {
  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">
        Featured Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.length === 0 ? (
          <h2 className="col-span-3 text-center text-red-500 text-2xl">
            No products found 😢
          </h2>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductGrid;