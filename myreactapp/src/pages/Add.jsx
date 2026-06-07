


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
function Add(){


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

  if (role !== "user") {
    return <Navigate to="/" />;
  }



const authHeader = token && token !== "undefined"
  ? { Authorization: `Bearer ${token}` }
  : {};
















const {useremail} = useParams();
  const [Form,setForm] = useState({
    title:"",
    description:"",
    email:"",
    location:"",
    jobtype:"",
    worklocation:"",
    experience:"",
    bonus:"",
    category:"",
    isurgent:false
  })
    const navigate =  useNavigate();
    function GoToChatHome(event) {
event.preventDefault();
   navigate(`/UserdashboardPro/${useremail}`);

}



// function handlechange(e){
//   e.preventDefault();
//   const {name ,value} = e.target;
//   setForm(prev => ({...prev, [name]:value}));
// }

function handlechange(e){
  e.preventDefault();
  const { name, value, type, checked } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
}

async function CreateReq(e){
  e.preventDefault();
//       const query = `
//       mutation {
//        createRequest(
//        title:"${Form.title}",
//        description:"${Form.description}"
//        bonus:"${Form.bonus}"
//        reqby:"${useremail}",
//        location:"${Form.location}",
//        jobtype:"${Form.jobtype}",
//        worklocation:"${Form.worklocation}",
//        experience:"${Form.experience}",
//        category:"${Form.category}"
//        isurgent:${Form.isurgent}
//       ){
//   id,
//   description,
//   reqby,
//   title,
//   bonus,
//   location , 
//   jobtype,
//   worklocation, 
//   experience,
//   created_at,
//   isurgent

//       }
// }
//     `;


      const query = `
      mutation {
       createRequest(
       title:"${Form.title}",
       description:"${Form.description}",
       bonus:"${Form.bonus}",
       
       location:"${Form.location}",
       jobtype:"${Form.jobtype}",
       worklocation:"${Form.worklocation}",
       experience:"${Form.experience}",
       category:"${Form.category}"
       isurgent:${Form.isurgent}
      ){
  id,
  description,
  reqby,
  title,
  bonus,
  location , 
  jobtype,
  worklocation, 
  experience,
  created_at,
  isurgent

      }
}
    `;

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",...authHeader
        },
        body: JSON.stringify({query}),
      });

      const result = await response.json();

      console.log("Success:", result.data);
       navigate(`/UserdashboardPro/${useremail}`,{ state: { refresh: true } });
    } catch (error) {
      console.error("Error:", error);
    }
  };


    return(
<div className="request-form-container">
  {/* <p>{useremail}</p> */}
  <div style={{display:"flex" ,flexDirection:"row"}}>

    <div style={{marginLeft:"auto",marginRight:"auto"}}><h2>Create a Request</h2></div>
    <div style={{color:"blue",cursor:"pointer"}} onClick={GoToChatHome}>X</div>

    </div>

  <form className="request-form" onSubmit={ CreateReq}>
    <div className="form-group">
      <label >Title</label>
      <input
        type="text"
        id="title"
        name="title"//should have the same name of the form attribute
        value={Form.title}
        onChange={handlechange}
        placeholder="Enter request title"
        required
      />
    </div>

    <div className="form-group">
      <label >Description</label>
      <textarea
        id="description"
        name="description"
          value={Form.description}
        onChange={handlechange}
        placeholder="Describe your request..."
        rows="5"
        required
      ></textarea>
    </div>

   

    {/* <div className="form-group">
      <label >Contact Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={Form.email}
        onChange={handlechange}
        placeholder="example@email.com"
        required
      />
    </div> */}

          <div className="form-group">
      <label >Location</label>
      <input
        type="text"
        name="location"
          value={Form.location}
        onChange={handlechange}
        placeholder=""
        required
      />
    </div>

      <div className="form-group" >
      <label >Job Type</label>
      <select name="jobtype" onChange={handlechange}  style={{height:'3em'}}>
        <option value=""></option>
      <option value="fulltime">Full Time</option>
     <option value="parttime"> Part Time</option>
     <option value="contract">Contract</option>
     <option value="temporary">Temporary</option>
     <option value="volunteer">Volunteer</option>
      </select>
    </div>

          <div className="form-group"  >
      <label >Work Location</label>
      <select name="worklocation" onChange={handlechange}  style={{height:'3em'}}>
        <option value=""></option>
      <option value="onsite">Onsite</option>
     <option value="remote"> Remote</option>
     <option value="hybrid">Hybrid</option>

      </select>
    </div>


          <div className="form-group"  >
      <label >Experience</label>
      <select name="experience" onChange={handlechange}  style={{height:'3em'}}>
        <option value=""></option>
      <option value="junior">Junior</option>
     <option value="mid">Mid</option>
     <option value="senior">Senior</option>

      </select>
    </div>


       <div className="form-group">
      <label >Payment</label>
      <input
        type="text"
        name="bonus"
          value={Form.bonus}
        onChange={handlechange}
        placeholder="..."
        required
      />
    </div>

           <div className="form-group">
      <label >Category</label>
      <input
        type="text"
        name="category"
          value={Form.category}
        onChange={handlechange}
        placeholder="..."
        required
      />
    </div>

         <div className="form-group" style={{alignItems:"flex-start"}}>
      <label >isUrgent</label>
      <input type="checkbox"
        id="isurgent"
        name="isurgent"
        checked={Form.isurgent}
        onChange={handlechange}
       
      ></input>
    </div>

    <button type="submit">Submit Request</button>
  </form>
</div>


    );
}
export default Add;