import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>WebYes Shop</h3>
          <p>Your destination for premium fashion and accessories. Quality products, exceptional service.</p>
          <div className="footer-socials">
            <a href="#"><FiFacebook size={18} /></a>
            <a href="#"><FiInstagram size={18} /></a>
            <a href="#"><FiTwitter size={18} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">About Us</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Store Locator</Link>
          <Link to="/">Careers</Link>
        </div>

        <div className="footer-links">
          <h4>Customer Service</h4>
          <Link to="/">Shipping & Returns</Link>
          <Link to="/">Size Guide</Link>
          <Link to="/">FAQ</Link>
          <Link to="/">Track Order</Link>
        </div>

        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to get special offers and updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button>→</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 WebYes Shop. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer