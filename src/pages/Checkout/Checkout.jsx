import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCreditCard, FiTruck, FiShield } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import './Checkout.css'

const TAX_RATE = 0.08 // 8% — change this value to update tax globally

const Checkout = () => {
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', address: '', city: '', state: '', zip: ''
  })

  const [payment, setPayment] = useState({
    cardNumber: '', expiry: '', cvv: '', cardName: ''
  })

  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )
  const shippingCost = subtotal >= 50 ? 0 : 9.99
  const tax = subtotal * TAX_RATE
  const total = subtotal + shippingCost + tax

  const handleShippingChange = (e) => {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handlePaymentChange = (e) => {
    setPayment(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!shipping.firstName) newErrors.firstName = 'Required'
    if (!shipping.lastName) newErrors.lastName = 'Required'
    if (!shipping.email) newErrors.email = 'Required'
    if (!shipping.phone) newErrors.phone = 'Required'
    if (!shipping.address) newErrors.address = 'Required'
    if (!shipping.city) newErrors.city = 'Required'
    if (!shipping.state) newErrors.state = 'Required'
    if (!shipping.zip) newErrors.zip = 'Required'
    if (!payment.cardNumber) newErrors.cardNumber = 'Required'
    if (!payment.expiry) newErrors.expiry = 'Required'
    if (!payment.cvv) newErrors.cvv = 'Required'
    if (!payment.cardName) newErrors.cardName = 'Required'
    return newErrors
  }

  const handlePlaceOrder = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setProcessing(true)
    setTimeout(() => {
      clearCart()
      navigate('/order-confirmation')
    }, 1500)
  }

  return (
    <div className="checkout-page">
      <button className="checkout-back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft size={16} /> Back
      </button>

      <h1>Checkout</h1>

      <div className="checkout-content">
        {/* Left — Forms */}
        <div className="checkout-forms">
          {/* Shipping */}
          <div className="checkout-section">
            <h2>Shipping Information</h2>
            <div className="form-row">
              <div className="form-field">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={shipping.firstName}
                  onChange={handleShippingChange}
                  className={errors.firstName ? 'error-input' : ''}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={shipping.lastName}
                  onChange={handleShippingChange}
                  className={errors.lastName ? 'error-input' : ''}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={shipping.email}
                onChange={handleShippingChange}
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input
                name="phone"
                value={shipping.phone}
                onChange={handleShippingChange}
                className={errors.phone ? 'error-input' : ''}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="form-field">
              <label>Street Address</label>
              <input
                name="address"
                value={shipping.address}
                onChange={handleShippingChange}
                className={errors.address ? 'error-input' : ''}
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>
            <div className="form-row three-col">
              <div className="form-field">
                <label>City</label>
                <input
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  className={errors.city ? 'error-input' : ''}
                />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  name="state"
                  value={shipping.state}
                  onChange={handleShippingChange}
                  className={errors.state ? 'error-input' : ''}
                />
                {errors.state && <span className="field-error">{errors.state}</span>}
              </div>
              <div className="form-field">
                <label>ZIP Code</label>
                <input
                  name="zip"
                  value={shipping.zip}
                  onChange={handleShippingChange}
                  className={errors.zip ? 'error-input' : ''}
                />
                {errors.zip && <span className="field-error">{errors.zip}</span>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="checkout-section">
            <h2>Payment Information</h2>
            <div className="form-field">
              <label>Card Number</label>
              <input
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={payment.cardNumber}
                onChange={handlePaymentChange}
                className={errors.cardNumber ? 'error-input' : ''}
                maxLength={19}
              />
              {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Expiry Date</label>
                <input
                  name="expiry"
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={handlePaymentChange}
                  className={errors.expiry ? 'error-input' : ''}
                  maxLength={5}
                />
                {errors.expiry && <span className="field-error">{errors.expiry}</span>}
              </div>
              <div className="form-field">
                <label>CVV</label>
                <input
                  name="cvv"
                  placeholder="123"
                  value={payment.cvv}
                  onChange={handlePaymentChange}
                  className={errors.cvv ? 'error-input' : ''}
                  maxLength={4}
                />
                {errors.cvv && <span className="field-error">{errors.cvv}</span>}
              </div>
            </div>
            <div className="form-field">
              <label>Cardholder Name</label>
              <input
                name="cardName"
                value={payment.cardName}
                onChange={handlePaymentChange}
                className={errors.cardName ? 'error-input' : ''}
              />
              {errors.cardName && <span className="field-error">{errors.cardName}</span>}
            </div>
          </div>

          {/* Trust badges */}
          <div className="checkout-badges">
            <div className="checkout-badge">
              <FiCreditCard size={28} />
              <span>Secure Payment</span>
            </div>
            <div className="checkout-badge">
              <FiTruck size={28} />
              <span>Fast Delivery</span>
            </div>
            <div className="checkout-badge">
              <FiShield size={28} />
              <span>Money Back</span>
            </div>
          </div>
        </div>

        {/* Right — Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="order-item">
                <img src={item.image} alt={item.title} />
                <div className="order-item-info">
                  <p className="order-item-title">{item.title}</p>
                  {item.selectedColor && (
                    <p className="order-item-variant">
                      {item.selectedColor}{item.selectedSize ? ` / ${item.selectedSize}` : ''}
                    </p>
                  )}
                  <p className="order-item-price">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <p className="order-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="order-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="order-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="order-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="order-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className={`place-order-btn ${processing ? 'processing' : ''}`}
            onClick={handlePlaceOrder}
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Place Order'}
          </button>
          <p className="order-terms">
            By placing your order, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkout