import React, { useState } from 'react';
import "app/app.css";
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vwiefjfsokkzgjgswsvj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aWVmamZzb2tremdqZ3N3c3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODgxNjksImV4cCI6MjA2OTM2NDE2OX0.HgjuGLBQ_gBf7tBPe_ee8_nUjuHFkh6vNA2lBk999dM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Login() {
  const navigate = useNavigate();

  // State to hold form inputs
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [message, setMessage] = useState(null); // For showing messages

  // Helper to show messages
  const showMessage = (msg, type) => {
    setMessage({ text: msg, type });
    // Optionally clear message after some time
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    showMessage('Attempting to sign in...', 'info');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) {
        showMessage(`Sign In failed: ${error.message}`, 'error');
        console.error('Login failed:', error.message);
        return;
      }

      showMessage('Sign In successful! Welcome.', 'success');
      console.log('Login successful:', data);

      // You can add your own logic here, e.g. set global user state or navigate
      navigate('/dashboard'); // for example

    } catch (err) {
      showMessage('Unexpected error during sign in.', 'error');
      console.error('Unexpected error during sign in:', err);
    } finally {
      setSignInEmail('');
      setSignInPassword('');
    }
  };

  function handleRegistBtn() {
    navigate('/register');
  }

  function handleClose() {
    navigate('/');
  }

  return (
    <div className="wrapper">
      <div className="formBox login">
        <span className="CloseIcon" onClick={handleClose}>X</span>

        <form onSubmit={handleSignInSubmit}>
          <h2>Login</h2>

          <div className="inputBox">
            <span className="icon">{/*<ion-icon name="mail"></ion-icon>*/}</span>
            <input
              type="email"
              required
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              placeholder="Email"
            />
            <label>Email</label>
          </div>

          <div className="inputBox">
            <span className="icon">{/*<ion-icon name="lock-closed"></ion-icon>*/}</span>
            <input
              type="password"
              required
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              placeholder="Password"
            />
            <label>Password</label>
          </div>

          <div className="remember-forget">
            <label><input type="checkbox" /> Remember me.</label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="LoginBtn1">Login</button>

          <div className="register">
            <p>
              Don't have an account?{' '}
              <Link to="/register" onClick={handleRegistBtn} className="register-link">
                Register
              </Link>
            </p>
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default Login;
