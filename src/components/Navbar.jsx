function Navbar({
  cartItems,
  setShowCart,
  logo,
}) {
  return (
    <header className="sticky top-0 z-50 bg-green-600 text-white p-4 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="HomeEcart"
            className="w-12 h-12 md:w-16 md:h-16 rounded"
          />

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              HomeEcart
            </h1>

            <p className="text-sm">
              📍 Dehri-On-Sone
            </p>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto justify-center">

          <button className="bg-white text-green-600 px-3 py-2 rounded-lg font-semibold text-sm md:text-base">
            👤 Login
          </button>

          <button
            onClick={() => setShowCart(true)}
            className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-semibold text-sm md:text-base"
          >
            🛒 Cart ({cartItems.length})
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;