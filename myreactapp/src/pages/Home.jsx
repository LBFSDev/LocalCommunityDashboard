import { useState } from 'react';
import Header from '../components/Header.jsx';
import NavBar from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import "../components/app.css";
import Chat from "../components/chat.jsx";
import Card from "../components/card.jsx";
import Chatbox from '../components/chatbox.jsx';






function App() {
  const [Closechat, setClosechat] = useState(true);
  //const [Showbar,setShowbar] =useState(false);

  function handlechat(e){
    setClosechat(false);
  }

    function handleclosechat(e){
    setClosechat(true);
  }

  function handlesidebar(){
setShowbar(prev=>!prev);
  }
  return (

<>



    <div className='Layout'>
   <header><Header></Header></header>
   
      <div className='Main'>
    <nav style={{display:"flex" , flexDirection:"column"}}>
{ <NavBar>
<Chat click={handlechat} ></Chat>
<Chat click={handlechat}></Chat>
<Chat click={handlechat}></Chat>
</NavBar>}
    { /* <div><button style={{width:"20em", position:"fixed" ,marginTop:"40.5em",cursor:"pointer"}} onClick={handlesidebar}>View/Hide Contacts</button></div>*/}
   </nav>
   
    <div>
   
<article >
  {Closechat==false ?<Chatbox click={handleclosechat}></Chatbox> :null}
  <div style={{height:"50px" , margin:"20px",marginLeft:"20em"}} ><input placeholder='Search' style={{width:"80%",height:"100%" , textAlign:"center", fontSize:"30px"}}></input></div>
<div className='maincontent'>


  <Card></Card>
  <Card></Card>
    <Card></Card>
      <Card></Card>
       <Card></Card>
  <Card></Card>
    <Card></Card>
      <Card></Card>

       <Card></Card>
  <Card></Card>
    <Card></Card>
      <Card></Card>
       <Card></Card>
  <Card></Card>
    <Card></Card>
      <Card></Card>
       <Card></Card>
  <Card></Card>
    <Card></Card>
      <Card></Card>
          <Card></Card>
  <Card></Card>
    <Card></Card>
      <Card></Card>
       <Card></Card>
  <Card></Card>
    <Card></Card>
      <Card></Card>
          <Card></Card>

          

</div>
</article>

</div>


</div>

    </div>
    </>
  )
}

export default App
