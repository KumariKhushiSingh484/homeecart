import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";

import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm] = useState("");
  const [selectedCategory] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const snapshot = await getDocs(
          collection(db, "products")
        );

        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <>
      <HeroCarousel />

      <Categories />

      <ProductGrid
        filteredProducts={filteredProducts}
        addToCart={addToCart}
      />
    </>
  );
}

export default Home;