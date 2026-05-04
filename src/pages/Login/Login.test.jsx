import { render, screen, fireEvent } from '../../test-utils'
import Login from './Login'

describe('Login Page', () => {
  test('renders login form', () => {
    render(<Login />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email or username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  test('shows error when fields are empty', () => {
    render(<Login />)
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
  })

  test('shows error for invalid email format', () => {
    render(<Login />)
    fireEvent.change(
      screen.getByPlaceholderText('Enter your email or username'),
      { target: { value: 'bademail@' } }
    )
    fireEvent.change(
      screen.getByPlaceholderText('Enter your password'),
      { target: { value: 'password123' } }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
  })

  test('shows error for short password', () => {
    render(<Login />)
    fireEvent.change(
      screen.getByPlaceholderText('Enter your email or username'),
      { target: { value: 'user@test.com' } }
    )
    fireEvent.change(
      screen.getByPlaceholderText('Enter your password'),
      { target: { value: '123' } }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
  })
})