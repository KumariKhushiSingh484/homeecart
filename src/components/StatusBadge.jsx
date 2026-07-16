import { getOrderStatusBadge } from "../utils/order/getOrderStatusBadge";

function StatusBadge({
  status,
  className = "",
}) {
  const badge =
    getOrderStatusBadge(status);

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${badge.bg} ${badge.text} ${className}`}
    >
      {badge.label}
    </span>
  );
}

export default StatusBadge;