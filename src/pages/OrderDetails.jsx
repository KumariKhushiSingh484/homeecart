import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";
import { generateInvoice } from "../utils/invoice/generateInvoice";

import OrderTimeline from "../components/OrderTimeline";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import SectionHeader from "../components/ui/SectionHeader";

function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error(
          "Failed to load order:",
          error
        );
      } finally {
        setLoadingOrder(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (loadingOrder) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <LoadingSkeleton rows={5} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">

        <SectionHeader
          title="Order Details"
        />

        <EmptyState
          icon="📦"
          title="Order Not Found"
          description="This order doesn't exist or may have been deleted."
          buttonText="Back to My Orders"
          onButtonClick={() =>
            navigate("/my-orders")
          }
        />

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      <SectionHeader
        title="Order Details"
        subtitle={`Order #${order.orderNumber}`}
        action={
          <Badge status={order.status}>
            {order.status}
          </Badge>
        }
      />

      <Card className="mb-8">
        <OrderTimeline
          status={order.status}
        />
      </Card>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">

        <Card>

          <h2 className="mb-4 text-xl font-bold">
            Customer Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Name:</strong>{" "}
              {order.customerName}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone}
            </p>

          </div>

        </Card>

        <Card>

          <h2 className="mb-4 text-xl font-bold">
            Delivery Address
          </h2>

          <p>{order.address}</p>

          {order.location && (
            <a
              href={order.location}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex font-semibold text-green-600 hover:underline"
            >
              📍 Open in Google Maps
            </a>
          )}

        </Card>

      </div>
            {/* Ordered Items */}

      <Card className="mb-8">

        <h2 className="mb-6 text-2xl font-bold">
          Ordered Items
        </h2>

        <div className="space-y-5">

          {order.items.map((item) => {

            const price =
              item.sellingPrice ??
              item.price ??
              0;

            return (

              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-3xl">
                        📦
                      </span>
                    )}

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-500">
                      ₹{price} each
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-bold text-green-700">
                    ₹{price * item.quantity}
                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </Card>

      {/* Order Summary */}

      <Card className="mb-8 border-green-200 bg-green-50">

        <h2 className="mb-6 text-2xl font-bold">
          Order Summary
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <span className="text-gray-600">
              Items
            </span>

            <span className="font-medium">
              {order.items.length}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="font-medium">
              ₹{order.total}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-600">
              Delivery Charges
            </span>

            <span className="font-semibold text-green-600">
              FREE
            </span>

          </div>

          <hr className="border-green-200" />

          <div className="flex items-center justify-between">

            <span className="text-2xl font-bold">
              Grand Total
            </span>

            <span className="text-3xl font-bold text-green-700">
              ₹{order.total}
            </span>

          </div>

        </div>

      </Card>
            {/* Actions */}

      <div className="flex flex-wrap items-center gap-4">

        <Button
          onClick={() => generateInvoice(order)}
        >
          📄 Download Invoice
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/my-orders")}
        >
          ← Back to My Orders
        </Button>

      </div>

    </div>
  );
}

export default OrderDetails;