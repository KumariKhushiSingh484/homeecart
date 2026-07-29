import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =
  useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
  useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);
const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "orders")
    );

    const orderList = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) {
          return 0;
        }

        return (
          b.createdAt.toMillis() -
          a.createdAt.toMillis()
        );
      });

    setOrders(orderList);
  } catch (error) {
    console.error(
      "Error fetching orders:",
      error
    );
  }
};

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", id), {
        status: newStatus,
      });

      await fetchOrders();

      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const archiveOrder = async (id) => {
  try {
    await updateDoc(doc(db, "orders", id), {
      isArchived: true,
      archivedAt: serverTimestamp(),
    });

    await fetchOrders();

    setShowModal(false);

    setSelectedOrder(null);
  } catch (error) {
    console.error(error);
  }
};
const restoreOrder = async (id) => {
  try {
    await updateDoc(doc(db, "orders", id), {
      isArchived: false,
      archivedAt: null,
    });

    await fetchOrders();

    setShowModal(false);
    setSelectedOrder(null);
  } catch (error) {
    console.error("Error restoring order:", error);
  }
};
const deleteOrder = async (id) => {
  try {
    await deleteDoc(doc(db, "orders", id));

    await fetchOrders();

    setShowModal(false);
    setSelectedOrder(null);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};
  const filteredOrders = orders.filter((order) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    order.customerName
      ?.toLowerCase()
      .includes(search) ||
    order.phone
      ?.toLowerCase()
      .includes(search) ||
    order.orderNumber
      ?.toLowerCase()
      .includes(search);

  // Archived filter
  if (statusFilter === "Archived") {
    return matchesSearch && order.isArchived;
  }

  // Hide archived orders in every other filter
  if (order.isArchived) {
    return false;
  }

  // Status filter
  const matchesStatus =
    statusFilter === "All" ||
    order.status === statusFilter;

  return matchesSearch && matchesStatus;
});
const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
          🟡 Pending
        </span>
      );

    case "Packed":
      return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          🔵 Packed
        </span>
      );

    case "Out for Delivery":
      return (
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
          🟣 Out for Delivery
        </span>
      );

    case "Delivered":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
          🟢 Delivered
        </span>
      );
