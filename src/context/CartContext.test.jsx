import { render, screen, fireEvent } from '../test-utils'
import { useCart } from './CartContext'

// Test component that uses the cart context
const CartTester = () => {
  const { cartItems, addToCart, updateQuantity, clearCart } = useCart()
  
  return (
    <div>
      <p data-testid="cart-count">{cartItems.length}</p>
      <p data-testid="cart-total">
        {cartItems.reduce((t, i) => t + i.quantity, 0)}
      </p>
      <button onClick={() => addToCart({
        id: 1, title: 'Test', price: 10, 
        image: 'test.jpg', category: 'test',
        quantity: 1, selectedColor: 'Black', selectedSize: 'M'
      })}>
        Add Black M
      </button>
      <button onClick={() => addToCart({
        id: 1, title: 'Test', price: 10,
        image: 'test.jpg', category: 'test', 
        quantity: 1, selectedColor: 'White', selectedSize: 'L'
      })}>
        Add White L
      </button>
      <button onClick={() => updateQuantity(1, 0, 'Black', 'M')}>
        Remove Black M
      </button>
      <button onClick={() => updateQuantity(1, 3, 'Black', 'M')}>
        Update Black M to 3
      </button>
      <button onClick={clearCart}>Clear</button>
    </div>
  )
}

describe('CartContext', () => {
  test('cart starts empty', () => {
    render(<CartTester />)
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
  })

  test('addToCart adds a new item', () => {
    render(<CartTester />)
    fireEvent.click(screen.getByText('Add Black M'))
    expect(screen.getByTestId('cart-count').textContent).toBe('1')
  })

  test('adding same variant increases quantity not count', () => {
    render(<CartTester />)
    fireEvent.click(screen.getByText('Add Black M'))
    fireEvent.click(screen.getByText('Add Black M'))
    expect(screen.getByTestId('cart-count').textContent).toBe('1')
    expect(screen.getByTestId('cart-total').textContent).toBe('2')
  })

  test('different variants are separate cart items', () => {
    render(<CartTester />)
    fireEvent.click(screen.getByText('Add Black M'))
    fireEvent.click(screen.getByText('Add White L'))
    expect(screen.getByTestId('cart-count').textContent).toBe('2')
  })

  test('updateQuantity to 0 removes item', () => {
    render(<CartTester />)
    fireEvent.click(screen.getByText('Add Black M'))
    fireEvent.click(screen.getByText('Remove Black M'))
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
  })

  test('updateQuantity updates specific variant only', () => {
    render(<CartTester />)
    fireEvent.click(screen.getByText('Add Black M'))
    fireEvent.click(screen.getByText('Add White L'))
    fireEvent.click(screen.getByText('Update Black M to 3'))
    expect(screen.getByTestId('cart-total').textContent).toBe('4')
  })

  test('clearCart empties the cart', () => {
    render(<CartTester />)
    fireEvent.click(screen.getByText('Add Black M'))
    fireEvent.click(screen.getByText('Add White L'))
    fireEvent.click(screen.getByText('Clear'))
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
  })
})