import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
  hasProducts,
} from "../services/categoryService";
import { uploadImage } from "../services/storageService";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);

  const [categoryImage, setCategoryImage] = useState(null);
const [previewImage, setPreviewImage] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [editingCategoryId, setEditingCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const categoryList = await getCategories();
      setCategories(categoryList);

      setDisplayOrder(categoryList.length + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

 const handleAddCategory = async () => {
  if (!categoryName.trim()) {
    alert("Please enter category name");
    return;
  }

  try {
    setLoading(true);

    let imageUrl = previewImage;

    if (categoryImage) {
      imageUrl = await uploadImage(
        categoryImage,
        "categories"
      );
    }

    const categoryData = {
      name: categoryName.trim(),
      imageUrl,
      displayOrder,
      isActive,
    };

    if (isEditing) {
      await updateCategory(
        editingCategoryId,
        categoryData
      );
    } else {
      await addCategory(categoryData);
    }

    // Reset Form
    setCategoryName("");
    setCategoryImage(null);
    setPreviewImage("");
    setDisplayOrder(categories.length + 1);
    setIsActive(true);

    setIsEditing(false);
    setEditingCategoryId(null);

    await fetchCategories();
  } catch (error) {
    console.error(error);
    alert("Failed to save category.");
  } finally {
    setLoading(false);
  }
};

  const handleToggleStatus = async (category) => {
    try {
      await updateCategoryStatus(
        category.id,
        !category.isActive
      );

      fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to update category.");
    }
  };
  const handleDelete = async (category) => {
  try {
    const categoryHasProducts = await hasProducts(
      category.name
    );

    if (categoryHasProducts) {
      alert(
        `Cannot delete "${category.name}" because products are assigned to it.`
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmDelete) return;

    await deleteCategory(category.id);

    fetchCategories();
  } catch (error) {
    console.error(error);
    alert("Failed to delete category.");
  }
};
const handleEdit = (category) => {
  setIsEditing(true);
  setEditingCategoryId(category.id);

  setCategoryName(category.name);
  setDisplayOrder(category.displayOrder || 1);
  setIsActive(category.isActive);

  setPreviewImage(category.imageUrl || "");
  setCategoryImage(null);
};

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-6">
        Category Management
      </h1>

      {/* Form */}

      <div className="flex flex-wrap gap-4 mb-8">

        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(e.target.value)
          }
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    setCategoryImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }}
  className="border rounded-lg px-4 py-2"
/>
{previewImage && (
  <img
    src={previewImage}
    alt="Preview"
    className="w-28 h-28 object-cover rounded-lg border"
  />
)}

        <input
          type="number"
          min="1"
          value={displayOrder}
          onChange={(e) =>
            setDisplayOrder(Number(e.target.value))
          }
          className="w-32 border rounded-lg px-4 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(e.target.checked)
            }
          />

          Active
        </label>

        <button
          onClick={handleAddCategory}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading
  ? isEditing
    ? "Updating..."
    : "Adding..."
  : isEditing
    ? "Update Category"
    : "Add Category"}
        </button>

      </div>

      {/* Category List */}

      <div className="space-y-3">

        {categories.map((category) => (

          <div
            key={category.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >

           <div className="flex items-center gap-4">

  <img
    src={
      category.imageUrl ||
      "https://placehold.co/80x80?text=No+Image"
    }
    alt={category.name}
    className="w-16 h-16 rounded-lg object-cover border"
  />

  <div>
    <h2 className="font-semibold">
      {category.name}
    </h2>

    <p className="text-sm text-gray-500">
      Display Order : {category.displayOrder}
    </p>
  </div>

</div>

          <div className="flex items-center gap-2">

  <button
  onClick={() => handleEdit(category)}
  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
>
  Edit
</button>
  <button
    onClick={() => handleToggleStatus(category)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
      category.isActive
        ? "bg-green-100 text-green-700 hover:bg-green-200"
        : "bg-red-100 text-red-700 hover:bg-red-200"
    }`}
  >
    {category.isActive ? "Active" : "Inactive"}
  </button>

  <button
    onClick={() => handleDelete(category)}
    className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
  >
    Delete
  </button>

</div>
          </div>

        ))}

      </div>

    </div>
  );
}

export default CategoryManagement;