

import { useState } from "react";
import "./UserDashboardPro.css"
import { jwtDecode } from "jwt-decode";
import { useNavigate, Navigate } from "react-router-dom";


function ChatPro({firstname , lastname , gmail, click,deletecontact}){
const  firstchar = firstname[0];
const [Error, setError] = useState([]);
const navigate = useNavigate();


    const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  
  const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && token !== "undefined" && {
      Authorization: `Bearer ${token}`
    })
  };
};

if (!token || token === "undefined") {
  return <Navigate to="/" />;
}




const authHeader = token && token !== "undefined"
  ? { Authorization: `Bearer ${token}` }
  : {};




      let useremail ="";
  
    if (token && token !== "undefined") {
    const decoded = jwtDecode(token);
    useremail = decoded.email;
  }




    function handleclick(e){
        click(e);
    }

    //  async function deletecontact(gmail){
    
    //     setError('');
    
    //        const graphqlQuery = {
    //       query: `
    //     mutation {
    //        deletecontact(gmail:"${gmail}"){
    //        message
   
    //   }
    // }
    
    //       `,
    //     };
    
    
    
    //     try {
    //       const res = await fetch('http://localhost:4000/graphql', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json',...authHeader },
    //         body: JSON.stringify(graphqlQuery),
    //       });
    
    //       const data = await res.json();
    //       if(data.data){
    //         const {message }= data.data.deletecontact;
    //navigate(`/`,{ state: { refresh: true } }); even if navigated to root url not same url only the component will refresh (deleted component will refresh ) not the parent (userdashboarpro or admindashboard)
    //       //alert(message);
        
            
          
    //       }
    //     } catch (err) {
    //     //   console.error(err);
    //       setError('Server error. Please try again later.');
    
    //     }
       
    // };

//     function handlecancel(){
//  //delete contact
//  deletecontact(gmail);
//  navigate(`/UserDashboardPro/${useremail}`, { state: { refresh: true } });

//     }




/*
const result = await deletecontact();

This only works if the parent passed:

deletecontact={() => deletecontact(x.gmail)}

But if you passed:

deletecontact={deletecontact}

then you MUST do:

const result = await deletecontact(gmail);

*/

async function handlecancel() {
  const result = await deletecontact(gmail);

  // if (result) {
  //   // navigate(`/UserDashboardPro/${useremail}`, {
  //   //   state: { refresh: true },
  //   // });

  //   //     navigate(`/`, {
  //   //   state: { refresh: true },
  //   // });
    
  // }
}
    return(
        <>
             
            <div className="contact-card">
                <div style={{marginLeft:"96%" , color:"blue" , cursor:"pointer"}} onClick={handlecancel}>X</div>
              <div className="avatar">{firstchar}</div>
              <h4>{firstname}&nbsp;{lastname}</h4>
              <p>{gmail}</p>
              <button className="outline-btn small-btn" onClick={handleclick}>Message</button>
            </div>
            
{/* :             <div className="request-card urgent-card" style={{position:"unset"}}>
              <span className="badge urgent">Urgent</span>
              <div className="avatar">{firstchar}</div>
              <h4>{firstname}&nbsp;{lastname}</h4>
              <p>{gmail}</p>
              <button className="outline-btn small-btn" onClick={handleclick}>Message</button>
            </div> */}
             
        </>
        
    );
}
export default ChatPro;