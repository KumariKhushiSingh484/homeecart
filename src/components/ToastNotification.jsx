import { CheckCircle, AlertCircle, Info } from "lucide-react";

function ToastNotification({
  type = "success",
  message,
}) {
  const variants = {
    success: {
      bg: "bg-green-600",
      icon: <CheckCircle size={20} />,
    },
    error: {
      bg: "bg-red-600",
      icon: <AlertCircle size={20} />,
    },
    info: {
      bg: "bg-blue-600",
      icon: <Info size={20} />,
    },
  };

  const current =
    variants[type] || variants.success;

  return (
    <div
      className={`
        fixed
        top-5
        right-5
        z-50
        flex
        items-center
        gap-3
        rounded-xl
        px-5
        py-3
        text-white
        shadow-2xl
        animate-slide-in
        ${current.bg}
      `}
    >
      {current.icon}

      <span className="font-medium">
        {message}
      </span>
    </div>
  );
}

export default ToastNotification;
