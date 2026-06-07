import './app.css'
import { useInRouterContext, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
function ViewEventDetails(){



        
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
const {useremail , id} = useParams();


    function handleclick(){
        if(localStorage.getItem("role") == "user"){
        navigate(`/UserDashboardPro/${useremail}/Events`);
        }
      else{
navigate(`/admindashboard/${useremail}/Events`);
      }

    }

    const [Event , setEvent] = useState(null);
    const [Error , setError] = useState([]);
    async function geteventbyid(){
        
            setError('');
        
               const graphqlQuery = {
              query: `
            query {
               geteventbyid(id:"${id}"){
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
               setEvent(data.data.geteventbyid);//the Event state will not be updated
          
                return data.data.geteventbyid;
              }
            } catch (err) {
            //   console.error(err);
              setError('Server error. Please try again later.');
        
            }
            return null;
        };
            useEffect(()=>{
              async function loadData(){
              if(id){
           await geteventbyid();
         
              }
            }

            loadData();
            },[id])
    return(
<div className="event-container">
  <div className="event-header">
    <div style={{marginLeft:"1em" , color:"blue" , cursor:"pointer"}} onClick={handleclick}>X</div>
    <span className="event-status upcoming">Upcoming </span>
  </div>

  <div className="event-content">
    <h1>{Event?.title}</h1>
    <p className="event-description">
{Event?.description}
    </p>

    <div className="event-info">
      <div className="info-card">
        <h3>Date & Time</h3>
        <p> {Event?.date && new Date(Event.date).toDateString()}<br />{new Date(`1970-01-01T${Event?.start_time}`)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}
  {" - "}
  {new Date(`1970-01-01T${Event?.end_time}`)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}</p>
      </div>

      <div className="info-card">
        <h3>Location</h3>
        <p>{Event?.location}</p>
      </div>

      <div className="info-card">
        <h3>Organizer</h3>
        <p>{Event?.organizer}</p>
      </div>
    </div>

    {/* <div className="agenda">
      <h2>Event Agenda</h2>
      <ul>
        <li>10:00 AM – Opening Keynote</li>
        <li>11:30 AM – Panel Discussion</li>
        <li>01:00 PM – Networking Lunch</li>
        <li>03:00 PM – Workshops</li>
        <li>05:00 PM – Closing Remarks</li>
      </ul>
    </div> */}

    {/* <div className="event-actions">
      <button className="btn primary">Register Now</button>
      <button className="btn secondary">Add to Calendar</button>
    </div> */}
  </div>
</div>


    );
}

export default ViewEventDetails;
