import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Package,
  User,
} from "lucide-react";

import { logoutCustomer } from "../../services/customerAuthService";

import Button from "../ui/Button";

function AccountMenu({
  customer,
  loadingCustomer,
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  if (loadingCustomer) {
    return (
      <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
    );
  }

  if (!customer) {
    return (
      <Button
        variant="primary"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    );
  }

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      {/* Trigger */}

      <button
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-3
          py-2
          shadow-sm
          transition
          hover:border-green-300
          hover:bg-green-50
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-green-600
            text-sm
            font-bold
            text-white
          "
        >
          {customer.name
            ? customer.name
                .charAt(0)
                .toUpperCase()
            : "U"}
        </div>

        <div className="hidden text-left lg:block">
          <p className="max-w-[120px] truncate text-sm font-semibold text-gray-900">
            {customer.name}
          </p>

          <p className="text-xs text-gray-500">
            My Account
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-72
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-2xl
          "
        >
          {/* Header */}

          <div className="bg-green-600 p-5 text-white">

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-xl
                  font-bold
                  text-green-700
                "
              >
                {customer.name
                  ? customer.name
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </div>

              <div>

                <h3 className="font-semibold">
                  {customer.name}
                </h3>

                <p className="text-sm text-green-100">
                  {customer.phone}
                </p>

              </div>

            </div>

          </div>

          {/* Menu */}

          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-4
              transition
              hover:bg-gray-50
            "
          >
            <User size={18} />
            My Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/my-orders");
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-4
              transition
              hover:bg-gray-50
            "
          >
            <Package size={18} />
            My Orders
          </button>

          <hr />

          <button
            onClick={async () => {
              await logoutCustomer();

              setOpen(false);

              navigate("/");
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-4
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
}

export default AccountMenu;