import { render, screen, fireEvent } from '../../test-utils'
import ProductCard from './ProductCard'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'https://test.com/image.jpg',
  category: "men's clothing",
}

describe('ProductCard', () => {
  test('renders product information', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument()
  })

  test('quantity starts at 1', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })

  test('increment button increases quantity', () => {
    render(<ProductCard product={mockProduct} />)
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
  })

  test('decrement button does not go below 1', () => {
    render(<ProductCard product={mockProduct} />)
    fireEvent.click(screen.getByRole('button', { name: '-' }))
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })
})