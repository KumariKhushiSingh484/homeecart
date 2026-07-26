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
          className="
group
overflow-hidden
rounded-2xl
border
border-gray-200
bg-white
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
flex
flex-col
h-full
"
          >
            <div className="overflow-hidden rounded-xl">
  {category.imageUrl ? (
    <img
      src={category.imageUrl}
      alt={category.name}
      loading="lazy"
     className="
h-40
w-full
object-cover
transition-transform
duration-300
group-hover:scale-105
"
    />
  ) : (
    <div className="flex h-36 items-center justify-center bg-gray-100 text-5xl">
      📦
    </div>
  )}
</div>

<div className="flex-1 p-4 flex items-center justify-center">
  <h3 className="text-center text-base font-semibold text-gray-800">
    {category.name}
  </h3>
</div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;