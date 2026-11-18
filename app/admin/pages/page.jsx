'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'pending', label: 'Waiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
];

export default function AdminPagesApprovals() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null);
  const inFlight = useRef(new Set());

  const fetchChanges = useCallback(async (s) => {
    const res = await fetch(`/api/admin/pages/pending?status=${s}`);
    if (res.status === 401) {
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

  const decide = async (pendingId, action) => {
    // Block duplicate submits for the same item
    if (inFlight.current.has(pendingId)) return;

    const ask = action === 'approve'
      ? 'Approve this content update? It will go live on the website.'
      : 'Reject this update?';
    if (!window.confirm(ask)) return;

    inFlight.current.add(pendingId);
    setBusy(pendingId);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/pages/pending/${pendingId}/${action}`, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage({ ok: true, text: action === 'approve' ? 'Approved & Live.' : 'Rejected.' });
      } else {
        setMessage({ ok: false, text: data.error || 'Something went wrong' });
      }
    } catch {
      setMessage({ ok: false, text: 'Server connection failed' });
    } finally {
      inFlight.current.delete(pendingId);
      setBusy('');
      try {
        const changes = await fetchChanges(status);
        if (changes) setItems(changes);
      } catch (err) {
        console.error('Failed to refresh changes', err);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '20px 12px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ color: '#0080C8', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Admin Panel - Service Pages Content Approvals
          </h1>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            style={{ padding: '10px 18px', backgroundColor: '#0080C8', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ← Back to Dashboard
          </button>
        </div>

        <hr style={{ marginBottom: '20px', marginTop: '15px', borderColor: '#E85A00' }} />

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                if (status !== t.id) {
                  setMessage(null);
                  setLoading(true);
                  setStatus(t.id);
                }
              }}
              style={{
                padding: '8px 16px', borderRadius: '8px', border: '1px solid #0080C8', fontWeight: '600', cursor: 'pointer',
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
          <p style={{ textAlign: 'center', padding: '20px' }}>Loading...</p>
        ) : items.length === 0 ? (
          <div style={{ padding: '25px', borderRadius: '16px', border: '2px solid #E85A00', textAlign: 'center' }}>
            <p style={{ margin: 0 }}>Nothing here.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.pending_id} style={{ border: '2px solid #E85A00', borderRadius: '16px', marginBottom: '20px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#0080C8', color: '#ffffff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <b>{item.page_name} ({item.target})</b>
                <span>Submitted: {new Date(item.submitted_at).toLocaleString()}</span>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#fdfdfd' }}>
                <p style={{ fontWeight: 'bold', color: '#333' }}>Proposed Content Preview (JSON / Summary):</p>
                <pre style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', maxHeight: '200px' }}>
                  {JSON.stringify(item.proposed_body, null, 2)}
                </pre>
              </div>

              <div style={{ padding: '12px 16px', borderTop: '1px solid #e1f0fa', display: 'flex', gap: '10px' }}>
                {item.status === 'pending' ? (
                  <>
                    {item.stale && (
                      <span style={{ color: '#E85A00', fontSize: '13px', flex: '1 1 100%' }}>
                        This update was submitted for version {item.base_version ?? 'unknown'}, but the current page is version {item.current_version ?? 'unavailable'}. Reject this version and submit a fresh update to avoid overwriting newer content.
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={busy === item.pending_id || item.stale}
                      onClick={() => decide(item.pending_id, 'approve')}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: item.stale ? '#8a9690' : '#28a745',
                        cursor: item.stale || busy === item.pending_id ? 'not-allowed' : 'pointer',
                        opacity: item.stale || busy === item.pending_id ? 0.7 : 1,
                      }}
                    >
                      Approve & Publish
                    </button>
                    <button
                      type="button"
                      disabled={busy === item.pending_id}
                      onClick={() => decide(item.pending_id, 'reject')}
                      style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', color: '#fff', backgroundColor: '#dc3545', cursor: busy === item.pending_id ? 'not-allowed' : 'pointer', opacity: busy === item.pending_id ? 0.7 : 1 }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>Status: <b>{item.status}</b></span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}