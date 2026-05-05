import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cartItems, updateQuantity } = useCart()
  const navigate = useNavigate()

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )
  const shippingCost = subtotal >= 50 ? 0 : 9.99
  const total = subtotal + shippingCost

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
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item">
              <Link to={`/product/${item.id}${item.selectedColor ? `?color=${item.selectedColor}${item.selectedSize ? `&size=${item.selectedSize}` : ''}` : ''}`}>
                <img src={item.image} alt={item.title} />
              </Link>
              <div className="cart-item-info">
                <Link to={`/product/${item.id}${item.selectedColor ? `?color=${item.selectedColor}${item.selectedSize ? `&size=${item.selectedSize}` : ''}` : ''}`}>
                  <h3>{item.title}</h3>
                </Link>
                <p className="cart-item-price">${item.price}</p>
                {item.selectedColor && (
                  <p className="cart-item-variant">
                    {item.selectedColor}{item.selectedSize ? ` / ${item.selectedSize}` : ''}
                  </p>
                )}
              </div>
              <div className="cart-item-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}>+</button>
              </div>
              <p className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                className="cart-item-remove"
                onClick={() => updateQuantity(item.id, 0, item.selectedColor, item.selectedSize)}
                title="Remove item"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            {shippingCost > 0 && (
              <p className="free-shipping-note">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
          <Link to="/shop" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
