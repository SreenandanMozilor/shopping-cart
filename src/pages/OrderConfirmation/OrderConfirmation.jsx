import { Link } from 'react-router-dom'
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi'
import './OrderConfirmation.css'

const OrderConfirmation = () => {
  const orderNumber = Math.floor(Math.random() * 900000 + 100000)

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">
          <FiCheckCircle size={64} />
        </div>
        <h1>Order Placed Successfully!</h1>
        <p className="confirmation-subtitle">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="confirmation-order-number">
          <span>Order Number</span>
          <strong>#{orderNumber}</strong>
        </div>
        <p className="confirmation-message">
          A confirmation email will be sent to your email address shortly.
          Your items will be delivered within 3–5 business days.
        </p>
        <div className="confirmation-actions">
          <Link to="/shop" className="continue-shopping-btn">
            <FiShoppingBag size={18} />
            Continue Shopping
          </Link>
          <Link to="/" className="go-home-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation