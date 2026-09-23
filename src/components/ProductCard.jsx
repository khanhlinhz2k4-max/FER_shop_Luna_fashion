import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article 
      className="lune-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image Frame */}
      <div className="product-image-wrap">
        <img 
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Tag / Badge */}
        {product.tag && (
          <span className="product-badge">{product.tag}</span>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            fill={isWishlisted ? "#775B3F" : "none"} 
            color={isWishlisted ? "#775B3F" : "#775B3F"} 
            strokeWidth={1.8}
          />
        </button>

        {/* Quick View / View Product Overlay Button */}
        <div className="product-card-overlay">
          <Link 
            to={`/product/${product.id}`}
            className="view-product-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <span>View Product</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Product Metadata Details */}
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        
        <h3 className="product-title">
          <Link to={`/product/${product.id}`} onClick={(e) => e.stopPropagation()}>
            {product.name}
          </Link>
        </h3>

        {/* Color swatches preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="color-swatches" aria-label="Available colors">
            {product.colors.map((color, index) => (
              <span 
                key={index} 
                className="color-dot" 
                style={{ backgroundColor: color }}
                title={`Color option ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </article>
  );
}
