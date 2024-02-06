import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Link from "next/link";
import { useRouter } from 'next/router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // New state
  const [showSignInButton, setShowSignInButton] = useState(true);
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

  const handleSendButtonClick = () => {
    const emailInput = document.querySelector('input[type="text"]');
    const email = emailInput.value.trim();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    mockSendResetEmail(email);
    
    setShowForgotPassword(false);
    setShowSignInButton(true);

    alert('A password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.');
  };
  
  // TODO Write a Mock function simulating an API call to send a reset email
const mockSendResetEmail = (email) => {
  console.log(`Sending reset email to: ${email}`);

};

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
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
            {showForgotPassword ? (
              <div>
                <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                  <a href="#" onClick={() => setShowForgotPassword(false)}>
                    Back to Sign In
                  </a>
                </div>
                <div style={{ backgroundColor: '#19F5F5', padding: '20px', borderRadius: '10px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
  <h3>Forgot Password?</h3>
  <p>Please type your email address below:</p>
  <p><input type="text" placeholder="Enter your email" style={{ fontSize: '16px', padding: '10px' }} required /></p>
  <button style={{ fontSize: '18px', padding: '10px' }}onClick={handleSendButtonClick}>Send</button>
  
</div>


              </div>
            ) : (
              <div>
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px' }}>
                  Username or email address:
                </label>
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
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px' }}>
                  Password:
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
         {showSignInButton && (
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
              )}
            </div>
          )}
            <br />
            <div style={{ marginBottom: '10px', fontSize: '16px' }}>
              Don’t have an account? <a href="/auth/register">Request Account</a> 
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <img
          src="/assets/images/concept.png"
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
