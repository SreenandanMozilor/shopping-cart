import { useCart } from '../../context/CartContext'

const Cart = () => {
  const { cartItems, updateQuantity } = useCart()
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="cart-item-info">
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
          <div className="cart-item-controls">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="cart-total">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default Cart