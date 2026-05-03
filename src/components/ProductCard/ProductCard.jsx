import { useState } from 'react'

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    console.log('handleAddToCart called, quantity:', quantity)
    addToCart({ ...product, quantity })
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      
      <div className="quantity-controls">
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        />
        <button onClick={() => setQuantity(q => q + 1)}>+</button>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}

export default ProductCard