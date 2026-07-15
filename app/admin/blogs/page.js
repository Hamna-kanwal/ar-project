'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
 
// Dynamic import required for Next.js SSR compatibility
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
 
export default function AdminBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
 
  // Track whether we are creating or editing
  const [editingSlug, setEditingSlug] = useState(null);
  const [initialFormData, setInitialFormData] = useState(null);
 
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
 
  const emptyFormData = {
    title: '',
    slug: '',
    excerpt: '',
    description: '',
    image: '',
    tag: '',
    pagetitle: '',
    pageDescription: '',
    keywords: '',
  };
 
  const [formData, setFormData] = useState(emptyFormData);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
 
  // Helper function to show floating toast messages
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };
 
  // Security Check & Initial Data Load
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchBlogs();
    }
  }, [router]);
 
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    }
  };
 
  const handleBackToDashboard = (e) => {
    e.preventDefault();
    window.location.href = '/admin';
  };
 
  const handleTitleChange = (e) => {
    const title = e.target.value;
    // Keep title updated without automatically touching the slug
    setFormData((prev) => ({ ...prev, title }));
  };
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('File size too large! Upload an image under 2MB.', 'error');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
 
  const handleEditClick = (blog) => {
    const dataToSet = {
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      description: blog.description || '',
      image: blog.image || '',
      tag: blog.tag || '',
      pagetitle: blog.pagetitle || '',
      pageDescription: blog.pageDescription || '',
      keywords: blog.keywords || '',
    };
    setEditingSlug(blog.slug);
    setFormData(dataToSet);
    setInitialFormData(dataToSet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
  const resetForm = () => {
    setEditingSlug(null);
    setInitialFormData(null);
    setFormData(emptyFormData);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Check if in edit mode and no changes were made
    if (editingSlug && initialFormData) {
      const isUnchanged = JSON.stringify(formData) === JSON.stringify(initialFormData);
      if (isUnchanged) {
        showToast('No changes were made to the blog post.', 'error');
        return;
      }
    }
 
    setLoading(true);
 
    try {
      const isEditing = Boolean(editingSlug);
      const url = isEditing ? `/api/blogs/${editingSlug}` : '/api/blogs';
      const method = isEditing ? 'PUT' : 'POST';
 
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
 
      const data = await res.json();
      if (data.success) {
        showToast(isEditing ? 'Blog updated successfully!' : 'Blog published successfully!', 'success');
        resetForm();
        fetchBlogs();
      } else {
        showToast(`Error: ${data.message || 'Failed to save blog'}`, 'error');
      }
    } catch (err) {
      showToast('Failed to save blog', 'error');
    } finally {
      setLoading(false);
    }
  };
 
  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
 
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Blog deleted successfully!', 'error');
        fetchBlogs();
        if (editingSlug === slug) resetForm();
      } else {
        showToast(`Error: ${data.message || 'Failed to delete blog'}`, 'error');
      }
    } catch (err) {
      showToast('Failed to delete blog', 'error');
    }
  };
 
  // Custom configuration for Quill Editor Toolbar
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'clean'],
    ],
  };
 
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    backgroundColor: '#ffffff',
    color: '#111111',
    border: '1.5px solid #0080C8',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  };
 
  // Pagination Slice Calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
 
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '40px 20px', fontFamily: 'sans-serif', position: 'relative' }}>
     
      {/* FLOATING TOAST NOTIFICATION (Strictly Red or Green) */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: toast.type === 'success' ? '#28a745' : '#dc3545',
          color: '#ffffff',
          padding: '14px 24px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          fontWeight: 'bold',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {toast.message}
        </div>
      )}
 
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
       
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0080C8', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Admin Panel - Manage Blogs</h1>
         
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
 
        <hr style={{ marginBottom: '30px', marginTop: '15px', borderColor: '#E85A00', borderWidth: '1px' }} />
 
        {/* CREATE / EDIT BLOG FORM */}
        <section style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', marginBottom: '40px', color: '#111111', border: '2px solid #E85A00', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#0080C8', margin: 0, fontSize: '22px' }}>
              {editingSlug ? 'Edit Blog Post' : 'Create a New Blog'}
            </h2>
            {editingSlug && (
              <button
                type="button"
                onClick={resetForm}
                style={{ background: '#dc3545', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
              >
                Cancel Editing
              </button>
            )}
          </div>
 
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ color: '#222222' }}><b>Blog Title:</b></label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g., Boiler Installation: The Complete Buyer's Guide"
                style={inputStyle}
              />
            </div>
 
            <div>
              <label style={{ color: '#222222' }}><b>URL Slug:</b></label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                style={inputStyle}
              />
            </div>
 
            <div>
              <label style={{ color: '#222222' }}><b>Tag / Category:</b></label>
              <input
                type="text"
                required
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g., Boiler Services"
                style={inputStyle}
              />
            </div>
 
            <div>
              <label style={{ color: '#222222' }}><b>Short Excerpt:</b></label>
              <input
                type="text"
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short summary for preview cards"
                style={inputStyle}
              />
            </div>
 
            <div>
              <label style={{ color: '#222222' }}><b>Cover Image (Max 2MB):</b></label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '8px', display: 'block', color: '#111111' }} />
             
              {/* IMAGE PREVIEW SECTION */}
              {formData.image && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <small style={{ color: '#28a745', fontWeight: 'bold' }}>Image loaded / Preview:</small>
                  <img
                    src={formData.image}
                    alt="Cover Preview"
                    style={{ maxHeight: '150px', maxWidth: '250px', objectFit: 'cover', borderRadius: '8px', border: '1.5px solid #0080C8' }}
                  />
                </div>
              )}
            </div>
 
            {/* VISUAL RICH TEXT EDITOR (REACT-QUILL) */}
            <div>
              <label style={{ color: '#222222', display: 'block', marginBottom: '8px' }}><b>Main Content:</b></label>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1.5px solid #0080C8', overflow: 'hidden' }}>
                <ReactQuill
                  theme="snow"
                  modules={quillModules}
                  value={formData.description}
                  onChange={(content) => setFormData((prev) => ({ ...prev, description: content }))}
                  placeholder="Write blog body text here..."
                  style={{ height: '250px', marginBottom: '45px' }}
                />
              </div>
            </div>
 
            <h3 style={{ marginTop: '10px', color: '#0080C8', fontSize: '18px' }}>SEO Options (Optional)</h3>
            <div>
              <input
                type="text"
                placeholder="SEO Meta Page Title"
                value={formData.pagetitle}
                onChange={(e) => setFormData({ ...formData, pagetitle: e.target.value })}
                style={{ ...inputStyle, marginBottom: '12px' }}
              />
              <input
                type="text"
                placeholder="SEO Meta Page Description"
                value={formData.pageDescription}
                onChange={(e) => setFormData({ ...formData, pageDescription: e.target.value })}
                style={{ ...inputStyle, marginBottom: '12px' }}
              />
              <input
                type="text"
                placeholder="SEO Keywords (comma separated)"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                style={inputStyle}
              />
            </div>
 
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '12px 24px', background: '#E85A00', color: '#ffffff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}
            >
              {loading ? (editingSlug ? 'Updating...' : 'Publishing...') : (editingSlug ? 'Update Blog Post' : 'Publish Blog')}
            </button>
          </form>
        </section>
 
        {/* EXISTING BLOGS LIST */}
        <section style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', border: '2px solid #0080C8', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ color: '#0080C8', marginTop: 0, fontSize: '22px' }}>Existing Blogs</h2>
          {blogs.length === 0 ? (
            <p style={{ color: '#666666' }}>No blogs published yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentBlogs.map((blog) => (
                <div key={blog._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: '#f8fbfe', border: '1px solid #0080C8', borderRadius: '10px' }}>
                  <div>
                    <strong style={{ color: '#111111', fontSize: '16px' }}>{blog.title}</strong>
                    <p style={{ margin: '4px 0 0', color: '#555555', fontSize: '14px' }}>Tag: {blog.tag} | Slug: /{blog.slug}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditClick(blog)}
                      style={{ background: '#0080C8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.slug)}
                      style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
 
              {/* --- Optimized Pagination Navigation --- */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                   
                    {/* First Page Button */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                      style={{
                        padding: '8px 12px',
                        border: '1.5px solid #0080C8',
                        borderRadius: '8px',
                        backgroundColor: currentPage === 1 ? '#f5f5f5' : '#ffffff',
                        color: currentPage === 1 ? '#999999' : '#0080C8',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '13px'
                      }}
                    >
                      « First
                    </button>
 
                    {/* Prev Button */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      style={{
                        padding: '8px 12px',
                        border: '1.5px solid #0080C8',
                        borderRadius: '8px',
                        backgroundColor: currentPage === 1 ? '#f5f5f5' : '#ffffff',
                        color: currentPage === 1 ? '#999999' : '#0080C8',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        marginRight: '4px'
                      }}
                    >
                      ‹ Prev
                    </button>
 
                    {/* Dynamic Page Numbers with Ellipses */}
                    {(() => {
                      const pages = [];
                      const range = 1; // Number of pages to show on either side of the active page
 
                      for (let i = 1; i <= totalPages; i++) {
                        // Always show the first page, last page, and the range surrounding the active page
                        if (
                          i === 1 ||
                          i === totalPages ||
                          (i >= currentPage - range && i <= currentPage + range)
                        ) {
                          pages.push(
                            <button
                              key={i}
                              type="button"
                              onClick={() => setCurrentPage(i)}
                              style={{
                                padding: '8px 14px',
                                border: '1.5px solid #0080C8',
                                borderRadius: '8px',
                                backgroundColor: currentPage === i ? '#0080C8' : '#ffffff',
                                color: currentPage === i ? '#ffffff' : '#0080C8',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '13px',
                                minWidth: '40px'
                              }}
                            >
                              {i}
                            </button>
                          );
                        } else if (
                          i === currentPage - range - 1 ||
                          i === currentPage + range + 1
                        ) {
                          // Render an ellipses divider if there is a gap
                          pages.push(
                            <span
                              key={`ellipsis-${i}`}
                              style={{
                                color: '#0080C8',
                                padding: '0 8px',
                                fontWeight: 'bold',
                                userSelect: 'none'
                              }}
                            >
                              ...
                            </span>
                          );
                        }
                      }
                      return pages;
                    })()}
 
                    {/* Next Button */}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      style={{
                        padding: '8px 12px',
                        border: '1.5px solid #0080C8',
                        borderRadius: '8px',
                        backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#ffffff',
                        color: currentPage === totalPages ? '#999999' : '#0080C8',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        marginLeft: '4px'
                      }}
                    >
                      Next ›
                    </button>
 
                    {/* Last Page Button */}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      style={{
                        padding: '8px 12px',
                        border: '1.5px solid #0080C8',
                        borderRadius: '8px',
                        backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#ffffff',
                        color: currentPage === totalPages ? '#999999' : '#0080C8',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '13px'
                      }}
                    >
                      Last »
                    </button>
 
                  </div>
 
                  {/* Showing entries range indicator */}
                  <span style={{ fontSize: '13px', color: '#666666', fontWeight: '500' }}>
                    Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, blogs.length)} of {blogs.length} entries
                  </span>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
 