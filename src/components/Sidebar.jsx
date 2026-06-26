function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">HomeeCart</h1>

      <ul className="space-y-4">
        <li
          onClick={() => setActivePage("products")}
          className={`cursor-pointer p-2 rounded ${
            activePage === "products"
              ? "bg-green-900"
              : "hover:text-yellow-300"
          }`}
        >
          📦 Products
        </li>

        <li
          onClick={() => setActivePage("orders")}
          className={`cursor-pointer p-2 rounded ${
            activePage === "orders"
              ? "bg-green-900"
              : "hover:text-yellow-300"
          }`}
        >
          🛒 Orders
        </li>

        <li className="cursor-pointer hover:text-yellow-300 p-2">
          👥 Customers
        </li>

        <li className="cursor-pointer hover:text-yellow-300 p-2">
          ⚙️ Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;