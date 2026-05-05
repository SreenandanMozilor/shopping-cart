import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import PublicOnlyRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Footer from './components/Footer/Footer'
import Checkout from './pages/Checkout/Checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            } />
            <Route path="/signup" element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            } />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App