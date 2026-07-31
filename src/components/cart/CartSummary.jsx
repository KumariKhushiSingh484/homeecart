import PurchaseValueCard from "./PurchaseValueCard";

function CartSummary({
  cartSubtotal,
  purchaseValidation,
  businessSettings,
  onCheckout,
  onContinueShopping,
}) {
  const canCheckout =
    purchaseValidation.isValid;

  return (
    <div className="shrink-0 border-t bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          Subtotal
        </span>

        <span className="text-lg font-bold">
          ₹{cartSubtotal}
        </span>
      </div>

      <PurchaseValueCard
        purchaseValidation={purchaseValidation}
        businessSettings={businessSettings}
      />

      <p className="mt-3 text-xs text-gray-500">
        🚚 Delivery charges calculated during
        checkout.
      </p>

      <button
        onClick={
          canCheckout
            ? onCheckout
            : onContinueShopping
        }
        className={`mt-4 w-full rounded-xl py-3 font-semibold text-white transition ${
          canCheckout
            ? "bg-green-600 hover:bg-green-700"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {canCheckout
          ? "Proceed to Checkout"
          : "Continue Shopping"}
      </button>
    </div>
  );
}

export default CartSummary;