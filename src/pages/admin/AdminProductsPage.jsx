import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  X, 
  Eye,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { products as initialProductsData } from '../../data/products';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(initialProductsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form State for New Product Modal
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Outerwear',
    price: '',
    tag: 'NEW IN',
    stock: 15,
    description: '',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleDelete = (id) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    showToast('Product successfully removed from catalog');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const createdItem = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: null,
      tag: newProduct.tag,
      rating: 5.0,
      reviewCount: 0,
      image: newProduct.image,
      secondaryImage: newProduct.image,
      description: newProduct.description || "Handcrafted with natural European fibers.",
      colors: ["#775B3F", "#C8AE84"],
      sizes: ["S", "M", "L"]
    };

    setProductList([createdItem, ...productList]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      category: 'Outerwear',
      price: '',
      tag: 'NEW IN',
      stock: 15,
      description: '',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
    });
    showToast('New silhouette added to Atelier Catalog');
  };

  const filteredProducts = productList.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <AdminLayout title="Products Catalog & Inventory">
      <div className="admin-page-view">
        {/* Header Toolbar */}
        <div className="admin-header-toolbar">
          <div>
            <h1 className="admin-view-title">Product Catalog</h1>
            <p className="admin-view-sub">
              Manage luxury silhouettes, stock levels, and merchandising tags.
            </p>
          </div>

          <button 
            type="button" 
            className="admin-primary-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            <span>ADD NEW SILHOUETTE</span>
          </button>
        </div>

        {toastMessage && (
          <div className="toast-notification">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="admin-filter-bar">
          <div className="admin-search-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search product title, SKU, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-filter-options">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="admin-select"
            >
              <option value="ALL">All Categories</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Dresses">Dresses</option>
              <option value="Tailoring">Tailoring</option>
              <option value="Knitwear">Knitwear</option>
              <option value="Trousers">Trousers</option>
              <option value="Accessories">Accessories</option>
            </select>

            <span className="count-pill">{filteredProducts.length} Silhouettes</span>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="admin-table-card">
          <div className="table-responsive-wrapper">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Garment Preview</th>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Tag / Badge</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td style={{ width: '80px' }}>
                      <img src={p.image} alt={p.name} className="product-table-thumb" />
                    </td>
                    <td>
                      <div className="product-cell-info">
                        <span className="product-cell-name">{p.name}</span>
                        <span className="product-cell-sku">SKU: LUNE-00{p.id}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{p.category}</span>
                    </td>
                    <td>
                      <strong className="price-tag">${p.price}.00</strong>
                    </td>
                    <td>
                      <span className="status-tag in-stock">
                        In Stock (12 units)
                      </span>
                    </td>
                    <td>
                      {p.tag ? (
                        <span className="badge-tag">{p.tag}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions-group">
                        <button 
                          type="button" 
                          className="table-action-icon-btn delete"
                          onClick={() => handleDelete(p.id)}
                          title="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Create New Silhouette</h3>
                  <p className="modal-subtitle">Add a tailored garment to the live boutique catalog</p>
                </div>
                <button 
                  type="button" 
                  className="modal-close-btn"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="modal-form">
                <div className="form-group">
                  <label>Garment Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Sienne Cashmere Cape"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      className="form-input"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="Outerwear">Outerwear</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Tailoring">Tailoring</option>
                      <option value="Knitwear">Knitwear</option>
                      <option value="Trousers">Trousers</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Retail Price ($ USD)</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="280"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Merchandising Tag</label>
                    <select 
                      className="form-input"
                      value={newProduct.tag}
                      onChange={(e) => setNewProduct({...newProduct, tag: e.target.value})}
                    >
                      <option value="NEW IN">NEW IN</option>
                      <option value="BESTSELLER">BESTSELLER</option>
                      <option value="SIGNATURE">SIGNATURE</option>
                      <option value="LIMITED">LIMITED</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Initial Stock (Units)</label>
                    <input 
                      type="number" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Garment Story & Description</label>
                  <textarea 
                    rows="3" 
                    placeholder="Crafted from organic sandwashed Italian silk with hand-rolled hems..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="modal-actions-row">
                  <button 
                    type="button" 
                    className="modal-cancel-btn"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-primary-btn">
                    <span>PUBLISH SILHOUETTE</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
