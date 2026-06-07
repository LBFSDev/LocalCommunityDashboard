import { use, useState } from 'react';
import Header from './components/Header.jsx';
import NavBar from './components/navbar.jsx';
import Footer from './components/Footer.jsx';
import "./components/app.css";
import Chat from "./components/chat.jsx";
import Card from "./components/card.jsx";
import Chatbox from './components/chatbox.jsx';
import INBOX from './components/INBOX.jsx'

// App.jsx
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add.jsx";
import root from "./App.jsx";
import NewContact from './components/NewContact.jsx';
import Urgentv1 from './components/Urgent.jsx';
import UrgentReq from './components/UrgentReq.jsx';
import ChatAdmin from './components/ChatAdmin.jsx';
import Requests from './components/Requests.jsx';
import Events from './components/Events.jsx';
import ViewOrder from './components/ViewOrder.jsx';
import { useNavigate,Navigate } from 'react-router-dom';

import ViewEventDetails from './components/ViewEventDetails.jsx';
import Sign from './pages/Sign.jsx';
import Userdashboard from './components/userdashboard.jsx';
import Admindashboard from './components/admindashboard.jsx';
import AdminDash from './components/AdminDash.jsx'
import UserdashboardV1 from './components/userdashboardV1.jsx';
import UserDashboardPro from './components/UserDashboardPro.jsx';
import SignUp from './pages/SignUp.jsx'

import ManageReq from './components/ManageReq.jsx';
function App() {

  //   function handleEventDetails(e){
  // navigate("/ViewEventDetails");

  //   const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");

  // if(!token){
  //   return  <Navigate to="/signin" />;
  // }
  // }
  return (

<>
<Routes>
  <Route path='/AdminDash' element={<AdminDash/>}></Route>
  <Route path='/' element={<Sign/>}/>
  <Route path='/SignUp' element={<SignUp/>}/>
  <Route path="INBOX" element={<INBOX />}/>
  
  {/* <Route path='/userdashboard/:useremail/*' element={<Userdashboard/>}> */}
       {/* <Route path="Requests" element={<Requests />}/>
       <Route path="Add" element={<Add/>} />
       <Route path="NewContact" element={<NewContact />} /> */}
       {/* <Route path="Urgent" element={<UrgentReq />} /> */}
       {/* <Route path="ChatAdmin" element={<ChatAdmin />} /> */}
       {/* <Route path="Events" element={<Events />}>
       <Route path="ViewEventDetails" element={<ViewEventDetails />}/>
       </Route> */}

      {/* <Route path="ViewOrder/:id" element={<ViewOrder />}/> */}
     
  {/* </Route> */}


  <Route path='/admindashboard/:useremail/*' element={<Admindashboard/>}>
      
       <Route path="NewContact" element={<NewContact />} />
       <Route path="Events" element={<Events />}>
       <Route path="ViewEventDetails/:id" element={<ViewEventDetails />}/>
       </Route>
        <Route path="INBOX" element={<INBOX />}/>


  </Route>


     <Route path='/userdashboardV1/:useremail/*' element={<UserdashboardV1/>}>

 
  </Route>


      <Route path='/UserDashboardPro/:useremail/*' element={<UserDashboardPro/>}>
      
       <Route path="Requests" element={<Requests />}/>
       <Route path="Add" element={<Add/>} />
       <Route path="NewContact" element={<NewContact />} />
       <Route path="Urgent" element={<UrgentReq />} />
       <Route path="ChatAdmin" element={<ChatAdmin />} />

     

       <Route path="Events" element={<Events />}>
       <Route path="ViewEventDetails/:id" element={<ViewEventDetails />}/>
      </Route>

      <Route path="ViewOrder/:id" element={<ViewOrder />}/>
      <Route path="INBOX" element={<INBOX />}/>
      
      </Route>


       
        <Route path="ManageReq" element={<ManageReq />} />
  

</Routes>

    </>
  )
}

export default App
