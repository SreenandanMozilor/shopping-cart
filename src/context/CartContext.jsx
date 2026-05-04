import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children, initialItems = [] }) => {
  const [cartItems, setCartItems] = useState(initialItems)

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && 
        item.selectedColor === product.selectedColor && 
        item.selectedSize === product.selectedSize
      )
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && 
          item.selectedColor === product.selectedColor && 
          item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      }
      
      return [...prevItems, { ...product }]
    })
  }

  const updateQuantity = (productId, newQuantity, selectedColor, selectedSize) => {
    if (newQuantity < 1) {
      setCartItems(prev => prev.filter(
        item => !(item.id === productId && 
          item.selectedColor === selectedColor && 
          item.selectedSize === selectedSize)
      ))
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId && 
          item.selectedColor === selectedColor && 
          item.selectedSize === selectedSize
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const loadUserCart = (email) => {
    const savedCart = JSON.parse(
      localStorage.getItem(`cart_${email}`) || '[]'
    )
    setCartItems(savedCart)
  }

  const saveUserCart = (email) => {
    localStorage.setItem(`cart_${email}`, JSON.stringify(cartItems))
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, clearCart, loadUserCart, saveUserCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)