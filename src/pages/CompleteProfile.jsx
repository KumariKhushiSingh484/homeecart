import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { saveCustomer } from "../services/customerService";
function CompleteProfile() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
  if (!name.trim() || !address.trim()) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const user = auth.currentUser;

    await saveCustomer(user.uid, {
      name,
      phone: user.phoneNumber,
      address,
    });

    alert("Profile saved successfully ✅");

    navigate("/");
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-4">
          Complete Your Profile
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Just one more step before placing your first order.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg p-3 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Delivery Address"
          className="w-full border rounded-lg p-3 mb-6"
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}

export default CompleteProfile;