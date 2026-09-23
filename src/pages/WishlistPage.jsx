import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';

export default function WishlistPage() {
  // Mock wishlist with 3 items initially
  const [wishlistItems, setWishlistItems] = useState([products[0], products[1], products[2]]);
  const [toastMessage, setToastMessage] = useState('');

  const handleRemove = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from your wishlist');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="lune-wishlist-page">
      <div className="wishlist-container">
        {/* Breadcrumb */}
        <nav className="shop-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>My Wishlist</span>
        </nav>

        <div className="wishlist-header">
          <h1 className="wishlist-title">Saved Curations</h1>
          <p className="wishlist-subtitle">
            Your personal sanctuary of desired silhouettes and timeless pieces.
          </p>
          <span className="wishlist-count-badge">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Piece' : 'Pieces'} Saved
          </span>
        </div>

        {toastMessage && (
          <div className="toast-notification">
            <span>{toastMessage}</span>
          </div>
        )}

        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <div key={product.id} className="wishlist-card">
                <div className="wishlist-image-wrap">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="wishlist-image" />
                  </Link>
                  <button 
                    type="button" 
                    className="wishlist-remove-btn"
                    onClick={() => handleRemove(product.id)}
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                  {product.tag && (
                    <span className="product-badge wishlist-tag">{product.tag}</span>
                  )}
                </div>

                <div className="wishlist-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="wishlist-product-name">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  
                  <div className="product-price-row">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="wishlist-actions">
                    <Link to={`/product/${product.id}`} className="move-to-bag-btn">
                      <ShoppingBag size={15} />
                      <span>Select Size & Move to Bag</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist-state">
            <Heart size={48} className="empty-icon" strokeWidth={1.2} />
            <h2>Your Wishlist is Empty</h2>
            <p>Explore our latest Atelier collection and save your favorite silhouettes.</p>
            <Link to="/shop" className="hero-primary-btn" style={{ marginTop: '20px' }}>
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
