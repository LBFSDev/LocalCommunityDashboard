import './app.css'
import { Link } from "react-router-dom";
function Header({useremail}){
    return(

<>
<header className='Header'>
<div className='Title'>
   
    <span className='MenuIcon'>🏫</span> <span className='MenuText'>HoodBoard</span>
    </div>
<div className='Headercontent'>
    <Link to={`/userdashboard/${useremail}`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>🏠</span> <span >Home</span> </Link>
   
    <Link to={`/userdashboard/${useremail}/Requests`} className='MenuItem' style={{textDecoration:"none"}}> <span  className='MenuIcon' >📢 </span><span>Requests</span></Link>
   
    <Link to={`/userdashboard/${useremail}/Events`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>📅 </span> <span>Events</span> </Link>
 
    <Link to={`/userdashboard/${useremail}/Urgent`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>🚨</span> <span> Urgent</span></Link>
 
    <Link to={`/userdashboard/${useremail}/Add`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>➕</span> <span>Add</span></Link>
   
    <Link to={`/userdashboard/${useremail}/ChatAdmin`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'> ✉️</span> <span>Support</span></Link>
       <Link to={"/"} className='Logout' style={{textDecoration:"none"}} > <span>Logout</span></Link>
        
  </div>

</header>
</>

    );
}

export default Header;