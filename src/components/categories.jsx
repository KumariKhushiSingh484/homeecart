import { CATEGORIES } from "../constants/categories"

const categoryIcons = {
  "Atta & Rice": "🌾",
  "Tea & Coffee": "☕",
  "Snacks": "🍪",
  "Beverages": "🥤",
  "Personal Care": "🧴",
  "Household": "🏠",
};
function Categories({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? "" : category
              )
            }
            className={`p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 text-center text-sm md:text-base font-medium ${
              selectedCategory === category
                ? "bg-green-600 text-white border-green-600 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-green-500 hover:shadow-lg hover:scale-105"
            }`}
          >
            {categoryIcons[category]} {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;