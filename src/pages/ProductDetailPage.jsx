import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ArrowLeft,
  Check
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'S');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#775B3F');
  const [activeImage, setActiveImage] = useState(product.image);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBag = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="lune-pdp-page">
      <div className="pdp-container">
        {/* Breadcrumb */}
        <div className="pdp-breadcrumb">
          <Link to="/shop" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Collection</span>
          </Link>
          <span className="divider">/</span>
          <span>{product.category}</span>
          <span className="divider">/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Product Details Main Grid */}
        <div className="pdp-main-grid">
          {/* Gallery Side */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-wrap">
              <img src={activeImage} alt={product.name} className="pdp-main-image" />
              {product.tag && <span className="product-badge pdp-badge">{product.tag}</span>}
            </div>
            
            {product.secondaryImage && (
              <div className="pdp-thumbnails">
                <button 
                  type="button" 
                  className={`thumbnail-btn ${activeImage === product.image ? 'active' : ''}`}
                  onClick={() => setActiveImage(product.image)}
                >
                  <img src={product.image} alt="Thumbnail 1" />
                </button>
                <button 
                  type="button" 
                  className={`thumbnail-btn ${activeImage === product.secondaryImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(product.secondaryImage)}
                >
                  <img src={product.secondaryImage} alt="Thumbnail 2" />
                </button>
              </div>
            )}
          </div>

          {/* Product Details Side */}
          <div className="pdp-info-col">
            <span className="pdp-category">{product.category}</span>
            <h1 className="pdp-title">{product.name}</h1>

            <div className="pdp-price-row">
              <span className="pdp-current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="pdp-original-price">${product.originalPrice}</span>
              )}
              <span className="pdp-tax-note">Tax included • Shipping calculated at checkout</span>
            </div>

            <p className="pdp-description">{product.description}</p>

            {/* Color Selector */}
            {product.colors && (
              <div className="pdp-option-group">
                <div className="option-label-row">
                  <span className="option-label">Color:</span>
                  <span className="option-value">Atelier Neutral</span>
                </div>
                <div className="pdp-color-options">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`pdp-color-btn ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && (
              <div className="pdp-option-group">
                <div className="option-label-row">
                  <span className="option-label">Size:</span>
                  <span className="option-value">{selectedSize}</span>
                </div>
                <div className="pdp-size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`pdp-size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pdp-actions-row">
              <button 
                type="button" 
                className={`pdp-add-btn ${isAdded ? 'added' : ''}`}
                onClick={handleAddToBag}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>ADD TO BAG — ${product.price}</span>
                  </>
                )}
              </button>

              <Link to="/cart" className="pdp-checkout-link">
                View Bag
              </Link>
            </div>

            {/* Guarantees */}
            <div className="pdp-service-box">
              <div className="service-row">
                <Truck size={18} />
                <span>Complimentary express delivery on orders over $250</span>
              </div>
              <div className="service-row">
                <RotateCcw size={18} />
                <span>30 days complimentary exchange or refund</span>
              </div>
              <div className="service-row">
                <ShieldCheck size={18} />
                <span>Authentic Atelier certified guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <section className="pdp-related-section">
          <div className="section-header-centered">
            <span className="section-eyebrow">COMPLETE THE SILHOUETTE</span>
            <h2 className="section-title">You May Also Like</h2>
            <p className="section-subtitle">
              Complementary atelier creations styled to harmonize effortlessly with this piece.
            </p>
          </div>

          <div className="products-grid">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
