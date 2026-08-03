import { useState } from "react";

function PurchaseValueCard({
  purchaseValidation,
  businessSettings,
}) {
  const [expanded, setExpanded] = useState(false);

  if (!businessSettings?.minimumPurchasePVEnabled) {
    return null;
  }

  const {
    totalPV,
    minimumPV,
    remainingPV,
    isValid,
  } = purchaseValidation;

  const progress = Math.max(
    0,
    Math.min((totalPV / minimumPV) * 100, 100)
  );

  return (
    <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          Purchase Value (PV)
        </h3>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-orange-700 shadow-sm">
          {totalPV} / {minimumPV} PV
        </span>
      </div>

      {/* Status */}
      {isValid ? (
        <p className="mt-2 text-sm font-semibold text-green-700">
          ✓ Your order is ready for checkout.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm font-semibold text-orange-700">
            {remainingPV} PV more required to place your order.
          </p>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-xs font-medium text-orange-700 hover:text-orange-800"
          >
            {expanded ? (
              <>
                ▲ Hide details
              </>
            ) : (
              <>
                ▼ View details
              </>
            )}
          </button>
        </>
      )}

      {/* Expandable Details */}
      {expanded && !isValid && (
        <div className="mt-3 border-t border-orange-200 pt-3">
          {/* Progress Bar */}
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 text-xs leading-5 text-gray-600">
            <p>
              Your cart contains ₹1 promotional products.
            </p>

            <p className="mt-2">
              Purchase Value (PV) is calculated automatically from the
              products in your cart.
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Most regular grocery products increase your Purchase
                Value.
              </li>

              <li>
                ₹1 promotional products may reduce your Purchase Value.
              </li>

              <li>
                Reach{" "}
                <strong>{minimumPV} PV</strong> to place your order
                with ₹1 promotional products.
              </li>
            </ul>

            <p className="mt-3 font-medium text-green-700">
              ✓ HomeeCart calculates everything automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseValueCard;