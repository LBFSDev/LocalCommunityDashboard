import "./UserDashboardPro.css";
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import NavBar from './navbar.jsx';
import Footer from './Footer.jsx';
import "./app.css";
import ChatPro from "./ChatPro.jsx";
import CardPro from "./CardPro.jsx";
import Chatbox from './chatbox.jsx';
import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
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
function UserDashboardPro() {

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




  // const {useremail }= useParams();
  let useremail ="";

  if (token && token !== "undefined") {
  const decoded = jwtDecode(token);
  useremail = decoded.email;
}

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
    if(localStorage.getItem("role") == "user"){
  navigate(`/UserDashboardPro/${useremail}/ViewOrder/${id}`);
    }else{
      navigate(`/admindashboard/${useremail}/ViewOrder/${id}`);
    }
  }


  
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    const [Searchquery , setSearchquery] = useState('');

    function handleSearch(e){
      setSearchquery(e.target.value);
    }

      async function showreq(){
  
      setError('');
  
  //        const graphqlQuery = {
  //       query: `
  //     query {
  //        allrequests {
  //        id
  //        title
  //        description
  //        bonus
  //        reqby
  //        status
  //        created_at
  //        isurgent
  //   }
  // }
  
  //       `,
  //     };
               const graphqlQuery = {
        query: `
      query {
         allrequests {
         id
         title
         description
         bonus
         reqby
         status
         created_at
         isurgent
    }
  }
  
        `,
      };
  
  
  
      try {
        console.log("AUTH HEADER:", authHeader);
        const res = await fetch('https://localcommunitydashboard.onrender.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',...authHeader },
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
  
  function handlelogout(){
    //instead of : 
    // localStorage.setItem("role")="";
    //  localStorage.setItem("")="";
    localStorage.removeItem("role");
localStorage.removeItem("token");
//or localStorage.clear(); but this removes all keys 
navigate("/");
  }






const user = useremail;
const [contacts , setContacts] = useState([]);

async function showchats(){
  
      setError('');
  
  //        const graphqlQuery = {
  //       query: `
  //     query {
  //        allcontacts(user:"${user}") {
  //       firstname
  //       lastname 
  //       gmail
  //   }
  // }
  
  //       `,
  //     };

           const graphqlQuery = {
        query: `
      query {
         allcontacts{
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
          headers: { 'Content-Type': 'application/json',...authHeader },
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
      loadData();
       
    
      }
    else{
      searchbycategory(searchcategory);
    }
    showchats();
    }
  }, [location]);


    useEffect(() => {
    if (location.state?.refresh) {
      if(searchcategory === ""){
     showreq(); // call your function to refetch requests
      loadData();
        showchats();
    
      }
    else{
      searchbycategory(searchcategory);
    }
    showchats();
    }
  }, []);







  



const [searchcategory , setSearchcategory] = useState("");



async function searchbycategory(value){
  //const [name , value] = e.target; 
  
   setSearchcategory(value);
      setError('');
      if(value!==""){
  
  //        const graphqlQuery = {
  //       query: `
  //     query {
  //        requestsbycategory(category:"${value}") {
  //        id
  //        title
  //        description
  //        bonus
  //        reqby
  //        created_at
  //        status
  //        isurgent
  //   }
  // }
  
  //       `,
  //     };

           const graphqlQuery = {
        query: `
      query {
         requestsbycategory(category:"${value}") {
         id
         title
         description
         bonus
       
         created_at
         status
         isurgent
    }
  }
  
        `,
      };
  
  
  
      try {
        const res = await fetch('https://localcommunitydashboard.onrender.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,...authHeader},
          body: JSON.stringify(graphqlQuery),
        });
  
        const data = await res.json();
        if(data.data)
          if(urgent==false){
         setRequests(data.data.requestsbycategory);
          }
          else{
            setRequests(data.data.requestsbycategory.filter(x=>x.isurgent == true));
          }
      } catch (err) {
      //   console.error(err);
        setError('Server error. Please try again later.');
  
      }
    }
    else{
      showreq();
    }
  };






  function AddContact(event) {
event.preventDefault();
   navigate(`/UserDashboardPro/${useremail}/NewContact`);

}


const [urgent , setUrgent] = useState(false);


function handleurgent(e){
// const {name , value} = e.target; 
setUrgent(e.target.checked);
}

      useEffect(()=>{
        
        if(urgent){
  setRequests(prev=> prev.filter(x=>x.isurgent ===true));
        }
        else{
          searchbycategory(searchcategory);
        }
      },[urgent])






//get latest inbox message to display

 const [allmessages,setAllmessages] = useState([]);
   const [Error , setError2]=useState([]);
   const [allcontacts, setAllcontacts] = useState([]);
   


   async function getallcontacts(){
      
          setError2('');
      
  //            const graphqlQuery = {
  //           query: `
  //     query {
  //       allcontacts(user:"${useremail}" ){
  //       gmail
  //   }
  // }
  //           `,
  //         };

                       const graphqlQuery = {
            query: `
      query {
        allcontacts{
        gmail
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
            if(data.data){
             setAllcontacts(data.data.allcontacts);
             console.log(allcontacts);
            //very important make it return the whole list since the getallmessages function will not be able to use the updated variable allcontacts (it will keep seeing it empty)
            return(data.data.allcontacts);
            }
          } catch (err) {
          //   console.error(err);
            setError2('Server error. Please try again later.');
      
          }
          return [];
      };

         async function getallmessages(){
      
          setError2('');
      
  //            const graphqlQuery = {
  //           query: `
  //     query {
  //       allinboxmessages(user:"${useremail}" ){
  //       id
  //       user1 
  //       user2
  //       content
  //       created_at
  //   }
  // }
  //           `,
  //         };
               const graphqlQuery = {
            query: `
      query {
        allinboxmessages{
        id
        user1 
        user2
        content
        created_at
    }
  }
            `,
          };
      
      
      
          try {
            const res = await fetch('https://localcommunitydashboard.onrender.com/graphql', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' ,...authHeader
                // "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(graphqlQuery),
            });
      
            const data = await res.json();
            if(data.data){
              const inboxmessg = data.data.allinboxmessages;
                setAllmessages(inboxmessg); //this doesnt mean that inboxmessg state is updated
                 return inboxmessg; // IMPORTANT
            }
             
          } catch (err) {
            setError2('Server error. Please try again later.');
      
          }
          return [];
      };
       




      //#IMPORTANT

//         useEffect(()=>{
//   // getsent();
//   // getreceived();
// //   getallcontacts();
// //   getallmessages();

//     async function loadData() {//to be sure that we get all contacts before all messages
//     await getallcontacts();
//     await getallmessages();
//   }

//   loadData();


//       },[])


const [groupedmsgbysnder, setGroupmsgbysnder] = useState({});


  async function loadData() {

   const contacts = await getallcontacts();

    const messages = await getallmessages();

    const groupedconversations = messages.sort((a, b) =>  new Date(a.created_at) - new Date(b.created_at)).reduce((acc, msg) => {

      // const sender = msg.user1;
      // const receiver = msg.user2; 

      const otheruser = useremail !==msg.user1 ? msg.user1 : msg.user2;

  if (!acc[otheruser]) {
       acc[otheruser] = {
          messages: [],
          lastMessage: null,
          user: otheruser, 
        };
      }

       acc[otheruser].messages.push(msg);
         if(msg.user1 != useremail)
       acc[otheruser].lastMessage = msg;
    // }

     

      return acc;

    }, {});


    //now as we group all messages received and sent by client by otheruser (not inbox owner)
    //now we should split the messages of contacts chat and messages of inbox chat they should never appears at contacts chat and inbox chat simultaneously

    const contactSet = new Set(contacts.map(c => c.gmail)); //set of contacts

const inbox = {}; //inbox chat 
const contactChats = {}; //chat of contacts

Object.values(groupedconversations).forEach(conv => {//groupedconversations includes contact chats and inbox chats
  if (contactSet.has(conv.user)) { //if the conv.user (otheruser not inbox owner) is inside the contactset 
    contactChats[conv.user] = conv; //add value to key (add to otheruser : group of messages )
  } else {
    inbox[conv.user] = conv; // if not found in contacts add to set of inbox value to key (otheruser) the value group of messages
  }
});

    setGroupmsgbysnder(inbox);
  }

useEffect(() => {
  loadData();

}, []);


// useEffect(() => {
//   loadData();

// }, [allcontacts]);


// const [Messages , setMessages] = useState({});//object containing message of each <input type'text'> of each chat in the inbox else all the inbox chats will have the same variable (message) and show the same content 

// function handlechange(id , e){
//   const {name ,value} = e.target;
//   setMessages((prev) => ({
//     ...prev,
//     [id]: value,
//   }));
// }

const [socket, setSocket] = useState(null);

useEffect(() => {
  //since you cannot use const socket = io("http://localhost:4000"); this each time create socket on every render
  const newSocket = io("https://localcommunitydashboard.onrender.com");
  setSocket(newSocket);

  return () => newSocket.disconnect(); //when unmount (close window which means close connection) we disconnect socket
}, []);


useEffect(() => {
  if (!socket) return; // do nothing if socket is not ready

  //hanling listen events
   socket.on("receiveMessage", (message) => {
    
    // if(message.user2 == useremail && allcontacts.some(x=>x.gmail ==message.user1)==false) //not if you use allcontacts.filter(x=>x.gmail ==message.user1).length()==0 this will remove all contacts where message sender is not the contact it will alter the contacts list not check so use .some()
    // // setAllmessages(prev => [...prev , message]);
  const contactSet = new Set(allcontacts.map(x => x.gmail));
        if (
      message.user2 === useremail &&
      !contactSet.has(message.user1)
    ) {
      loadData();
    }
  });

  return () => {
    socket.off("receiveMessage");
  };
}, [socket]);



const latestMessageObject = Object.values(groupedmsgbysnder).reduce(
  (latest, current) => {
    if (
      !latest ||
      new Date(current.lastMessage?.created_at) >
        new Date(latest.lastMessage?.created_at)
    ) {
      return current;
    }

    return latest;
  },
  null
);




    function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);

  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
}




