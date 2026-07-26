import { useEffect, useState } from "react";

import { createOrder } from "../services/orderService";
import { getBusinessSettings } from "../services/settingsService";
import { calculateDelivery } from "../services/deliveryService";

import { generateOrderNumber } from "../utils/order/generateOrderNumber";
import { formatOrderMessage } from "../utils/order/formatOrderMessage";
import { validateCheckout } from "../utils/validation/validateCheckout";
import { validatePincode } from "../utils/delivery/validatePincode";

import { ORDER_STATUS } from "../constants/order";
import { WHATSAPP_NUMBER } from "../constants/app";

import AppToast from "../components/AppToast";
import OrderSummary from "../components/OrderSummary";

import useToast from "../hooks/useToast";

import { useCart } from "../context/CartContext";
import { useShopping } from "../context/ShoppingContext";
import { useCustomer } from "../context/CustomerContext";

import CustomerSection from "../components/checkout/CustomerSection";
import { formatDeliveryAddress } from "../utils/address/formatDeliveryAddress";
import DeliveryMethod from "../components/checkout/DeliveryMethod";
import DeliveryAddress from "../components/checkout/DeliveryAddress";
import LocationSection from "../components/checkout/LocationSection";
import { getProducts } from "../services/productService";
import { recommendCombination } from "../utils/recommendation/recommendCombination";
import LoginRequired from "../components/checkout/LoginRequired";
import { validatePurchaseRules } from "../utils/validation/validatePurchaseRules";
function Checkout() {
  /* -------------------------------------------------------------------------- */
  /* Contexts                                                                    */
  /* -------------------------------------------------------------------------- */

 const {
  cartItems,
  cartSubtotal,
  clearCart,
  addToCart,
} = useCart();

  const {
    showCheckout,
    closeCheckout,
    completeOrder,
  } = useShopping();

  const {
    authUser,
    customer,
    loadingCustomer,
  } = useCustomer();

  const {
    toast,
    setToast,
    showToast,
  } = useToast();

  /* -------------------------------------------------------------------------- */
  /* States                                                                      */
  /* -------------------------------------------------------------------------- */

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [deliveryMethod, setDeliveryMethod] =
    useState("delivery");

  const [pincode, setPincode] =
    useState("");

  const [deliveryAddress, setDeliveryAddress] = useState({
  houseNo: "",
  landmark: "",
  addressLine: "",
});

  const [location, setLocation] =
    useState("");

  const [businessSettings, setBusinessSettings] =
    useState(null);


const [products, setProducts] =
  useState([]);

  const [delivery, setDelivery] =
    useState(null);

  const [pincodeStatus, setPincodeStatus] =
    useState({
      isValid: false,
      message: "",
    });

  const [isPlacingOrder, setIsPlacingOrder] =
    useState(false);

  /* -------------------------------------------------------------------------- */
  /* Customer                                                                    */
  /* -------------------------------------------------------------------------- */

 useEffect(() => {
  if (!customer) return;

  setCustomerName(customer.name ?? "");

  setPhone(customer.phone ?? "");

  setPincode(customer.pincode ?? "");

  setDeliveryAddress({
    houseNo: customer.houseNo ?? "",
    landmark: customer.landmark ?? "",
    addressLine:
      customer.addressLine ??
      customer.address ??
      "",
  });
}, [customer]);
useEffect(() => {
  async function loadProducts() {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      showToast(
        "error",
        "Failed to load products."
      );
    }
  }

  loadProducts();
}, []);
  /* -------------------------------------------------------------------------- */
  /* Business Settings                                                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function loadBusinessSettings() {
      try {
        const settings =
          await getBusinessSettings();

        setBusinessSettings(settings);
      } catch (error) {
        console.error(error);

        showToast(
          "error",
          "Failed to load business settings."
        );
      }
    }

    loadBusinessSettings();
  }, []);

  /* -------------------------------------------------------------------------- */
  /* Delivery Calculation                                                        */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!businessSettings) return;

    if (deliveryMethod === "pickup") {
      setDelivery({
        summary: {
          finalDeliveryCharge: 0,
        },
      });

      return;
    }

    const result = calculateDelivery(
      cartItems,
      businessSettings,
      0
    );

    setDelivery(result);

  }, [
    cartItems,
    businessSettings,
    deliveryMethod,
  ]);

  /* -------------------------------------------------------------------------- */
  /* Pincode Validation                                                          */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (
      deliveryMethod !== "delivery" ||
      !businessSettings
    ) {
      return;
    }

    const result = validatePincode(
      pincode,
      businessSettings.serviceablePincodes || []
    );

    setPincodeStatus(result);

  }, [
    pincode,
    businessSettings,
    deliveryMethod,
  ]);


 
  /* -------------------------------------------------------------------------- */
  /* Cleanup                                                                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (deliveryMethod === "pickup") {
      setLocation("");
    }
  }, [deliveryMethod]);
/* -------------------------------------------------------------------------- */
/* Derived Values                                                              */
/* -------------------------------------------------------------------------- */

