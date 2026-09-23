import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Feather, Compass, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="lune-about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="section-eyebrow">THE MAISON</span>
          <h1 className="about-title">The Essence of LUNE</h1>
          <p className="about-subtitle">
            Born from a desire to strip away fleeting trends and cultivate a wardrobe of sensual composure, warmth, and enduring grace.
          </p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="about-story-section">
        <div className="about-story-grid">
          <div className="story-image-wrap">
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" 
              alt="Atelier workshop"
            />
          </div>
          <div className="story-text-wrap">
            <span className="section-eyebrow">OUR VISION</span>
            <h2 className="story-heading">Warm Luxury × Soft Feminine</h2>
            <p className="story-p">
              Founded in 2026, LUNE redefines modern ready-to-wear through an intimate lens. 
              We focus on warm neutral palettes—caramel, rich brown, soft cream, and sunlit beige—that harmoniously complement every skin tone and environment.
            </p>
            <p className="story-p">
              Each pattern is developed in-house with millimeter precision. We work exclusively with certified European weaving mills, utilizing organic silks, superfine merino, and regenerated cashmere.
            </p>
            <Link to="/shop" className="hero-primary-btn" style={{ marginTop: '24px', display: 'inline-flex' }}>
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
