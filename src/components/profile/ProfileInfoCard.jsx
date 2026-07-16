import { useNavigate } from "react-router-dom";

function ProfileInfoCard({ customer }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          👤 Personal Information
        </h2>

        <button
          onClick={() => navigate("/edit-profile")}
          className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
        >
          Edit
        </button>

      </div>

      {/* Name */}

      <div className="mb-6 rounded-2xl border p-5">

        <p className="text-sm text-gray-500">
          Full Name
        </p>

        <p className="mt-2 text-lg font-semibold">
          {customer.name}
        </p>

      </div>

      {/* Phone */}

      <div className="rounded-2xl border p-5">

        <p className="text-sm text-gray-500">
          Mobile Number
        </p>

        <p className="mt-2 text-lg font-semibold">
          {customer.phone}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Phone number cannot be changed because it is used for login.
        </p>

      </div>

    </div>
  );
}

export default ProfileInfoCard;