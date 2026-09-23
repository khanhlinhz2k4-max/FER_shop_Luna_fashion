import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, CheckCircle2, X, FolderTree } from 'lucide-react';
import { initialCategories } from '../../data/adminData';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    itemCount: 0
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0,
      image: newCategory.image,
      status: "Active",
      description: newCategory.description || "Atelier curated capsule."
    };

    setCategories([...categories, created]);
    setIsModalOpen(false);
    setNewCategory({ name: '', slug: '', description: '', image: '', itemCount: 0 });
    showToast('New category created successfully');
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    showToast('Category deleted');
  };

  return (
    <AdminLayout title="Product Categories Taxonomy">
      <div className="admin-page-view">
        <div className="admin-header-toolbar">
          <div>
            <h1 className="admin-view-title">Collections & Categories</h1>
            <p className="admin-view-sub">
              Organize your catalog by garment families, seasonal lookbooks, and capsules.
            </p>
          </div>

          <button 
            type="button" 
            className="admin-primary-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            <span>CREATE CATEGORY</span>
          </button>
        </div>

        {toastMessage && (
          <div className="toast-notification">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Categories Table Card */}
        <div className="admin-table-card">
          <div className="table-responsive-wrapper">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Cover Look</th>
                  <th>Category Title</th>
                  <th>URL Slug</th>
                  <th>Published Silhouettes</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td style={{ width: '90px' }}>
                      <img src={cat.image} alt={cat.name} className="category-table-thumb" />
                    </td>
                    <td>
                      <strong className="category-table-name">{cat.name}</strong>
                    </td>
                    <td>
                      <code className="slug-code">/{cat.slug}</code>
                    </td>
                    <td>
                      <span className="count-tag">{cat.itemCount} Pieces</span>
                    </td>
                    <td className="text-muted" style={{ maxWidth: '280px' }}>
                      {cat.description}
                    </td>
                    <td>
                      <span className="status-tag in-stock">{cat.status}</span>
                    </td>
                    <td>
                      <div className="table-actions-group">
                        <button 
                          type="button" 
                          className="table-action-icon-btn delete"
                          onClick={() => handleDelete(cat.id)}
                          title="Delete category"
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

        {/* Add Category Modal */}
        {isModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Create Collection Category</h3>
                  <p className="modal-subtitle">Define a new taxonomic capsule for the store</p>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="modal-form">
                <div className="form-group">
                  <label>Category Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Resort & Evening Wear"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label>URL Slug</label>
                  <input 
                    type="text" 
                    placeholder="e.g. evening-wear"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label>Editorial Description</label>
                  <textarea 
                    rows="3" 
                    placeholder="Flowing silhouettes tailored for twilight gatherings..."
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="modal-actions-row">
                  <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-primary-btn">
                    <span>CREATE CATEGORY</span>
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
