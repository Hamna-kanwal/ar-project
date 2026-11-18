'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const LABELS = {
  meta_title: 'Meta title',
  meta_description: 'Meta description',
  canonical_url: 'Canonical URL',
  robots: 'Robots',
  og_title: 'Social title',
  og_description: 'Social description',
  og_image: 'Social image',
  image_alt_text: 'Image alt text',
  schema_jsonld: 'Schema (JSON-LD)',
};
const labelOf = (key) => LABELS[key.replace('seo.', '')] || key;

const TABS = [
  { id: 'pending', label: 'Waiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
];

export default function AdminSeoApprovals() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null);

  const fetchChanges = useCallback(async (s) => {
    const res = await fetch(`/api/admin/seo/pending?status=${s}`);
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
      return null;
    }
    if (!res.ok) throw new Error(`Failed to load changes (${res.status})`);
    const data = await res.json();
    return data.items || [];
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    const loadChanges = async () => {
      try {
        const changes = await fetchChanges(status);
        if (!cancelled && changes) setItems(changes);
      } catch (err) {
        console.error('Failed to load changes', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadChanges();
    return () => {
      cancelled = true;
    };
  }, [status, fetchChanges]);

  const decide = async (id, action) => {
    const ask = action === 'approve'
      ? 'Approve this change? It will go live on the website.'
      : 'Reject this change? The live page will stay as it is.';
    if (!window.confirm(ask)) return;
    setBusy(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/seo/pending/${id}/${action}`, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage({ ok: true, text: action === 'approve' ? 'Approved. The change is now live.' : 'Rejected.' });
      } else {
        setMessage({ ok: false, text: data.error || 'Something went wrong' });
      }
    } catch {
      setMessage({ ok: false, text: 'Could not reach the server' });
    } finally {
      setBusy('');
      try {
        const changes = await fetchChanges(status);
        if (changes) setItems(changes);
      } catch (err) {
        console.error('Failed to refresh changes', err);
      }
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    window.location.href = '/admin';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '20px 12px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ color: '#0080C8', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Admin Panel - SEO Approvals
          </h1>
          <button
            type="button"
            onClick={goBack}
            style={{ padding: '10px 18px', backgroundColor: '#0080C8', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', position: 'relative', zIndex: 999 }}
          >
            ← Back to Dashboard
          </button>
        </div>

        <hr style={{ marginBottom: '20px', marginTop: '15px', borderColor: '#E85A00', borderWidth: '1px' }} />

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                if (status !== t.id) {
                  setLoading(true);
                  setStatus(t.id);
                }
              }}
              style={{
                padding: '8px 16px', borderRadius: '8px', border: '1px solid #0080C8', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                backgroundColor: status === t.id ? '#0080C8' : '#ffffff',
                color: status === t.id ? '#ffffff' : '#0080C8',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {message && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', backgroundColor: message.ok ? '#e6f6ea' : '#fde8e8', color: message.ok ? '#1e7e34' : '#dc3545' }}>
            {message.text}
          </div>
        )}

        {loading ? (
          <p style={{ color: '#666666', textAlign: 'center', padding: '20px' }}>Loading changes...</p>
        ) : items.length === 0 ? (
          <div style={{ padding: '25px', borderRadius: '16px', border: '2px solid #E85A00', textAlign: 'center' }}>
            <p style={{ color: '#555555', margin: 0, fontSize: '15px' }}>Nothing here.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.pending_id} style={{ border: '2px solid #E85A00', borderRadius: '16px', marginBottom: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#0080C8', color: '#ffffff', padding: '12px 16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <b style={{ fontSize: '15px' }}>{item.page_name}</b>
                  <span style={{ fontSize: '12px', marginLeft: '10px', opacity: 0.9 }}>{item.page_path}</span>
                </div>
                <span style={{ fontSize: '12px' }}>
                  Sent {item.submitted_at ? new Date(item.submitted_at).toLocaleString() : ''}
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', color: '#111111' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fbfe', textAlign: 'left' }}>
                      <th style={{ padding: '10px 14px', fontSize: '12px', width: '16%' }}>Field</th>
                      <th style={{ padding: '10px 14px', fontSize: '12px', width: '42%' }}>Before</th>
                      <th style={{ padding: '10px 14px', fontSize: '12px', width: '42%' }}>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(item.new_value || {}).map((key) => (
                      <tr key={key} style={{ borderTop: '1px solid #e1f0fa', verticalAlign: 'top' }}>
                        <td style={{ padding: '10px 14px', fontSize: '12px', fontWeight: '600', color: '#555' }}>{labelOf(key)}</td>
                        <td style={{ padding: '10px 14px', fontSize: '13px', backgroundColor: '#fff5f5', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                          {item.old_value?.[key] || <i style={{ color: '#999' }}>(empty)</i>}
                        </td>
                        <td style={{ padding: '10px 14px', fontSize: '13px', backgroundColor: '#f1faf3', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                          {item.new_value[key] || <i style={{ color: '#999' }}>(empty)</i>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '12px 16px', borderTop: '1px solid #e1f0fa', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                {item.status === 'pending' ? (
                  <>
                    {item.stale && (
                      <span style={{ color: '#E85A00', fontSize: '13px', flex: '1 1 100%' }}>
                        This page was changed after this edit was sent, so it cannot be approved. Reject it and ask for a new change.
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={busy === item.pending_id || item.stale}
                      onClick={() => decide(item.pending_id, 'approve')}
                      style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', color: '#ffffff', backgroundColor: item.stale ? '#9bc7a6' : '#28a745', cursor: item.stale ? 'not-allowed' : 'pointer' }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={busy === item.pending_id}
                      onClick={() => decide(item.pending_id, 'reject')}
                      style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', color: '#ffffff', backgroundColor: '#dc3545', cursor: 'pointer' }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: '13px', color: '#555' }}>
                    {item.status === 'approved' ? 'Approved' : 'Rejected'}
                    {item.decided_at ? ` on ${new Date(item.decided_at).toLocaleString()}` : ''}
                    {item.decided_by ? ` by ${item.decided_by}` : ''}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
