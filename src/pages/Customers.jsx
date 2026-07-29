import { useEffect, useState } from "react";

import { getAllCustomers } from "../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

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
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Phone
              </th>

              <th className="p-3">
                Orders
              </th>

              <th className="p-3">
                Spent
              </th>

              <th className="p-3">
                Prime
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (

              <tr
                key={customer.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {customer.name}
                </td>

                <td className="p-3">
                  {customer.phone}
                </td>

              <td className="text-center">
  {customer.totalOrders ?? 0}
</td>

<td className="text-center">
  ₹{customer.totalSpent ?? 0}
</td>
                <td className="text-center">
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
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Customers;