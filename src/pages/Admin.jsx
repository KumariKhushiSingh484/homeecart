import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../services/firebase";

import Sidebar from "../components/Sidebar";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import ToastNotification from "../components/AppToast";

import Orders from "./Orders";

import useToast from "../hooks/useToast";

import CategoryManagement from "./CategoryManagement";

import BusinessSettings from "./BusinessSettings";

import { calculatePV } from "../services/pricingService";

import BannerManagement from "./BannerManagement";


function Admin() {
  // ==================== UI State ====================

  const [activePage, setActivePage] =
    useState("products");


  // ==================== Data ====================

  const [products, setProducts] =
    useState([]);
    const [searchTerm, setSearchTerm] =
  useState("");

  // ==================== Product Form ====================

  const [name, setName] =
    useState("");

  // Pricing

  const [
    sellingPrice,
    setSellingPrice,
  ] = useState("");

  const [
    purchasePrice,
    setPurchasePrice,
  ] = useState("");

  const [mrp, setMrp] =
    useState("");

  // Inventory

  const [stock, setStock] =
    useState("");

  // Measurement

  const [weight, setWeight] =
    useState("");

  const [unit, setUnit] =
    useState("");

  // Business Rules

  const [
    maximumOrderQuantity,
    setMaximumOrderQuantity,
  ] = useState(10);

  // Category

  const [
    category,
    setCategory,
  ] = useState("");

  // Image

  const [image, setImage] =
    useState(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  // ==================== Edit ====================

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  // ==================== Toast ====================

  const {
    toast,
    setToast,
    showToast,
  } = useToast();

  // ==================== Helpers ====================

  const resetForm = () => {
    setName("");

    setSellingPrice("");
    setPurchasePrice("");
    setMrp("");

    setStock("");

    setWeight("");
    setUnit("");

    setMaximumOrderQuantity(10);

    setCategory("");

    setImage(null);
    setImagePreview("");

    setEditingId(null);
    setIsEditing(false);
  };

// ==================== Firebase ====================

const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    const productList = querySnapshot.docs.map(
      (document) => ({
        id: document.id,
        ...document.data(),
      })
    );

    setProducts(productList);
  } catch (error) {
    console.error(
      "Error loading products:",
      error
    );

    showToast(
      "error",
      "Failed to load products"
    );
  }
};

const deleteProduct = async (product) => {
  if (
    !window.confirm(
      "Delete this product?"
    )
  ) {
    return;
  }

  try {
    // Delete image from Firebase Storage
    if (product.image) {
      const imageRef = ref(
        storage,
        product.image
      );

      await deleteObject(imageRef);
    }

    // Delete Firestore document
    await deleteDoc(
      doc(db, "products", product.id)
    );

    await fetchProducts();

    showToast(
      "success",
      "Product deleted successfully"
    );
  } catch (error) {
    console.error(
      "Delete Error:",
      error
    );

    showToast(
      "error",
      "Failed to delete product"
    );
  }
};

const editProduct = (product) => {
  setEditingId(product.id);

  setIsEditing(true);

  // Basic Information

  setName(product.name);

  setCategory(product.category);

  // Pricing

  setSellingPrice(
    product.sellingPrice
  );

  setPurchasePrice(
    product.purchasePrice
  );

  setMrp(product.mrp);

  // Inventory

  setStock(product.stock);
// Measurement

setWeight(
  product.weight ?? ""
);

setUnit(
  product.unit ?? ""
);

  // Business Rule

  setMaximumOrderQuantity(
    product.maximumOrderQuantity ??
      10
  );

  // Image

  setImage(null);

  setImagePreview(
    product.image ?? ""
  );
};

