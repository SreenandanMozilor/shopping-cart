import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import PropTypes from 'prop-types'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  return (
    <div className="product-card">
      <img
        className="product-card-image"
        src={product.image}
        alt={product.title}
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer' }}
      />
      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <h3
          className="product-card-title"
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ cursor: 'pointer' }}
        >
          {product.title}
        </h3>
        <p className="product-card-price">${product.price}</p>
        <div className="quantity-controls">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductCard