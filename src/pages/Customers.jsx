import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCustomers } from "../services/customerService";
import { Eye } from "lucide-react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getAllCustomers();
    setCustomers(data);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        👥 Customers
      </h1>

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full md:w-96 border rounded-lg p-3 mb-6"
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-green-600 text-white">
  <tr>
    <th className="p-4 text-left">
      Customer
    </th>

    <th className="p-4 text-center">
      Orders
    </th>

    <th className="p-4 text-center">
      Spent
    </th>

    <th className="p-4 text-center">
      PV
    </th>

    <th className="p-4 text-center">
      Last Login
    </th>

    <th className="p-4 text-center">
      Logins
    </th>

    <th className="p-4 text-center">
      Prime
    </th>

    <th className="p-4 text-center">
      Action
    </th>
  </tr>
</thead>

          <tbody>

            {filteredCustomers.map((customer) => (

            <tr
  key={customer.id}
  className="border-b transition-colors hover:bg-gray-50"
>
  {/* Customer */}
  <td className="p-4">
    <div>
      <p className="font-semibold text-gray-900">
        {customer.name}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        📱 {customer.phone}
      </p>
    </div>
  </td>

  {/* Orders */}
  <td className="p-4 text-center font-medium">
    {customer.totalOrders ?? 0}
  </td>

  {/* Total Spent */}
  <td className="p-4 text-center font-medium">
    ₹{customer.totalSpent ?? 0}
  </td>

  {/* Total PV */}
  <td className="p-4 text-center font-medium">
    {customer.totalPV ?? 0}
  </td>

  {/* Last Login */}
  <td className="p-4 text-center text-sm text-gray-600">
    {customer.lastLogin?.toDate
      ? customer.lastLogin
          .toDate()
          .toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })
      : "-"}
  </td>

  {/* Login Count */}
  <td className="p-4 text-center font-medium">
    {customer.loginCount ?? 0}
  </td>

  {/* Prime */}
  <td className="p-4 text-center">
    {customer.prime?.isActive ? (
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
        💎 Prime
      </span>
    ) : (
      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
        Regular
      </span>
    )}
  </td>

  {/* Action */}
  <td className="p-4 text-center">
   <button
  onClick={() =>
    navigate(`/admin/customers/${customer.id}`)
  }
  className="
    rounded-lg
    border
    border-green-600
    px-4
    py-2
    text-sm
    font-medium
    text-green-600
    transition
    hover:bg-green-600
    hover:text-white
  "
>
  View
</button>
  </td>
</tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Customers;