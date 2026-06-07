import { useEffect, useState,useRef} from "react";
import { io } from "socket.io-client";
import { Navigate } from "react-router-dom";


function chatbox({currentuseremail ,receiver , click}){
  
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


const sender = localStorage.getItem("email");

    function handleclick(e){
        click(e);
    }

// const chatContainerRef = useRef(null);


const messagesContainerRef = useRef(null);
const messagesEndRef = useRef(null);

const [isNearBottom, setIsNearBottom] = useState(true);

function handleScroll() {
  const container = messagesContainerRef.current;

  if (!container) return;

  const threshold = 100;

  const nearBottom =
    container.scrollHeight -
      container.scrollTop -
      container.clientHeight <
    threshold;

  setIsNearBottom(nearBottom);
}







    const user = currentuseremail;
    const [Sentmessages , setSentmessages] = useState([]);
    const [Receivedmessages , setReceivedmessages] = useState([]);
    const [allmessages,setAllmessages] = useState([]);
   const [Error , setError]=useState([]);

   useEffect(() => {
  if (isNearBottom) {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }
}, [allmessages]);
   
  //   async function getsent(){
      
  //         setError('');
      
  //            const graphqlQuery = {
  //           query: `
  //     query {
  //       sentmessages(user1:"${user}",  user2:"${receiver}" ) {
  //       user1 
  //       user2
  //       content
      
          
  //   }
  // }

      
  //           `,
  //         };
      
      
      
  //         try {
  //           const res = await fetch('http://localhost:4000/graphql', {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify(graphqlQuery),
  //           });
      
  //           const data = await res.json();
  //           if(data.data)
  //            setSentmessages(data.data.sentmessages);
  //         } catch (err) {
  //         //   console.error(err);
  //           setError('Server error. Please try again later.');
      
  //         }
  //     };

  //         async function getreceived(){
      
  //         setError('');
      
  //            const graphqlQuery = {
  //           query: `
  //     query {
  //       receivedmessages(user1:"${user}",  user2:"${receiver}" ) {
  //       user1 
  //       user2
  //       content
      
          
  //   }
  // }

      
  //           `,
  //         };
      
      
      
  //         try {
  //           const res = await fetch('http://localhost:4000/graphql', {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify(graphqlQuery),
  //           });
      
  //           const data = await res.json();
  //           if(data.data)
  //            setReceivedmessages(data.data.receivedmessages);
  //         } catch (err) {
  //         //   console.error(err);
  //           setError('Server error. Please try again later.');
      
  //         }
  //     };






       async function getallmessages(){
      
          setError('');
      
  //            const graphqlQuery = {
  //           query: `
  //     query {
  //       allmessages(user1:"${user}",  user2:"${receiver}" ){
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
        allmessages( user2:"${receiver}" ){
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
              headers: { 'Content-Type': 'application/json',...authHeader },
              body: JSON.stringify(graphqlQuery),
            });
      
            const data = await res.json();
            if(data.data)
             setAllmessages(data.data.allmessages);
          } catch (err) {
          //   console.error(err);
            setError('Server error. Please try again later.');
      
          }
      };

        useEffect(()=>{
  // getsent();
  // getreceived();
  getallmessages();
      },[])
  
const [Message , setMessage] = useState("");
function handlechange(e){
  const {name ,value} = e.target;
  setMessage(value);
}


const [LastSentMessage,setLastSentMessage]=useState("");

async function sendmessage(){
            setError('');
      
  //            const graphqlQuery = {
  //           query: `
  //     mutation {
  //      sendMessage(user1:"${user}", user2 : "${receiver}", content: "${Message}"){
  //       user1 
  //       user2
  //       content
        
          
  //   }
  // }

      
  //           `,
  //         };
      

               const graphqlQuery = {
            query: `
      mutation {
       sendMessage( user2 : "${receiver}", content: "${Message}"){
        user1 
        user2
        content
        
          
    }
  }

      
            `,
          };
      
      
          try {
            const res = await fetch('https://localcommunitydashboard.onrender.com/graphql', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json',... authHeader},
              body: JSON.stringify(graphqlQuery),
            });
      
            const data = await res.json();
             if(data.data)
              setLastSentMessage(data.data.sendMessage);
            setMessage("");
             
           } catch (err) {
          //   console.error(err);
            setError('Server error. Please try again later.');
      
          }
         
           
          
}



/*
How useEffect Actually Works
Because you used:
}, []);
This means:
Effect runs once when component mounts
Cleanup runs when component unmounts
So lifecycle becomes:

Component mounts
   ↓
socket.on() is registered
   ↓
Component stays mounted
   ↓
Messages continue coming in normally
   ↓
Component unmounts (leave page)
   ↓
socket.off() runs

So updates continue as long as the component exists.

🚨 Why We NEED socket.off()

If you remove it:

Every time the component remounts, a new listener is added.
*/
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
    if((message.user1 === user && message.user2 === receiver) || (message.user2 === user && message.user1 === receiver))
    setAllmessages(prev => [...prev , message]);
  });
  return () => {
    socket.off("receiveMessage");
  };
}, [socket]);




        useEffect(()=>{
  getallmessages();
      },[LastSentMessage,allmessages])

//       useEffect(() => {
//   if (chatContainerRef.current) {
//     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   }
// }, [allmessages]);

// useEffect(() => {
//   if (chatContainerRef.current) {
//     chatContainerRef.current.scrollTo({
//       top: chatContainerRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }
// }, [allmessages]);


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

    return(
<div className="chat-container" style={{borderRadius:"10px"}}>
  <div className="chat-header" style={{borderRadius:"10px"}} >
   <div style={{marginLeft:"auto", marginRight:"auto"}}>Chat Room</div>
   <div style={{marginBottom:"40px", paddingRight:"3px",paddingLeft:"3px",  borderRadius: "20px",
   marginRight:"1px",
  border: "none",
  backgroundColor:"white",
  color: "#4a76a8",
   fontWeight: "100",
  cursor: "pointer"}} onClick={handleclick}>X</div>
  </div>
  
  <div className="chat-messages"   ref={messagesContainerRef} onScroll={handleScroll}>
    {/* {Sentmessages ? Sentmessages.map((x , index)=>{
      return (
  <div key={x.id} class="message sent">{x.content}</div>
      );
    }):null}
        {Receivedmessages ? Receivedmessages.map((x , index)=>{
      return (
  <div key={x.id} class="message received">{x.content}</div>
      );
    }):null} */}


{allmessages ? allmessages.map((x , index)=>{

return(
  //  x.user1 === user|| x.user2 === user ?(
  
  <div
    key={x.id}
    className={
      x.user1 ===user
        ? "message sent"
        : "message received"
    }
 
  
  >
   {x.content} &nbsp;
    <span style={{fontSize:"0.7em"}}>{timeAgo(x.created_at)}</span>
     
  </div>
  
  
  // ):null
)
})
:null
}


<div ref={messagesEndRef} />
  </div>
  <div class="chat-input">
    <input type="text" placeholder="Type a message..." onChange={handlechange} value={Message}></input>
    <button style={{width:"20%"}} onClick={sendmessage}>Send</button>
  </div>
</div>


    );
    
}
export default chatbox;



//note  :Explanation:

// sendmessage() → You are CALLING the function during render, which causes infinite re-renders. ,executes immediately during render ❌ causes infinite re render
// sendmessage → passes the function reference correctly ✅
