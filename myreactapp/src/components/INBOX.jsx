import { useEffect, useState,useRef} from "react";
import { io } from "socket.io-client";


import "./INBOX.css";
import { useNavigate, useParams } from "react-router-dom";
//function INBOX({currentuseremail ,receiver , click}){
  function INBOX(){


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



// const [isNearBottom, setIsNearBottom] = useState(true);
    // const user = currentuseremail;
    // const {useremail} = useParams();
    const {useremail} = useParams();
  
    const [Sentmessages , setSentmessages] = useState([]);
    const [Receivedmessages , setReceivedmessages] = useState([]);
    const [allmessages,setAllmessages] = useState([]);
   const [Error , setError]=useState([]);
   const [allcontacts, setAllcontacts] = useState([]);
   
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



   async function getallcontacts(){
      
          setError('');
      
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
            const res = await fetch('http://localhost:4000/graphql', {
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
            setError('Server error. Please try again later.');
      
          }
          return [];
      };









  //      async function getallmessages(){
      
  //         setError('');
      
  //            const graphqlQuery = {
  //           query: `
  //     query {
  //       allreceivedmessages(user:"${useremail}" ){
  //       user1 
  //       user2
  //       content
  //       created_at
      
          
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
  //           if(data.data){
  //             const contacts = await getallcontacts();
  //           const inboxmessg=data.data.allreceivedmessages.filter(x => 
  //               !contacts.some(y => y.gmail === x.user1)          
  //               );//you can also use (allcontacts.filter(y=> y.gmail == x.user1).length ==0)
  //               setAllmessages(inboxmessg); //this doesnt mean that inboxmessg state is updated

  //                return inboxmessg; // IMPORTANT
  //           }
             
  //         } catch (err) {
  //         //   console.error(err);
  //           setError('Server error. Please try again later.');
      
  //         }
  //         return [];
  //     };



         async function getallmessages(){
      
          setError('');
      
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
            const res = await fetch('http://localhost:4000/graphql', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json',...authHeader },
              body: JSON.stringify(graphqlQuery),
            });
      
            const data = await res.json();
            if(data.data){
              //const contacts = await getallcontacts();
              //console.log("my contacts"+contacts.map(x=>x.gmail));
              const inboxmessg = data.data.allinboxmessages;
          //  const inboxmessg=data.data.allinboxmessages.filter(x => 
               // !contacts.some(y => y.gmail === x.user1 || y.gmail ===x.user2)          
               // );//you can also use (allcontacts.filter(y=> y.gmail == x.user1).length ==0)
                setAllmessages(inboxmessg); //this doesnt mean that inboxmessg state is updated
                //console.log(inboxmessg);
                 return inboxmessg; // IMPORTANT
            }
             
          } catch (err) {
          //   console.error(err);
            setError('Server error. Please try again later.');
      
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




// useEffect(() => {

//   async function loadData() {

//     await getallcontacts();

//     const messages = await getallmessages();

//     const grouped = messages.reduce((acc, msg) => {

//       const sender = msg.user1;

//       if (!acc[sender]) {
//         acc[sender] = {
//           messages: [],
//           lastMessage: null,
//         };
//       }

//       acc[sender].messages.push(msg);

//       acc[sender].lastMessage = msg;

//       return acc;

//     }, {});

//     setGroupmsgbysnder(grouped);
//   }

//   loadData();

// }, []);

  async function loadData() {

   const contacts = await getallcontacts();

    const messages = await getallmessages();

    const groupedconversations = messages.sort((a, b) =>  new Date(a.created_at) - new Date(b.created_at)).reduce((acc, msg) => {

      const sender = msg.user1;
      const receiver = msg.user2; 

      const otheruser = useremail !==msg.user1 ? msg.user1 : msg.user2;
  //     if(sender != useremail){ //case user inbox is receiver
      // if (!acc[sender]) {
      //   acc[sender] = {
      //     messages: [],
      //     lastMessage: null,
      //   };
      // }

  //     acc[sender].messages.push(msg);

  //     acc[sender].lastMessage = msg;
  //   }
  //   else{//if it is user reply
  //  if (!acc[receiver]) {
  //       acc[receiver] = {
  //         messages: [],
  //         lastMessage: null,
  //       };
  //     }
  if (!acc[otheruser]) {
       acc[otheruser] = {
          messages: [],
          lastMessage: null, //last message sent by the other user not inbox owner
          user: otheruser, 
        };
      }

       acc[otheruser].messages.push(msg);
       if(msg.user1!=useremail)
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






  
const [Messages , setMessages] = useState({});//object containing message of each <input type'text'> of each chat in the inbox else all the inbox chats will have the same variable (message) and show the same content 

function handlechange(id , e){
  const {name ,value} = e.target;
  setMessages((prev) => ({
    ...prev,
    [id]: value,
  }));
}


const [LastSentMessage,setLastSentMessage]=useState("");

async function sendmessage(message , receiver){
  //async function sendmessage(){
            setError('');
      
             const graphqlQuery = {
            query: `
      mutation {
       sendMessage( user2 : "${receiver}", content: "${message}"){
        user1 
        user2
        content
          
    }
  }

      
            `,
          };
      

  //      const graphqlQuery = {
  //           query: `
  //     mutation {
  //      sendMessage(user1:"${useremail}", user2 : "${receiver}", content: "${Message}"){
  //       user1 
  //       user2
  //       content
          
  //   }
  // }

      
  //           `,
  //         };
      
      
          try {
            const res = await fetch('http://localhost:4000/graphql', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json',...authHeader },
              body: JSON.stringify(graphqlQuery),
            });
      
            const data = await res.json();
             if(data.data)
              setLastSentMessage(data.data.sendMessage);
            // setMessage("");
             
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
  const newSocket = io("http://localhost:4000");
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
      // loadData();

  // });
  return () => {
    socket.off("receiveMessage");
  };
}, [socket]);




//         useEffect(()=>{
//   getallmessages();
//       },[LastSentMessage])

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

const navigate = useNavigate();
       function handlecancel(){
        // navigate(`/UserDashboardPro/${useremail}`);
        // if(localStorage.getItem("role")=="user"){
        // navigate(`/UserDashboardPro/${useremail}`, { state: { refresh: true } });
        // }else{
        //   navigate(`/admindashboard/${useremail}`, { state: { refresh: true } });
        // }

        navigate(`/`,{ state: { refresh: true } });

    } 


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


// //using accumulator i will group messages by sender name 
// const groupedmsgbysnder = allmessages.reduce((acc, msg) => {

//   const sender = msg.user1;

//   if (!acc[sender]) { //if sender doesnt exist in accumulator add him with structure containing array of all messages and optionally last message
//     acc[sender] = {
//       messages: [],
//       lastMessage: null,
//     };
//   }

//   acc[sender].messages.push(msg);

//   acc[sender].lastMessage = msg;

//   return acc;

// }, {});//this is important part it make acc as object: acc = {}




    async function addcontact(contact){
  
  
      setError('');
  
         const graphqlQuery = {
        query: `
      mutation {
         createContact(  firstname:"${contact}" , lastname:"${""}" , gmail:"${contact}") {
        firstname
        lastname 
        gmail
    }
  }
  
        `,
      };
  

  //              const graphqlQuery = {
  //       query: `
  //     mutation {
  //        createContact(user1:"${useremail}",  firstname:"${contact}" , lastname:"${""}" , gmail:"${contact}") {
  //       firstname
  //       lastname 
  //       gmail
  //   }
  // }
  
  //       `,
  //     };
  
  
      try {
        const res = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',...authHeader},
          body: JSON.stringify(graphqlQuery),
        });
  
        const data = await res.json();
        if(data.data){
         await loadData();
         
        }
        //navigate(`/UserDashboardPro/${useremail}`,{ state: { refresh: true } });
      } catch (err) {
      //   console.error(err);
        setError('Server error . Please try again later.');
  
      }

  };



    const [Searchquery , setSearchquery] = useState('');

    function handleSearch(e){
      setSearchquery(e.target.value);
    }


//     const messagesContainerRef = useRef(null);
    
// const messagesEndRef = useRef(null);

//each chat need start ref and end ref
const messageRefs = useRef({});
const endRefs = useRef({});

// const [isNearBottom, setIsNearBottom] = useState(true);

//each chat should be tracked alone if near buttom
const [nearBottomMap, setNearBottomMap] = useState({});

// function handleScroll() {
//   const container = messagesContainerRef.current;

//   if (!container) return;

//   const threshold = 100;

//   const nearBottom =
//     container.scrollHeight -
//       container.scrollTop -
//       container.clientHeight <
//     threshold;

//   setIsNearBottom(nearBottom);
// }


function handleScroll(sender) {
  const container = messageRefs.current[sender];

  if (!container) return;

  const threshold = 100;

  const nearBottom =
    container.scrollHeight -
      container.scrollTop -
      container.clientHeight <
    threshold;

  setNearBottomMap(prev => ({
    ...prev,
    [sender]: nearBottom,
  }));
}


//    useEffect(() => {
//   if (isNearBottom) {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }
// }, [groupedmsgbysnder]);


// useEffect(() => {
//   //search all inboxes using its keys 
//   Object.keys(groupedmsgbysnder).forEach(sender => {
//     if (nearBottomMap[sender]) {
//       endRefs.current[sender]?.scrollIntoView({ //to the nearest parent view including the container containning the whole chats
//         behavior: "smooth",
//       });
//     }
//   });
// }, [groupedmsgbysnder]);

useEffect(() => {
  Object.keys(groupedmsgbysnder).forEach(sender => {

    if (nearBottomMap[sender] === false) return; //since if(nearBottomMap[sender]) may fails for the first message giving undefined

    const container = messageRefs.current[sender];

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

  });
}, [groupedmsgbysnder]);

    return(
        <div style={{position:"fixed"  ,marginLeft:"18em",backgroundColor:"white",borderRadius:"15px", overflow:"scroll" , height:"90%" , width:"62em"}}>
<div style={{marginLeft:"96%" , color:"blue" , cursor:"pointer"}} onClick={handlecancel}>X</div>
<div className="page-headeri">

    <h1>Inbox</h1>

    <div className="search-boxi">
        <input type="text" placeholder="Search workers..." onChange={handleSearch}></input>
    </div>

</div>


<div className="filtersi">
    <button className="filteri-btn active">All</button>
    <button className="filteri-btn">Unread</button>
    <button className="filteri-btn">Requests</button>
</div>


 
{Searchquery== "" ? Object.entries(groupedmsgbysnder)?.map(([sender,data])=>{ //since accumulator is object not array you cannot map directly
    console.log(Object.entries(groupedmsgbysnder));
    return(
        
      <div key={sender} className="message-gridi" style={{overflow:"hidden"}}>
    <div className="message-cardi" >
        <div className="card-topi" >
            <div className="useri" >
                <div className="avatari">{sender[0]}</div>
                <div className="user-infoi">
                    <h3>{sender.split("@")[0]}</h3>
                    
                    {/* <span>Electrician</span> */}
                </div>
            </div>
            <div className="timei">
                {timeAgo(data.lastMessage?.created_at)}
            </div>
        </div>
        <div className="message-previewi" style={{ display: "flex",
    flexDirection: "column",overflow:"hidden",overflowX:"hidden", height:"20em"}}>
                                 <div
  className="chat-messages" style={{overflowX:"hidden"}}
  ref={(el) => (messageRefs.current[sender] = el)}
  onScroll={() => handleScroll(sender)}
>
            {data.messages.map((x,index)=>{
                return(
                    <div key={x.id}     className={
      x.user1 ===useremail
        ? "job-tagi"
        : "job-received"
    } ><span >{x.content} </span>&nbsp; <span style={{fontSize:"0.8em" , color:"unset"}}>{timeAgo(x.created_at)}</span></div>
                )
            })}


  <div ref={(el) => (endRefs.current[sender] = el)} />
            </div>


        </div>
        {/* <div className="job-tagi">
            Home Electrical Repair
        </div> */}
        <div style={{marginBottom:"2em"}} >
          <input type="text" onChange={()=>{handlechange(sender,event)}} value={Messages[sender]||""} style={{width:"70%", height:"30px"}}></input> &nbsp;
          <button className="reply-btn" style={{width:"20%"}} onClick={async ()=>{
           await sendmessage(Messages[sender] , sender); 
            setMessages(prev=>({...prev , [sender]:""}))
            await loadData();
          }}>Reply</button>
          </div>
        <div className="actionsi">
            {/* <button className="reply-btn">Reply</button> */}
            <button className="contact-btn" onClick={()=>{
              addcontact(sender);
            }}>Add Contact</button>
        </div>
    </div>
</div>  
    )
}
)                                                                               //we use split since the key contains @gmail.com but we render it without @gmail.com
    : Object.entries(groupedmsgbysnder)?.filter(x=>x.toString().toLowerCase().split("@")[0].includes(Searchquery.toLowerCase())).map(([sender,data])=>{ //since accumulator is object not array you cannot map directly
    console.log(Object.entries(groupedmsgbysnder));
    return(
        
      <div key={sender} className="message-gridi">
    <div className="message-cardi">
        <div className="card-topi">
          
            <div className="useri">
                <div className="avatari">{sender[0]}</div>
                <div className="user-infoi">
                    <h3>{sender.split("@")[0]}</h3>
                    
                    {/* <span>Electrician</span> */}
                </div>
            </div>
            <div className="timei">
                {timeAgo(data.lastMessage?.created_at) /*this message is the last between owner of inbox and the otheruser so it may be sent by the owner (reply) or received by the other user*/}
            </div>
        </div>
               <div className="message-previewi" style={{ display: "flex",
    flexDirection: "column",overflow:"hidden",overflowX:"hidden", height:"20em"}}>
           {/* <div className="chat-messages"  ref={messagesContainerRef} onScroll={handleScroll}> */}
           <div
  className="chat-messages"
  ref={(el) => (messageRefs.current[sender] = el)}
  onScroll={() => handleScroll(sender)}
>

            {data.messages.map((x,index)=>{
                return(
                    <div key={x.id}     className={
      x.user1 ===useremail
        ? "job-tagi"
        : "job-received"
    } ><span >{x.content} </span>&nbsp; <span style={{fontSize:"0.8em" , color:"unset"}}>{timeAgo(x.created_at)}</span></div>
                )
            })}
            {/* <div ref={messagesEndRef} /> */}
            <div ref={(el) => (endRefs.current[sender] = el)} />
            </div>
        </div>
        {/* <div className="job-tagi">
            Home Electrical Repair
        </div> */}
        <div style={{marginBottom:"2em"}}>
          <input type="text" onChange={()=>{handlechange(sender,event)}} value={Messages[sender]||""} style={{width:"70%", height:"30px"}}></input> &nbsp;
          <button className="reply-btn" style={{width:"20%"}} onClick={async ()=>{
           await sendmessage(Messages[sender] , sender); 
            setMessages(prev=>({...prev , [sender]:""}))
            await loadData();
          }}>Reply</button>
          </div>
        <div className="actionsi">
            {/* <button className="reply-btn">Reply</button> */}
            <button className="contact-btn" onClick={()=>{
              addcontact(sender);
            }}>Add Contact</button>
        </div>
    </div>
</div>  
    )
}
)}









</div>
    );
    
}
export default INBOX;










//the problem here is that variable allcontacts is using UseState() so even if onmount in useeffect you getallcontacts although you use async function load (){  await getallcontacts ; await getallmessages ;} => this doesnt means that the getallmessages function will use the new updated list of contacts which allcontacts !!!! so the solution is making the function return the list of contacts and use it manually inside the getallmessages function + keeeping updating the useState of allcontacts as it is

//you mean that filtering data depending on non-message property causes data corruption ? 

// Not quite “data corruption” in the literal sense — your data is still correct. It’s more accurate to say:

// Filtering messages based on a non-message-related property causes incorrect visibility and unstable UI state, which looks like data loss.

// 🧠 The precise idea
// ❌ What you said:

// “data corruption”

// ✅ What is actually happening:
// Data in backend: unchanged ✔
// Messages array: unchanged ✔
// UI result: changes depending on unrelated state ❌

// So the real problem is:

// You made message visibility depend on external state that is not part of the message model.

// 🔥 Why this is dangerous

// When filtering depends on something like contacts, you create:

// 1. Hidden coupling
// Messages depend on contacts

// But they should be independent.

// 2. Non-deterministic UI behavior

// Same message list can render differently depending on:

// user adds/removes contact
// contacts API response timing
// state update order

// So:

// Same input → different output ❌

// That’s the real bug class.

// 3. “False disappearance” effect

// Example:

// State	Result
// Jon not in contacts	message visible
// Jon added to contacts	message disappears

// Nothing changed in messages — only unrelated state changed.

// So it feels like data was lost, but it wasn’t.

// 🧠 Better term than “corruption”

// What you’re actually causing is:

// UI inconsistency due to invalid filtering dependency

// or

// state-dependent visibility bug

// 🚀 Correct rule of thumb
// ✔ Good filtering rule:

// Filter using properties that belong to the data itself:

// user1
// user2
// created_at
// conversationId
// ❌ Bad filtering rule:

// Filter using unrelated external systems:

// contacts
// UI toggles
// temporary state
// side datasets not part of message schema
// 💡 Simple mental model

// Ask this before filtering:

// “If contacts state changed, should messages change?”

// If YES → contacts are part of message model (rare)
// If NO → don’t use them for filtering

// In your case:
// 👉 NO → so it should NOT affect inbox visibility

// ✔ Final takeaway

// You are not corrupting data.

// You are:

// making message visibility incorrectly depend on unrelated state, causing unstable UI behavior that mimics data loss.



// ❌ Why your current approach breaks

// You’re doing:

// “Hide messages if user is in contacts”

// So when someone becomes a contact:

// they disappear from inbox ❌
// but also appear in contacts chat ✔

// This causes:

// disappearing conversations
// duplicated logic across UI
// unstable behavior