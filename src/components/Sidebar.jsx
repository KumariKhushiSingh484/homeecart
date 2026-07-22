function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      id: "products",
      label: "📦 Products",
    },
    {
      id: "categories",
      label: "🗂️ Categories",
    },
    {
      id: "orders",
      label: "🛒 Orders",
    },
    {
      id: "customers",
      label: "👥 Customers",
    },
    {
      id: "business-settings",
      label: "⚙️ Business Settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-green-700 text-white p-6 shadow-lg">
      <h1 className="text-3xl font-bold mb-10">HomeeCart</h1>

      <nav>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`cursor-pointer rounded-lg p-3 transition-all duration-200 ${
                activePage === item.id
                  ? "bg-green-900 font-semibold"
                  : "hover:bg-green-600 hover:text-yellow-300"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;