const [events, setEvents] = useState([]);
const [latestevent, setlatestEvent] = useState();

        async function showevents(){
    
        setError('');
    
           const graphqlQuery = {
          query: `
        query {
           getallevents{
           id
           title
           description
           location
           date
           organizer
           start_time
           end_time
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
          if(data.data){
           setEvents(data.data.getallevents);
           return data.data.getallevents;
          }
        } catch (err) {
        //   console.error(err);
          setError('Server error. Please try again later.');
    
        }
        return [];
    };
        useEffect(()=>{
          async function getlatestevent(){
   const events = await showevents();
   const latest = events?.reduce(
  (latest, current) => {
    if (
      !latest ||
      new Date(current.created_at) >
        new Date(latest.created_at)
    ) {
      return current;
    }

    return latest;
  },
  null
);

setlatestEvent(latest);
            
          }
          getlatestevent();
        },[])


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];



//when the component that contains the contact inforamtion and x to delete from contact have the defined function inside it 
//when using navigation with state = refresh the component itself will refresh and not the parent (dashboard) so the deleted contact will still appear until refresh 
//and even if deleted your are still able to send messages and view the deleted contact with his chats and can still send messages until you refresh so the contact disappear

     async function deletecontact(gmail){
    
        setError('');
    
           const graphqlQuery = {
          query: `
        mutation {
           deletecontact(gmail:"${gmail}"){
           message
   
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
          if(data.data){
            const {message }= data.data.deletecontact;
          //alert(message);
          navigate(`/`,{ state: { refresh: true } });
        
            
          
          }
        } catch (err) {
        //   console.error(err);
          setError('Server error. Please try again later.');
    
        }
       
    };


  return (
    <div className="dashboard">
  
{Closechat==false ?<Chatbox currentuseremail={user} receiver={Sendto} click={handleclosechat}></Chatbox> :null}
 
    
<Outlet></Outlet>
      {/* SIDEBAR */}
      <aside className="sidebar" style={{height:"100%"}} >
        <div className="logo">
          {/* <h2>Community</h2> */}
          <span style={{fontSize:"0.5em"}}>User Dashboard</span>
        </div>

        <ul className="menu" style={{marginTop:"0px"}}>
 <li><Link to={`/UserDashboardPro/${useremail}`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>🏠</span> <span >Home</span> </Link></li>
   

  <li><Link to={`/UserDashboardPro/${useremail}/Requests`} className='MenuItem' style={{textDecoration:"none"}}> <span  className='MenuIcon' >📢 </span><span>Requests</span></Link>
   </li>
<li>
    <Link to={`/UserDashboardPro/${useremail}/Events`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>📅 </span> <span>Events</span> </Link>
 </li>
 {/* <li>
    <Link to={`/UserDashboardPro/${useremail}/Urgent`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>🚨</span> <span> Urgent</span></Link>
 
 </li> */}
 {/* <li>
    <Link to={`/UserDashboardPro/${useremail}/Add`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>➕</span> <span>Add</span></Link>
   
   </li> */}
       <li className='MenuItem' ><a href="#newreq" style={{textDecoration:"none",color:"white" }}><span  className='MenuIcon'>➕</span> <span>Add</span></a></li>
    
   <li>
    <Link to={`/UserDashboardPro/${useremail}/ChatAdmin`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'> ✉️</span> <span>Support</span></Link>
    </li>
       <li className='MenuItem' ><a href="#mycontacts" style={{textDecoration:"none" ,color:"white"}}>👤 My Contacts</a></li>
    
    <li>
    {/* <Link to={"/"} className='Logout' style={{textDecoration:"none" ,textAlign:"unset"}} > <span>Logout</span></Link> */}
    <button onClick={handlelogout}>Logout</button>
      </li>  
          
       
    
        </ul>
      </aside>
      {/* <div style={{position:'fixed'}}>
          <Outlet />
</div> */}
      {/* MAIN AREA */}
      <div className="content">

        {/* TOP NAV WITH GLOBAL SEARCH */}
        <header className="topnav">
          <div>
            <h1>Community Dashboard</h1>
            <p>Manage your community activity</p>
          </div>

          <div className="topnav-right">
            {/* <input
              type="text"
              placeholder="Search anything..."
              className="global-search"
              
            /> */}
            {/* <p>
              <b>Welcome {user.split("@")[0]}&nbsp;!</b>
            </p> */}
            <div className="avatar">{user[0]}</div>
          </div>
        </header>
         
        
        {/* KPI SECTION */}
        <div id="newreq"></div>
  
        <section className="kpi-grid">
          <div className="kpi-card">
            <h3>My Requests</h3>
            <h2>{requests?.filter(x=>x.reqby ==user).length}</h2>
          </div>
          <div className="kpi-card urgent-kpi">
            <h3>Urgent Active</h3>
            <h2>{requests?.filter(x=>(x.isurgent && x.status!=="cancelled")).length}</h2>
          </div>
          <div className="kpi-card">
            <h3>Community Requests</h3>
            <h2>{requests?.length}</h2>
          </div>
          <div className="kpi-card">
            <h3>Inbox Chats</h3>
            <h2>{Object.entries(groupedmsgbysnder)?.length}</h2>
          </div>
        </section>

        {/* REQUEST FILTER + SEARCH */}
        
        <section className="section">
          <div className="section-header">
            <h2 >Community Requests</h2>
            {/* <button className="primary-btn"><Link to={`/UserDashboardPro/${useremail}/Add`} className='MenuItem' style={{textDecoration:"none"}}></Link>
   <span>New Request</span></button> */}
   <button
   
  className="primary-btn"
  onClick={() => navigate(`/UserDashboardPro/${useremail}/Add`)}
>
  New Request
</button>
          </div>

          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search request..."
              className="search-input"
               onChange={handleSearch}
            />

            <select className="category-filter" onChange={(e) => searchbycategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Home Services">Home Services</option>
              <option value="Delivary">Delivary</option>
              <option value="Electronics">Electronics</option>
            </select>
            <div style={{alignContent:"center"}}>
            <label><b>urgent</b></label> &nbsp;
        <input
  type="checkbox"
  name="urgent"
  checked={urgent}
  onChange={handleurgent}
/>
</div>
          </div>

          <div className="request-grid" >
            {/* <div className="request-card" style={{position:"unset"}} >
              <span className="badge approved">Approved</span>
              <h3>Street Light Repair</h3>
              <p>Category: Electricity</p>
              <p>Reported by Sarah Khan</p>
              <div className="card-actions">
                <button className="outline-btn">Details</button>
                <button className="primary-btn">Contact</button>
              </div>

              
            </div> */}
{urgent===false ? 
            (Searchquery==='' ? 
requests?.map((x,index)=>{
    return(
    
<div key={x.id}>
    <CardPro status={x.status} click={handleViewDetails}id ={x.id} title ={x.title} description={x.description} owner ={x.reqby} submittedat={x.created_at} bonus={x.bonus} isurgent={x.isurgent}></CardPro>
    </div>
      
    )
}) : requests?.filter(x=>x.title.toLowerCase().includes(Searchquery.toLowerCase())).map((x,index)=>{
  
    return(
<div key={x.id}>
    <CardPro status={x.status} click={handleViewDetails} id ={x.id} title ={x.title} description={x.description} owner ={x.reqby} submittedat={x.created_at} bonus={x.bonus} isurgent={x.isurgent}></CardPro>
    </div>
   
    )
 
})
            ):

                        (Searchquery==='' ? 
requests?.filter(x=>x.isurgent===true).map((x,index)=>{
    return(
    
<div key={x.id}>
    <CardPro status={x.status} click={handleViewDetails}id ={x.id} title ={x.title} description={x.description} owner ={x.reqby} submittedat={x.created_at} bonus={x.bonus} isurgent={x.isurgent}></CardPro>
    </div>
      
    )
}) : requests?.filter(x=>x.title.toLowerCase().includes(Searchquery.toLowerCase()) && x.isurgent===true).map((x,index)=>{
  
    return(
<div key={x.id}>
    <CardPro status={x.status} click={handleViewDetails} id ={x.id} title ={x.title} description={x.description} owner ={x.reqby} submittedat={x.created_at} bonus={x.bonus} isurgent={x.isurgent}></CardPro>
    </div>
   
    )
 
})
            )
}

            {/* <div className="request-card urgent-card" style={{position:"unset"}}>
              <span className="badge urgent">Urgent</span>
              <h3>Drainage Overflow</h3>
              <p>Category: Water</p>
              <p>Reported by Ahmed Ali</p>
              <div className="card-actions">
                <button className="outline-btn">Details</button>
                <button className="primary-btn">Contact</button>
              </div>

            </div> */}
          </div>
        </section>






        {/* CONTACT MANAGEMENT */}
        <section className="section">
          <div className="section-header">
            <h2 id="mycontacts">My Contacts</h2>
            <button className="primary-btn" onClick={AddContact}>+ Add Contact</button>
          </div>

          <div className="contact-grid">
           
     {
  contacts?.map((x,index)=>{
    return(
    
      <div key={x.gmail} style={{marginBottom:"1em"}}>
     <ChatPro deletecontact={deletecontact} click={()=>handlechat(x.gmail)} firstname ={x.firstname} lastname={x.lastname} gmail = {x.gmail}></ChatPro>
      </div>
    
    )
  })
}

            {/* <div className="contact-card">
              <div className="avatar">A</div>
              <h4>Ahmed Ali</h4>
              <p>ahmed@email.com</p>
              <button className="outline-btn small-btn">Message</button>
            </div> */}
          </div>
        </section>

        {/* EVENTS + CHAT GRID */}
        <section className="bottom-grid">

          <div className="glass-card">
            <h2>Upcoming Events</h2>

            <div className="event-item">
              <div className="event-date">
                <span>{latestevent?.date && new Date(latestevent.date).getDate()}</span>
                <small>{latestevent?.date && months[new Date(latestevent.date).getMonth()]}</small>
              </div>
              <div>
                <h4>{latestevent?.title}</h4>
                <p>{new Date(`1970-01-01T${latestevent?.start_time}`)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}- {latestevent?.location}</p>
              </div>
            </div>
          </div>

          <div className="glass-card chat-card">
           <h2>
             <Link to={`/UserDashboardPro/${useremail}/INBOX`}  style={{textDecoration:"none",color: "inherit",  padding: "25px" }}> Inbox</Link>
</h2>
{latestMessageObject?
            <div className="chat-preview">
              <div className="chat-user">
                <div className="avatar small">{latestMessageObject?.user[0]}</div>
                <div>
                  <h4>{latestMessageObject?.user.split("@")[0]}</h4>
                  <p>{latestMessageObject?.lastMessage?.content}</p>
                </div>
              </div>
              <span className="time">{timeAgo(latestMessageObject?.lastMessage?.created_at)}</span>
            </div>
:null}


          

          </div>

        </section>

      </div>
    
    </div>
   
  );
}

export default UserDashboardPro;
