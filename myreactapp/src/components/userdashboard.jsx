
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import NavBar from './navbar.jsx';
import Footer from './Footer.jsx';
import "./app.css";
import Chat from "./chat.jsx";
import Card from "./card.jsx";
import Chatbox from './chatbox.jsx';


// App.jsx
import { Routes, Route } from "react-router-dom";
import Add from "../pages/Add.jsx";

import NewContact from './NewContact.jsx';
import Urgentv1 from './Urgent.jsx';
import UrgentReq from './UrgentReq.jsx';
import ChatAdmin from './ChatAdmin.jsx';
import Requests from './Requests.jsx';
import Events from './Events.jsx';
import ViewOrder from './ViewOrder.jsx';
import { useNavigate} from 'react-router-dom';
import ViewEventDetails from './ViewEventDetails.jsx';


//to render the childs (routes)
import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
function userdashboard(){
const {useremail }= useParams();

      const [Closechat, setClosechat] = useState(true);
  //const [Showbar,setShowbar] =useState(false);
const [Sendto , setSendto] = useState("");
  function handlechat(email , e){
    setClosechat(false);
    setSendto(email);
    console.log(""+email);
  }

    function handleclosechat(e){
    setClosechat(true);
  }

  function handlesidebar(){
setShowbar(prev=>!prev);
  }

  function handleAddContact(e){

  }

  const navigate = useNavigate();
  function handleViewDetails(id){
  navigate(`/userdashboard/${useremail}/ViewOrder/${id}`);
  }


  
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    const [Searchquery , setSearchquery] = useState('');

    function handleSearch(e){
      setSearchquery(e.target.value);
    }

      async function showreq(){
  
      setError('');
  
         const graphqlQuery = {
        query: `
      query {
         allrequests {
         id
         title
         description
         bonus
         reqby
         created_at
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
         setRequests(data.data.allrequests);
      } catch (err) {
      //   console.error(err);
        setError('Server error. Please try again later.');
  
      }
  };
      useEffect(()=>{
        
  showreq();
      },[])
  
  






const user = useremail;
const [contacts , setContacts] = useState([]);

async function showchats(){
  
      setError('');
  
         const graphqlQuery = {
        query: `
      query {
         allcontacts(user:"${user}") {
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
         setContacts(data.data.allcontacts);
      } catch (err) {
      //   console.error(err);
        setError('Server error. Please try again later.');
  
      }
  };
      useEffect(()=>{
  showchats();
      },[])









      
    const location = useLocation();

  useEffect(() => {
    if (location.state?.refresh) {
      if(searchcategory === ""){
      showreq(); // call your function to refetch requests
      }
    else{
      searchbycategory(searchcategory);
    }
    showchats();
    }
  }, [location]);






  



const [searchcategory , setSearchcategory] = useState("");



async function searchbycategory(value){
  //const [name , value] = e.target; 
  
   setSearchcategory(value);
      setError('');
      if(value!==""){
  
         const graphqlQuery = {
        query: `
      query {
         requestsbycategory(category:"${value}") {
         id
         title
         description
         bonus
         reqby
         created_at
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
         setRequests(data.data.requestsbycategory);
      } catch (err) {
      //   console.error(err);
        setError('Server error. Please try again later.');
  
      }
    }
    else{
      showreq();
    }
  };






    return(


<>


   

    <div className='Layout'>
   <header><Header useremail={useremail}></Header></header>
   
      <div className='Main'>
    <nav style={{display:"flex" , flexDirection:"column"}}>
{ <NavBar>


{
  contacts.map((x,index)=>{
    return(
      <div key={x.gmail}>
     <Chat click={()=>handlechat(x.gmail)} firstname ={x.firstname} lastname={x.lastname} gmail = {x.gmail}></Chat>
      </div>
    )
  })
}


</NavBar>}
    { /* <div><button style={{width:"20em", position:"fixed" ,marginTop:"40.5em",cursor:"pointer"}} onClick={handlesidebar}>View/Hide Contacts</button></div>*/}
   </nav>
   
    <div>
   
<article>
        <Routes>
          {/* <Route path="/" element={<root/>} /> */}
        {/* <Route path="/" element={<Sign/>}/> */}
        

         
      </Routes>
      
<Outlet />
  {Closechat==false ?<Chatbox currentuseremail={user} receiver={Sendto} click={handleclosechat}></Chatbox> :null}
  <div style={{height:"50px",display:'flex',flexDirection:'horizontal' , margin:"20px",marginLeft:"25em", alignItems:'center'}} >
    <input placeholder='Search' style={{width:"20em",height:"100%" , textAlign:"center", fontSize:"30px"}} onChange={handleSearch}></input>
     <select style={{marginLeft:"5em",height:'50%'}} name="searchcategory" value={searchcategory} onChange={(e) => searchbycategory(e.target.value)}>
      <option value=""></option>
     <option value="Computer Science">Computer Science</option>
     <option value="homeservices">Home Services</option>
     <option value="Delivary">Delivary</option>
     <option value="Electronics">Electronics</option>
     
     </select>
     </div>
<div className='maincontent'>


{Searchquery==='' ? 
requests?.map((x,index)=>{
    return(
    
<div key={x.id}>
    <Card click={handleViewDetails}id ={x.id} title ={x.title} description={x.description} owner ={x.reqby} submittedat={x.created_at} bonus={x.bonus}></Card>
    </div>
      
    )
}) : requests?.filter(x=>x.title.toLowerCase().includes(Searchquery.toLowerCase())).map((x,index)=>{
  
    return(
<div key={x.id}>
    <Card click={handleViewDetails}id ={x.id} title ={x.title} description={x.description} owner ={x.reqby} submittedat={x.created_at} bonus={x.bonus}></Card>
    </div>
   
    )
 
})
}



          

</div>
</article>

</div>


</div>

    </div>
    </>

    );
}

export default userdashboard;
