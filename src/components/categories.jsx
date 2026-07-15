import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";

const categoryIcons = {
  "Atta & Rice": "🌾",
  "Tea & Coffee": "☕",
  Snacks: "🍪",
  Beverages: "🥤",
  "Personal Care": "🧴",
  Household: "🏠",
};

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/categories/${encodeURIComponent(category)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center justify-center gap-3"
          >
            <span className="text-5xl">
              {categoryIcons[category]}
            </span>

            <span className="text-sm font-semibold text-center text-gray-700">
              {category}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;