import { useState } from 'react';
import './UserDashboardPro.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';

function CardPro({id ,title , submittedat , description , owner,bonus ,status, click,isurgent}){

  
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

  
const navigate = useNavigate();
    function handleclick(e){
        click(id);
       
    }

    
    const [Contact,setContact] = useState(null);
    const [Error , setError] = useState([]);

    async function addcontact(){
  
  
      setError('');
  
  //        const graphqlQuery = {
  //       query: `
  //     mutation {
  //        createContact(user1:"${useremail}",  firstname:"${owner}" , lastname:"${""}" , gmail:"${owner}") {
  //       firstname
  //       lastname 
  //       gmail
  //   }
  // }
  
  //       `,
  //     };
           const graphqlQuery = {
        query: `
      mutation {
         createContact(  firstname:"${owner}" , lastname:"${""}" , gmail:"${owner}") {
        firstname
        lastname 
        gmail
    }
  }
  
        `,
      };
  
  
  
      try {
        const res = await fetch('https://localcommunitydashboard.onrender.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',...authHeader  },
          body: JSON.stringify(graphqlQuery),
        });
  
        const data = await res.json();
        if(data.data)
         setContact(data.data.createContact);
         navigate(`/UserDashboardPro/${useremail}`,{ state: { refresh: true } });
      } catch (err) {
      //   console.error(err);
        setError('Server error . Please try again later.');
  
      }

  };


  
  return(
 <div >

            <div className={isurgent==true ? "request-card urgent-card":"request-card"}  style={{position:"unset"}} >
              <span className="badge approved">{status}</span>
              <h3  style={{height:'2.3em' ,overflow:'hidden'}}>{title}</h3>
              <h5>{submittedat}</h5>
              <div style={{height:"2.3em",overflowY:'hidden'}}>
              <p>{description}</p>
              
              </div>
              <p><b>{bonus}</b></p>
              <div className="card-actions">
                <button className="outline-btn" onClick={handleclick}>Details</button>
                <button className="primary-btn"  onClick={addcontact}>Contact</button>
              </div>

    
 </div>
 </div>

  );



}

export default CardPro;
