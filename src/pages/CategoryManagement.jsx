import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
} from "../services/categoryService";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

 const fetchCategories = async () => {
  try {
    const categoryList = await getCategories();
    setCategories(categoryList);
  } catch (error) {
    console.error(error);
  }
};
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
     await addCategory({
  name: categoryName.trim(),
  image: "",
  isActive: true,
  displayOrder: categories.length + 1,
});

      setCategoryName("");

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-6">
        Category Management
      </h1>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(e.target.value)
          }
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={handleAddCategory}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Add Category
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <span className="font-medium">
              {category.name}
            </span>

            <span className="text-green-600 text-sm">
              Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryManagement;