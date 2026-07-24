import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/categoryService";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      const activeCategories = data
        .filter((category) => category.isActive)
        .sort(
          (a, b) =>
            (a.displayOrder || 999) - (b.displayOrder || 999)
        );

      setCategories(activeCategories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shop by Category
        </h2>

        <p className="text-gray-500">Loading categories...</p>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shop by Category
        </h2>

        <p className="text-gray-500">
          No categories available.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <span className="text-4xl">📦</span>
              )}
            </div>

            <h3 className="mt-4 text-sm font-semibold text-center text-gray-800 line-clamp-2">
              {category.name}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;