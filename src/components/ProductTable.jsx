function ProductTable({
  products,
  deleteProduct,
  editProduct,
}) {
  return (
    <div className="mt-10 w-full max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">
        All Products
      </h2>

      <table className="w-full border bg-white shadow rounded">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b text-center"
            >
              <td className="p-3">{product.name}</td>

              <td className="p-3">
                {product.category}
              </td>

              <td className="p-3">
                ₹{product.price}
              </td>

              <td className="p-3">
                {product.stock}
              </td>

              <td className="p-3 space-x-2">
                <button
                  onClick={() => editProduct(product)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product)
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;