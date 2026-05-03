import { Link } from 'react-router-dom';

const Navbar = ({ cartItems }) => {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">WebYes Shop</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar