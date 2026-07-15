import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useCart } from "../context/CartContext";

import ProductGrid from "../components/ProductGrid";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          setProduct(null);
          return;
        }

        const currentProduct = {
          id: productSnap.id,
          ...productSnap.data(),
        };

        setProduct(currentProduct);

        const snapshot = await getDocs(
          collection(db, "products")
        );

        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const related = allProducts
          .filter(
            (item) =>
              item.category === currentProduct.category &&
              item.id !== currentProduct.id
          )
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center text-xl font-semibold">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">

        <h1 className="mb-4 text-3xl font-bold">
          Product Not Found 😢
        </h1>

        <Link
          to="/"
          className="font-semibold text-green-600 hover:underline"
        >
          ← Back to Home
        </Link>

      </div>
    );
  }

  const price = product.sellingPrice ?? product.price;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">

      <Link
        to={`/categories/${encodeURIComponent(
          product.category
        )}`}
        className="font-semibold text-green-600 hover:underline"
      >
        ← Back to {product.category}
      </Link>

      <div className="mt-6 rounded-3xl bg-white p-8 shadow-xl">

        <div className="grid gap-12 md:grid-cols-2">

          {/* Product Image */}

          <div>

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-[420px] w-full rounded-2xl border object-cover"
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                No Image
              </div>
            )}

          </div>

          {/* Details */}

          <div className="flex flex-col justify-center">

            <p className="mb-2 font-semibold text-green-600">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold text-gray-800">
              {product.name}
            </h1>

            <div className="mt-6">

              <span className="text-4xl font-bold text-green-600">
                ₹{price}
              </span>

              {product.originalPrice && (
                <span className="ml-3 text-xl text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}

            </div>

            {product.originalPrice && (
              <p className="mt-2 font-semibold text-red-500">
                Save ₹{product.originalPrice - price}
              </p>
            )}

            <div className="mt-8 space-y-4">

              <div className="flex justify-between border-b pb-3">

                <span className="font-semibold">
                  Stock
                </span>

                <span className="text-green-600">
                  {product.stock} Available
                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span className="font-semibold">
                  Category
                </span>

                <span>
                  {product.category}
                </span>

              </div>

            </div>

            {/* Quantity */}

            <div className="mt-8">

              <p className="mb-3 font-semibold">
                Quantity
              </p>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  className="h-12 w-12 rounded-full bg-gray-200 text-2xl hover:bg-gray-300"
                >
                  −
                </button>

                <span className="w-10 text-center text-2xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(
                        product.stock,
                        prev + 1
                      )
                    )
                  }
                  className="h-12 w-12 rounded-full bg-green-600 text-2xl text-white hover:bg-green-700"
                >
                  +
                </button>

              </div>

            </div>

            <button
              onClick={() =>
                addToCart(product, quantity)
              }
              className="mt-8 rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
            >
              🛒 Add {quantity} to Cart
            </button>

          </div>

        </div>

      </div>

      <div className="mt-12">

        <ProductGrid
          title="You May Also Like"
          products={relatedProducts}
          addToCart={addToCart}
        />

      </div>

    </div>
  );
}

export default ProductDetails;