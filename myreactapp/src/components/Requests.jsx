
import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './app.css'
import { useParams } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";



function Requests(){


      
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













  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
    // const {useremail }= useParams();
          // const {useremail }= useParams();
          let useremail ="";
        
          if (token && token !== "undefined") {
          const decoded = jwtDecode(token);
          useremail = decoded.email;
        }
       


    async function showreq(){

    setError('');

//        const graphqlQuery = {
//       query: `
//     query {
//        userrequests(username:"${useremail}") {
//        id
//        title
//        description
//        bonus
//        reqby
//        status
//        created_at
//   }
// }

//       `,
//     };

       const graphqlQuery = {
      query: `
    query {
       userrequests {
       id
       title
       description
       bonus
       reqby
       status
       created_at
  }
}

      `,
    };



    try {
      const res = await fetch('https://localcommunitydashboard.onrender.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',...authHeader },
        body: JSON.stringify(graphqlQuery),
      });

      const data = await res.json();
      if(data.data)
       setRequests(data.data.userrequests);
    } catch (err) {
    //   console.error(err);
      setError('Server error. Please try again later.');

    }
};
    useEffect(()=>{
showreq();
    },[])



async function updatestatus(id , status){

    setError('');

       const graphqlQuery = {
      query: `
    mutation {
       changestatus(id:"${id}", newstatus:"${status}") {
       title
       description
       bonus
       reqby
       status
       created_at
  }
}

      `,
    };



    try {
      const res = await fetch('https://localcommunitydashboard.onrender.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',...authHeader },
        body: JSON.stringify(graphqlQuery),
      });

      const data = await res.json(); //no need to access the returned request 
      await showreq();
    //   if(data.data)
    //    setRequests(data.data.userrequests);
    } catch (err) {
    //   console.error(err);
      setError('Server error. Please try again later.');

    }
};




const navigate = useNavigate();

    function handlecancel(){
     //   navigate(`/UserDashboardPro/${useremail}`);
        navigate(`/UserDashboardPro/${useremail}`, { state: { refresh: true } });

    }



return(
<div className="requests-container" style={{backgroundColor:"white"}} >
   <div style={{marginLeft:"95%" , color:"blue" , cursor:"pointer"}} onClick={handlecancel}>X</div>
    {error && <p style={{ color: "red" }}>{error}</p>}
    {requests?.map((x,index) => {
        return (
        
              
    <div key={x.id} className={x.status ==="pending" ? "request-card pending":(
        x.status==="in_progress"?"request-card in-progress": (x.status === "fulfilled" ?"request-card resolved":"request-card closed" ))
    } style={{background: "#ffffffd1"}}>
        <div className="request-header">
            <span className="request-title"> {x.title}</span>
            <div>
            <span className="request-status">{x.status}</span>
            {/* <select >
  
    
    <option></option>
    <option>pending</option>
    <option>in_progress</option>
    <option>fulfilled</option>
    <option>cancelled</option>
    <option>closed</option>
            </select> */}
  
            </div>
        </div>
      
        <p className="request-message">
           {x.description}
        </p>
        <div style={{display:"flex",  width:"20%",
padding:"0px",
    background: "unset",
    border: "none",
    fontSize: "1em",
    borderRadius:"1em",
    cursor: "pointer",}}>

        <button value={"pending"} onClick={(e)=>{
           updatestatus(x.id, e.target.value)
        }} >pending</button>&nbsp;
        <button value={"in_progress"} onClick={(e)=>{
            updatestatus(x.id, e.target.value)
        }}>in_progress</button>&nbsp;
        <button value={"fulfilled"} onClick={(e)=>{
             updatestatus(x.id, e.target.value)
        }}>fulfilled</button>&nbsp;
        {/* <button value={"cancelled"}>cancelled</button>&nbsp; */}
        <button value={"cancelled"} onClick={(e)=>{
             updatestatus(x.id, e.target.value)
        }}>cancel</button>
       </div>
        <div className="request-footer">
            <span>{x.reqby}</span>
            <span>Submitted: {x.created_at}</span>
        </div>
     
    </div>
        )
    })}

    {/* <div className="request-card pending"  style={{background: "#ffffffd1"}}>
        <div className="request-header">
            <span className="request-title">Password Reset Issue</span>
            <span className="request-status">Pending</span>
        </div>
        <p className="request-message">
            I am unable to reset my password using the email link.
        </p>
        <div className="request-footer">
            <span>Request ID: #1023</span>
            <span>Submitted: 05 Feb 2026</span>
        </div>
    </div>

    <div className="request-card in-progress">
        <div className="request-header">
            <span className="request-title">Payment Not Processed</span>
            <span className="request-status">In Progress</span>
        </div>
        <p className="request-message">
            My payment was deducted but order is not confirmed.
        </p>
        <div className="request-footer">
            <span>Request ID: #1017</span>
            <span>Submitted: 03 Feb 2026</span>
        </div>
    </div>

    <div className="request-card resolved">
        <div className="request-header">
            <span className="request-title">Account Verification</span>
            <span className="request-status">Resolved</span>
        </div>
        <p className="request-message">
            Please help me verify my account.
        </p>
        <div className="request-footer">
            <span>Request ID: #1009</span>
            <span>Submitted: 01 Feb 2026</span>
        </div>
    </div>

    
    <div className="request-card resolved">
        <div className="request-header">
            <span className="request-title">Account Verification</span>
            <span className="request-status">Resolved</span>
        </div>
        <p className="request-message">
            Please help me verify my account.
        </p>
        <div className="request-footer">
            <span>Request ID: #1009</span>
            <span>Submitted: 01 Feb 2026</span>
        </div>
    </div>


    
    <div className="request-card resolved">
        <div className="request-header">
            <span className="request-title">Account Verification</span>
            <span className="request-status">Resolved</span>
        </div>
        <p className="request-message">
            Please help me verify my account.
        </p>
        <div className="request-footer">
            <span>Request ID: #1009</span>
            <span>Submitted: 01 Feb 2026</span>
        </div>
    </div> */}

</div>


);
}

export default Requests;
