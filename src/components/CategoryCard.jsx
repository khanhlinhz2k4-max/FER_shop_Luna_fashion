import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link to={category.link} className="lune-category-card">
      <div className="category-image-wrap">
        <img 
          src={category.image} 
          alt={category.title}
          className="category-image"
          loading="lazy"
        />
        <div className="category-overlay" />
      </div>

      <div className="category-content">
        <span className="category-count">{category.itemCount}</span>
        <h3 className="category-title">{category.title}</h3>
        <p className="category-subtitle">{category.subtitle}</p>
        
        <div className="category-cta">
          <span>EXPLORE</span>
          <ArrowRight size={16} className="category-arrow" />
        </div>
      </div>
    </Link>
  );
}
