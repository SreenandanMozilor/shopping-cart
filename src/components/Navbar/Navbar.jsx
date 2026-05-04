import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { cartItems, clearCart } = useCart()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = () => {
    if (currentUser) saveUserCart(currentUser.email)
    clearCart()
    logout()
    navigate('/login')
  }

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">WebYes Shop</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        {currentUser ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar