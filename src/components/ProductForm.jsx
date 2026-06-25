function ProductForm({
  name,
  setName,
  price,
  setPrice,
  stock,
  setStock,
  originalPrice,
  setOriginalPrice,
  category,
  setCategory,
  image,
  setImage,
  saveProduct,
  isEditing,
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

      <h1 className="text-3xl font-bold mb-6 text-center">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Original Price"
        value={originalPrice}
        onChange={(e) => setOriginalPrice(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Image Name"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button
        onClick={saveProduct}
        className="bg-green-600 text-white w-full p-3 rounded-lg hover:bg-green-700"
      >
        {isEditing ? "Update Product" : "Save Product"}
      </button>

    </div>
  );
}

export default ProductForm;