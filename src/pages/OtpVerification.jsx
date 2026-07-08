import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/customerAuthService";
import { getCustomer } from "../services/customerService";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

   try {
  const user = await verifyOTP(otp);

  console.log("Customer Logged In:", user);

  const customer = await getCustomer(user.uid);

  if (customer) {
    navigate("/");
  } else {
    navigate("/complete-profile");
  }
} catch (error) {
  console.error(error);
  alert("Invalid OTP. Please try again.");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-4">
          🔐 Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the 6-digit OTP sent to your mobile number.
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border rounded-lg p-3 mb-6 text-center text-2xl tracking-widest"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, ""))
          }
        />

        <button
          onClick={handleVerifyOTP}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
}

export default OtpVerification;