import { sortProducts } from "../utils/product/sortProducts";
import {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShopping } from "../context/ShoppingContext";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../services/firebase";

import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";

import { useSearch } from "../context/SearchContext";
import { trackVisitor } from "../utils/visitorTracker";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory] = useState("");

  const { searchTerm } = useSearch();
  const productsRef = useRef(null);
  const location = useLocation();
const navigate = useNavigate();

const { openCheckout } = useShopping();

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

    const activeProducts = productList.filter(
      (product) => product.isActive !== false
    );

    console.log("All products:", productList.length);
    console.log("Active products:", activeProducts.length);

    console.table(
      activeProducts.map((p) => ({
        name: p.name,
        isActive: p.isActive,
      }))
    );

    setProducts(activeProducts);
  } catch (error) {
    console.error(
      "Failed to load products:",
      error
    );
  }
}

    loadProducts();
  }, []);
useEffect(() => {
  if (location.state?.openCheckout) {
    openCheckout();

    // Remove the navigation state so it doesn't reopen
    navigate("/", {
      replace: true,
      state: {},
    });
  }
}, [location, navigate, openCheckout]);
useEffect(() => {
  trackVisitor();
}, []);
useEffect(() => {
  if (!searchTerm.trim()) return;

  const timer = setTimeout(() => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);

  return () => clearTimeout(timer);
}, [searchTerm]);
  const filteredProducts = useMemo(() => {
  const search = searchTerm
    .trim()
    .toLowerCase();

  const filtered = products.filter((product) => {
    const productName =
      product.name?.toLowerCase() || "";

    const category =
      product.category?.toLowerCase() || "";

    const matchesSearch =
      search === "" ||
      productName.includes(search) ||
      category.includes(search);

    const matchesCategory =
      selectedCategory === "" ||
      product.category === selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  return sortProducts(filtered);
}, [
  products,
  searchTerm,
  selectedCategory,
]);

  return (
    <>
      <HeroCarousel />

      <Categories />
<section
  ref={productsRef}
  className="mx-auto max-w-7xl px-4 pt-10"
>
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-gray-900">
      ⭐ Featured Products
    </h2>

    <p className="mt-2 text-gray-500">
      Best prices on your daily essentials.
    </p>
  </div>
 
  <ProductGrid
    filteredProducts={filteredProducts}
  />
</section>
      
    </>
  );
}

export default Home;