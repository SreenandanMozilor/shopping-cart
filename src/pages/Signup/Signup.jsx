import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../Login/Login.css'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const { signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from || '/'

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      signup(name, email, password)
      // After signup, go to login and preserve the redirect destination
      navigate('/login', { state: { from: redirectTo } })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign Up</h1>
        {redirectTo !== '/' && (
          <p className="auth-redirect-notice">
            Create an account to continue to checkout
          </p>
        )}
        {error && <p className="error">{error}</p>}
        <div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button onClick={handleSubmit}>Sign Up</button>
        </div>
        <p className="auth-footer">
          Already have an account? <Link to="/login" state={{ from: redirectTo }}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup