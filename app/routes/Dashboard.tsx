import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

// Placeholder for images as local file paths cannot be resolved in this environment
const myImage = "https://placehold.co/150x150/AEC6CF/000080?text=User"; // Light blue background, dark blue text

// Supabase client setup - Initialized once
const supabase = createClient(
  'https://vwiefjfsokkzgjgswsvj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aWVmamZzb2tremdqZ3N3c3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODgxNjksImV4cCI6MjA2OTM2NDE2OX0.HgjuGLBQ_gBf7tBPe_ee8_nUjuHFkh6vNA2lBk999dM'
);

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [alerts, setAlerts] = useState([
    { testName: 'Blood Pressure', result: '140/90 mmHg', date: '2025-07-28' },
    { testName: 'Blood Sugar', result: '8.2 mmol/L', date: '2025-07-25' },
    { testName: 'Cholesterol', result: '6.5 mmol/L', date: '2025-07-23' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        const token = session?.access_token;

        if (sessionError || !token) {
          console.error("Authentication error or session missing:", sessionError);
          // Redirect to login only if not already on login page to prevent loop
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          setLoading(false);
          return;
        }

        const res = await fetch('http://localhost:5000/profile/data', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          // setAlerts(data.alerts || []); // Uncomment if your backend returns alerts
        } else {
          console.error("Failed to fetch profile data:", data.error);
          setError(data.error || "Failed to load profile data.");
        }
      } catch (err) {
        console.error("Network or unexpected error:", err);
        setError("Could not connect to the server or an unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error-container">
        <p>Error: {error}</p>
        <p>Please try logging in again or check your network connection.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-no-profile-container">
        <p>No profile data found. Please complete your profile.</p>
        <Link to="/profile" className="dashboard-action-link">Go to Profile</Link>
      </div>
    );
  }

  return (
    <div className="DashboardContainer">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        .DashboardContainer {
          min-height: calc(100vh - 80px); /* Adjust based on header height */
          background-color: #f0f8ff; /* Very light blue background */
          padding: 20px;
          font-family: 'Inter', sans-serif;
          color: #333;
          box-sizing: border-box;
        }

        .dashboard-loading-container,
        .dashboard-error-container,
        .dashboard-no-profile-container {
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #1d5271;
          text-align: center;
          padding: 20px;
        }

        .dashboard-error-container {
          color: #e74c3c; /* Red for errors */
        }

        .dashboard-action-link {
          display: inline-block;
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #2196f3;
          color: white;
          border-radius: 5px;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .dashboard-action-link:hover {
          background-color: #1976d2;
        }

        /* === Profile Section === */
        .detailsSection {
          background-color: #ffffff; /* White background for the main profile card */
          display: grid;
          grid-template-columns: 250px 1fr; /* Fixed width for image, rest for details */
          gap: 30px; /* Increased gap */
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Softer shadow */
          margin-bottom: 30px; /* Space below this section */
          align-items: center; /* Vertically align items in the grid */
        }

        #userImage {
          height: 180px;
          width: 180px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #1d5271; /* Dark blue border */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Image shadow */
        }

        .moreDetails {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        #userName {
          font-size: 2.2rem; /* Larger font for name */
          font-weight: 700;
          color: #1a237e; /* Deep blue for name */
          margin-bottom: 15px;
          text-align: left; /* Align name to left */
        }

        .pDetails {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive columns for details */
          gap: 20px;
          margin-bottom: 25px;
        }

        .personal ul, .contacts ul {
          list-style: none;
          padding: 0;
          margin: 0;
          background-color: #e0f2f7; /* Lighter blue background for detail lists */
          border-radius: 8px;
          padding: 15px 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
        }

        .personal h4, .contacts h4 {
          font-size: 1.1rem;
          color: #0d47a1; /* Darker blue for sub-headings */
          margin-bottom: 10px;
          border-bottom: 1px solid #a7d9f7; /* Light blue underline */
          padding-bottom: 5px;
        }

        .personal li, .contacts li {
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: #4b5563;
        }

        .personal li label, .contacts li label {
          font-weight: 600;
          color: #1f2937;
          margin-right: 5px;
        }

        .cardDetails {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Responsive cards */
          gap: 20px;
          margin-top: 20px;
        }

        .card {
          background-color: #ffffff; /* White background for cards */
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 15px;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid #d1e8f0; /* Light border */
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .card p {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 5px;
        }

        .card h3 {
          font-size: 1.5rem;
          color: #00796b; /* Teal for metric values */
          margin-top: 5px;
          font-weight: 700;
        }

        #editProfile {
          display: block; /* Make it a block element to take full width */
          background-color: #2196f3; /* Bright blue */
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          margin-top: 20px; /* Space from cards */
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        #editProfile:hover {
          background-color: #1976d2; /* Darker blue */
          transform: translateY(-2px);
        }

        /* === Alerts Section === */
        .alertsSection {
          background-color: #ffffff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .alertsTitle h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a237e;
          margin-top: 0;
          margin-bottom: 20px;
          border-bottom: 2px solid #a7d9f7;
          padding-bottom: 10px;
        }

        .alertsTitle label {
          color: #e74c3c; /* Red for "ALERTS" label */
          margin-right: 10px;
        }

        .alerts {
          max-height: 350px; /* Max height for scrollable alerts */
          overflow-y: auto;
          padding-right: 10px; /* Space for scrollbar */
        }

        .alert-card {
          background-color: #fff3e0; /* Light orange background for alerts */
          border: 1px solid #ffb74d; /* Orange border */
          color: #e65100; /* Dark orange text */
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          display: flex;
          flex-wrap: wrap; /* Allow items to wrap on small screens */
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }

        .alert-card p {
          margin: 0 10px 0 0; /* Space between paragraphs */
          font-size: 0.9rem;
          flex-grow: 1; /* Allow paragraphs to take available space */
          min-width: 120px; /* Minimum width before wrapping */
        }

        .alert-card p strong {
          color: #c0392b; /* Darker red for strong text in alerts */
        }

        .delete-button {
          background-color: #e74c3c; /* Red delete button */
          color: white;
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease, transform 0.2s ease;
          flex-shrink: 0; /* Prevent button from shrinking */
        }

        .delete-button:hover {
          background-color: #c0392b; /* Darker red on hover */
          transform: translateY(-1px);
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
          .detailsSection {
            grid-template-columns: 1fr; /* Stack on tablets */
            text-align: center;
          }
          #userImage {
            margin: 0 auto 20px auto; /* Center image and add bottom margin */
          }
          #userName {
            text-align: center; /* Center name on tablets */
          }
        }

        @media (max-width: 768px) {
          .DashboardContainer {
            padding: 15px;
          }
          .detailsSection, .alertsSection {
            padding: 20px;
          }
          .pDetails {
            grid-template-columns: 1fr; /* Stack personal/contact details */
            gap: 15px;
          }
          .cardDetails {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Adjust card size */
            gap: 15px;
          }
          #editProfile {
            margin-top: 15px;
            padding: 12px;
            font-size: 1rem;
          }
          .alertsTitle h3 {
            font-size: 1.5rem;
          }
          .alert-card {
            flex-direction: column; /* Stack alert details */
            align-items: flex-start;
            gap: 5px;
          }
          .alert-card p {
            margin: 0;
            width: 100%; /* Take full width when stacked */
          }
          .delete-button {
            margin-top: 10px;
            width: 100%; /* Full width button when stacked */
          }
        }

        @media (max-width: 480px) {
          .DashboardContainer {
            padding: 10px;
          }
          .detailsSection, .alertsSection {
            padding: 15px;
            border-radius: 8px;
          }
          #userImage {
            height: 120px;
            width: 120px;
            border-width: 3px;
          }
          #userName {
            font-size: 1.8rem;
          }
          .personal ul, .contacts ul {
            padding: 10px 15px;
          }
          .card {
            padding: 10px;
            border-radius: 8px;
          }
          .card h3 {
            font-size: 1.3rem;
          }
          .alertsTitle h3 {
            font-size: 1.3rem;
          }
          .alert-card {
            padding: 10px;
            border-radius: 6px;
          }
          .delete-button {
            padding: 6px 10px;
            font-size: 0.9rem;
          }
        }
        `}
      </style>
      <div className="detailsSection" style={{ backgroundColor: '#f0f8ff', height: 'auto' }}>
        <img id="userImage" src={myImage} alt="User Profile" />
        <div className='moreDetails'>
          <h2 id="userName">{profile.firstName || profile.Name || 'User'} {profile.lastName || ''}</h2>
          <div className="pDetails">
            <div className="personal">
              <ul>
                <h4>Personal Details</h4>
                <li><label>Gender:</label> {profile.Gender || '—'}</li>
                <li><label>Age:</label> {profile.Age || '—'}</li>
                <li><label>Date-of-Birth:</label> {profile.DOB || '—'}</li>
              </ul>
            </div>
            <div className="contacts">
              <ul>
                <h4>Contact Details</h4>
                <li><label>Phone:</label> {profile.PhoneNumber || '—'}</li>
                <li><label>Email:</label> {profile.email || '—'}</li>
                <li><label>Address:</label> {profile.Address || '—'}</li>
              </ul>
            </div>
          </div>
          <div className="cardDetails">
            <div className="card">
              <p>Blood Group</p>
              <h3>{profile.BloodType || '—'}</h3>
            </div>
            <div className="card">
              <p>Height</p>
              <h3>{profile.Height ? `${profile.Height} cm` : '—'}</h3>
            </div>
            <div className="card">
              <p>Weight</p>
              <h3>{profile.weight ? `${profile.weight} kg` : '—'}</h3>
            </div>
            <div className="card">
              <p>Blood Sugar Level</p>
              <h3>{profile.SugarLevel ? `${profile.SugarLevel} mg/dL` : '—'}</h3>
            </div>
            <Link id="editProfile" to="/profile">Edit Profile</Link>
          </div>
        </div>
      </div>

      {/* === Alerts Section === */}
      <div className="alertsSection">
        <header className='alertsTitle'>
          <h3><label>ALERTS:</label> {alerts.length}</h3>
        </header>
        <div className="alerts">
          {alerts.map((alert, idx) => (
            <div key={idx} className="alert-card">
              <p><strong>Test:</strong> {alert.testName}</p>
              <p><strong>Result:</strong> {alert.result}</p>
              <p><strong>Date:</strong> {alert.date}</p>
              <button className="delete-button">Delete</button>
            </div>
          ))}
          {alerts.length === 0 && <p className="no-alerts-message">No new alerts.</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
