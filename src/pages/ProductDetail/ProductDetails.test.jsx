import { render, screen, fireEvent, waitFor } from '../../test-utils'
import ProductDetail from './ProductDetail'

// Mock useParams to simulate /product/1
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
  }
})

const mockProduct = {
  id: 1,
  title: 'Test Jacket',
  price: 55.99,
  image: 'https://test.com/jacket.jpg',
  category: "men's clothing",
  description: 'A great jacket for testing'
}

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProduct)
    })
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ProductDetail Page', () => {
  test('shows loading state initially', () => {
    render(<ProductDetail />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders product details after fetch', async () => {
    render(<ProductDetail />)
    await waitFor(() => {
      expect(screen.getByText('Test Jacket')).toBeInTheDocument()
      expect(screen.getByText('$55.99')).toBeInTheDocument()
      expect(screen.getByText('A great jacket for testing')).toBeInTheDocument()
    })
  })

  test('renders color options for clothing', async () => {
    render(<ProductDetail />)
    await waitFor(() => {
      expect(screen.getByText('Black')).toBeInTheDocument()
      expect(screen.getByText('Navy')).toBeInTheDocument()
    })
  })

  test('renders size options for clothing', async () => {
    render(<ProductDetail />)
    await waitFor(() => {
      expect(screen.getByText('S')).toBeInTheDocument()
      expect(screen.getByText('M')).toBeInTheDocument()
      expect(screen.getByText('L')).toBeInTheDocument()
    })
  })

  test('can select a color', async () => {
    render(<ProductDetail />)
    await waitFor(() => {
      expect(screen.getByText('Navy')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('Navy'))
    expect(screen.getByText('Navy').className).toContain('selected')
  })

  test('add to cart button exists', async () => {
    render(<ProductDetail />)
    await waitFor(() => {
      expect(screen.getByText('Add to Cart')).toBeInTheDocument()
    })
  })
})