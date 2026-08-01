import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { SlidersHorizontal } from "lucide-react";

import { db } from "../services/firebase";
import { useCart } from "../context/CartContext";

import ProductGrid from "../components/ProductGrid";
import { useSearch } from "../context/SearchContext";
function CategoryProducts() {
  const { categoryName } = useParams();
  const { addToCart } = useCart();

  const category = decodeURIComponent(categoryName);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchTerm, setSearchTerm } = useSearch();
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
  async function loadProducts() {
    setLoading(true);

    try {
      const snapshot = await getDocs(
        collection(db, "products")
      );

      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(
        allProducts.filter(
          (product) => product.category === category
        )
      );
    } catch (error) {
      console.error(
        "Failed to load category products:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  loadProducts();
}, [category]);

// Clear search when entering a new category
useEffect(() => {
  setSearchTerm("");
}, [category, setSearchTerm]);

  const filteredProducts = useMemo(() => {
  let filtered = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            Number(a.sellingPrice) -
            Number(b.sellingPrice)
        );
        break;

      case "price-high":
        filtered.sort(
          (a, b) =>
            Number(b.sellingPrice) -
            Number(a.sellingPrice)
        );
        break;

      case "name":
        filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Back */}

      <Link
        to="/"
        className="text-sm font-medium text-green-600 transition hover:text-green-700"
      >
        ← Back
      </Link>

      {/* Header */}

      <div className="mt-5 mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {category}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {filteredProducts.length} Product
            {filteredProducts.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

       
       
      </div>

      {/* Toolbar */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <SlidersHorizontal size={18} />
          Browse Products
        </div>

        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-green-500"
          >
            <option value="default">
              Default
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="name">
              Name (A-Z)
            </option>
          </select>

          <button
            className="
              rounded-lg
              border
              border-gray-200
              px-4
              py-2
              text-sm
              font-medium
              transition
              hover:bg-gray-50
            "
          >
            Filter
          </button>
        </div>
      </div>

      {/* Empty */}

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-white p-16 text-center shadow">
          <div className="text-6xl">
            📦
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            No Products Found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another search.
          </p>
        </div>
      ) : (
        <ProductGrid
          title=""
          products={filteredProducts}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

export default CategoryProducts;