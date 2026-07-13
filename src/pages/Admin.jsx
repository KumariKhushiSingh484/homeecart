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
import { storage } from "../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
function Admin() {
  // ==================== UI State ====================
  const [activePage, setActivePage] = useState("products");

  // ==================== Data State ====================
  const [products, setProducts] = useState([]);

  // ==================== Form State ====================
  const [name, setName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
const [purchasePrice, setPurchasePrice] = useState("");
const [mrp, setMrp] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState("");

  // ==================== Edit State ====================
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
const { toast, setToast, showToast } = useToast();
  // ==================== Helper Functions ====================

  
const resetForm = () => {
  setName("");
  setSellingPrice("");
  setPurchasePrice("");
  setMrp("");
  setStock("");
  setCategory("");
  setImage(null);
  setImagePreview("");

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

 const deleteProduct = async (product) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    // Delete image from Firebase Storage (if it exists)
    if (product.image) {
      const imageRef = ref(storage, product.image);
      await deleteObject(imageRef);
    }

    // Delete Firestore document
    await deleteDoc(doc(db, "products", product.id));

    await fetchProducts();

    showToast("success", "Product deleted successfully");
  } catch (error) {
    console.error("Delete Error:", error);

    showToast("error", "Failed to delete product");
  }
};
  const editProduct = (product) => {
  setEditingId(product.id);
  setIsEditing(true);

  setName(product.name);
  setSellingPrice(product.sellingPrice);
  setPurchasePrice(product.purchasePrice);
  setMrp(product.mrp);

  setStock(product.stock);
  setCategory(product.category);

  setImage(null);
  setImagePreview(product.image);
};

  const saveProduct = async () => {
  try {
    let imageUrl = imagePreview;

    // Upload only if a new image is selected
    if (image) {
      const imageRef = ref(
        storage,
        `products/${Date.now()}-${image.name}`
      );

      await uploadBytes(imageRef, image);

      imageUrl = await getDownloadURL(imageRef);
    }

    const productData = {
  name,
  sellingPrice: Number(sellingPrice),
  purchasePrice: Number(purchasePrice),
  mrp: Number(mrp),
  stock: Number(stock),
  category,
  image: imageUrl,
};

    if (isEditing) {
      await updateDoc(doc(db, "products", editingId), productData);
      showToast("success", "Product updated successfully");
    } else {
      await addDoc(collection(db, "products"), productData);
      showToast("success", "Product added successfully");
    }

    resetForm();
    fetchProducts();

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

  sellingPrice={sellingPrice}
  setSellingPrice={setSellingPrice}

  purchasePrice={purchasePrice}
  setPurchasePrice={setPurchasePrice}

  mrp={mrp}
  setMrp={setMrp}

  stock={stock}
  setStock={setStock}

  category={category}
  setCategory={setCategory}

  imageFile={image}
  setImageFile={setImage}

  imagePreview={imagePreview}
  setImagePreview={setImagePreview}

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