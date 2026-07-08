import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import Sidebar from "../components/Sidebar";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import ToastNotification from "../components/AppToast";
import Orders from "./Orders";
import useToast from "../hooks/useToast";

function Admin() {
  // ==================== UI State ====================
  const [activePage, setActivePage] = useState("products");

  // ==================== Data State ====================
  const [products, setProducts] = useState([]);

  // ==================== Form State ====================
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // ==================== Edit State ====================
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
const { toast, setToast, showToast } = useToast();
  // ==================== Helper Functions ====================

  

  const resetForm = () => {
    setName("");
    setPrice("");
    setOriginalPrice("");
    setStock("");
    setCategory("");
    setImage("");

    setEditingId(null);
    setIsEditing(false);
  };

  // ==================== Firebase Functions ====================

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productList);
    } catch (error) {
      console.error("Error loading products:", error);
      showToast("error", "Failed to load products");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      await fetchProducts();

      showToast("success", "Product deleted successfully");
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to delete product");
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setIsEditing(true);

    setName(product.name);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice);
    setStock(product.stock);
    setCategory(product.category);
    setImage(product.image);
  };

  const saveProduct = async () => {
    try {
      const productData = {
        name,
        price: Number(price),
        originalPrice: Number(originalPrice),
        stock: Number(stock),
        category,
        image,
      };

      if (isEditing) {
        await updateDoc(doc(db, "products", editingId), productData);

        showToast("success", "Product updated successfully");
      } else {
        await addDoc(collection(db, "products"), productData);

        showToast("success", "Product added successfully");
      }

      resetForm();

      await fetchProducts();
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong");
    }
  };

  // ==================== Effects ====================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==================== UI ====================

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <ToastNotification toast={toast} setToast={setToast} />

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 p-10">
        {activePage === "products" && (
          <>
            <ProductForm
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              stock={stock}
              setStock={setStock}
              originalPrice={originalPrice}
              setOriginalPrice={setOriginalPrice}
              category={category}
              setCategory={setCategory}
              image={image}
              setImage={setImage}
              saveProduct={saveProduct}
              isEditing={isEditing}
            />

            <ProductTable
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          </>
        )}

        {activePage === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default Admin;