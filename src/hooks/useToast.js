import { useState, useEffect } from "react";

function useToast() {
  const [toast, setToast] = useState(null);
  const [toastTimer, setToastTimer] = useState(null);

  const showToast = (type, message) => {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    setToast({ type, message });

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    setToastTimer(timer);
  };

  useEffect(() => {
    return () => clearTimeout(toastTimer);
  }, [toastTimer]);

  return {
    toast,
    setToast,
    showToast,
  };
}

export default useToast;