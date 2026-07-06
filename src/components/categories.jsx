function Categories({ categories }) {
  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white p-4 md:p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 text-center text-sm md:text-base"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;