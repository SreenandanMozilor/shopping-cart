import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Home.css'

const categoryImages = {
  "men's clothing": 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600',
  "women's clothing": 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
  "jewelery": 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
  "electronics": 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
}

const categoryLabels = {
  "men's clothing": "Men's Fashion",
  "women's clothing": "Women's Fashion",
  "jewelery": "Accessories",
  "electronics": "Electronics",
}

const getDiscountedPrice = (price) => {
  const discounts = [0, 0, 0, 10, 15, 20, 25, 33, 40]
  const discount = discounts[Math.floor(Math.random() * discounts.length)]
  return {
    discount,
    originalPrice: discount
      ? (price / (1 - discount / 100)).toFixed(2)
      : null
  }
}

const Home = () => {
  const { currentUser } = useAuth()
  const [featured, setFeatured] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = ['all', "men's clothing", "women's clothing", "jewelery", "electronics"]

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const withDiscounts = data.map(p => ({
          ...p,
          ...getDiscountedPrice(p.price)
        }))
        setFeatured(withDiscounts)
      })
  }, [])

  const filtered = activeCategory === 'all'
    ? featured
    : featured.filter(p => p.category === activeCategory)

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Summer Collection 2026</h1>
          <p>Discover the latest trends in fashion. Shop our exclusive collection with up to 50% off on selected items.</p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn-primary">Shop Now →</Link>
            {!currentUser && (
              <Link to="/signup" className="btn-secondary">Sign Up</Link>
            )}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <p>Explore our curated collections designed for every style and occasion</p>
        <div className="categories-grid">
          {Object.keys(categoryImages).map(cat => (
            <Link to={`/shop?category=${cat}`} key={cat} className="category-card">
              <img src={categoryImages[cat]} alt={cat} />
              <div className="category-overlay">
                <h3>{categoryLabels[cat]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <p>Discover our handpicked selection of premium items</p>
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={activeCategory === cat ? 'tab active' : 'tab'}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat] || 'All'}
            </button>
          ))}
        </div>
        <div className="featured-grid">
          {filtered.slice(0, 8).map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="featured-card">
              {product.discount > 0 && (
                <span className="badge">-{product.discount}%</span>
              )}
              <img src={product.image} alt={product.title} />
              <div className="featured-card-info">
                <p className="featured-category">{product.category.toUpperCase()}</p>
                <h3>{product.title}</h3>
                <div className="price-row">
                  <span className="price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home