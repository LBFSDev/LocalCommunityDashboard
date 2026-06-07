import { useEffect,useState } from 'react';
import './app.css'

import { useNavigate } from 'react-router-dom';

import { useParams } from "react-router-dom";



function ViewOrder(){


        
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









  const {id}= useParams();
  const {useremail}= useParams();
    const navigate = useNavigate();
    function handleCancel(){
        navigate(`UserDashboardPro/${useremail}`);
    }
  


  const [request, setRequest] = useState(null);
  const [error, setError] = useState("");


    useEffect(()=>{

    async function showreqbyid(){

    setError('');

       const graphqlQuery = {
      query: `
    query {
       requestbyid(id:"${id}") {
 
  description,
  reqby,
  title,
  bonus,
  location,
  jobtype,
  worklocation,
  experience,
  created_at,
  category,
  isurgent
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
       setRequest(data.data.requestbyid);
    } catch (err) {
    //   console.error(err);
      setError('Server error. Please try again later.');

    }
};


showreqbyid();
    },[])












    return(


<div className="order-containera" >
  
    <div style={{display:"flex" ,flexDirection:"row"}}>
  
   <div style={{marginLeft:"auto" , marginRight:"auto"}}> <h1> {request ? request.title : null}</h1></div>
   <div style={{color:"blue" , cursor:"pointer" , position:"fixed"}} onClick={handleCancel}>X</div>
    
    </div>
   <span className="order-statusa delivered">Delivered</span>

  

  <section className="order-metaa" style={{marginTop:"10px"}}>
    <div>
      <strong>Contact:</strong>
      <span>&nbsp; {request ? request.reqby : null}</span>
    </div>
    <div>
      <strong>Date:</strong>
      <span>&nbsp; {request ? request.created_at : null}</span>
    </div>
  </section>

  <section className="shipping-infoa">
    <h2>Details:</h2>
{request ? request.description : null}
  </section>

  <section className="items">
    <div className="itema">
    <h2>Experience: {request ? request.experience: null}</h2>
</div>
    <div className="itema">
      <div className="item-infoa">
        <h2>Location:&nbsp;{request ? request.location : null}
     </h2>
      </div>

    </div>

    <div className="itema">
      <div className="item-infoa">
        <h2>Job Type:&nbsp;{request ? request.jobtype : null}
      </h2>
       
      </div>
    </div>

        <div className="itema">
      <div className="item-infoa">
        <h2>Work Location:&nbsp;{request ? request.worklocation : null}
      </h2>
       
      </div>
    </div>

            <div className="itema">
      <div className="item-infoa">
        <h2>Payment:&nbsp;{request ? request.bonus : null}
      </h2>

      
       
      </div>


      
    </div>





                <div className="itema">
      <div className="item-infoa">
        <h2>Category:&nbsp;{request ? request.category : null}
      </h2>

      
       
      </div>


      
    </div>


                <div className="itema">
      <div className="item-infoa">
<h2>
  Urgent: {request?.isurgent ? "true" : "false"}
</h2>

      </div>


      
    </div>
  </section>

  {/* <section className="order-summarya">
    <div className="summary-rowa">
      <span>Subtotal</span>
      <span>$160.00</span>
    </div>
    <div className="summary-rowa">
      <span>Shipping</span>
      <span>$10.00</span>
    </div>
    <div className="summary-rowa total">
      <span>Total</span>
      <span>$170.00</span>
    </div>
  </section> */}
</div>



    );
}

export default ViewOrder;
