import { useState } from 'react';
import './app.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useParams } from 'react-router-dom';

function card({id ,title , submittedat , description , owner,bonus , click}){
const navigate = useNavigate();
    function handleclick(e){
        click(id);
       
    }

    const {useremail} = useParams();
    const [Contact,setContact] = useState(null);
    const [Error , setError] = useState([]);

    async function addcontact(){
  
  
      setError('');
  
         const graphqlQuery = {
        query: `
      mutation {
         createContact(user1:"${useremail}",  firstname:"${owner}" , lastname:"${""}" , gmail:"${owner}") {
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(graphqlQuery),
        });
  
        const data = await res.json();
        if(data.data)
         setContact(data.data.createContact);
         navigate(`/userdashboard/${useremail}`,{ state: { refresh: true } });
      } catch (err) {
      //   console.error(err);
        setError('Server error . Please try again later.');
  
      }

  };



    return(
        <div className='Request'>

            <div className="order-card">
    <div className="order-header">
        <div>
            <h3 style={{height:'2.3em' ,overflow:'hidden'}}>{title}</h3>
            <span className="order-date">Placed {submittedat}</span>
        </div>
        <span className="order-status delivered">Delivered</span>
    </div>

    <div className="order-body">
        <div className="order-item" style={{height:"2em",overflowY:'hidden'}}>
          <span>{description}</span>
        </div>
    
    </div>

    <div className="order-footer" >
        {/* <span className="order-total" >{bonus}</span>
          */}
            <span style={{marginLeft:"auto" , marginRight:"auto"}} className="order-total" >{bonus}</span>
         
    </div>
    <div style={{display:"flex" , alignItems:"center"}}>
    {/* <button className="order-btn" onClick={handleclick}>Details</button>
    */}
    {/* <span><b>Details:</b></span> */}
  
   {/* <button className="order-btn" onClick={handleclick}>Contact</button>
    */}
    </div>
    
</div>
<div style={{display:"flex"}}>
  <div style={{marginLeft: "auto", marginRight:"auto" , width:"8em"}}><button className="order-btn" onClick={handleclick}>Details</button></div>
   
  <div style={{marginLeft: "auto", marginRight:"auto" , width:"8em"}}><button className="order-btn" onClick={addcontact}>Contact</button></div>
   </div>
        </div>






    );
}
export default card;
