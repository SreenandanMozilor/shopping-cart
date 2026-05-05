import { Link } from 'react-router-dom'
import { FiX, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import './CartDrawer.css'
import PropTypes from 'prop-types'

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity } = useCart()

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )
  const shippingCost = totalPrice >= 50 ? 0 : 9.99

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
          <h2>Shopping Cart ({totalItems})</h2>
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
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="drawer-item">
                <Link to={`/product/${item.id}${item.selectedColor ? `?color=${item.selectedColor}${item.selectedSize ? `&size=${item.selectedSize}` : ''}` : ''}`} onClick={onClose}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className="drawer-item-info">
                  <Link to={`/product/${item.id}${item.selectedColor ? `?color=${item.selectedColor}${item.selectedSize ? `&size=${item.selectedSize}` : ''}` : ''}`} onClick={onClose} className="drawer-item-title">
                    {item.title}
                  </Link>
                  <p className="drawer-item-price">${item.price}</p>
                  {item.selectedColor && (
                    <p className="drawer-item-variant">
                      {item.selectedColor}{item.selectedSize ? ` / ${item.selectedSize}` : ''}
                    </p>
                  )}
                  <div className="drawer-item-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}>+</button>
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
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="drawer-subtotal">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="drawer-total">
              <span>Total</span>
              <span>
                ${(totalPrice + shippingCost).toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              className="view-cart-btn"
              onClick={onClose}
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/cart"
              className="continue-shopping-link"
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

CartDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default CartDrawer
