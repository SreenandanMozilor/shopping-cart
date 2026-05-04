import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Fake auth - in real app this would call an API
    if (email === 'user@test.com' && password === 'password123') {
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <div>
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
          <button onClick={handleSubmit}>Login</button>
        </div>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login