console.log("Delivery:", delivery);
console.log("Weight Validation:", delivery?.validation?.weight);

const deliveryCharge =
  delivery?.summary?.finalDeliveryCharge ?? 0;
  const finalTotal =
    cartSubtotal + deliveryCharge;
const purchaseValidation =
  validatePurchaseRules({
    cartItems,
    businessSettings,
  });

  /* -------------------------------------------------------------------------- */
  /* Early Returns                                                               */
  /* -------------------------------------------------------------------------- */

  if (!showCheckout) return null;

if (loadingCustomer) return null;

if (!customer) {
  return (
    <LoginRequired
      closeCheckout={closeCheckout}
    />
  );
}
  /* -------------------------------------------------------------------------- */
  /* Helper Functions                                                            */
  /* -------------------------------------------------------------------------- */

  const getLocation = () => {
    if (!navigator.geolocation) {
      showToast(
        "error",
        "Geolocation is not supported."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        setLocation(
          `https://maps.google.com/?q=${latitude},${longitude}`
        );
      },
      () => {
        showToast(
          "error",
          "Unable to fetch location."
        );
      }
    );
  };

  /* -------------------------------------------------------------------------- */
  /* Place Order                                                                 */
  /* -------------------------------------------------------------------------- */

  const placeOrder = async () => {
    if (isPlacingOrder) return;
       
    if (
  deliveryMethod === "delivery" &&
  !pincodeStatus.isValid
) {
  showToast(
    "error",
    pincodeStatus.message
  );

  return;
}

if (
  deliveryMethod === "delivery" &&
  !delivery?.validation?.weight
) {
  showToast(
    "error",
    delivery.message
  );

  return;
}
const validation = validateCheckout({
  customerName,
  phone,
  deliveryAddress:
    deliveryMethod === "delivery"
      ? deliveryAddress
      : {
          houseNo: "",
          landmark: "",
          addressLine: "",
        },
  cartItems,
  deliveryMethod,
  location,
});
const purchaseValidation =
  validatePurchaseRules({
    cartItems,
    businessSettings,
  });

    if (!validation.isValid) {
      showToast(
        "error",
        validation.message
      );

      return;
    }
    if (!purchaseValidation.isValid) {
  showToast(
    "error",
    purchaseValidation.message
  );

  return;
}

    if (!authUser) {
      showToast(
        "error",
        "Please login again."
      );

      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderNumber =
        generateOrderNumber();
const formattedAddress =
  formatDeliveryAddress(deliveryAddress);
      const order = {
        uid: authUser.uid,

        orderNumber,

        customerName,

        phone,

        deliveryMethod,

       address:
  deliveryMethod === "delivery"
    ? formattedAddress
    : "",

        pincode:
          deliveryMethod === "delivery"
            ? pincode
            : "",

        location:
          deliveryMethod === "delivery"
            ? location
            : "",

        items: cartItems,

        subtotal: cartSubtotal,

        deliveryCharge,

        total: finalTotal,

        status: ORDER_STATUS.PENDING,

        createdAt: new Date(),
      };

      await createOrder(order);

      const message =
        formatOrderMessage(order);

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );

      completeOrder(order);

      clearCart();

    } catch (error) {
      console.error(error);

      showToast(
        "error",
        "Failed to place order."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* UI                                                                         */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        <button
          onClick={closeCheckout}
          className="absolute right-5 top-5 text-2xl text-gray-500 transition hover:text-red-600"
        >
          ✕
        </button>

        <div className="p-8">

          <AppToast
            toast={toast}
            setToast={setToast}
          />

          <h1 className="mb-8 text-center text-3xl font-bold">
            Checkout
          </h1>

          
 {/* ------------------------------------------------------------------ */}
          {/* Delivery Method                                                    */}
          {/* ------------------------------------------------------------------ */}



<DeliveryMethod
  deliveryMethod={deliveryMethod}
  setDeliveryMethod={setDeliveryMethod}
/>


          <OrderSummary
            items={cartItems}
            subtotal={cartSubtotal}
            delivery={delivery}
            total={finalTotal}
          />

          {/* ------------------------------------------------------------------ */}
          {/* Customer Information                                               */}
          {/* ------------------------------------------------------------------ */}
<CustomerSection
  customerName={customerName}
  phone={phone}
/>
               

          {/* ------------------------------------------------------------------ */}
          {/* Home Delivery                                                      */}
          {/* ------------------------------------------------------------------ */}

        {deliveryMethod === "delivery" && (
  <DeliveryAddress
    pincode={pincode}
    setPincode={setPincode}
    pincodeStatus={pincodeStatus}
    deliveryAddress={deliveryAddress}
    setDeliveryAddress={setDeliveryAddress}
  />
)}
          {/* ------------------------------------------------------------------ */}
          {/* Store Pickup                                                       */}
          {/* ------------------------------------------------------------------ */}

          {deliveryMethod === "pickup" && (

            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

              <h2 className="mb-3 text-xl font-semibold">
                🏪 Store Pickup
              </h2>

              <p className="text-gray-700">
                Your order will be prepared and kept ready
                for collection from our store.
              </p>

              <div className="mt-5 rounded-xl bg-white p-4">

                <p className="font-medium">
                  Pickup Charge
                </p>

                <p className="mt-1 text-2xl font-bold text-green-700">
                  FREE
                </p>

              </div>

            </div>

          )}          {/* ------------------------------------------------------------------ */}
          {/* Current Location                                                   */}
          {/* ------------------------------------------------------------------ */}
{deliveryMethod === "delivery" && (
  <LocationSection
    location={location}
    getLocation={getLocation}
  />
)}

          {/* ------------------------------------------------------------------ */}
          {/* Order Total                                                        */}
          {/* ------------------------------------------------------------------ */}

          <div className="mt-8 rounded-2xl border bg-gray-50 p-6">

            <h2 className="mb-5 text-xl font-semibold">
              Order Summary
            </h2>

            <div className="flex items-center justify-between py-2">

              <span>Subtotal</span>

              <span>
                ₹{cartSubtotal.toFixed(2)}
              </span>

            </div>

            <div className="flex items-center justify-between py-2">

              <span>Delivery</span>

              <span>
                ₹{deliveryCharge.toFixed(2)}
              </span>

            </div>

            <hr className="my-4" />

            <div className="flex items-center justify-between text-xl font-bold">

              <span>Total</span>

              <span className="text-green-700">
                ₹{finalTotal.toFixed(2)}
              </span>

            </div>
<hr className="my-5" />

<h3 className="mb-4 text-lg font-semibold">
  ⭐ Purchase Value
</h3>

<div className="flex justify-between py-1">
  <span>Current PV</span>

  <span className="font-semibold">
    {purchaseValidation.totalPV ?? 0}
  </span>
</div>

{businessSettings?.minimumPurchasePVEnabled && (
  <>
    <div className="flex justify-between py-1">
      <span>Required PV</span>

      <span className="font-semibold">
        {purchaseValidation.minimumPV}
      </span>
    </div>

    {purchaseValidation.isValid ? (
  <div
    className="
      mt-4
      rounded-xl
      border
      border-green-300
      bg-green-50
      p-4
    "
  >
    <div className="flex items-center justify-center gap-2">
      <span className="text-2xl">🎉</span>

      <div className="text-left">
        <p className="font-bold text-green-700">
          Congratulations!
        </p>

        <p className="text-sm text-green-600">
          Your purchase value requirement has
          been completed.
        </p>
      </div>
    </div>
  </div>
) : (
     <div
  className="
    mt-4
    rounded-xl
    border
    border-orange-200
    bg-orange-50
    p-4
  "
>
 <h3 className="text-center text-xl font-bold text-orange-700">
  {purchaseValidation.remainingPV} More PV Required
</h3>

  <p className="mt-2 text-center text-base text-gray-700">
  Continue shopping to complete the required purchase value.
</p>

  
 
<button
  type="button"
  onClick={closeCheckout}
  className="
    mt-6
    w-full
    rounded-xl
    bg-green-600
    py-3.5
    text-lg
    font-semibold
    text-white
    shadow-md
    transition-all
    duration-200
    hover:bg-green-700
    hover:shadow-lg
  "
>
  Continue Shopping
</button>
</div>
    )}
  </>
)}
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* Place Order                                                        */}
          {/* ------------------------------------------------------------------ */}

          <div className="mt-10">

            <button
  onClick={placeOrder}
  disabled={
    isPlacingOrder ||
    (
      deliveryMethod === "delivery" &&
      (
        !pincodeStatus.isValid ||
        !delivery?.validation?.weight
      )
    ) ||
    !purchaseValidation.isValid
  }
  className={`w-full rounded-xl py-4 text-lg font-semibold transition ${
    isPlacingOrder ||
    !purchaseValidation.isValid ||
    (
      deliveryMethod === "delivery" &&
      (
        !pincodeStatus.isValid ||
        !delivery?.validation?.weight
      )
    )
      ? "cursor-not-allowed bg-gray-300 text-gray-600"
      : "bg-green-600 text-white hover:bg-green-700"
  }`}
>
  {isPlacingOrder
    ? "Placing Order..."
    : "Place Order"}
</button>

            {deliveryMethod === "delivery" &&
              !pincodeStatus.isValid && (

              <p className="mt-3 text-center text-sm text-red-600">
                Please enter a serviceable pincode before placing
                your order.
              </p>

            )}
            {deliveryMethod === "delivery" &&
  !delivery?.validation?.weight && (
    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-center">
      <p className="font-medium text-red-700">
        ⚠️ Your order is overweight.
      </p>

      <p className="mt-1 text-sm text-red-600">
        Maximum order weight for Home Delivery is <strong>30 kg</strong>.
        Please reduce the quantity or choose <strong>Store Pickup</strong>.
      </p>
    </div>
)}
          </div>        </div>

      </div>

    </div>

  );
}

export default Checkout;