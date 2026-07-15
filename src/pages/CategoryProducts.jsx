import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";
import { categoryData } from "../constants/categoryData";
import { useCart } from "../context/CartContext";

import ProductGrid from "../components/ProductGrid";

function CategoryProducts() {
  const { categoryName } = useParams();

  const { addToCart } = useCart();

  const category = decodeURIComponent(categoryName);

  const categoryInfo = categoryData[category];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
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
            (product) =>
              product.category === category
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

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="rounded-3xl bg-white p-16 text-center shadow">
          Loading Products...
        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">

      <Link
        to="/"
        className="font-medium text-green-600 transition hover:text-green-700"
      >
        ← Back to Home
      </Link>

      <div className="mt-6 mb-10 grid items-center gap-10 lg:grid-cols-2">

        <div>

          <h1 className="text-5xl font-extrabold text-gray-900">
            {category}
          </h1>

          <p className="mt-5 text-xl text-gray-600">
            {categoryInfo?.subtitle}
          </p>

        </div>

        <div className="overflow-hidden rounded-3xl shadow-lg">

          {categoryInfo?.banner ? (
            <img
              src={categoryInfo.banner}
              alt={category}
              className="h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-72 items-center justify-center bg-green-100 text-2xl font-bold text-green-700">
              {category}
            </div>
          )}

        </div>

      </div>

      <ProductGrid
        title=""
        products={products}
        addToCart={addToCart}
      />

    </div>
  );
}

export default CategoryProducts;