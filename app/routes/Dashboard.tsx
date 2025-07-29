// The user dashboard
// import myImage from 'Images/myImage.jpg';
import myImage from 'Images/myImage.jpg';
import "app/app.css";
import { Link } from 'react-router-dom';

function Dashboard(){
    return(
<div className="Container">
    {/* =======Section for user's details========== */}
    <div className="detailsSection">
        <img id="userImage" src={myImage} alt="User's image" />
        <div className='moreDetails'>
            <h2 id="userName">Masine Donald</h2>
            <div className="pDetails">
                <div className="personal">
                    <ul>
                        <h4>Personal Details</h4>
                        <li><label>Gender: </label></li>
                        <li><label>Age: </label></li>
                        <li><label>Date-of-Birth: </label></li>
                    </ul>
                </div>
                <div className="contacts">
                    <ul>
                        <h4>Contact Details</h4>
                        <li><label>Phone: </label></li>
                        <li><label>Email: </label></li>
                        <li><label>Address: </label></li>
                    </ul>
                </div>
            </div>
            <div className="cardDetails">
                <div className="card">
                    <p>Blood Group</p>
                    <h3>A+</h3>
                </div>
                <div className="card">
                    <p>Height</p>
                    <h3>150cm</h3>
                </div>
                <div className="card">
                    <p>Weight</p>
                    <h3>55kg</h3>
                </div>
                <div className="card">
                    <p>Blood Sugar Level</p>
                    <h3>90mg/dL</h3>
                </div>
                <Link id="editProfile" to="">Edit Profile</Link>
            </div>
        </div>
    </div>
    {/* ===========Section for alerts=============== */}
    <div className="alertsSection">
        <header className='alertsTitle'>
            <h3><label>ALERTS: </label>3</h3>
        </header>
        <div className="alerts">
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
            <p>You tested positive for Corona virus. Do not forget to take your medication <button>delete</button></p>
        </div>
    </div>
</div>
    )
}
export default Dashboard;