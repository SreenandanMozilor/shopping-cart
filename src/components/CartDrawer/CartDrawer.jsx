import { Link } from 'react-router-dom'
import { FiX, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import './CartDrawer.css'

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity } = useCart()

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Shopping Cart ({cartItems.length})</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="drawer-empty">
              <FiShoppingBag size={48} />
              <p>Your cart is empty</p>
              <button className="continue-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="drawer-item">
                <img src={item.image} alt={item.title} />
                <div className="drawer-item-info">
                  <p className="drawer-item-title">{item.title}</p>
                  <p className="drawer-item-price">${item.price}</p>
                  <div className="drawer-item-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <p className="drawer-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/cart"
              className="view-cart-btn"
              onClick={onClose}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer