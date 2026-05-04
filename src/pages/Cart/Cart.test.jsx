import { render, screen, fireEvent } from '../../test-utils'
import { render as rtlRender } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { AuthProvider } from '../../context/AuthContext'
import Cart from './Cart'

const mockItems = [
  {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'https://test.com/image.jpg',
    category: "men's clothing",
    quantity: 2
  }
]

const renderWithItems = (ui) => {
  return rtlRender(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider initialItems={mockItems}>
          {ui}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Cart Page', () => {
  test('shows empty cart message when no items', () => {
    render(<Cart />)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  test('displays cart items correctly', () => {
    renderWithItems(<Cart />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('displays correct total price', () => {
    renderWithItems(<Cart />)
    expect(screen.getByText('Total: $59.98')).toBeInTheDocument()
  })

  test('shows checkout button when items present', () => {
    renderWithItems(<Cart />)
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument()
  })
})