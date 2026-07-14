'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboardHub() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication on load
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    // 1. Clear all local and session storage
    localStorage.removeItem('admin_token');
    localStorage.clear();
    sessionStorage.clear();

    // 2. Force a hard browser navigation to the login page
    window.location.replace('/admin/login');
  };

  if (!authenticated) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: 0, color: '#0080C8', fontSize: '28px', fontWeight: 'bold' }}>Admin Dashboard</h1>
            <p style={{ margin: '5px 0 0', color: '#666' }}>Welcome back! Choose an option below to manage your site.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#dc3545', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: '14px',
              boxShadow: '0 2px 5px rgba(220, 53, 69, 0.3)',
              position: 'relative',
              zIndex: 999
            }}
          >
            Sign Out
          </button>
        </div>

        <hr style={{ border: 'none', borderTop: '2px solid #E85A00', marginBottom: '40px' }} />

        {/* Dashboard Navigation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {/* Card 1: Blog Management */}
          <Link href="/admin/blogs" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', border: '2px solid #0080C8', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📝</div>
              <h2 style={{ color: '#0080C8', margin: '0 0 10px', fontSize: '20px' }}>Manage Blogs</h2>
              <p style={{ color: '#666', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>Create, publish, and delete blog articles shown on your website.</p>
            </div>
          </Link>

          {/* Card 2: Customer Queries */}
          <Link href="/admin/queries" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', border: '2px solid #E85A00', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📨</div>
              <h2 style={{ color: '#E85A00', margin: '0 0 10px', fontSize: '20px' }}>Customer Queries</h2>
              <p style={{ color: '#666', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>View and manage incoming contact form submissions from website visitors.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}