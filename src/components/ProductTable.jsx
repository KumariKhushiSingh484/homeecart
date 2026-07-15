function ProductTable({
  products,
  deleteProduct,
  editProduct,
}) {
  return (
    <div className="mt-10 w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-4">
        All Products
      </h2>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-center">Selling Price</th>
            <th className="p-3 text-center">Stock</th>
            <th className="p-3 text-center">Weight</th>
            <th className="p-3 text-center">Unit</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3 text-left">
                {product.name}
              </td>

              <td className="p-3 text-left">
                {product.category}
              </td>

              <td className="p-3 text-center">
                ₹{product.sellingPrice}
              </td>

              <td className="p-3 text-center">
                {product.stock}
              </td>

              <td className="p-3 text-center">
                {product.weight || "-"}
              </td>

              <td className="p-3 text-center">
                {product.unit || "-"}
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => editProduct(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;