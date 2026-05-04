import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import CartDrawer from '../CartDrawer/CartDrawer'
import './Navbar.css'

const Navbar = () => {
  const { cartItems, clearCart, saveUserCart } = useCart()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    if (currentUser) saveUserCart(currentUser.email)
    clearCart()
    logout()
    setDropdownOpen(false)
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-logo">WebYes Shop</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/shop?category=men's clothing">Men</Link>
            <Link to="/shop?category=women's clothing">Women</Link>
            <Link to="/shop?category=jewelery">Accessories</Link>
            <Link to="/shop?category=electronics">Electronics</Link>
          </div>
        </div>

        {/* Search in center */}
        <form className="search-bar" onSubmit={handleSearch}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="navbar-right">
          <div className="user-menu" ref={dropdownRef}>
            <button
              className={`icon-btn user-btn ${currentUser ? 'logged-in' : ''}`}
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              <FiUser size={18} />
              {currentUser && (
                <span className="username-label">
                  {currentUser.name || currentUser.email}
                </span>
              )}
            </button>
            {dropdownOpen && (
              <div className="user-dropdown">
                {currentUser ? (
                  <>
                    <p className="dropdown-name">
                      Hi, {currentUser.name || 'User'}
                    </p>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setDropdownOpen(false)}>
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setDropdownOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="icon-btn cart-btn"
            onClick={() => setDrawerOpen(true)}
          >
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Navbar