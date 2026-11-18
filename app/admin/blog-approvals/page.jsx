
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

const KIND_LABELS = {
  new: 'New blog',
  body: 'Text edit',
  seo: 'SEO edit',
};

const TABS = [
  { id: 'pending', label: 'Waiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
];

const cellStyle = {
  padding: '10px 14px',
  fontSize: '13px',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
};

// Safe preview: the sandbox blocks scripts, forms and navigation inside the frame
function Preview({ html }) {
  return (
    <iframe
      title="Content preview"
      sandbox=""
      srcDoc={`<body style="font-family:sans-serif;font-size:14px;color:#111;margin:12px">${html || ''}</body>`}
      style={{
        width: '100%',
        height: '260px',
        border: '1px solid #e1f0fa',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
      }}
    />
  );
}

function Empty() {
  return <i style={{ color: '#999' }}>(empty)</i>;
}

export default function AdminBlogApprovals() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null);

  const fetchChanges = useCallback(async (s) => {
    const res = await fetch(`/api/admin/blogs/pending?status=${s}`);

    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to load changes (${res.status})`);
    }

    const data = await res.json();
    return data.items || [];
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    const loadChanges = async () => {
      try {
        const changes = await fetchChanges(status);

        if (!cancelled && changes) {
          setItems(changes);
        }
      } catch (err) {
        console.error('Failed to load changes', err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadChanges();

    return () => {
      cancelled = true;
    };
  }, [status, fetchChanges]);

  const decide = async (id, action) => {
    const ask = action === 'approve'
      ? 'Approve this blog change? It will go live on the website.'
      : 'Reject this blog change? The live blog will stay as it is.';

    if (!window.confirm(ask)) return;

    setBusy(id);
    setMessage(null);

    try {
      // Same approve/reject routes as SEO approvals:
      // decide() handles blog items by their type.
      const res = await fetch(
        `/api/admin/seo/pending/${id}/${action}`,
        { method: 'POST' }
      );

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage({
          ok: true,
          text: action === 'approve'
            ? 'Approved. The change is now live.'
            : 'Rejected.',
        });
      } else {
        setMessage({
          ok: false,
          text: data.error || 'Something went wrong',
        });
      }
    } catch {
      setMessage({
        ok: false,
        text: 'Could not reach the server',
      });
    } finally {
      setBusy('');

      try {
        const changes = await fetchChanges(status);

        if (changes) {
          setItems(changes);
        }
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: '20px 12px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <h1
            style={{
              color: '#0080C8',
              fontSize: '22px',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            Admin Panel - Blog Approvals
          </h1>

          <button
            type="button"
            onClick={goBack}
            style={{
              padding: '10px 18px',
              backgroundColor: '#0080C8',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 999,
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        <hr
          style={{
            marginBottom: '20px',
            marginTop: '15px',
            borderColor: '#E85A00',
            borderWidth: '1px',
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
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
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #0080C8',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                backgroundColor: status === t.id ? '#0080C8' : '#ffffff',
                color: status === t.id ? '#ffffff' : '#0080C8',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {message && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px',
              backgroundColor: message.ok ? '#e6f6ea' : '#fde8e8',
              color: message.ok ? '#1e7e34' : '#dc3545',
            }}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <p
            style={{
              color: '#666666',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            Loading changes...
          </p>
        ) : items.length === 0 ? (
          <div
            style={{
              padding: '25px',
              borderRadius: '16px',
              border: '2px solid #E85A00',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                color: '#555555',
                margin: 0,
                fontSize: '15px',
              }}
            >
              Nothing here.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.pending_id}
              style={{
                border: '2px solid #E85A00',
                borderRadius: '16px',
                marginBottom: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              }}
            >
              <div
                style={{
                  backgroundColor: '#0080C8',
                  color: '#ffffff',
                  padding: '12px 16px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <div>
                  <b style={{ fontSize: '15px' }}>
                    {item.blog_title}
                  </b>

                  <span
                    style={{
                      fontSize: '12px',
                      marginLeft: '10px',
                      opacity: 0.9,
                    }}
                  >
                    {item.blog_path}
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      marginLeft: '10px',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: '#E85A00',
                      fontWeight: 'bold',
                    }}
                  >
                    {KIND_LABELS[item.kind] || 'Change'}
                  </span>
                </div>

                <span style={{ fontSize: '12px' }}>
                  Sent {item.submitted_at
                    ? new Date(item.submitted_at).toLocaleString()
                    : ''}
                </span>
              </div>

              {/* NEW BLOG: details table and content preview */}
              {item.kind === 'new' && (
                <div style={{ color: '#111111' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table
                      style={{
                        width: '100%',
                        minWidth: '500px',
                        borderCollapse: 'collapse',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              ...cellStyle,
                              width: '20%',
                              fontWeight: '600',
                              color: '#555',
                            }}
                          >
                            Title
                          </td>

                          <td
                            style={{
                              ...cellStyle,
                              backgroundColor: '#f1faf3',
                            }}
                          >
                            {item.new_post?.name || <Empty />}
                          </td>
                        </tr>

                        <tr style={{ borderTop: '1px solid #e1f0fa' }}>
                          <td
                            style={{
                              ...cellStyle,
                              fontWeight: '600',
                              color: '#555',
                            }}
                          >
                            URL
                          </td>

                          <td
                            style={{
                              ...cellStyle,
                              backgroundColor: '#f1faf3',
                            }}
                          >
                            {item.blog_path}
                          </td>
                        </tr>

                        {/* FEATURED IMAGE PREVIEW */}
                        <tr style={{ borderTop: '1px solid #e1f0fa' }}>
                          <td
                            style={{
                              ...cellStyle,
                              fontWeight: '600',
                              color: '#555',
                            }}
                          >
                            Featured Image
                          </td>

                          <td
                            style={{
                              ...cellStyle,
                              backgroundColor: '#f1faf3',
                            }}
                          >
                            {item.new_post?.image ? (
                              <div>
                                <img
                                  src={item.new_post.image}
                                  alt={
                                    item.new_post?.seo?.image_alt_text ||
                                    item.new_post?.name ||
                                    'Blog featured image'
                                  }
                                  style={{
                                    maxWidth: '250px',
                                    maxHeight: '160px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    display: 'block',
                                    marginBottom: '8px',
                                    border: '1px solid #e1f0fa',
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />

                                <a
                                  href={item.new_post.image}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#0080C8',
                                    fontSize: '12px',
                                    wordBreak: 'break-all',
                                  }}
                                >
                                  Open image URL
                                </a>
                              </div>
                            ) : (
                              <Empty />
                            )}
                          </td>
                        </tr>

                        {Object.entries(item.new_post?.seo || {})
                          .filter(([, v]) => v)
                          .map(([key, value]) => (
                            <tr
                              key={key}
                              style={{ borderTop: '1px solid #e1f0fa' }}
                            >
                              <td
                                style={{
                                  ...cellStyle,
                                  fontWeight: '600',
                                  color: '#555',
                                }}
                              >
                                {labelOf(key)}
                              </td>

                              <td
                                style={{
                                  ...cellStyle,
                                  backgroundColor: '#f1faf3',
                                }}
                              >
                                {value}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      borderTop: '1px solid #e1f0fa',
                    }}
                  >
                    <p
                      style={{
                        margin: '0 0 8px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        color: '#333',
                      }}
                    >
                      Blog content preview
                    </p>

                    <Preview html={item.new_post?.body} />
                  </div>
                </div>
              )}

              {/* TEXT EDIT: before and after side by side */}
              {item.kind === 'body' && (
                <div
                  style={{
                    padding: '14px 16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '14px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: '0 0 8px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        color: '#dc3545',
                      }}
                    >
                      Before (live)
                    </p>

                    <Preview html={item.old_body} />
                  </div>

                  <div>
                    <p
                      style={{
                        margin: '0 0 8px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        color: '#28a745',
                      }}
                    >
                      After (proposed)
                    </p>

                    <Preview html={item.proposed_body} />
                  </div>
                </div>
              )}

              {/* SEO EDIT: field by field table */}
              {item.kind === 'seo' && (
                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      minWidth: '600px',
                      borderCollapse: 'collapse',
                      color: '#111111',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: '#f8fbfe',
                          textAlign: 'left',
                        }}
                      >
                        <th
                          style={{
                            padding: '10px 14px',
                            fontSize: '12px',
                            width: '16%',
                          }}
                        >
                          Field
                        </th>

                        <th
                          style={{
                            padding: '10px 14px',
                            fontSize: '12px',
                            width: '42%',
                          }}
                        >
                          Before
                        </th>

                        <th
                          style={{
                            padding: '10px 14px',
                            fontSize: '12px',
                            width: '42%',
                          }}
                        >
                          After
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.keys(item.new_value || {}).map((key) => (
                        <tr
                          key={key}
                          style={{
                            borderTop: '1px solid #e1f0fa',
                            verticalAlign: 'top',
                          }}
                        >
                          <td
                            style={{
                              ...cellStyle,
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#555',
                            }}
                          >
                            {labelOf(key)}
                          </td>

                          <td
                            style={{
                              ...cellStyle,
                              backgroundColor: '#fff5f5',
                            }}
                          >
                            {item.old_value?.[key] || <Empty />}
                          </td>

                          <td
                            style={{
                              ...cellStyle,
                              backgroundColor: '#f1faf3',
                            }}
                          >
                            {item.new_value[key] || <Empty />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div
                style={{
                  padding: '12px 16px',
                  borderTop: '1px solid #e1f0fa',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {item.status === 'pending' ? (
                  <>
                    {item.stale && (
                      <span
                        style={{
                          color: '#E85A00',
                          fontSize: '13px',
                          flex: '1 1 100%',
                        }}
                      >
                        {item.kind === 'new'
                          ? 'A blog with this URL already exists, so this cannot be approved. Reject it and ask for a new blog with a different name.'
                          : 'This blog was changed after this edit was sent, so it cannot be approved. Reject it and ask for a new change.'}
                      </span>
                    )}

                    <button
                      type="button"
                      disabled={busy === item.pending_id || item.stale}
                      onClick={() => decide(item.pending_id, 'approve')}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#ffffff',
                        backgroundColor: item.stale ? '#9bc7a6' : '#28a745',
                        cursor: item.stale ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      disabled={busy === item.pending_id}
                      onClick={() => decide(item.pending_id, 'reject')}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#ffffff',
                        backgroundColor: '#dc3545',
                        cursor: 'pointer',
                      }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: '13px', color: '#555' }}>
                    {item.status === 'approved' ? 'Approved' : 'Rejected'}

                    {item.decided_at
                      ? ` on ${new Date(item.decided_at).toLocaleString()}`
                      : ''}

                    {item.decided_by
                      ? ` by ${item.decided_by}`
                      : ''}
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
