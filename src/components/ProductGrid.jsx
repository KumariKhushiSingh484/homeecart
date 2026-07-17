import ProductCard from "./ProductCard";
import EmptyState from "./ui/EmptyState";
import SectionHeader from "./ui/SectionHeader";

function ProductGrid({
  title = "",
  products = [],
  filteredProducts,
}) {
  const displayProducts =
    filteredProducts ?? products;

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-6">

      {/* Optional Header */}

      {title && (
        <SectionHeader
          title={title}
          subtitle={`${displayProducts.length} Products`}
        />
      )}

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
            gap-3

            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            2xl:grid-cols-7
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