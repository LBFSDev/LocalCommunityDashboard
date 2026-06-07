
import './app.css'

import { useNavigate,Navigate } from "react-router-dom";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
function NewContact(){





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















const navigate = useNavigate();
const {useremail} = useParams();

const [Contactinfo , setContactinfo] = useState({
    firstname:"",
    lastname:"",
    gmail:""
})

const [Contact,setContact]=useState(null);


//const user = localStorage.getItem('email');
const user = useremail;

const [Error , setError]=useState([]);

async function createcontact(e){
    e.preventDefault();
  
      setError('');
  
//          const graphqlQuery = {
//         query: `
//       mutation {
//          createContact(user1:"${user}",  firstname:"${Contactinfo.firstname}" , lastname:"${Contactinfo.lastname}" , gmail:"${Contactinfo.gmail}") {
//         firstname
//         lastname 
//         gmail
//     }
//   }
  
//         `,
//       };

         const graphqlQuery = {
        query: `
      mutation {
         createContact(  firstname:"${Contactinfo.firstname}" , lastname:"${Contactinfo.lastname}" , gmail:"${Contactinfo.gmail}") {
        firstname
        lastname 
        gmail
    }
  }
  
        `,
      };
  
  
  
      try {
        const res = await fetch('https://local-community-dashboard.vercel.app', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',...authHeader },
          body: JSON.stringify(graphqlQuery),
        });
  
        const data = await res.json();
        if(data.data)
         setContact(data.data.createContact);
      //   navigate(`/UserdashboardPro/${useremail}`,{ state: { refresh: true } }); //if admin it will go to userdashboard and there it will know he is not user and will go to root / where it will check if he has token and take him to the dashboard depending on role 
       navigate(`/`,{ state: { refresh: true } });
      } catch (err) {
      //   console.error(err);
        setError('Server error . Please try again later.');
  
      }

  };
//       useEffect(()=>{
//   showchats();
//       },[])



function handleCancel(){
    if(localStorage.getItem("role")=="user"){
    navigate(`/UserdashboardPro/${useremail}`);
    }else{
        navigate(`/admindashboard/${useremail}`);
    }
}


function handlechange(e){
    const {name,value} =e.target;
    setContactinfo(prev=>({...prev,[name]:value}));
}

function submit(e){
e.preventDefault();


}
    return(
<div>


<div class="form-containera">
    
    <div style={{display:"flex" , flexDirection:"row"}}>
   <div style={{marginLeft:"auto", marginRight:"auto"}}> <h2>Add New Contact</h2></div>
   <div style={{color:"blue" , cursor:"pointer"}} onClick={handleCancel}>X</div>
</div>
    <form onSubmit={createcontact}>
        {Contact ? <p>{Contact.firstname}&nbsp;{Contact.lastname} is added successfully!</p>:Error}
        <div className="form-groupa">
            <label >First Name</label>
            <input type="text" id="firstName" placeholder="Enter first name" required name="firstname" onChange={handlechange}></input>
        </div>

        <div className="form-groupa">
            <label >Last Name</label>
            <input type="text" id="lastName" placeholder="Enter last name" required name ="lastname" onChange={handlechange}></input>
        </div>

        <div className="form-groupa">
            <label >Gmail</label>
            <input type="email" id="gmail" placeholder="example@gmail.com" name='gmail' required onChange={handlechange}></input>
        </div>

        <button type="submit">Add Contact</button>
    </form>
</div>
</div>
    );
}

export default NewContact;
