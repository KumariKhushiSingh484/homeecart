import clsx from "clsx";

const variants = {
  success:
    "bg-green-100 text-green-700 border-green-200",

  warning:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  danger:
    "bg-red-100 text-red-700 border-red-200",

  info:
    "bg-blue-100 text-blue-700 border-blue-200",

  gray:
    "bg-gray-100 text-gray-700 border-gray-200",
};

const statusVariants = {
  Pending: "warning",

  Confirmed: "info",

  Packed: "info",

  "Out for Delivery": "info",

  Delivered: "success",

  Cancelled: "danger",
};

function Badge({
  children,
  variant,
  status,
  className = "",
}) {
  const resolvedVariant =
    variant ||
    statusVariants[status] ||
    "gray";

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variants[resolvedVariant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;