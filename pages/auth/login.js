import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Link from "next/link";
import { useRouter } from 'next/router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in all the required fields.');
      return;
    }
    try {
      const response = await fetch('http://41.89.92.186:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        console.log('Login successful');
        alert('Login successful.');
        router.push('/');
      } else {
        console.log('Login failed');
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  
  const handleForgotPassword = () => {
    // TODO add logic to handle forgot password functionality 
    console.log('Forgot Password clicked');
  };
  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundImage: 'url("/assets/images/backgroung.png")', backgroundSize: 'cover' }}>
        <Box
          style={{
            backgroundColor: 'rgba(22, 81, 182, 0.8)',
            padding: '10px',
            marginBottom: '20px',
            color: 'white',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <br></br>
          <h2 style={{ fontSize: '18px' }}>Sign in to the Kenya National Terminology Services</h2>
        </Box>
        <br></br>
        <div style={{ backgroundColor: 'rgba(248, 248, 248, 0.8)', margin: '10px', padding: '20px', borderRadius: '5px' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ height: '40px' }}></div>
                <img
                  src="/assets/images/login.png" 
                  alt="Login Icon"
                  style={{ width: '80px', height: '80px', marginRight: '10px' }}
                />
                <span style={{ marginBottom: '5px', display: 'block' }}></span>
                <br></br>
            <form>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/assets/images/email.png" 
                  alt="Email Icon"
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or email"
                  style={{ width: '400px', padding: '8px', fontSize: '16px' }}
                  required
                />
              </div>
              <br />
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '18px' }}>
                <span style={{ marginBottom: '5px', display: 'block' }}></span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/assets/images/key.png" 
                  alt="Password Icon"
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{ width: '400px', padding: '8px', fontSize: '16px' }}
                  required
                />
              </div>
              <br />
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px' }}>
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                  style={{ marginRight: '5px' }}
                />
                Show Password
              </label>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                  <a href="#" onClick={handleForgotPassword}>
                    Forgot Password?
                  </a>
                </div>
              <br />
              
              <button
                type="button"
                onClick={handleLogin}
                style={{
                  backgroundColor: '#1651B6',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  width: '200px',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#34ebe5'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#1651B6'}
              >
                Sign in
              </button>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                Don’t have an account? <a href="/auth/register">Request Account</a> 
              </div>
            </form>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <img
          src="/assets/images/search.png"
          alt=""
          style={{ width: '100%', height: '80%', objectFit: 'cover' }}
        />
<div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '10px' }}>
  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
    Resources
  </div>
  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
    Guide
  </div>
  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
    Knowledge base
  </div>
  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
    Help & Guides
  </div>
</div>
      </div>
    </div>
  );
}

export default Login;