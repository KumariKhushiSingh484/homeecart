function OrderSuccessModal({
  orderPlaced,
  placedOrder,
  generateInvoice,
  setCartItems,
  setShowCart,
  setOrderPlaced,
})  {
  if (!orderPlaced) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-2xl text-center w-[95%] md:w-96">

        <div>
          <h2 className="text-3xl font-bold text-green-600">
            🎉 Order Placed Successfully!
          </h2>

          <p className="mt-3 text-xl font-semibold">
           Order #{placedOrder?.orderNumber}
          </p>
        </div>

        <p className="mt-4 text-lg">
          🚴 Delivery in 10 minutes
        </p>

        <p className="mt-2 text-gray-500">
          Thank you for shopping with HomeEcart ❤️
        </p>

        <button
          onClick={generateInvoice}
          className="mt-6 mr-3 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          📄 Download Invoice
        </button>

        <button
          onClick={() => {
            setCartItems([]);
            setShowCart(false);
            setOrderPlaced(false);
          }}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default OrderSuccessModal;