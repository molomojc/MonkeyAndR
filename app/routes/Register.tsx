import "app/app.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleClose() {
    navigate('/');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper1">
      <div className="formBox Regist">
        <span className="CloseIcon" onClick={handleClose}>X</span>
        <form onSubmit={handleSubmit}>
          <h2>Registration</h2>

          <div className="inputBox">
            <input type="text" name="firstName" required onChange={handleChange} />
            <label>First name</label>
          </div>

          <div className="inputBox">
            <input type="text" name="lastName" required onChange={handleChange} />
            <label>Last name</label>
          </div>

          <div className="inputBox">
            <input type="email" name="email" required onChange={handleChange} />
            <label>Email</label>
          </div>

          <div className="inputBox">
            <input type="password" name="password" required onChange={handleChange} />
            <label>Password</label>
          </div>

          <div className="inputBox">
            <input type="password" name="confirmPassword" required onChange={handleChange} />
            <label>Confirm Password</label>
          </div>

          <div className="TermsConditions">
            <label><input type="checkbox" required /> I agree to the</label>
            <a href="#"> terms & conditions</a>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="LoginBtn1" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="register">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
