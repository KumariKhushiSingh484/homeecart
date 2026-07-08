import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";
import { logoutCustomer } from "../services/customerAuthService";
import { getCustomer } from "../services/customerService";

function Navbar({
  cartItems,
  setShowCart,
  logo,
}) {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [customerProfile, setCustomerProfile] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCustomer(user);

      if (user) {
        const profile = await getCustomer(user.uid);
        setCustomerProfile(profile);
      } else {
        setCustomerProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-green-600 text-white p-4 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="HomeEcart"
            className="w-12 h-12 md:w-16 md:h-16 rounded"
          />

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              HomeeCart
            </h1>

            <p className="text-sm">
              📍 Dehri-On-Sone
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">

          {customer ? (
            <div className="relative">

              {/* Account Button */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition"
              >
                {/* Profile Placeholder */}
                <div className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-lg shadow">
                  {customerProfile?.name
                    ? customerProfile.name.charAt(0).toUpperCase()
                    : "👤"}
                </div>

                <div className="text-left hidden sm:block">
                  <p className="font-semibold leading-none">
                    Hi, {customerProfile?.name || "Customer"}
                  </p>

                  <p className="text-xs text-green-100">
                    View Account
                  </p>
                </div>

                <span className="text-sm">▼</span>
              </button>

              {/* Dropdown */}
              {showMenu && (
                <div className="absolute top-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">

                  {/* Profile Header */}
                  <div className="bg-green-600 p-5 text-white">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-full bg-white text-green-600 flex items-center justify-center text-2xl font-bold">
                        {customerProfile?.name
                          ? customerProfile.name.charAt(0).toUpperCase()
                          : "👤"}
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                          {customerProfile?.name || "Customer"}
                        </h3>

                        <p className="text-green-100 text-sm">
                          {customerProfile?.phone}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Menu Items */}

                  <button
                    className="w-full text-left px-5 py-4 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
                  >
                    👤 My Profile
                  </button>

                  <button
                    className="w-full text-left px-5 py-4 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
                  >
                    📦 My Orders
                  </button>

                  <hr />

                  <button
                    onClick={async () => {
                      await logoutCustomer();
                      setShowMenu(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-5 py-4 text-red-600 hover:bg-red-50 transition"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              👤 Login
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => setShowCart(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            🛒 Cart ({cartItems.length})
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;