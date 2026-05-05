import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cartItems, updateQuantity } = useCart()

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <Link to={`/product/${item.id}`}>
            <img src={item.image} alt={item.title} />
          </Link>
          <div className="cart-item-info">
            <Link to={`/product/${item.id}`}>
              <h3>{item.title}</h3>
            </Link>
            <p>${item.price}</p>
            {item.selectedColor && (
              <p style={{ fontSize: '0.85rem', color: '#999' }}>
                {item.selectedColor}{item.selectedSize ? ` / ${item.selectedSize}` : ''}
              </p>
            )}
          </div>
          <div className="cart-item-controls">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}>+</button>
          </div>
          <p className="cart-item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
      <div className="cart-summary">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  )
}

export default Cart