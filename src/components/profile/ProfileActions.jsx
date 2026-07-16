import { useNavigate } from "react-router-dom";

import { logoutCustomer } from "../../services/customerAuthService";

function ProfileActions() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutCustomer();

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Failed to logout.");
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        ⚙️ Account
      </h2>

      <div className="space-y-4">

        <button
          className="flex w-full items-center justify-between rounded-2xl border p-5 transition hover:bg-gray-50"
        >
          <span>
            ❤️ About HomeEcart
          </span>

          <span>
            →
          </span>
        </button>

        <button
          className="flex w-full items-center justify-between rounded-2xl border p-5 transition hover:bg-gray-50"
        >
          <span>
            📞 Contact Support
          </span>

          <span>
            →
          </span>
        </button>

        <button
          className="flex w-full items-center justify-between rounded-2xl border p-5 transition hover:bg-gray-50"
        >
          <span>
            📄 Privacy Policy
          </span>

          <span>
            →
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-between rounded-2xl border border-red-300 bg-red-50 p-5 font-semibold text-red-600 transition hover:bg-red-100"
        >
          <span>
            🚪 Logout
          </span>

          <span>
            →
          </span>
        </button>

      </div>

      <p className="mt-8 text-center text-sm text-gray-400">
        HomeEcart v1.0.0
      </p>

    </div>
  );
}

export default ProfileActions;