import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";
import { saveCustomer } from "../services/customerService";

function CompleteProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return;

    if (!name.trim() || !address.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("User not found.");
      return;
    }

    setIsSaving(true);

    try {
      await saveCustomer(user.uid, {
        name: name.trim(),

        phone: user.phoneNumber,

        addresses: [
          {
            id: crypto.randomUUID(),

            label: "Home",

            address: address.trim(),

            isDefault: true,
          },
        ],

        prime: {
          isActive: false,
          code: "",
          activatedAt: null,
        },
      });

      alert("Profile completed successfully ✅");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center">
          Complete Your Profile
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Just one more step before placing your first order.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-8 w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          rows="4"
          placeholder="Home Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-5 w-full resize-none rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`mt-8 w-full rounded-xl py-4 font-semibold text-white transition ${
            isSaving
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSaving
            ? "Saving..."
            : "Complete Profile"}
        </button>

      </div>

    </div>
  );
}

export default CompleteProfile;