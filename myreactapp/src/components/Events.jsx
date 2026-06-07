
import { useState ,useEffect} from "react";
import "./app.css"
import { useNavigate, Outlet, useParams } from "react-router-dom";

function Events(){



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










    const navigate =useNavigate();
    const {useremail} = useParams();
    function handleclick(id){
        // navigate(`ViewEventDetails/`);
        navigate(`ViewEventDetails/${id}`);
    }

       function handlecancel(){
        if(localStorage.getItem("role") == "user"){
        navigate(`/UserDashboardPro/${useremail}`);
        }else{
            navigate(`/admindashboard/${useremail}`);
        }

    } 


const [events , setEvents] = useState([]);
const [Error, setError] = useState([]);

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
            headers: { 'Content-Type': 'application/json' ,...authHeader},
            body: JSON.stringify(graphqlQuery),
          });
    
          const data = await res.json();
          if(data.data)
           setEvents(data.data.getallevents);
        } catch (err) {
        //   console.error(err);
          setError('Server error. Please try again later.');
    
        }
    };
        useEffect(()=>{
    showevents();
        },[])





    return(


<div className="events-container">
    <div style={{marginLeft:"96%" , color:"blue" , cursor:"pointer"}} onClick={handlecancel}>X</div>
    <h2>Upcoming Events</h2>

 <Outlet />
    <div className="events-grid">
{events?.map((x, index)=>{

return(

        <div className="event-card" key={x.id}>
            <div className="event-date">
                {/* <span className="day">{new Date(x.date).toDateString()}</span> full date  */}
                <span className="day">{new Date(x.date).getDate()}</span>
                 <span className="month"> {new Date(x.date).toLocaleString("en-US", {month: "short",})}</span>
                {/* <span className="month">MAR</span> */}
            </div>
            <div className="event-details">
                <h3>{x.title}</h3>
                <p className="event-time">🕒   {new Date(`1970-01-01T${x.start_time}`)
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
    })}</p>
                <p className="event-location">📍{x.location}</p>
                <p className="event-desc">
                    {x.description}
                </p>
                <button className="event-btn" onClick={()=>{handleclick(x.id)}}>View Details</button>
            </div>
        </div>

)
})


}
        </div>
             {/* <div className="event-card">
            <div className="event-date">
                <span className="day">25</span>
                <span className="month">APR</span>
            </div>
            <div className="event-details">
                <h3>Annual Team Meetup</h3>
                <p className="event-time">🕒 9:00 AM – 5:00 PM</p>
                <p className="event-location">📍 New York Office</p>
                <p className="event-desc">
                    A full-day event with workshops, team bonding, and celebrations.
                </p>
                <button className="event-btn" onClick={handleclick}>View Details</button>
            </div>

        </div> */}

    </div>


    );
}

export default Events;
