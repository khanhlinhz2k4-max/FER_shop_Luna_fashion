import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedSize, setSelectedSize] = useState('ALL');
  const [selectedColor, setSelectedColor] = useState('ALL');
  const [selectedPriceMax, setSelectedPriceMax] = useState(400);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categoriesList = [
    { id: 'all', label: 'All Garments' },
    { id: 'Outerwear', label: 'Coats & Outerwear' },
    { id: 'Dresses', label: 'Silk Dresses' },
    { id: 'Tailoring', label: 'Blazers & Tailoring' },
    { id: 'Knitwear', label: 'Cashmere Knitwear' },
    { id: 'Trousers', label: 'Pleated Trousers' },
    { id: 'Accessories', label: 'Leather Goods' },
  ];

  const sizesList = ['ALL', 'XS', 'S', 'M', 'L', 'XL'];

  const colorOptions = [
    { label: 'All', value: 'ALL', hex: 'transparent' },
    { label: 'Caramel', value: '#CAA072', hex: '#CAA072' },
    { label: 'Beige', value: '#C8AE84', hex: '#C8AE84' },
    { label: 'Cream', value: '#FEE3AF', hex: '#FEE3AF' },
    { label: 'Brown', value: '#775B3F', hex: '#775B3F' },
    { label: 'Espresso', value: '#2B231D', hex: '#2B231D' },
  ];

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('ALL');
    setSelectedColor('ALL');
    setSelectedPriceMax(400);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'women') {
        result = result.filter(p => p.category !== 'Accessories' && p.id !== 3);
      } else if (selectedCategory === 'men') {
        result = result.filter(p => p.category === 'Tailoring' || p.category === 'Outerwear');
      } else if (selectedCategory === 'new') {
        result = result.filter(p => p.isNew);
      } else {
        result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    // Size filter
    if (selectedSize !== 'ALL') {
      result = result.filter(p => p.sizes && p.sizes.includes(selectedSize));
    }

    // Color filter
    if (selectedColor !== 'ALL') {
      result = result.filter(p => p.colors && p.colors.includes(selectedColor));
    }

    // Price Max filter
    result = result.filter(p => p.price <= selectedPriceMax);

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedSize, selectedColor, selectedPriceMax, searchQuery, selectedSort]);

  return (
    <div className="lune-shop-page">
      {/* Page Header */}
      <div className="shop-header">
        <div className="shop-header-container">
          <nav className="shop-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Shop Atelier</span>
          </nav>
          <h1 className="shop-title">The Complete Collection</h1>
          <p className="shop-description">
            Warm neutrals, pure fibers, and intentional silhouettes designed to transcend seasons.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="shop-layout-wrapper">
        <div className="shop-main-container">
          {/* Mobile Filter Toggle Button */}
          <div className="mobile-filter-bar">
            <button 
              type="button" 
              className="mobile-filter-toggle-btn"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters & Categories</span>
            </button>
            <span className="results-count-mobile">{filteredProducts.length} Pieces</span>
          </div>

          <div className="shop-columns-grid">
            {/* LEFT SIDEBAR: FILTERS */}
            <aside className={`shop-sidebar-filters ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
              <div className="sidebar-header-row">
                <h3 className="sidebar-heading">Filter by</h3>
                <button 
                  type="button" 
                  className="reset-filters-link"
                  onClick={handleResetFilters}
                  title="Clear all filters"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
                <button 
                  type="button" 
                  className="sidebar-close-mobile-btn"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* 1. Category Filter Group */}
              <div className="filter-group">
                <h4 className="filter-group-title">Categories</h4>
                <div className="filter-categories-list">
                  {categoriesList.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`filter-category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Size Filter Group */}
              <div className="filter-group">
                <h4 className="filter-group-title">Size</h4>
                <div className="filter-size-grid">
                  {sizesList.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      className={`size-filter-badge ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Color Filter Group */}
              <div className="filter-group">
                <h4 className="filter-group-title">Color Palette</h4>
                <div className="filter-color-row">
                  {colorOptions.map(col => (
                    <button
                      key={col.value}
                      type="button"
                      className={`color-filter-swatch ${selectedColor === col.value ? 'active' : ''} ${col.value === 'ALL' ? 'all-swatch' : ''}`}
                      style={{ backgroundColor: col.hex }}
                      onClick={() => setSelectedColor(col.value)}
                      title={col.label}
                    >
                      {col.value === 'ALL' && <span>ALL</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Price Range Filter Group */}
              <div className="filter-group">
                <div className="price-label-row">
                  <h4 className="filter-group-title">Max Price</h4>
                  <span className="price-display-val">${selectedPriceMax}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="400"
                  step="10"
                  value={selectedPriceMax}
                  onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-range-extremes">
                  <span>$150</span>
                  <span>$400</span>
                </div>
              </div>
            </aside>

            {/* RIGHT SIDE: SORT TOOLBAR & PRODUCT GRID */}
            <main className="shop-product-area">
              <div className="shop-top-controls">
                <span className="results-count-desktop">
                  Showing <strong>{filteredProducts.length}</strong> atelier creations
                </span>

                <div className="sort-dropdown-wrap">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select 
                    id="sort-select"
                    value={selectedSort} 
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured Curations</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Client Rating</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="products-grid-shop">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No pieces found matching your specific filter criteria.</p>
                  <button 
                    type="button" 
                    className="reset-btn"
                    onClick={handleResetFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
