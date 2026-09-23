import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Crown
} from 'lucide-react';
import { userProfileData } from '../data/adminData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('details');
  const [profile, setProfile] = useState(userProfileData);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="lune-profile-page">
      <div className="profile-container">
        {/* Breadcrumb */}
        <nav className="shop-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>My Atelier Account</span>
        </nav>

        {/* Profile Header Card */}
        <div className="profile-hero-card">
          <div className="profile-avatar-wrap">
            <span className="profile-avatar-letters">ER</span>
          </div>
          <div className="profile-header-info">
            <div className="profile-title-row">
              <h1 className="profile-name">{profile.fullName}</h1>
              <span className="profile-tier-badge">
                <Crown size={14} />
                <span>{profile.membership}</span>
              </span>
            </div>
            <p className="profile-meta">
              Member since {profile.joinDate} • {profile.loyaltyPoints} Atelier Privilège Points
            </p>
          </div>
        </div>

        {/* Layout: Left Sidebar + Right Content Panel */}
        <div className="profile-layout-grid">
          {/* Left Sidebar Menu */}
          <aside className="profile-sidebar">
            <nav className="profile-menu">
              <button
                type="button"
                className={`profile-menu-item ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <User size={18} />
                <span>Personal Profile</span>
              </button>

              <button
                type="button"
                className={`profile-menu-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} />
                <span>Order History (2)</span>
              </button>

              <button
                type="button"
                className={`profile-menu-item ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin size={18} />
                <span>Saved Addresses</span>
              </button>

              <button
                type="button"
                className={`profile-menu-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <ShieldCheck size={18} />
                <span>Privacy & Security</span>
              </button>

              <div className="profile-menu-divider" />

              <Link to="/login" className="profile-menu-item logout">
                <LogOut size={18} />
                <span>Sign Out</span>
              </Link>
            </nav>
          </aside>

          {/* Right Main Content Area */}
          <main className="profile-content-panel">
            {/* TAB 1: PERSONAL DETAILS */}
            {activeTab === 'details' && (
              <div className="profile-tab-section">
                <div className="panel-header">
                  <h2 className="panel-title">Personal Details</h2>
                  <p className="panel-subtitle">Manage your personal information and contact preferences.</p>
                </div>

                {isSaved && (
                  <div className="profile-alert-success">
                    <CheckCircle2 size={18} />
                    <span>Your profile information has been saved successfully.</span>
                  </div>
                )}

                <form onSubmit={handleSave} className="profile-form">
                  <div className="form-row-two">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={profile.fullName} 
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                        className="form-input" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={profile.email} 
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="form-input" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row-two">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        value={profile.phone} 
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Preferred Language</label>
                      <select className="form-input">
                        <option value="en">English (US / International)</option>
                        <option value="fr">Français (France)</option>
                        <option value="vi">Tiếng Việt</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="save-profile-btn">
                    <span>SAVE CHANGES</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="profile-tab-section">
                <div className="panel-header">
                  <h2 className="panel-title">Order History</h2>
                  <p className="panel-subtitle">Track, view invoice, or request return for your atelier orders.</p>
                </div>

                <div className="orders-list">
                  {profile.recentOrders.map(order => (
                    <div key={order.id} className="order-history-card">
                      <div className="order-history-header">
                        <div>
                          <span className="order-id">{order.id}</span>
                          <span className="order-date">Placed on {order.date}</span>
                        </div>
                        <span className={`order-status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="order-history-body">
                        <p className="order-items-summary">{order.items}</p>
                        <span className="order-total">{order.total}</span>
                      </div>

                      <div className="order-history-footer">
                        <Link to="/order-tracking" className="track-order-link">
                          <span>Track Shipment</span>
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="profile-tab-section">
                <div className="panel-header">
                  <h2 className="panel-title">Delivery Addresses</h2>
                  <p className="panel-subtitle">Your registered atelier delivery locations.</p>
                </div>

                <div className="address-card default">
                  <div className="address-badge">DEFAULT SHIPPING</div>
                  <h3 className="address-recipient">{profile.fullName}</h3>
                  <p className="address-line">{profile.defaultAddress.street}</p>
                  <p className="address-line">{profile.defaultAddress.city}, {profile.defaultAddress.postalCode}</p>
                  <p className="address-line">{profile.defaultAddress.country}</p>
                  <p className="address-phone">{profile.phone}</p>
                </div>
              </div>
            )}

            {/* TAB 4: PRIVACY & SECURITY */}
            {activeTab === 'security' && (
              <div className="profile-tab-section">
                <div className="panel-header">
                  <h2 className="panel-title">Security Settings</h2>
                  <p className="panel-subtitle">Update password and manage security preferences.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Password updated successfully'); }} className="profile-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="••••••••" className="form-input" required />
                  </div>
                  <div className="form-row-two">
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" placeholder="Minimum 8 characters" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="form-input" required />
                    </div>
                  </div>
                  <button type="submit" className="save-profile-btn">
                    <span>UPDATE PASSWORD</span>
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
