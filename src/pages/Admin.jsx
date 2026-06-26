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
import Orders from "./Orders";
function Admin() {
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState("products");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
const [category, setCategory] = useState("");
const [image, setImage] = useState("");
const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);
useEffect(() => {
  fetchProducts();
}, []);

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
  }
};
const deleteProduct = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    await deleteDoc(doc(db, "products", id));
    await fetchProducts();
  } catch (error) {
    console.error(error);
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
    if (isEditing) {
      await updateDoc(doc(db, "products", editingId), {
        name,
        price: Number(price),
        originalPrice: Number(originalPrice),
        stock: Number(stock),
        category,
        image,
      });

      alert("✅ Product Updated Successfully!");
    } else {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        originalPrice: Number(originalPrice),
        stock: Number(stock),
        category,
        image,
      });

      alert("✅ Product Added Successfully!");
    }

    // Reset form
    setName("");
    setPrice("");
    setStock("");
    setOriginalPrice("");
    setCategory("");
    setImage("");

    setEditingId(null);
    setIsEditing(false);

    await fetchProducts();

  } catch (error) {
    console.error(error);
    alert("❌ Something went wrong");
  }
};
 return (
  <div className="flex bg-gray-100 min-h-screen">

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

{activePage === "orders" && (
  <Orders />
)}
    </div>

  </div>
);
  
}

export default Admin;