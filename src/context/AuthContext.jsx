import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const signup = (name, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = existingUsers.find(u => u.email === email)
    
    if (userExists) {
      throw new Error('User already exists with this email')
    }

    const newUser = { name, email, password }
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))
  }

  const login = async (identifier, password) => {
    // Check localStorage users first (match by email or name)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const localUser = existingUsers.find(
      u => (u.email === identifier || u.name === identifier) 
        && u.password === password
    )

    if (localUser) {
      setCurrentUser({ name: localUser.name, email: localUser.email })
      return
    }

    // Fall back to FakeStore API
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: identifier, password })
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    setCurrentUser({ email: identifier })
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)