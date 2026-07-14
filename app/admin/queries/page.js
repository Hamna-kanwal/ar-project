'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminQueries() {
  const router = useRouter();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchQueries();
    }
  }, [router]);

  const fetchQueries = async () => {
    try {
      const res = await fetch('/api/queries');
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        setQueries(data.queries);
      }
    } catch (err) {
      console.error('Failed to fetch queries', err);
    } finally {
      setLoading(false);
    }
  };

 const handleBackToDashboard = (e) => {
    e.preventDefault();
    window.location.href = '/admin';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '20px 12px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Section - Wraps cleanly on mobile */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ color: '#0080C8', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Admin Panel - Customer Queries
          </h1>
          
          <button 
            type="button"
            onClick={handleBackToDashboard}
            style={{ 
              padding: '10px 18px', 
              backgroundColor: '#0080C8', 
              color: '#ffffff', 
              borderRadius: '8px', 
              border: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              zIndex: 999,
              position: 'relative'
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        <hr style={{ marginBottom: '20px', marginTop: '15px', borderColor: '#E85A00', borderWidth: '1px' }} />

        {loading ? (
          <p style={{ color: '#666666', textAlign: 'center', padding: '20px' }}>Loading queries...</p>
        ) : queries.length === 0 ? (
          <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', border: '2px solid #E85A00', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', textAlign: 'center' }}>
            <p style={{ color: '#555555', margin: 0, fontSize: '15px' }}>No customer queries received yet.</p>
          </div>
        ) : (
          /* Mobile Horizontal Scroll Container */
          <div 
            style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '16px', 
              border: '2px solid #E85A00', 
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              overflowX: 'auto', // Enforces horizontal scrollbar on small screens
              WebkitOverflowScrolling: 'touch' // Smooth momentum scroll for iOS
            }}
          >
            <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', color: '#111111' }}>
              <thead>
                <tr style={{ backgroundColor: '#0080C8', color: '#ffffff', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px', fontSize: '14px', minWidth: '100px' }}>Date</th>
                  <th style={{ padding: '12px 14px', fontSize: '14px', minWidth: '130px' }}>Name</th>
                  <th style={{ padding: '12px 14px', fontSize: '14px', minWidth: '180px' }}>Email / Phone</th>
                  <th style={{ padding: '12px 14px', fontSize: '14px', minWidth: '140px' }}>Subject</th>
                  <th style={{ padding: '12px 14px', fontSize: '14px', minWidth: '220px' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q, idx) => (
                  <tr key={q._id || idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fbfe', borderBottom: '1px solid #e1f0fa' }}>
                    <td style={{ padding: '12px 14px', fontSize: '12px', color: '#555', whiteSpace: 'nowrap' }}>
                      {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#111', fontSize: '14px', wordBreak: 'break-word' }}>
                      <b>{q.name || `${q.firstName || ''} ${q.lastName || ''}`.trim() || 'N/A'}</b>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#111', fontSize: '13px', wordBreak: 'break-all' }}>
                      {q.email}<br />
                      <small style={{ color: '#E85A00', fontWeight: '600', fontSize: '12px' }}>{q.phone || 'No phone'}</small>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#111', fontSize: '13px', wordBreak: 'break-word' }}>
                      {q.subject || 'N/A'}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#333', fontSize: '13px', lineHeight: '1.4', wordBreak: 'break-word' }}>
                      {q.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}