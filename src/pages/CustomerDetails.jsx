import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import { db } from "../services/firebase";
import CustomerRecentOrders from "../components/customer/CustomerRecentOrders";

function CustomerDetails() {
  const { customerId } = useParams();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  async function loadCustomer() {
    try {
      const customerRef = doc(
        db,
        "customers",
        customerId
      );

      const snapshot = await getDoc(customerRef);

      if (snapshot.exists()) {
        setCustomer({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }
    } catch (error) {
      console.error(
        "Failed to load customer:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        Customer not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Customer Details
      </h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* ================= Header ================= */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {customer.name}
            </h2>

            <p className="mt-2 text-gray-500">
              📱 {customer.phone}
            </p>
          </div>

          <div>
            {customer.prime?.isActive ? (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                💎 Prime Member
              </span>
            ) : (
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                Regular Customer
              </span>
            )}
          </div>
        </div>

        {/* ================= Statistics ================= */}

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Orders
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {customer.totalOrders ?? 0}
            </h3>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Total Spent
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              ₹{customer.totalSpent ?? 0}
            </h3>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Purchase Value
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {customer.totalPV ?? 0} PV
            </h3>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Logins
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {customer.loginCount ?? 0}
            </h3>
          </div>
        </div>

        {/* ================= Customer Activity ================= */}

        <div className="mt-10 border-t pt-8">
          <h3 className="mb-6 text-xl font-semibold text-gray-900">
            Customer Activity
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-5">
              <p className="text-sm text-gray-500">
                Last Login
              </p>

              <p className="mt-2 text-lg font-semibold">
                {customer.lastLogin?.toDate
                  ? customer.lastLogin
                      .toDate()
                      .toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                  : "-"}
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-gray-500">
                Customer Since
              </p>

              <p className="mt-2 text-lg font-semibold">
                {customer.createdAt?.toDate
                  ? customer.createdAt
                      .toDate()
                      .toLocaleDateString("en-IN", {
                        dateStyle: "long",
                      })
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomerRecentOrders customerId={customerId} />
    </div>
  );
}

export default CustomerDetails;