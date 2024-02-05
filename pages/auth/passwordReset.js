import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function ForgotPassword({ onForgotPassword, onCancel }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleForgotPassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match. Please make sure they are the same.");
      return;
    }

    onForgotPassword(newPassword);
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/assets/images/resetpassword.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <div
        style={{
          backgroundColor: '#e6f7ff',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          color: '#000',
          opacity: animate ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <h2>Reset your password</h2>
        <p>
          Enter a new password to reset the password on your Account.
          We'll ask for this password whenever you login.
        </p>
        <label>
          New Password<span style={{ color: 'red' }}>*</span>
        </label>
        <br />
        <input
          type={showPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          required
          style={{
            width: '40%',
            padding: '10px',
            borderRadius: '8px',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
            style={{ marginRight: '5px' }}
          />
          Show Password
        </div>
        <ul>
          <li>Must be at least 15 characters long</li>
          <li>Must contain an uppercase and a lowercase letter (A-Z, a-z)</li>
          <li>Must contain a number</li>
          <li>Must contain a special character (!, %, @, #, etc.)</li>
        </ul>
        <label>
          Confirm New Password<span style={{ color: 'red' }}>*</span>
        </label>
        <br />
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
          style={{
            width: '40%',
            padding: '10px',
            borderRadius: '8px',
          }}
        />
        <br />
        <p>
          <button
            type="button"
            onClick={handleForgotPassword}
            style={{
              backgroundColor: '#1651B6',
              color: 'white',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '18px',
              width: '30%',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#34ebe5'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1651B6'}
          >
            Reset password
          </button>
        </p>
        <p>
          Know your Password? <Link href="/auth/login">Sign in</Link>
        </p>
        <p>
        <Link href="/">Back to Home</Link>        
            <a style={{ color: '#1651B6', textDecoration: 'underline' }}></a>
        
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
