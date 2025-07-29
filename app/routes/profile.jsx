import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './profile.css';

// Supabase client setup
const supabaseUrl = "https://vwiefjfsokkzgjgswsvj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aWVmamZzb2tremdqZ3N3c3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODgxNjksImV4cCI6MjA2OTM2NDE2OX0.HgjuGLBQ_gBf7tBPe_ee8_nUjuHFkh6vNA2lBk999dM";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Profile = ({ userEmail, onLogout }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [form, setForm] = useState({
    Gender: '',
    Age: '',
    ID: '',
    BloodType: '',
    PhoneNumber: '',
    Height: '',
    weight: '',
    SugarLevel: '',
    Address: '',
  });

  const [message, setMessage] = useState('');

  // Check for session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate('/login'); // Redirect to login if no session
      }
    };

    checkSession();
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session || !session.access_token) {
        setMessage('User not authenticated');
        navigate('/login'); // Redirect to login if no session
        return;
      }

      const token = session.access_token;

      const res = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Profile updated successfully!');
      } else {
        setMessage(`❌ ${data.error || 'Failed to update profile.'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Welcome!</h2>
        <p className="dashboard-text">
          Logged in as: <strong>{userEmail}</strong>
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {Object.keys(form).map((field) => (
            <div key={field} style={{ marginBottom: '1rem' }}>
              <label htmlFor={field} style={{ display: 'block', fontWeight: 'bold' }}>
                {field}
              </label>
              <input
                type="text"
                name={field}
                placeholder={`Enter your ${field}`}
                value={form[field]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          ))}
          <button type="submit" className="logout-button">
            Update Profile
          </button>
        </form>

        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>

        <button
          onClick={onLogout}
          className="logout-button"
          style={{ marginTop: '1rem', backgroundColor: '#666' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;