case "Cancelled":
  return (
    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
      🔴 Cancelled
    </span>
  );
    default:
      return (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
          {status}
        </span>
      );
  }
};
const formatOrderDate = (timestamp) => {
  if (!timestamp) return "N/A";

  const date = timestamp.toDate();

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Customer Orders
      </h1>
     <div className="mb-6 flex gap-4">

  <input
    type="text"
    placeholder="🔍 Search by customer, phone or order number..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="
      flex-1
      rounded-lg
      border
      p-3
      shadow-sm
      focus:border-green-500
      focus:outline-none
    "
  />

  <select
  value={statusFilter}
  onChange={(e) =>
    setStatusFilter(e.target.value)
  }
  className="
    rounded-lg
    border
    p-3
    shadow-sm
    focus:border-green-500
    focus:outline-none
  "
>
  <option value="All">All</option>
  <option value="Pending">Pending</option>
  <option value="Packed">Packed</option>
  <option value="Out for Delivery">
    Out for Delivery
  </option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
  <option value="Archived">Archived</option>
</select>
</div>
<p className="mb-4 text-gray-600">
  Showing <strong>{filteredOrders.length}</strong> orders
</p>

      <table className="w-full border bg-white shadow rounded">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Customer</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b text-center">
              <td className="p-3">{order.customerName}</td>
              <td className="p-3">{order.phone}</td>
              <td className="p-3">₹{order.total}</td>
              <td className="p-3">
  {getStatusBadge(order.status)}
</td>

              <td className="p-3">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  👁 View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
  className="
    bg-white
    p-6
    rounded-xl
    w-[90%]
    max-w-3xl
    max-h-[90vh]
    overflow-y-auto
    shadow-xl
  "
>

           <div className="mb-6 border-b pb-4">
  <div className="flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold">
        📦 Order Details
      </h2>

     <div className="mt-2 text-sm text-gray-500">

  <p>
    <strong>Order No:</strong>{" "}
    {selectedOrder.orderNumber}
  </p>

  <p className="mt-1">
    📅 {formatOrderDate(selectedOrder.createdAt)}
  </p>

</div>
      
    </div>

    <div>
      {getStatusBadge(selectedOrder.status)}
    </div>

  </div>
</div>

          <div className="mb-6 rounded-xl border bg-gray-50 p-4">

  <h3 className="mb-4 text-lg font-bold">
    👤 Customer Information
  </h3>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span className="text-gray-500">
        Customer
      </span>

      <span className="font-semibold">
        {selectedOrder.customerName}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">
        Phone
      </span>

      <span className="font-semibold">
        {selectedOrder.phone}
      </span>
    </div>

    <div>
      <p className="text-gray-500">
        Address
      </p>

      <p className="mt-1 font-medium">
        {selectedOrder.address || "Shop Pickup"}
      </p>
    </div>

    {selectedOrder.location && (
      <a
        href={selectedOrder.location}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-green-600 font-semibold hover:underline"
      >
        📍 Open in Google Maps
      </a>
    )}

  </div>

</div>

            <p><strong>Order No:</strong> {selectedOrder.orderNumber}</p>

            <div className="mt-3">
  <label className="font-bold">Status:</label>

  <select
    className="border ml-2 p-2 rounded"
    value={selectedOrder.status}
    onChange={(e) =>
      updateStatus(selectedOrder.id, e.target.value)
    }
  >
    <option value="Pending">Pending</option>
<option value="Packed">Packed</option>
<option value="Out for Delivery">
  Out for Delivery
</option>
<option value="Delivered">Delivered</option>
<option value="Cancelled">Cancelled</option>
  </select>
</div>
           <h3 className="mb-4 text-xl font-bold">
  🛒 Ordered Items
</h3>

<div className="overflow-hidden rounded-xl border">

  <table className="w-full">

    <thead className="bg-green-600 text-white">

      <tr>
        <th className="p-3 text-left">
          Product
        </th>

        <th className="p-3 text-center">
          Qty
        </th>

        <th className="p-3 text-right">
          Price
        </th>

        <th className="p-3 text-right">
          Total
        </th>
      </tr>

    </thead>

    <tbody>

      {selectedOrder.items?.map((item, index) => (

        <tr
          key={index}
          className="border-b last:border-0"
        >
<td className="p-3">
  <div className="font-medium">
    {item.name}
  </div>

  <div className="mt-1 text-sm text-gray-500">
    📦 {item.weight}
    {item.unit ? ` ${item.unit}` : ""}
  </div>
</td>

          <td className="p-3 text-center">
            {item.quantity}
          </td>

          <td className="p-3 text-right">
            ₹{item.sellingPrice}
          </td>

          <td className="p-3 text-right font-semibold">
            ₹{item.sellingPrice * item.quantity}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

            <div className="mt-6 rounded-xl border bg-green-50 p-5">

  <h3 className="mb-4 text-lg font-bold">
    📊 Order Summary
  </h3>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span>Total Items</span>

      <span className="font-semibold">
        {selectedOrder.items?.length}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Total Quantity</span>

      <span className="font-semibold">
        {selectedOrder.items?.reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Total PV</span>

      <span className="font-semibold">
        {selectedOrder.items?.reduce(
          (sum, item) =>
            sum +
            ((item.pv || 0) * item.quantity),
          0
        )}{" "}
        PV
      </span>
    </div>

    <hr />

    <div className="flex justify-between text-xl font-bold">

      <span>Grand Total</span>

      <span className="text-green-700">
        ₹{selectedOrder.total}
      </span>

    </div>

  </div>

</div>
            <hr className="my-6" />

<div className="flex flex-wrap justify-between gap-3">
{selectedOrder?.isArchived ? (
  <button
    onClick={() =>
      restoreOrder(selectedOrder.id)
    }
    className="
      rounded-lg
      bg-green-600
      px-5
      py-2
      font-semibold
      text-white
      transition
      hover:bg-green-700
    "
  >
    ↩ Restore Order
  </button>
) : (
  <button
    onClick={() =>
      archiveOrder(selectedOrder.id)
    }
    className="
      rounded-lg
      bg-yellow-500
      px-5
      py-2
      font-semibold
      text-white
      transition
      hover:bg-yellow-600
    "
  >
    📦 Archive Order
  </button>
)}

  <button
  onClick={() =>
    setShowDeleteModal(true)
  }
  className="
    rounded-lg
    bg-red-600
    px-5
    py-2
    font-semibold
    text-white
    transition
    hover:bg-red-700
  "
>
  🗑 Delete Order
</button>

</div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>

          </div>
        </div>
      )}
      {showDeleteModal && selectedOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl">

      <h2 className="mb-3 text-2xl font-bold text-red-600">
        ⚠ Delete Order
      </h2>

      <p className="mb-2">
        <strong>Customer:</strong>{" "}
        {selectedOrder.customerName}
      </p>

      <p className="mb-4">
        <strong>Order No:</strong>{" "}
        {selectedOrder.orderNumber}
      </p>

      <p className="mb-6 text-gray-600">
        This action cannot be undone.
        Are you sure you want to permanently
        delete this order?
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() =>
            setShowDeleteModal(false)
          }
          className="
            rounded-lg
            border
            px-4
            py-2
          "
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await deleteOrder(
              selectedOrder.id
            );

            setShowDeleteModal(false);
          }}
          className="
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-white
            hover:bg-red-700
          "
        >
          Delete Forever
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}

export default Orders;