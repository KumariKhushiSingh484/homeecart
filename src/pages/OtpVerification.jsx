import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  verifyOTP,
  sendOTP,
} from "../services/customerAuthService";
import { getCustomer } from "../services/customerService";
import useToast from "../hooks/useToast";
import ToastNotification from "../components/AppToast";
import { getAuthErrorMessage } from "../utils/auth/getAuthErrorMessage";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] =
  useState(false);
  const [countdown, setCountdown] =
  useState(30);

const [isResending, setIsResending] =
  useState(false);
  const navigate = useNavigate();
  const {
  toast,
  setToast,
  showToast,
} = useToast();

  const customerPhone =
  sessionStorage.getItem("customerPhone") || "";

const maskedPhone =
  customerPhone.length === 10
    ? `+91 ******${customerPhone.slice(-4)}`
    : "";
 
  useEffect(() => {
  if (countdown === 0) return;

  const timer = setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [countdown]);

 const handleVerifyOTP = async () => {
  if (otp.length !== 6) {
    showToast(
  "error",
  "Please enter a valid 6-digit OTP."
);
    return;
  }

  try {
    setIsVerifying(true);

    const user = await verifyOTP(otp);

    console.log("Customer Logged In:", user);

   const customer = await getCustomer(user.uid);

const redirectAfterLogin =
  sessionStorage.getItem("redirectAfterLogin");

if (customer) {
  if (redirectAfterLogin === "checkout") {
    sessionStorage.removeItem(
      "redirectAfterLogin"
    );

    navigate("/", {
      state: {
        openCheckout: true,
      },
    });
  } else {
    navigate("/");
  }
} else {
  navigate("/complete-profile");
}
  } catch (error) {
    console.error(error);
showToast(
  "error",
  getAuthErrorMessage(error)
);
  } finally {
    setIsVerifying(false);
  }
};
const handleResendOTP = async () => {
  const phone = sessionStorage.getItem("customerPhone");

  if (!phone) {
    showToast(
  "error",
  "Phone number not found. Please login again."
);
    navigate("/login");
    return;
  }

  try {
    setIsResending(true);

    const confirmationResult = await sendOTP("+91" + phone);

    window.confirmationResult = confirmationResult;

    setCountdown(30);

  showToast(
  "success",
  "OTP resent successfully."
);
  } catch (error) {
    console.error(error);
   showToast(
  "error",
  getAuthErrorMessage(error)
);
  } finally {
    setIsResending(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastNotification
  toast={toast}
  setToast={setToast}
/>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-4">
          🔐 Verify OTP
        </h1>

       <div className="mb-8 text-center">
  <p className="text-gray-500">
    Enter the 6-digit OTP sent to
  </p>

  <p className="mt-2 font-semibold text-green-700">
    {maskedPhone}
  </p>
</div>
<button
  onClick={() => {
    sessionStorage.removeItem("customerPhone");
    navigate("/login");
  }}
 className="
  mt-2
  w-full
  text-center
  text-sm
  text-green-600
  hover:underline
"
>
  Change mobile number
</button>
        <input
  autoFocus
  type="text"
  placeholder="Enter OTP"
  className="w-full border rounded-lg p-3 mb-6 text-center text-2xl tracking-widest"
  maxLength={6}
  value={otp}
  onChange={(e) =>
    setOtp(e.target.value.replace(/\D/g, ""))
  }
  onKeyDown={(event) => {
  if (event.key === "Enter") {
    handleVerifyOTP();
  }
}}
/>
<button
  onClick={handleVerifyOTP}
  disabled={isVerifying}
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
  {isVerifying
    ? "Verifying OTP..."
    : "Verify OTP"}
</button>
<div className="mt-6 text-center">
  <p className="mb-2 text-sm text-gray-500">
    Didn't receive the OTP?
  </p>

  <button
    onClick={handleResendOTP}
    disabled={countdown > 0 || isResending}
    className="
      font-semibold
      text-green-600
      transition
      hover:underline
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >
    {isResending
      ? "Sending OTP..."
      : countdown > 0
      ? `Resend OTP (${countdown}s)`
      : "Resend OTP"}
  </button>
  <div id="recaptcha-container"></div>
</div>
      </div>
    </div>
  );
}

export default OtpVerification;