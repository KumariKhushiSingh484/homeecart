import ProductCard from "./ProductCard";

import EmptyState from "./ui/EmptyState";

import SectionHeader from "./ui/SectionHeader";

function ProductGrid({
  title = "Products",
  products = [],
  filteredProducts,
}) {
  const displayProducts =
    filteredProducts ?? products;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">

      <SectionHeader
        title={title}
        subtitle={`${displayProducts.length} Products`}
      />

      {displayProducts.length === 0 ? (
        <EmptyState
          icon="🛒"
          title="No Products Found"
          description="Try another category or search."
        />
      ) : (
        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default ProductGrid;