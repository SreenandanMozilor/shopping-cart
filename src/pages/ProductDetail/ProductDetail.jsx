import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiShoppingCart, FiHeart, FiCheck, FiTruck, FiLock } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import './ProductDetail.css'

const categoryColors = {
  "men's clothing": ['Black', 'Navy', 'Grey', 'White', 'Brown'],
  "women's clothing": ['Black', 'White', 'Red', 'Blue', 'Pink'],
  "jewelery": ['Gold', 'Silver', 'Rose Gold', 'Platinum'],
  "electronics": [],
}

const categorySizes = {
  "men's clothing": ['XS', 'S', 'M', 'L', 'XL'],
  "women's clothing": ['XS', 'S', 'M', 'L'],
  "jewelery": [],
  "electronics": [],
}

const getDiscount = (price) => {
  const discounts = [0, 0, 0, 10, 15, 20, 25, 33, 40]
  const discount = discounts[Math.floor(Math.random() * discounts.length)]
  return {
    discount,
    originalPrice: discount
      ? (price / (1 - discount / 100)).toFixed(2)
      : null
  }
}

const getFeatures = (category) => {
  const features = {
    "men's clothing": ['Premium fabric blend', 'Machine washable', 'Comfortable fit', 'Durable stitching'],
    "women's clothing": ['Premium silk blend', 'Elegant draping', 'Hidden zipper', 'Dry clean only'],
    "jewelery": ['925 Sterling Silver', 'Hypoallergenic', 'Tarnish resistant', 'Gift box included'],
    "electronics": ['1 year warranty', 'Fast charging', 'Energy efficient', 'Compact design'],
  }
  return features[category] || ['High quality', 'Durable', 'Premium materials', 'Great value']
}

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [priceInfo, setPriceInfo] = useState({})
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setPriceInfo(getDiscount(data.price))
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    addToCart({ 
        ...product, 
        quantity,
        selectedColor: selectedColor || colors[0] || null,
        selectedSize: selectedSize || sizes[0] || null,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
}

  if (loading) return <div className="detail-loading">Loading...</div>
  if (!product) return <div className="detail-loading">Product not found</div>

  const colors = categoryColors[product.category] || []
  const sizes = categorySizes[product.category] || []
  const features = getFeatures(product.category)

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft size={16} />
        Back
      </button>

      <div className="detail-content">
        {/* Left — Image */}
        <div className="detail-image-section">
          {priceInfo.discount > 0 && (
            <span className="detail-badge">-{priceInfo.discount}%</span>
          )}
          <img src={product.image} alt={product.title} />
        </div>

        {/* Right — Info */}
        <div className="detail-info">
          <p className="detail-category">{product.category.toUpperCase()}</p>
          <h1>{product.title}</h1>

          <div className="detail-price">
            <span className="detail-current-price">${product.price}</span>
            {priceInfo.originalPrice && (
              <span className="detail-original-price">${priceInfo.originalPrice}</span>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <hr />

          {colors.length > 0 && (
            <div className="detail-options">
              <p className="option-label">Color:</p>
              <div className="option-buttons">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`option-btn ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="detail-options">
              <p className="option-label">Size:</p>
              <div className="option-buttons">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`option-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="detail-actions">
            <button
              className={`add-to-cart-btn-detail ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              <FiShoppingCart size={18} />
              {added ? 'Added!' : 'Add to Cart'}
            </button>
            <button className="wishlist-btn">
              <FiHeart size={18} />
              Add to Wishlist
            </button>
          </div>

          <div className="detail-features">
            <p className="option-label">Product Features</p>
            {features.map(feature => (
              <div key={feature} className="feature-item">
                <FiCheck size={14} className="feature-check" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="detail-badges">
            <div className="detail-badge-item">
              <FiTruck size={20} />
              <div>
                <p>Free Shipping</p>
                <span>On orders over $50</span>
              </div>
            </div>
            <div className="detail-badge-item">
              <FiLock size={20} />
              <div>
                <p>Secure Payment</p>
                <span>100% protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail