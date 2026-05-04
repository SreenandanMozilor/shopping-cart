import { render, screen, fireEvent } from '../../test-utils'
import Signup from './Signup'

describe('Signup Page', () => {
        test('renders signup form', () => {
        render(<Signup />)
        expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument()
})

  test('shows error when fields are empty', () => {
        render(<Signup />)
        fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }))
        expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
  })

  test('shows error for invalid email format', () => {
    render(<Signup />)
        fireEvent.change(screen.getByPlaceholderText('Enter your name'),
            { target: { value: 'John' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your email'),
            { target: { value: 'bademail@' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your password'),
            { target: { value: 'password123' } })
        fireEvent.change(screen.getByPlaceholderText('Confirm your password'),
            { target: { value: 'password123' } })
        fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }))
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })

    test('shows error for short password', () => {
        render(<Signup />)
        fireEvent.change(screen.getByPlaceholderText('Enter your name'),
            { target: { value: 'John' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your email'),
            { target: { value: 'user@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your password'),
            { target: { value: '123' } })
        fireEvent.change(screen.getByPlaceholderText('Confirm your password'),
            { target: { value: '123' } })
        fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }))
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
    })
})