import React, { useState } from 'react';
import Image from 'next/image';

function Login() {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log(`Logging in with email/ID: ${emailOrId} and password: ${password}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#1651B6', padding: '10px', marginBottom: '20px', color: 'white' }}>
          <h2 style={{ fontSize: '24px' }}>Welcome to the Kenya National Health Data Dictionary</h2>
        </div>
        <br></br>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <form>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px' }}>
              <span style={{ marginBottom: '5px', display: 'block' }}>Email address or ID number:</span>
              <input
                type="text"
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
                style={{ width: '300px', padding: '8px', fontSize: '16px' }}
              />
            </label>
            <br />
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px' }}>
              <span style={{ marginBottom: '5px', display: 'block' }}>Password:</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '300px', padding: '8px', fontSize: '16px' }}
              />
            </label>
            <br />
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px' }}>
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                style={{ marginRight: '5px' }}
              />
              Show Password
            </label>
            <br />
            <button
              type="button"
              onClick={handleLogin}
              style={{ backgroundColor: '#1651B6', color: 'white', padding: '10px', borderRadius: '5px', fontSize: '18px' }}
            >
              Login
            </button>
          </form>
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '16px' }}>
          Don’t have an account? <a href="#">Sign up</a>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Image
          src={"/assets/images/pic.png"}
          width={1000}
          height={700}
        />
      </div>
    </div>
  );
}

export default Login;