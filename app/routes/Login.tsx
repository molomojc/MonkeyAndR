// Rendering the login and signUp forms
import "app/app.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import Register from "./Register";


function Login(){
    const navigate = useNavigate();

    function handleRegistBtn(){
    navigate('/register'); // Navigate to the login route
    }

     function handleClose(){
        navigate('/');
    }
    return(
    <div className="wrapper">
        <div className="formBox login">
            <span className="CloseIcon" onClick={handleClose}>X</span>
            <form action="#">
            <h2>Login</h2>
                <div className="inputBox">
                    <span className="icon">{/*<ion-icon name="mail"></ion-icon>*/}</span>
                    <input type="email" required />
                    <label> Email</label>
                </div>
                <div className="inputBox">
                    <span className="icon">{/*<ion-icon name="lock-closed"></ion-icon>*/}</span> 
                    <input type="password" required />
                    <label>Password</label>
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox" />Remember me.</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" className="LoginBtn1">Login</button>
                <div className="register">
                    <p>Don't have an account? <Link to="/register" onClick={handleRegistBtn} className="register-link">Register</Link></p>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login;