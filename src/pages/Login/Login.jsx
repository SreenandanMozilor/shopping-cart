import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './Login.css'

const Login = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const { loadUserCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  // Where to go after login — default to home, but honour redirect from checkout etc.
  const redirectTo = location.state?.from || '/'

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!identifier || !password) {
      setError('Please fill in all fields')
      return
    }

    if (identifier.includes('@') && !validateEmail(identifier)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      await login(identifier, password)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const user = existingUsers.find(
        u => u.email === identifier || u.name === identifier
      )
      if (user) {
        loadUserCart(user.email)
      }
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        {redirectTo !== '/' && (
          <p className="auth-redirect-notice">
            Please log in to continue to checkout
          </p>
        )}
        {error && <p className="error">{error}</p>}
        <div>
          <div className="form-group">
            <label>Email or Username</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleSubmit}>Login</button>
        </div>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup" state={{ from: redirectTo }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login