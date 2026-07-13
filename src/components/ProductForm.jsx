import { CATEGORIES } from "../constants/categories";
import { calculatePV } from "../services/pricingService";

function ProductForm({
  // Product Name
  name,
  setName,

  // Pricing
  sellingPrice,
  setSellingPrice,
  purchasePrice,
  setPurchasePrice,
  mrp,
  setMrp,

  // Inventory
  stock,
  setStock,

  // Category
  category,
  setCategory,

  // Image
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,

  // Actions
  saveProduct,
  isEditing,
}) {
  const pv =
    sellingPrice && purchasePrice
      ? calculatePV(sellingPrice, purchasePrice)
      : "";

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-[700px]">
      {/* ================= Title ================= */}
      <h1 className="text-3xl font-bold text-center mb-8">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>

      {/* ================= Basic Information ================= */}

      <h2 className="text-xl font-bold text-green-700 border-b-2 border-green-200 pb-2 mb-6">
        📦 Basic Information
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>

          <input
            type="text"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>

          <select
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="border p-3 w-full rounded"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      {/* ================= Pricing ================= */}

      <h2 className="text-xl font-bold text-green-700 border-b-2 border-green-200 pb-2 mt-8 mb-6">
        💰 Pricing
      </h2>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selling Price
          </label>

          <input
            type="number"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purchase Price
          </label>

          <input
            type="number"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MRP
          </label>

          <input
            type="number"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purchase Value (PV)
          </label>

          <input
            type="text"
            className="border p-3 w-full rounded bg-gray-100"
            value={pv}
            readOnly
          />
        </div>
      </div>

      {/* ================= Inventory ================= */}

      <h2 className="text-xl font-bold text-green-700 border-b-2 border-green-200 pb-2 mt-8 mb-6">
        📦 Inventory
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stock
        </label>

        <input
          type="number"
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      {/* ================= Measurement ================= */}

      <h2 className="text-xl font-bold text-green-700 border-b-2 border-green-200 pb-2 mt-8 mb-6">
        ⚖️ Measurement
      </h2>

      <button
        onClick={saveProduct}
        className="mt-8 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
      >
        {isEditing ? "Update Product" : "Save Product"}
      </button>
    </div>
  );
}

export default ProductForm;