import "./admin.css"
import { io } from "socket.io-client";
import { useState , useEffect} from "react";
//to render the childs (routes)
import { Outlet, Link, useNavigate,Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ChatPro from "./ChatPro.jsx";
import Chatbox from './chatbox.jsx';
     import { jwtDecode } from "jwt-decode";

function admindashboard(){



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

  if (role !== "admin") {
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


    // const {useremail }=  useParams();


        const [requests, setRequests] = useState([]);
        const [Events, setEvents] = useState([]);
        const [error, setError] = useState("");


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
                const res = await fetch('https://local-community-dashboard.vercel.app', {
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
          const res = await fetch('https://local-community-dashboard.vercel.app', {
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
          showevents();
          showreq();
              },[])



      async function deletereqbyid(id){
    
        setError('');
    
           const graphqlQuery = {
          query: `
        mutation {
           deletereqbyid(id:"${id}"){
           message
   
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
          if(data.data){
            const {message }= data.data.deletereqbyid;
          //alert(message);
            navigate(`/admindashboard/${useremail}`, { state: { refresh: true } });
          }
        } catch (err) {
        //   console.error(err);
          setError('Server error. Please try again later.');
    
        }
       
    };


          async function deleteeventbyid(id){
    
        setError('');
    
           const graphqlQuery = {
          query: `
        mutation {
           deleteeventbyid(id:"${id}"){
           message
   
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
          if(data.data){
            const {message }= data.data.deleteeventbyid;
          //alert(message);
            navigate(`/admindashboard/${useremail}`, { state: { refresh: true } });
          }
        } catch (err) {
        //   console.error(err);
          setError('Server error. Please try again later.');
    
        }
       
    };


     const location = useLocation();

  // useEffect(() => {
  //   if (location.state?.refresh) {
  //     if(searchcategory === ""){
  //     showreq(); // call your function to refetch requests
  //     }
  //   else{
  //     searchbycategory(searchcategory);
  //   }
  //   showchats();
  //   }
  // }, [location]);

    useEffect(() => {
    if (location.state?.refresh) {
      showreq(); // call your function to refetch requests
      showevents();
    }
  }, [location]);

//   useEffect(() => {
//   if (location.state?.refresh) {
//     showreq();
//     showevents();

//     navigate(location.pathname, { replace: true, state: {} });
//   }
// }, [location.key]);

              function handleDelete(id){
                deletereqbyid(id);
              }

              function handleDeleteEvent(id){
                deleteeventbyid(id);
              }

const [contacts , setContacts] = useState([]);
const navigate = useNavigate();
  function AddContact(event) {
event.preventDefault();
   navigate(`/admindashboard/${useremail}/NewContact`);

}





              

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
  //       firstname
  //       lastname
  //   }
  // }
  //           `,
  //         };

               const graphqlQuery = {
            query: `
      query {
        allcontacts{
        gmail
        firstname
        lastname
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
            if(data.data){
             setAllcontacts(data.data.allcontacts);
             console.log(data.data.allcontacts);
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
            const res = await fetch('https://local-community-dashboard.vercel.app', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' ,...authHeader},
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

    const groupedconversations = messages?.sort((a, b) =>  new Date(a.created_at) - new Date(b.created_at)).reduce((acc, msg) => {

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

// }, [groupedmsgbysnder]);


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
  const newSocket = io("https://local-community-dashboard.vercel.app");
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





const [latestevent, setlatestEvent] = useState();


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









const [eventData, setEventData] = useState({
  title: "",
  location: "",
  date: "",
  start_time: "",
  end_time: "",
  organizer: "",
  description: "",
});

function handleEventChange(e) {
  const { name, value } = e.target;

  setEventData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

async function handleAddEvent(e) {
  e.preventDefault();

  setError("");

  const graphqlQuery = {
    query: `
      mutation {
        createevent(
          title: "${eventData.title}",
          description: "${eventData.description}",
          location: "${eventData.location}",
          date: "${eventData.date}",
          organizer: "${eventData.organizer}",
          start_time: "${eventData.start_time}",
          end_time: "${eventData.end_time}"
        ) {
          id
          title
        }
      }
    `,
  };

  try {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",...authHeader
      },
      body: JSON.stringify(graphqlQuery),
    });

    const data = await res.json();

    if (data.data) {
     // alert("Event added successfully");

      setEventData({
        title: "",
        location: "",
        date: "",
        start_time: "",
        end_time: "",
        organizer: "",
        description: "",
      });
navigate(`/admindashboard/${useremail}`, { state: { refresh: true } });
      // showevents();
    }
  } catch (err) {
    setError("Failed to add event");
  }
}







  function handlelogout(){
    //instead of : 
    // localStorage.setItem("role")="";
    //  localStorage.setItem("")="";
    localStorage.removeItem("role");
localStorage.removeItem("token");
//or localStorage.clear(); but this removes all keys 
navigate("/");
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
          const res = await fetch('https://local-community-dashboard.vercel.app', {
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


      


<div className="layout">
{Closechat==false ?<Chatbox currentuseremail={useremail} receiver={Sendto} click={handleclosechat}></Chatbox> :null}
 
    

<Outlet></Outlet>
      {/* SIDEBAR */}
      <aside className="sidebar" style={{height:"100%"}} >
        <div className="logo">
          {/* <h2>Community</h2> */}
          <span style={{fontSize:"0.5em"}}>Admin Dashboard </span>
        </div>

        <ul className="menu" style={{marginTop:"0px"}}>
 <li><Link to={`/admindashboard/${useremail}`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>🏠</span> <span >Home</span> </Link></li>
   

<li>
    <Link to={`/admindashboard/${useremail}/Events`} className='MenuItem' style={{textDecoration:"none"}}><span  className='MenuIcon'>📅 </span> <span>Events</span> </Link>
 </li>

       <li className='MenuItem' ><a href="#mycontacts" style={{textDecoration:"none" ,color:"white"}}>👤 My Contacts</a></li>
    
    <li>
    {/* <Link to={"/"} className='Logout' style={{textDecoration:"none" ,textAlign:"unset"}} > <span>Logout</span></Link>
     */}
    
    <button onClick={handlelogout}>Logout</button>
      </li>  


          
       
    
        </ul>
      </aside>

  <main className="main" >

    <header className="topbar">
      <div>
        <h1>Dashboard Overview </h1>
        <p>Manage urgent cases, events and community support</p>
      </div>
      <div className="profile">
        <span>Administrator</span>
        <div className="avatar">A</div>
      </div>
    </header>

   
    <section className="stats">
      <div className="stat-card">
        <span>Total Requests</span>
        <h3>{requests?.length}</h3>
      </div>

      <div className="stat-card">
        <span>Urgent Cases</span>
        <h3>{requests?.filter(x=>x.isurgent).length}</h3>
      </div>

      <div className="stat-card">
        <span>Upcoming Events</span>
        <h3>{Events?.length}</h3>
      </div>

      <div className="stat-card">
        <span>Inbox Chats</span>
        <h3>{Object.keys(groupedmsgbysnder).length}</h3>
      </div>
    </section>

   
    <section className="card">
      <div className="card-header">
        <h2>Urgent Requests</h2>
        <button className="primary-btn">View All</button>
      </div>

      <table>
        <thead>
            <tr>
            <th>Issue</th>
            <th>Reported By</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
           <tbody>
        {requests?.map((x , index)=>{
          return(
          <tr key={x.id}>
            <td>{x.title}</td>
            <td>{x.reqby}</td>
            <td>{x.description}</td>
            <td>{new Date(x.created_at).toLocaleDateString()}</td>
            <td><span className="badge pending" style={{background: "yellow",color:"green"}}>{x.status}</span></td>
            <td><button className="approve-btn" onClick={()=>handleDelete(x.id)}>Delete</button></td>
          </tr>

)})


   
}

      </tbody>
      </table>
    </section>

{/* 
            <section className="card">
        <div className="card-header">
          <h2>Support Chat</h2>
        </div>

        <div className="chat-box">
          <div className="message client">Hello admin, my request is still pending.</div>
          <div className="message admin">We are reviewing it. It will be resolved shortly.</div>
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Type your reply..."/>
          <button className="primary-btn">Send</button>
        </div>
      </section> */}

          {/* CONTACT MANAGEMENT */}
        <section className="section" style={{marginTop:"4em"}}>
          <div className="section-header">
            <h2 id="mycontacts">My Contacts</h2>
            <button className="primary-btn" onClick={AddContact}>+ Add Contact</button>
          </div>

          <div className="contact-grid">
           
     {
  allcontacts?.map((x,index)=>{
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
             <Link to={`/admindashboard/${useremail}/INBOX`}  style={{textDecoration:"none",color: "inherit",  padding: "25px" }}> Inbox</Link>
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

   
    <section className="card" style={{marginTop:"4em"}}>
      <div className="card-header">
        <h2>Events</h2>
        <button className="primary-btn">View All</button>
      </div>

      <table>
        <thead>
            <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
           <tbody>
            
        {Events?.map((x , index)=>{
          return(
          <tr key={x.id}>
            <td>{x.title}</td>
            <td>{x.description}</td>
            <td>{new Date(x.date).toDateString()}</td>
            <td>🕒   {new Date(`1970-01-01T${x.start_time}`)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}
  {" - "}
  {new Date(`1970-01-01T${x.end_time}`)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}</td>
            <td><span className="badge pending" style={{background: "yellow",color:"green"}}>pending</span></td>
            <td><button className="approve-btn" onClick={()=>handleDeleteEvent(x.id)}>Delete</button></td>
          </tr>

)})


   
}

      </tbody>
      </table>
    </section>
    

          <section className="card"  style={{marginTop:"4em"}}> 
            
        <div className="card-header">
          <h2>Add New Event</h2>
        </div>

        {/* <form className="event-form">
          <input type="text" placeholder="Event Title"/>
          <input type="text" placeholder="Location"/>
          <input type="date"/>
          <input type="time"/>
          <input type="time"/>
          <input type="text" placeholder="Organizer"/>
          <textarea placeholder="Event Description"></textarea>
          <button className="primary-btn">+ Add Event</button>
        </form> */}
        
        <form className="event-form" onSubmit={handleAddEvent}>

  <input
    type="text"
    name="title"
    placeholder="Event Title"
    value={eventData.title}
    onChange={handleEventChange}
    required
  />

  <input
    type="text"
    name="location"
    placeholder="Location"
    value={eventData.location}
    onChange={handleEventChange}
    required
  />

  <input
    type="date"
    name="date"
    value={eventData.date}
    onChange={handleEventChange}
    required
  />

  <input
    type="time"
    name="start_time"
    value={eventData.start_time}
    onChange={handleEventChange}
    required
  />

  <input
    type="time"
    name="end_time"
    value={eventData.end_time}
    onChange={handleEventChange}
    required
  />

  <input
    type="text"
    name="organizer"
    placeholder="Organizer"
    value={eventData.organizer}
    onChange={handleEventChange}
    required
  />

  <textarea
    name="description"
    placeholder="Event Description"
    value={eventData.description}
    onChange={handleEventChange}
    required
  ></textarea>

  <button type="submit" className="primary-btn">
    + Add Event
  </button>

</form>
      </section>


  </main>
</div>


    )


    }


export default admindashboard;
