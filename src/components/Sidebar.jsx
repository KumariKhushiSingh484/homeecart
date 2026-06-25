function Sidebar() {
  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">HomeeCart</h1>

      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-yellow-300">
          📦 Products
        </li>

        <li className="cursor-pointer hover:text-yellow-300">
          🛒 Orders
        </li>

        <li className="cursor-pointer hover:text-yellow-300">
          👥 Customers
        </li>

        <li className="cursor-pointer hover:text-yellow-300">
          ⚙️ Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;