import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="lune-footer">
      {/* Brand Value Pillars Section */}
      <div className="footer-perks-bar">
        <div className="perks-container">
          <div className="perk-item">
            <Truck size={20} className="perk-icon" />
            <div>
              <h4 className="perk-title">Complimentary Delivery</h4>
              <p className="perk-desc">Worldwide express shipping on orders over $250</p>
            </div>
          </div>

          <div className="perk-item">
            <RotateCcw size={20} className="perk-icon" />
            <div>
              <h4 className="perk-title">Effortless Returns</h4>
              <p className="perk-desc">30-day seamless doorstep collection</p>
            </div>
          </div>

          <div className="perk-item">
            <ShieldCheck size={20} className="perk-icon" />
            <div>
              <h4 className="perk-title">Artisanal Tailoring</h4>
              <p className="perk-desc">Ethically sourced European natural fabrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Info & Ethos */}
          <div className="footer-column brand-col">
            <Link to="/" className="footer-logo">
              <span className="brand-title">L U N E</span>
              <span className="brand-subtitle">FASHION STORE</span>
            </Link>
            
            <p className="footer-tagline">
              Warm Luxury × Modern Trendy × Soft Feminine. 
              Crafting conscious silhouettes and heirloom garments designed for the woman who defines her own poise.
            </p>

            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Pinterest & TikTok stylized custom SVG icons */}
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.056.23-.186.279-.429.168-1.604-.746-2.607-3.086-2.607-4.969 0-4.045 2.939-7.76 8.477-7.76 4.45 0 7.91 3.171 7.91 7.41 0 4.422-2.788 7.98-6.657 7.98-1.3 0-2.523-.676-2.942-1.474l-.8 3.048c-.29 1.107-1.074 2.495-1.603 3.349C9.721 23.86 10.841 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.045.87.134V9.41a6.33 6.33 0 0 0-.87-.06A6.33 6.33 0 0 0 3.12 15.68 6.34 6.34 0 0 0 9.45 22a6.34 6.34 0 0 0 6.33-6.32V8.98a8.35 8.35 0 0 0 4.81 1.5v-3.5a4.83 4.83 0 0 1-1-.29z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="footer-column">
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=women">Women's Collection</Link></li>
              <li><Link to="/shop?category=men">Men's Tailoring</Link></li>
              <li><Link to="/shop?category=new">New Autumn/Winter 2026</Link></li>
              <li><Link to="/shop">Silk & Satin Evening</Link></li>
              <li><Link to="/shop">Cashmere & Wool Outerwear</Link></li>
              <li><Link to="/shop">The Minimalist Lookbook</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Atelier Services */}
          <div className="footer-column">
            <h4 className="footer-heading">Client Services</h4>
            <ul className="footer-links">
              <li><Link to="/order-tracking">Order Tracking & Logistics</Link></li>
              <li><Link to="/wishlist">Saved Curations (Wishlist)</Link></li>
              <li><Link to="/profile">My Atelier Account</Link></li>
              <li><Link to="/about">The Maison & Craftsmanship</Link></li>
              <li><Link to="/about">Shipping, Delivery & Returns</Link></li>
              <li><Link to="/admin" style={{ color: 'var(--color-primary-brown)', fontWeight: 600 }}>✦ Admin Management Suite</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-column newsletter-col">
            <h4 className="footer-heading">The LUNE Gazette</h4>
            <p className="newsletter-desc">
              Subscribe to receive private previews, invitations to atelier trunk shows, and 10% off your initial order.
            </p>

            {isSubscribed ? (
              <div className="newsletter-success">
                <CheckCircle2 size={18} className="success-icon" />
                <span>Bienvenue! Check your inbox for your 10% welcome code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="newsletter-input-wrap">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <span className="newsletter-fineprint">
                  By subscribing you agree with our Privacy Policy. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © 2026 LUNE Fashion Store. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/about">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about">Terms of Service</Link>
            <span>•</span>
            <Link to="/about">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
