import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState('EN');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <Sparkles size={13} className="announcement-icon" />
          <span>
            {currentLang === 'VI'
              ? 'MIỄN PHÍ VẬN CHUYỂN TOÀN CẦU CHO ĐƠN HÀNG TỪ 2.500.000₫'
              : 'COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $250'}
          </span>
          <span className="announcement-divider">•</span>
          <span className="announcement-highlight">
            {currentLang === 'VI' ? 'BỘ SƯU TẬP THU ĐÔNG 2026' : 'AUTUMN / WINTER 2026 ATELIER'}
          </span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`lune-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Mobile Menu Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="nav-menu desktop-only">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {currentLang === 'VI' ? 'Trang Chủ' : 'Home'}
            </NavLink>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {currentLang === 'VI' ? 'Cửa Hàng' : 'Shop'}
            </NavLink>
            <NavLink 
              to="/shop?category=new" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {currentLang === 'VI' ? 'Bộ Sưu Tập Mới' : 'New Collection'}
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {currentLang === 'VI' ? 'Giới Thiệu' : 'About'}
            </NavLink>
          </nav>

          {/* Brand Logo */}
          <div className="nav-brand">
            <Link to="/" className="brand-logo-link">
              <span className="brand-title">L U N E</span>
              <span className="brand-subtitle">FASHION STORE</span>
            </Link>
          </div>

          {/* Right Action Utilities */}
          <div className="nav-actions">
            {/* Language Switcher Button (EN / VI) */}
            <div className="lang-switcher-pill" title="Chuyển đổi ngôn ngữ / Switch Language">
              <button 
                type="button" 
                className={`lang-btn ${currentLang === 'EN' ? 'active' : ''}`}
                onClick={() => setCurrentLang('EN')}
                aria-label="English"
              >
                EN
              </button>
              <span className="lang-separator">/</span>
              <button 
                type="button" 
                className={`lang-btn ${currentLang === 'VI' ? 'active' : ''}`}
                onClick={() => setCurrentLang('VI')}
                aria-label="Tiếng Việt"
              >
                VI
              </button>
            </div>

            {/* Search Trigger */}
            <button 
              type="button" 
              className="action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              title="Search collection"
              aria-label="Search collection"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>

            {/* Wishlist Link */}
            <Link 
              to="/wishlist" 
              className="action-btn wishlist-btn"
              title="Saved items"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.75} />
              <span className="action-badge">3</span>
            </Link>

            {/* Shopping Bag Link */}
            <Link 
              to="/cart" 
              className="action-btn cart-btn"
              title="Shopping bag"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="action-badge">2</span>
            </Link>

            {/* User Profile / Login */}
            <Link 
              to="/profile" 
              className="action-btn login-link"
              title="My Atelier Account"
              aria-label="My Account"
            >
              <User size={20} strokeWidth={1.75} />
              <span className="login-text desktop-only">
                {currentLang === 'VI' ? 'Tài Khoản' : 'Account'}
              </span>
            </Link>
          </div>
        </div>

        {/* Expandable Search Input Row */}
        {isSearchOpen && (
          <div className="search-dropdown-bar">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <Search size={18} className="search-input-icon" />
              <input
                type="text"
                placeholder="Search cashmere coats, silk dresses, tailoring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
              />
              <button type="submit" className="search-submit-btn">
                Search
              </button>
              <button 
                type="button" 
                className="search-close-btn"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-drawer-header">
                <span className="brand-title-small">L U N E</span>
                <button 
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mobile-drawer-nav">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item">
                  <span>Home</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item">
                  <span>Shop All</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/shop?category=women" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item">
                  <span>Women</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/shop?category=men" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item">
                  <span>Men</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/shop?category=new" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item highlight">
                  <span>New Collection 2026</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item">
                  <span>Wishlist (3)</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/order-tracking" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item">
                  <span>Order Tracking</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item">
                  <span>About LUNE</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-item" style={{ color: 'var(--color-primary-brown)', fontWeight: 600 }}>
                  <span>Admin Portal →</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mobile-drawer-footer">
                <div className="mobile-lang-row">
                  <span className="mobile-lang-label">
                    {currentLang === 'VI' ? 'Ngôn ngữ' : 'Language'}:
                  </span>
                  <div className="lang-switcher-pill">
                    <button 
                      type="button" 
                      className={`lang-btn ${currentLang === 'EN' ? 'active' : ''}`}
                      onClick={() => setCurrentLang('EN')}
                    >
                      EN
                    </button>
                    <span className="lang-separator">/</span>
                    <button 
                      type="button" 
                      className={`lang-btn ${currentLang === 'VI' ? 'active' : ''}`}
                      onClick={() => setCurrentLang('VI')}
                    >
                      VI
                    </button>
                  </div>
                </div>

                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-account-btn"
                >
                  <User size={18} />
                  <span>{currentLang === 'VI' ? 'Tài Khoản & Hồ Sơ' : 'My Profile & Account'}</span>
                </Link>
                <p className="mobile-brand-note">Warm Luxury × Modern Feminine</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
