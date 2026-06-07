

import {useState, useEffect } from 'react';
import './ManageReq.css'
import { useParams } from 'react-router-dom';



function ManageReq(){

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
    const {useremail }= useParams();


    useEffect(()=>{
async function showreq(){

    setError('');

       const graphqlQuery = {
      query: `
    query {
       userrequests(username:"${useremail}") {
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
      const res = await fetch('https://local-community-dashboard.vercel.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
      });

      const data = await res.json();
      if(data.data)
       setRequests(data.data.userrequests);
    } catch (err) {
    //   console.error(err);
      setError('Server error. Please try again later.');

    }
};
showreq();
    },[])










return(

<div>




<div class="page-title">
    <h1>My Requests</h1>
    <p>Manage your job requests and update their status.</p>
</div>



<div class="requests-grid">



    <div class="request-card">

        <div class="card-header">

            <div>
                <h2>Kitchen Sink Repair</h2>
                <div class="date">Created: May 16, 2026</div>
            </div>

            <div class="status urgent">
                Urgent
            </div>

        </div>

        <div class="description">
            Need a plumber to repair water leakage under the kitchen sink.
        </div>

        <div class="info">
            <span>Category: Plumbing</span>
            <span>Bonus: $20</span>
        </div>

        <div class="status-control">
            <label>Update Status</label>

            <select>
                <option>Pending</option>
                <option selected>Urgent</option>
                <option>In Progress</option>
                <option>Fulfilled</option>
                <option>Cancelled</option>
            </select>
        </div>

        <div class="actions">
            <button class="save-btn">Save Changes</button>
            <button class="delete-btn">Delete</button>
        </div>

    </div>

    

    <div class="request-card">

        <div class="card-header">

            <div>
                <h2>Apartment Painting</h2>
                <div class="date">Created: May 14, 2026</div>
            </div>

            <div class="status inprogress">
                In Progress
            </div>

        </div>

        <div class="description">
            Looking for a painter to repaint a two-bedroom apartment.
        </div>

        <div class="info">
            <span>Category: Painting</span>
            <span>Bonus: $50</span>
        </div>

        <div class="status-control">
            <label>Update Status</label>

            <select>
                <option>Pending</option>
                <option>Urgent</option>
                <option selected>In Progress</option>
                <option>Fulfilled</option>
                <option>Cancelled</option>
            </select>
        </div>

        <div class="actions">
            <button class="save-btn">Save Changes</button>
            <button class="delete-btn">Delete</button>
        </div>

    </div>

</div>



</div>


);
}

export default ManageReq;



