import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCreditCard, FiTruck, FiShield } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import './Checkout.css'

const TAX_RATE = 0.08

// ── Validators ────────────────────────────────────────────────────────────────

const validators = {
  firstName: (v) => {
    if (!v.trim()) return 'First name is required'
    if (v.trim().length < 2) return 'Must be at least 2 characters'
    if (!/^[a-zA-Z\s'-]+$/.test(v)) return 'Letters only'
    return ''
  },
  lastName: (v) => {
    if (!v.trim()) return 'Last name is required'
    if (v.trim().length < 2) return 'Must be at least 2 characters'
    if (!/^[a-zA-Z\s'-]+$/.test(v)) return 'Letters only'
    return ''
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address'
    return ''
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, '')
    if (!v.trim()) return 'Phone number is required'
    if (digits.length < 7) return 'Too short'
    if (digits.length > 15) return 'Too long'
    return ''
  },
  address: (v) => {
    if (!v.trim()) return 'Street address is required'
    if (v.trim().length < 5) return 'Enter a complete address'
    return ''
  },
  city: (v) => {
    if (!v.trim()) return 'City is required'
    if (!/^[a-zA-Z\s'-]+$/.test(v)) return 'Letters only'
    return ''
  },
  state: (v) => {
    if (!v.trim()) return 'State is required'
    return ''
  },
  zip: (v) => {
    const digits = v.replace(/\D/g, '')
    if (!v.trim()) return 'ZIP code is required'
    if (!/^\d{4,10}$/.test(digits)) return 'Enter a valid ZIP code'
    return ''
  },
  cardNumber: (v) => {
    const digits = v.replace(/\s/g, '')
    if (!digits) return 'Card number is required'
    if (!/^\d+$/.test(digits)) return 'Numbers only'
    if (digits.length !== 16) return 'Must be 16 digits'
    return ''
  },
  expiry: (v) => {
    if (!v) return 'Expiry date is required'
    if (!/^\d{2}\/\d{2}$/.test(v)) return 'Use MM/YY format'
    const [month, year] = v.split('/').map(Number)
    if (month < 1 || month > 12) return 'Invalid month'
    const now = new Date()
    const fullYear = 2000 + year
    if (fullYear < now.getFullYear() || (fullYear === now.getFullYear() && month < now.getMonth() + 1)) {
      return 'Card has expired'
    }
    return ''
  },
  cvv: (v) => {
    if (!v) return 'CVV is required'
    if (!/^\d{3,4}$/.test(v)) return 'Must be 3 or 4 digits'
    return ''
  },
  cardName: (v) => {
    if (!v.trim()) return 'Cardholder name is required'
    if (!/^[a-zA-Z\s'-]+$/.test(v)) return 'Letters only'
    if (v.trim().split(/\s+/).length < 2) return 'Enter full name as on card'
    return ''
  },
}

// ── Auto-formatters (called on change) ───────────────────────────────────────

const formatPhone = (raw) => {
  // Strip everything except digits and leading +
  const digits = raw.replace(/[^\d+]/g, '')
  return digits
}

const formatCardNumber = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

const formatExpiry = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

const formatCvv = (raw) => raw.replace(/\D/g, '').slice(0, 4)

const formatZip = (raw) => raw.replace(/[^\d-]/g, '').slice(0, 10)

// ─────────────────────────────────────────────────────────────────────────────

const Checkout = () => {
  const { cartItems, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not logged in, then come back here after
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/checkout' } })
    }
  }, [currentUser, navigate])

  if (!currentUser) return null

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', address: '', city: '', state: '', zip: ''
  })

  const [payment, setPayment] = useState({
    cardNumber: '', expiry: '', cvv: '', cardName: ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [processing, setProcessing] = useState(false)

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0)
  const shippingCost = subtotal >= 50 ? 0 : 9.99
  const tax = subtotal * TAX_RATE
  const total = subtotal + shippingCost + tax

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleShippingChange = (e) => {
    let { name, value } = e.target
    if (name === 'phone') value = formatPhone(value)
    if (name === 'zip') value = formatZip(value)
    setShipping(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validators[name]?.(value) || '' }))
    }
  }

  const handlePaymentChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') value = formatCardNumber(value)
    if (name === 'expiry') value = formatExpiry(value)
    if (name === 'cvv') value = formatCvv(value)
    setPayment(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validators[name]?.(value) || '' }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const allValues = { ...shipping, ...payment, [name]: value }
    setErrors(prev => ({ ...prev, [name]: validators[name]?.(allValues[name]) || '' }))
  }

  const validateAll = () => {
    const allValues = { ...shipping, ...payment }
    const newErrors = {}
    for (const [field, validate] of Object.entries(validators)) {
      const msg = validate(allValues[field] ?? '')
      if (msg) newErrors[field] = msg
    }
    // Mark everything as touched so errors show
    const allTouched = Object.fromEntries(Object.keys(validators).map(k => [k, true]))
    setTouched(allTouched)
    setErrors(newErrors)
    return newErrors
  }

  const handlePlaceOrder = () => {
    const newErrors = validateAll()
    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.error-input')
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setProcessing(true)
    setTimeout(() => {
      clearCart()
      navigate('/order-confirmation')
    }, 1500)
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  const fieldClass = (name) => errors[name] && touched[name] ? 'error-input' : ''
  const fieldError = (name) => touched[name] && errors[name]
    ? <span className="field-error">{errors[name]}</span>
    : null

  // ── Render ─────────────────────────────────────────────────────────────────

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
                  placeholder="John"
                  value={shipping.firstName}
                  onChange={handleShippingChange}
                  onBlur={handleBlur}
                  className={fieldClass('firstName')}
                />
                {fieldError('firstName')}
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input
                  name="lastName"
                  placeholder="Smith"
                  value={shipping.lastName}
                  onChange={handleShippingChange}
                  onBlur={handleBlur}
                  className={fieldClass('lastName')}
                />
                {fieldError('lastName')}
              </div>
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={shipping.email}
                onChange={handleShippingChange}
                onBlur={handleBlur}
                className={fieldClass('email')}
              />
              {fieldError('email')}
            </div>

            <div className="form-field">
              <label>Phone Number</label>
              <input
                name="phone"
                type="tel"
                placeholder="+1234567890"
                value={shipping.phone}
                onChange={handleShippingChange}
                onBlur={handleBlur}
                className={fieldClass('phone')}
                maxLength={16}
              />
              {fieldError('phone')}
            </div>

            <div className="form-field">
              <label>Street Address</label>
              <input
                name="address"
                placeholder="123 Main Street, Apt 4B"
                value={shipping.address}
                onChange={handleShippingChange}
                onBlur={handleBlur}
                className={fieldClass('address')}
              />
              {fieldError('address')}
            </div>

            <div className="form-row three-col">
              <div className="form-field">
                <label>City</label>
                <input
                  name="city"
                  placeholder="New York"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  onBlur={handleBlur}
                  className={fieldClass('city')}
                />
                {fieldError('city')}
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  name="state"
                  placeholder="NY"
                  value={shipping.state}
                  onChange={handleShippingChange}
                  onBlur={handleBlur}
                  className={fieldClass('state')}
                />
                {fieldError('state')}
              </div>
              <div className="form-field">
                <label>ZIP Code</label>
                <input
                  name="zip"
                  placeholder="10001"
                  value={shipping.zip}
                  onChange={handleShippingChange}
                  onBlur={handleBlur}
                  className={fieldClass('zip')}
                  maxLength={10}
                />
                {fieldError('zip')}
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
                onBlur={handleBlur}
                className={fieldClass('cardNumber')}
                maxLength={19}
                inputMode="numeric"
              />
              {fieldError('cardNumber')}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Expiry Date</label>
                <input
                  name="expiry"
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={handlePaymentChange}
                  onBlur={handleBlur}
                  className={fieldClass('expiry')}
                  maxLength={5}
                  inputMode="numeric"
                />
                {fieldError('expiry')}
              </div>
              <div className="form-field">
                <label>CVV</label>
                <input
                  name="cvv"
                  placeholder="123"
                  value={payment.cvv}
                  onChange={handlePaymentChange}
                  onBlur={handleBlur}
                  className={fieldClass('cvv')}
                  maxLength={4}
                  inputMode="numeric"
                />
                {fieldError('cvv')}
              </div>
            </div>
            <div className="form-field">
              <label>Cardholder Name</label>
              <input
                name="cardName"
                placeholder="John Smith"
                value={payment.cardName}
                onChange={handlePaymentChange}
                onBlur={handleBlur}
                className={fieldClass('cardName')}
              />
              {fieldError('cardName')}
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