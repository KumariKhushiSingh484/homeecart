import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { calculateCartTotal } from "../utils/cart/calculateCartTotal";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  const toastTimer = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const showCartToast = (product) => {
    setToast(product);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        const updatedQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stock ?? Infinity
        );

        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: updatedQuantity,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: Math.min(
            quantity,
            product.stock ?? quantity
          ),
        },
      ];
    });

    showCartToast(product);
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== productId) return item;

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            item.stock ?? Infinity
          ),
        };
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevCart) => {
      const item = prevCart.find(
        (product) => product.id === productId
      );

      if (!item) return prevCart;

      if (item.quantity === 1) {
        return prevCart.filter(
          (product) => product.id !== productId
        );
      }

      return prevCart.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: product.quantity - 1,
            }
          : product
      );
    });
  };

  const deleteFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const {
    subtotal: cartSubtotal,
    delivery: cartDelivery,
    total: cartTotal,
  } = calculateCartTotal(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,

        cartCount,
        cartSubtotal,
        cartDelivery,
        cartTotal,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
        clearCart,

        toast,
        setToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}