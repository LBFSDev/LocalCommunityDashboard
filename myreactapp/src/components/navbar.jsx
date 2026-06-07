
import { useEffect } from "react";
import "./app.css"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function navbar({Click,children }){

const {useremail} = useParams();
    const navigate =  useNavigate();
function AddContact(event) {
event.preventDefault();
   navigate(`/userdashboard/${useremail}/NewContact`);

}


return(
    <div className='sidebar' style={{backgroundColor:"rgb(104, 119, 212)"}}>
      <main style={{felx:"1"}}>
      <header>Chats 💬</header>
      {children}
      </main>
      <footer> <div onClick={AddContact}>👤add new contact</div></footer>
    </div>
 

);
    
}
export default navbar;