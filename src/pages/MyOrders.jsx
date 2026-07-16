import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCustomerOrders } from "../services/orderService";
import { useCustomer } from "../context/CustomerContext";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import SectionHeader from "../components/ui/SectionHeader";

function MyOrders() {
  const navigate = useNavigate();

  const {
    authUser,
    loadingCustomer,
  } = useCustomer();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!authUser) {
        setLoadingOrders(false);
        return;
      }

      try {
        const customerOrders = await getCustomerOrders(authUser.uid);
        setOrders(customerOrders);
      } catch (error) {
        console.error("Failed to load customer orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    }

    loadOrders();
  }, [authUser]);

  if (loadingCustomer || loadingOrders) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <LoadingSkeleton rows={4} />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <SectionHeader title="My Orders" />

        <EmptyState
          icon="🔐"
          title="Login Required"
          description="Please login to view your orders."
          buttonText="Login"
          onButtonClick={() => navigate("/login")}
        />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <SectionHeader title="My Orders" />

        <EmptyState
          icon="📦"
          title="No Orders Yet"
          description="Looks like you haven't placed any orders yet."
          buttonText="Start Shopping"
          onButtonClick={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      <SectionHeader
        title="My Orders"
        subtitle={`${orders.length} ${
          orders.length === 1 ? "Order" : "Orders"
        }`}
      />

      <div className="space-y-6">

        {orders.map((order) => (
          <Card
            key={order.id}
            hover
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex-1">

                <h3 className="text-xl font-bold text-gray-900">
                  Order #{order.orderNumber}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {order.createdAt?.toDate
                    ? order.createdAt
                        .toDate()
                        .toLocaleString()
                    : "Date unavailable"}
                </p>

                <div className="mt-4">
                  <Badge status={order.status}>
                    {order.status}
                  </Badge>
                </div>

              </div>

              <div className="text-left lg:text-right">

                <h2 className="text-3xl font-bold text-green-700">
                  ₹{order.total}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {order.items?.length || 0}{" "}
                  {(order.items?.length || 0) === 1
                    ? "Item"
                    : "Items"}
                </p>

                <Button
                  variant="secondary"
                  className="mt-5"
                  onClick={() =>
                    navigate(`/order/${order.id}`)
                  }
                >
                  View Details
                </Button>

              </div>

            </div>
          </Card>
        ))}

      </div>

    </div>
  );
}

export default MyOrders;