'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Demo Hardcoded Credentials (You can move this to .env later)
    const ADMIN_EMAIL = 'arheating@gmail.com';
    const ADMIN_PASS = 'admin1234';

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      // Set session token in localStorage
      localStorage.setItem('admin_token', 'authenticated_true');
      router.push('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', padding: '40px 30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', textAlign: 'center' }}>
        
        {/* Lock Icon Header */}
        <div style={{ width: '60px', height: '60px', backgroundColor: '#0080C8', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#ffffff', fontSize: '24px' }}>
          🔒
        </div>

        <h2 style={{ margin: '0 0 5px', color: '#111111', fontSize: '24px', fontWeight: 'bold' }}>Admin Portal</h2>
        <p style={{ margin: '0 0 30px', color: '#888888', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}>
          AR HEATING & PLUMBING MANAGEMENT
        </p>

        {error && (
          <div style={{ backgroundColor: '#fde8e8', color: '#dc3545', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#888888', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', color: '#111', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#888888', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', color: '#111', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '14px', backgroundColor: '#0080C8', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }}
          >
            SIGN IN TO DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
}