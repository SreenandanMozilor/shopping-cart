import { render, screen, waitFor } from '../../test-utils'
import Shop from './Shop'

// Mock fetch to avoid real API calls in tests
const mockProducts = [
  {
    id: 1,
    title: 'Test Jacket',
    price: 55.99,
    image: 'https://test.com/jacket.jpg',
    category: "men's clothing",
    description: 'A test jacket'
  },
  {
    id: 2,
    title: 'Test Ring',
    price: 10.99,
    image: 'https://test.com/ring.jpg',
    category: 'jewelery',
    description: 'A test ring'
  }
]

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProducts)
    })
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Shop Page', () => {
  test('shows loading state initially', () => {
    render(<Shop />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  test('renders products after fetch', async () => {
    render(<Shop />)
    await waitFor(() => {
      expect(screen.getByText('Test Jacket')).toBeInTheDocument()
      expect(screen.getByText('Test Ring')).toBeInTheDocument()
    })
  })

  test('renders correct number of products', async () => {
    render(<Shop />)
    await waitFor(() => {
      const addToCartButtons = screen.getAllByText('Add to Cart')
      expect(addToCartButtons).toHaveLength(2)
    })
  })
})