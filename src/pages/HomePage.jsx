import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Feather, Compass, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products, categories } from '../data/products';

export default function HomePage() {
  // 4 products for New Arrivals
  const newArrivals = products.slice(0, 4);

  return (
    <div className="lune-homepage">
      {/* 1. HERO SECTION */}
      <section className="lune-hero">
        <div className="hero-background-wrap">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85" 
            alt="LUNE Collection 2026 Editorial"
            className="hero-background-image"
          />
          <div className="hero-gradient-overlay" />
        </div>

        <div className="hero-content-container">
          <div className="hero-editorial-badge">
            <span className="badge-bullet" />
            <span className="badge-text">LUNE COLLECTION 2026</span>
          </div>

          <h1 className="hero-heading">
            Timeless With A Twist
          </h1>

          <p className="hero-description">
            Discover our latest collection designed for modern women.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="hero-primary-btn">
              <span>SHOP NOW</span>
              <ArrowRight size={17} />
            </Link>
            
            <Link to="/shop?category=new" className="hero-secondary-btn">
              <span>EXPLORE LOOKBOOK</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BRAND PHILOSOPHY / INTRO STRIP */}
      <section className="brand-statement-strip">
        <div className="statement-container">
          <span className="statement-subtitle">THE ATELIER PHILOSOPHY</span>
          <h2 className="statement-quote">
            "We believe true luxury is quiet, tactile, and mindful — clothes crafted not for a single season, but to accompany your story for years to come."
          </h2>
          <div className="statement-features">
            <div className="statement-feature">
              <Feather size={20} className="feature-icon" />
              <span>Conscious Natural Fibers</span>
            </div>
            <div className="feature-divider" />
            <div className="statement-feature">
              <Award size={20} className="feature-icon" />
              <span>Artisanal Tailoring</span>
            </div>
            <div className="feature-divider" />
            <div className="statement-feature">
              <Compass size={20} className="feature-icon" />
              <span>Designed in Paris & Milan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES (3 Large Editorial Cards) */}
      <section className="categories-section">
        <div className="section-header-centered">
          <span className="section-eyebrow">CURATED SILHOUETTES</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Explore foundational pieces crafted from sandwashed silk, organic wool, and fine cashmere.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 4. NEW ARRIVALS (4 Realistic Products) */}
      <section className="new-arrivals-section">
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">FRESH FROM THE WORKSHOP</span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">
              Four signature statement garments arriving this week at the atelier.
            </p>
          </div>
          <Link to="/shop" className="view-all-link">
            <span>View All Pieces</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mobile-view-all-wrap">
          <Link to="/shop" className="mobile-view-all-btn">
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5. EDITORIAL BRAND BANNER SECTION */}
      <section className="editorial-banner-section">
        <div className="editorial-banner-card">
          <div className="editorial-image-side">
            <img 
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85" 
              alt="LUNE Editorial campaign"
              className="editorial-image"
            />
          </div>

          <div className="editorial-text-side">
            <div className="editorial-tag">
              <Sparkles size={14} />
              <span>THE EDITORIAL</span>
            </div>
            
            <h2 className="editorial-quote">
              "Designed for the woman who defines her own style."
            </h2>

            <p className="editorial-body">
              Every fold, seam, and contour in our 2026 collection honors feminine strength. 
              Subtle earthy undertones, draped cuts, and tactile warmth unite to create an effortless uniform for everyday poise.
            </p>

            <div className="editorial-cta-group">
              <Link to="/shop" className="editorial-btn">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. BEST SELLERS SECTION */}
      <section className="best-sellers-section">
        <div className="section-header-centered">
          <span className="section-eyebrow">MOST LOVED SILHOUETTES</span>
          <h2 className="section-title">The Atelier Best Sellers</h2>
          <p className="section-subtitle">
            Time-tested icons celebrated for their immaculate drape, sensory comfort, and versatile presence.
          </p>
        </div>

        <div className="products-grid">
          {products.slice(4, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM / COMMUNITY EDITORIAL LOOKBOOK STRIP */}
      <section className="lookbook-strip-section">
        <div className="lookbook-header">
          <span className="section-eyebrow">#LUNESTORE</span>
          <h2 className="section-title">Seen on the Street & In the Atelier</h2>
          <p className="section-subtitle">Follow @lune.fashion on Instagram for daily moodboards and styling notes</p>
        </div>

        <div className="lookbook-grid">
          <div className="lookbook-item">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" 
              alt="LUNE styling"
            />
            <div className="lookbook-overlay">
              <span>@lune.atelier</span>
            </div>
          </div>
          <div className="lookbook-item">
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80" 
              alt="LUNE outerwear"
            />
            <div className="lookbook-overlay">
              <span>@lune.street</span>
            </div>
          </div>
          <div className="lookbook-item">
            <img 
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80" 
              alt="LUNE evening"
            />
            <div className="lookbook-overlay">
              <span>@lune.mood</span>
            </div>
          </div>
          <div className="lookbook-item">
            <img 
              src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80" 
              alt="LUNE leather goods"
            />
            <div className="lookbook-overlay">
              <span>@lune.details</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
