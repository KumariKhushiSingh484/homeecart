import { CATEGORIES } from "../constants/categories";
import { PRODUCT_UNITS } from "../constants/productUnits";
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

  // Measurement
  weight,
  setWeight,

  unit,
  setUnit,

  // Business Rules
  maximumOrderQuantity,
  setMaximumOrderQuantity,

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
}) { const pv =
  sellingPrice && purchasePrice
    ? calculatePV(
        sellingPrice,
        purchasePrice
      )
    : "";
    return (
  <div className="w-[700px] rounded-xl bg-white p-8 shadow-lg">
    {/* ================= Title ================= */}

    <h1 className="mb-8 text-center text-3xl font-bold">
      {isEditing
        ? "Edit Product"
        : "Add Product"}
    </h1>

    {/* ================= Basic Information ================= */}

    <h2
      className="
        mb-6
        border-b-2
        border-green-200
        pb-2
        text-xl
        font-bold
        text-green-700
      "
    >
      📦 Basic Information
    </h2>

    <div className="space-y-5">

      {/* Product Name */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Product Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        >
          <option value="">
            Select Category
          </option>

          {CATEGORIES.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>
      </div>

      {/* Product Image */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          className="w-full rounded border p-3"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            setImageFile(file);

            setImagePreview(
              URL.createObjectURL(file)
            );
          }}
        />
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="
            h-32
            w-32
            rounded
            object-cover
          "
        />
      )}
    </div>

    {/* ================= Pricing ================= */}

    <h2
      className="
        mt-8
        mb-6
        border-b-2
        border-green-200
        pb-2
        text-xl
        font-bold
        text-green-700
      "
    >
      💰 Pricing
    </h2>

    <div className="grid grid-cols-2 gap-5">

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Selling Price
        </label>

        <input
          type="number"
          value={sellingPrice}
          onChange={(e) =>
            setSellingPrice(
              e.target.value
            )
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Purchase Price
        </label>

        <input
          type="number"
          value={purchasePrice}
          onChange={(e) =>
            setPurchasePrice(
              e.target.value
            )
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          MRP
        </label>

        <input
          type="number"
          value={mrp}
          onChange={(e) =>
            setMrp(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Purchase Value (PV)
        </label>

        <input
          type="text"
          value={pv}
          readOnly
          className="
            w-full
            rounded
            border
            bg-gray-100
            p-3
          "
        />
      </div>

    </div>    {/* ================= Inventory ================= */}

    <h2
      className="
        mt-8
        mb-6
        border-b-2
        border-green-200
        pb-2
        text-xl
        font-bold
        text-green-700
      "
    >
      📦 Inventory
    </h2>

    <div className="space-y-5">

      {/* Stock */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Stock
        </label>

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      {/* Maximum Order Quantity */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Maximum Order Quantity (Per Customer)
        </label>

        <input
          type="number"
          min="1"
          value={maximumOrderQuantity}
          onChange={(e) =>
            setMaximumOrderQuantity(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />

        <p className="mt-1 text-xs text-gray-500">
          Customers cannot purchase more than this quantity in a single order.
        </p>
      </div>

    </div>

    {/* ================= Measurement ================= */}

    <h2
      className="
        mt-8
        mb-6
        border-b-2
        border-green-200
        pb-2
        text-xl
        font-bold
        text-green-700
      "
    >
      ⚖️ Measurement
    </h2>

    <div className="grid grid-cols-2 gap-5">

      {/* Weight */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Weight
        </label>

        <input
          type="number"
          value={weight}
          onChange={(e) =>
            setWeight(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      {/* Unit */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Unit
        </label>

        <select
          value={unit}
          onChange={(e) =>
            setUnit(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        >
          <option value="">
            Select Unit
          </option>

          {PRODUCT_UNITS.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

    </div>

    {/* ================= Save Button ================= */}

    <button
      onClick={saveProduct}
      className="
        mt-8
        w-full
        rounded-lg
        bg-green-600
        p-3
        font-semibold
        text-white
        transition
        hover:bg-green-700
      "
    >
      {isEditing
        ? "Update Product"
        : "Save Product"}
    </button>

  </div>
);

}

export default ProductForm;