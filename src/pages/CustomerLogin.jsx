import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../services/customerAuthService";
import { auth } from "../services/firebase";
function CustomerLogin() {
    const [phone, setPhone] = useState("");
    const [isSendingOtp, setIsSendingOtp] =
  useState(false);
    const navigate = useNavigate();
    useEffect(() => {
  console.log("CustomerLogin mounted");
  console.log("auth.currentUser:", auth.currentUser);

  if (auth.currentUser) {
    console.log("Redirecting to home...");
    navigate("/");
  }
}, [navigate]);
   const handleSendOTP = async () => {
  if (phone.length !== 10) {
    alert(
      "Please enter a valid 10-digit mobile number."
    );
    return;
  }

  try {
    setIsSendingOtp(true);

    const confirmationResult =
      await sendOTP("+91" + phone);
      
      sessionStorage.setItem(
  "customerPhone",
  phone
);

    window.confirmationResult =
      confirmationResult;

    navigate("/verify-otp");
  } catch (error) {
    console.error(error);

    alert(error.message);
  } finally {
    setIsSendingOtp(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
<h1 className="text-3xl font-bold text-center mb-4">
  🏡 Welcome to HomeeCart
</h1>

<p className="text-center text-gray-500 mb-8">
  Enter your mobile number to login or create a new account.
</p>

        
        <input
  type="tel"
  placeholder="Enter 10-digit Mobile Number"
  className="w-full border rounded-lg p-3 mb-6"
  value={phone}
  maxLength={10}
  onChange={(e) =>
    setPhone(e.target.value.replace(/\D/g, ""))
  }
/>
      <button
  onClick={handleSendOTP}
  disabled={isSendingOtp}
  className="
    w-full
    rounded-lg
    bg-green-600
    py-3
    text-white
    transition
    hover:bg-green-700
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {isSendingOtp
    ? "Sending OTP..."
    : "Continue"}
</button>
  

<div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default CustomerLogin;