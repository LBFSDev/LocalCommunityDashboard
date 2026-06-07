import './app.css'
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';
import { useState,useEffect ,useRef} from 'react';
     import {jwtDecode }from "jwt-decode";
function ChatAdmin(){




          
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
    // const {useremail }= useParams();//you can access any parameter in the url of a parent component (including the url of child page ex: /userdashboard:useremail/ChatAdmin so we can access teh useremail)
   

 
      // const {useremail }= useParams();
      let useremail ="";
    
      if (token && token !== "undefined") {
      const decoded = jwtDecode(token);
      useremail = decoded.email;
    }
   
    function handleCancel(){
        navigate(`/UserDashboardPro/${useremail}`);
    }





    const [allmessages,setAllmessages] = useState([]);
    const [Error , setError]=useState([]);


     async function getallmessages(){
          
              setError('');
          
                 const graphqlQuery = {
                query: `
          query {
            allmessages(user2:"admin1@gmail.com" ){
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
  //      sendMessage(user1:"${useremail}", user2 : "admin123@gmail.com", content: "${Message}"){
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
       sendMessage( user2 : "admin1@gmail.com", content: "${Message}"){
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
              headers: { 'Content-Type': 'application/json',...authHeader },
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
    if((message.user1 === useremail && message.user2 ==="admin1@gmail.com") ||(message.user2 === useremail && message.user1 ==="admin1@gmail.com") )
    setAllmessages(prev => [...prev , message]);
  });
  return () => {
    socket.off("receiveMessage");
  };
}, [socket]);




    useEffect(()=>{
  getallmessages();
      },[LastSentMessage])

//       useEffect(() => {
//   if (chatContainerRef.current) {
//     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   }
// }, [allmessages]);



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


//    useEffect(() => {
//   if (isNearBottom) {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }
// }, [allmessages]);


   useEffect(() => {
  if (isNearBottom) {
   const container = messagesContainerRef.current;

  if (!container) return;

  container.scrollTo({
    top: container.scrollHeight,
    behavior: "smooth",
  });

  }
}, [allmessages]);





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


<div class="chat-containera">
    
    <div class="chat-headera">
        <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{marginLeft:"auto" , marginRight:"auto"}}>
        Chat with Admin
        </div>
        <div style={{cursor:"pointer"}} onClick={handleCancel}>X</div>
        </div>
    </div>
   
   

    <div class="chat-messagesa"  ref={messagesContainerRef} onScroll={handleScroll}>
        {/* <div class="messagea admin">
            <div class="bubble">
                Hello! How can I help you today?
            </div>
        </div> */}

        {/* <div class="messagea user">
            <div class="bubble">
                Hi Admin, I need support.
            </div> */}
        

<div className='bubble'> 

{allmessages ? allmessages.map((x , index)=>{

return(
    <div    className={
      x.user1 ===useremail
        ? "messagea user"
        : "messagea admin"
    }  style={{backgroundColor:"unset"}}   key={x.id}>
      
  <div
  
    className='bubble'
    
  
  >
    {x.content} &nbsp;
     <span style={{fontSize:"0.7em"}}>{timeAgo(x.created_at)}</span>
  </div>
  </div>
)
})
:null
}


</div>
<div ref={messagesEndRef}/>
    </div>

    <div className="chat-inputa">
      <div  style={{width:"80%"}}>
        <input type="text" placeholder="Type your message..." value={Message} onChange={handlechange} style={{width:"100%"}} />
       </div>
      
        <button onClick={sendmessage} style={{width:"20%"}}>Send</button >
        
    </div>
</div>


    );
}
export default ChatAdmin;
