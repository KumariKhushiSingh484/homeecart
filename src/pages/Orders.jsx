import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));

      const orderList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Customer Orders
      </h1>

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
          {orders.map((order) => (
            <tr key={order.id} className="border-b text-center">
              <td className="p-3">{order.customerName}</td>
              <td className="p-3">{order.phone}</td>
              <td className="p-3">₹{order.total}</td>
              <td className="p-3">{order.status}</td>

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
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              📦 Order Details
            </h2>

            <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
          
<p>
  <strong>Address:</strong><br />
  {selectedOrder.address}
</p>

{selectedOrder.location && (
  <p className="mt-3">
    <a
      href={selectedOrder.location}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 underline font-semibold"
    >
      📍 Open in Google Maps
    </a>
  </p>
)}
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
    <option value="Out for Delivery">Out for Delivery</option>
    <option value="Delivered">Delivered</option>
  </select>
</div>
            <h3 className="text-xl font-bold mt-5 mb-2">
              🛒 Items
            </h3>

            <ul className="list-disc ml-6">
              {selectedOrder.items?.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity} — ₹
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mt-5">
              Total: ₹{selectedOrder.total}
            </h3>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;