const saveProduct = async () => {
  try {
    let imageUrl = imagePreview;

    // Upload new image only if selected

    if (image) {
      const imageRef = ref(
        storage,
        `products/${Date.now()}-${image.name}`
      );

      await uploadBytes(
        imageRef,
        image
      );

      imageUrl =
        await getDownloadURL(
          imageRef
        );
    }

    console.log("weight:", weight);
console.log("unit:", unit);


    const productData = {
      // Basic Information

      name: name.trim(),

      category,

      image: imageUrl,

      // Pricing


sellingPrice: Number(sellingPrice),

purchasePrice: Number(purchasePrice),

mrp: Number(mrp),

pv: calculatePV(
  Number(sellingPrice),
  Number(purchasePrice)
),
      // Inventory

      stock: Number(stock),

     
// Measurement

weight: Number(weight),

unit,


      // Business Rules

      maximumOrderQuantity:
        Number(
          maximumOrderQuantity
        ),
    };
    console.log(productData);

    if (isEditing) {
  const docRef = doc(db, "products", editingId);

  await updateDoc(docRef, productData);

  const snapshot = await getDoc(docRef);

  console.log("Firestore document:", snapshot.data());

  showToast(
    "success",
    "Product updated successfully"
  );
} else {
  await addDoc(
    collection(db, "products"),
    productData
  );

  showToast(
    "success",
    "Product added successfully"
  );
}
    resetForm();

    await fetchProducts();
  } catch (error) {
    console.error(error);

    showToast(
      "error",
      "Something went wrong"
    );
  }
};
// ==================== Effects ====================

useEffect(() => {
  fetchProducts();
}, []);
const filteredProducts = [...products]
  .filter((product) => {
    const search = searchTerm.toLowerCase();

   return (
  product.name
    ?.toLowerCase()
    .includes(search) ||

  product.category
    ?.toLowerCase()
    .includes(search) ||

  String(product.weight)
    .toLowerCase()
    .includes(search) ||

  product.unit
    ?.toLowerCase()
    .includes(search) ||

  String(product.sellingPrice)
    .includes(search) ||

  String(product.pv)
    .includes(search)
);
  })
  .sort((a, b) =>
    a.name.localeCompare(
      b.name,
      "en",
      {
        sensitivity: "base",
      }
    )
  );
// ==================== UI ====================

return (
  <div className="flex min-h-screen bg-gray-100">
    <ToastNotification
      toast={toast}
      setToast={setToast}
    />

    <Sidebar
      activePage={activePage}
      setActivePage={setActivePage}
    />

    <div className="flex-1 p-10">
      {activePage === "products" && (
        <>
          <ProductForm
            // Product Name
            name={name}
            setName={setName}

            // Pricing
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}

            purchasePrice={purchasePrice}
            setPurchasePrice={setPurchasePrice}

            mrp={mrp}
            setMrp={setMrp}

            // Inventory
            stock={stock}
            setStock={setStock}

            // Measurement
            weight={weight}
            setWeight={setWeight}

            unit={unit}
            setUnit={setUnit}

            // Business Rule
            maximumOrderQuantity={
              maximumOrderQuantity
            }
            setMaximumOrderQuantity={
              setMaximumOrderQuantity
            }

            // Category
            category={category}
            setCategory={setCategory}

            // Image
            imageFile={image}
            setImageFile={setImage}

            imagePreview={imagePreview}
            setImagePreview={
              setImagePreview
            }

            // Actions
            saveProduct={saveProduct}
            isEditing={isEditing}
          />
<div className="my-6">
  <input
    type="text"
    placeholder="🔍 Search products by name or category..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="
      w-full
      rounded-xl
      border
      border-gray-300
      bg-white
      px-4
      py-3
      text-gray-800
      shadow-sm
      outline-none
      transition
      focus:border-green-500
      focus:ring-2
      focus:ring-green-200
    "
  />
</div>
          <ProductTable
  products={filteredProducts}
  deleteProduct={deleteProduct}
  editProduct={editProduct}
/>
        </>
      )}
{activePage === "categories" && (
  <CategoryManagement />
)}
{activePage === "banners" && (
  <BannerManagement />
)}
      {activePage === "orders" && (
        <Orders />
      )}

      {activePage === "customers" && (
  <div className="text-2xl font-semibold">
    Customers Page (Coming Soon)
  </div>
)}

{activePage === "business-settings" && (
  <BusinessSettings />
)}
    </div>
  </div>
);
}

export default Admin;