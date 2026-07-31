import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Validate stock before placing an order.
 */
export async function validateStock(cartItems) {
  for (const item of cartItems) {
    const productRef = doc(db, "products", item.id);

    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return {
        valid: false,
        message: `${item.name} no longer exists.`,
      };
    }

    const product = productSnapshot.data();

    if (product.isActive === false) {
      return {
        valid: false,
        message: `${item.name} is currently unavailable.`,
      };
    }

    if (product.stock < item.quantity) {
      return {
        valid: false,
        message: `Only ${product.stock} ${product.unit} of ${item.name} available.`,
      };
    }
  }

  return {
    valid: true,
  };
}