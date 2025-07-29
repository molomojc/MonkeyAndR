// The registration page
import "app/app.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Register(){

    const navigate = useNavigate();

    function handleLoginBtn(){
    navigate('/login'); // Navigate to the login route
    }

    function handleClose(){
        navigate('/');
    }
    return(
    <div className="wrapper1">
        <div className="formBox Regist">
            <span className="CloseIcon" onClick={handleClose}>X</span>
                <form action="#">
                    <h2>Registration</h2>
                    <div className="inputBox">
                        <span className="icon">{/*<ion-icon name="person"></ion-icon>*/}</span>
                        <input type="text" required />
                        <label>First name</label>
                    </div>
                    <div className="inputBox">
                        <span className="icon">{/*<ion-icon name="person"></ion-icon>*/}</span>
                        <input type="text" required />
                        <label>Last name</label>
                    </div>
                    <div className="inputBox">
                        <span className="icon">{/*<ion-icon name="mail"></ion-icon>*/}</span>
                        <input type="email" required />
                        <label>Email</label>
                    </div>
                    <div className="inputBox">
                        <span className="icon">{/*<ion-icon name="lock-closed"></ion-icon>*/}</span> 
                        <input type="password" required />
                        <label>Password</label>
                    </div>
                    <div className="inputBox">
                        <span className="icon">{/*<ion-icon name="person"></ion-icon>*/}</span>
                        <input type="text" required />
                        <label>Confirm Password</label>
                    </div>
                    <div className="TermsConditions">
                        <label><input type="checkbox" />I agree to the </label>
                        <a href="#"> terms & conditions</a>
                    </div>
                    <button type="submit" className="LoginBtn1">Register</button>
                    <div className="register">
                        <p>Already have an account? <Link to="/login" onClick={handleLoginBtn} className="login-link">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register;