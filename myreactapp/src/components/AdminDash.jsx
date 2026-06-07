import { useEffect, useState,useRef} from "react";
import { io } from "socket.io-client";
import "./AdminDash.css";

function AdminDash(){


    return(
<div class="dashboard">


  <aside class="sidebar">
    <h2>Admin Panel</h2>

    <a href="#users">👥 Users</a>
    <a href="#events">📅 Events</a>
    <a href="#support">💬 Support</a>
    <a href="#requests">📋 Requests</a>
  </aside>

  
  <main class="main">

    <header class="topbar">
      <h1>Dashboard</h1>
      <p>Manage system content</p>
    </header>

    
    <section id="users" class="card">
      <h2>Users Management</h2>

      <div class="list">
        <div class="item">
          <span>john@email.com</span>
          <button class="danger">Remove</button>
        </div>

        <div class="item">
          <span>sara@email.com</span>
          <button class="danger">Remove</button>
        </div>
      </div>
    </section>


    <section id="events" class="card">
      <h2>Events</h2>

      <form class="form">
        <input type="text" placeholder="Event title"/>
        <input type="datetime-local"/>
        <button>Add Event</button>
      </form>

      <div class="list">
        <div class="item">
          <span>Community Cleanup</span>
          <button class="danger">Delete</button>
        </div>
      </div>
    </section>

    
    <section id="support" class="card">
      <h2>Support Messages</h2>

      <div class="chat-box">
        <div class="msg admin">Hello, how can I help?</div>
        <div class="msg user">I have an issue with login</div>
      </div>

      <div class="form">
        <input type="text" placeholder="Reply..."/>
        <button>Send</button>
      </div>
    </section>


    <section id="requests" class="card">
      <h2>All Requests</h2>

      <div class="list">

        <div class="item">
          <div>
            <h4>Fix street light</h4>
            <small>by user@gmail.com</small>
          </div>
          <button class="danger">Delete</button>
        </div>

        <div class="item">
          <div>
            <h4>Water leakage issue</h4>
            <small>by ali@gmail.com</small>
          </div>
          <button class="danger">Delete</button>
        </div>

      </div>
    </section>

  </main>

</div>
    );
    
}
export default AdminDash;




















































