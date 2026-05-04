import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Shop.css'

const categoryLabels = {
  "men's clothing": "Men's Fashion",
  "women's clothing": "Women's Fashion",
  "jewelery": "Accessories",
  "electronics": "Electronics",
}

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const clearFilter = () => setSearchParams({})

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryParam
      ? product.category === categoryParam
      : true
    const matchesSearch = searchParam
      ? product.title.toLowerCase().includes(searchParam.toLowerCase())
      : true
    return matchesCategory && matchesSearch
  })

  if (loading) return <div className="shop-loading">Loading products...</div>
  if (error) return <div className="shop-error">Error: {error}</div>

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>
          {categoryParam
            ? categoryLabels[categoryParam] || categoryParam
            : searchParam
            ? `Results for "${searchParam}"`
            : 'All Products'}
        </h1>

        {(categoryParam || searchParam) && (
          <button className="clear-filter-btn" onClick={clearFilter}>
            <FiX size={14} />
            {categoryParam
              ? categoryLabels[categoryParam]
              : `"${searchParam}"`}
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>No products found. <button onClick={clearFilter}>Clear filter</button></p>
        </div>
      ) : (
        <div className="shop-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop