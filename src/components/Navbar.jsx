import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";
import { logoutCustomer } from "../services/customerAuthService";
import { getCustomer } from "../services/customerService";

import { useCart } from "../context/CartContext";
import { useShopping } from "../context/ShoppingContext";

function Navbar({ logo }) {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { openCart } = useShopping();

  const [customer, setCustomer] = useState(null);
  const [customerProfile, setCustomerProfile] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCustomer(user);

      if (user) {
        try {
          const profile = await getCustomer(user.uid);
          setCustomerProfile(profile);
        } catch (error) {
          console.error(error);
        }
      } else {
        setCustomerProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
        >
          <img
            src={logo}
            alt="HomeEcart"
            className="w-12 h-12 rounded-xl bg-white p-1"
          />

          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              HomeEcart
            </h1>

            <p className="text-xs text-green-100">
              📍 Dehri-On-Sone
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 hidden md:block">
          <input
            type="text"
            placeholder="🔍 Search groceries..."
            className="w-full rounded-full bg-white px-5 py-3 text-gray-700 shadow-md outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 flex-shrink-0">

          {customer ? (
            <div
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() =>
                  setShowMenu((prev) => !prev)
                }
                className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 transition hover:bg-white/20"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-green-600">
                  {customerProfile?.name
                    ? customerProfile.name.charAt(0).toUpperCase()
                    : "👤"}
                </div>

                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold text-white">
                    {customerProfile?.name || "Customer"}
                  </p>

                  <p className="text-[11px] text-green-100">
                    My Account
                  </p>
                </div>

                <span className="text-xs text-white">
                  ▼
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl">

                  <div className="bg-green-600 p-5 text-white">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-bold text-green-600">
                        {customerProfile?.name
                          ? customerProfile.name.charAt(0).toUpperCase()
                          : "👤"}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">
                          {customerProfile?.name || "Customer"}
                        </h3>

                        <p className="text-sm text-green-100">
                          {customerProfile?.phone || ""}
                        </p>
                      </div>

                    </div>

                  </div>

                  <button className="w-full px-5 py-4 text-left transition hover:bg-gray-100">
                    👤 My Profile
                  </button>

                  <button className="w-full px-5 py-4 text-left transition hover:bg-gray-100">
                    📦 My Orders
                  </button>

                  <hr />

                  <button
                    onClick={async () => {
                      await logoutCustomer();
                      setShowMenu(false);
                      navigate("/");
                    }}
                    className="w-full px-5 py-4 text-left text-red-600 transition hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-white px-5 py-2.5 font-semibold text-green-700 transition hover:bg-gray-100"
            >
              Login
            </button>
          )}

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black shadow transition hover:bg-yellow-300"
          >
            🛒 Cart

            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {cartCount}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;