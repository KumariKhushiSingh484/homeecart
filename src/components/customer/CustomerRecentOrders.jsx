import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getRecentCustomerOrders } from "../../services/orderService";

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-purple-100 text-purple-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

function CustomerRecentOrders({ customerId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [customerId]);

  async function loadOrders() {
    try {
      const data = await getRecentCustomerOrders(customerId);

      console.log(data);

      setOrders(data);
    } catch (error) {
      console.error(
        "Failed to load recent orders:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-500">
          Loading recent orders...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Recent Orders
      </h2>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">
            No recent orders found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-gray-200 p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Left Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.orderNumber ??
                      `#${order.id.slice(0, 8)}`}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {order.createdAt?.toDate
                      ? order.createdAt
                          .toDate()
                          .toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                      : "-"}
                  </p>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.deliveryMethod ===
                        "Store Pickup"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.deliveryMethod ===
                      "Store Pickup"
                        ? "Store Pickup"
                        : "Home Delivery"}
                    </span>
                  </div>
                </div>

                {/* Right Section */}
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="text-2xl font-bold text-gray-900">
                    ₹{order.total ?? 0}
                  </p>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        STATUS_STYLES[
                          order.status
                        ] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status ?? "Pending"}
                    </span>
                  </div>

                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="mt-4 inline-block text-sm font-semibold text-green-600 transition hover:text-green-700 hover:underline"
                  >
                    View Order →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerRecentOrders;