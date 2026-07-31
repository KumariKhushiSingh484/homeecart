import CartItem from "./CartItem";

function CartItemList({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
}) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          deleteFromCart={deleteFromCart}
        />
      ))}
    </div>
  );
}

export default CartItemList;