import "./userdashboardV1.css";

function UserDashboardV1() {
  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <h2>Community Board</h2>
          <span>User Panel</span>
        </div>

        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>My Requests</li>
            <li>Urgent Requests</li>
            <li>Events</li>
            <li>Private Messages</li>
            <li>Support Chat</li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* HEADER */}
        <header className="topbar">
          <div>
            <h1>Welcome Back</h1>
            <p>Submit and track your community requests</p>
          </div>

          <div className="profile">
            <span>John Doe</span>
            <div className="avatar">J</div>
          </div>
        </header>

        {/* SUBMIT REQUEST */}
        <section className="card">
          <div className="card-header">
            <h2>Submit New Request</h2>
          </div>

          <form className="request-form">
            <input type="text" placeholder="Request Title" />
            <textarea placeholder="Describe your issue"></textarea>

            <div className="form-row">
              <select>
                <option>Normal Request</option>
                <option>Urgent Request</option>
              </select>

              <button type="button" className="primary-btn">
                Submit Request
              </button>
            </div>
          </form>
        </section>

        {/* MY REQUESTS */}
        <section>
          <h2 className="section-title">My Requests</h2>
          <div className="card-grid">

            <div className="request-card">
              <div className="request-status pending">Pending</div>
              <h3>Water leakage near my house</h3>
              <p>Reported on Feb 20, 2026</p>
              <div className="card-actions">
                <button className="secondary-btn">Details</button>
              </div>
            </div>

            <div className="request-card urgent-border">
              <div className="request-status urgent">Urgent</div>
              <h3>Electricity outage in Block C</h3>
              <p>Reported on Feb 21, 2026</p>
              <div className="card-actions">
                <button className="secondary-btn">Details</button>
              </div>
            </div>

          </div>
        </section>

        {/* COMMUNITY REQUESTS */}
        <section>
          <h2 className="section-title">Community Requests</h2>
          <div className="card-grid">

            <div className="request-card">
              <div className="request-status approved">Approved</div>
              <h3>Street light repair needed</h3>
              <p>Posted by Sarah Khan</p>
              <div className="card-actions">
                <button className="secondary-btn">Details</button>
                <button className="primary-btn">Contact</button>
              </div>
            </div>

            <div className="request-card urgent-border">
              <div className="request-status urgent">Urgent</div>
              <h3>Broken drainage system</h3>
              <p>Posted by Ahmed Ali</p>
              <div className="card-actions">
                <button className="secondary-btn">Details</button>
                <button className="primary-btn">Contact</button>
              </div>
            </div>

          </div>
        </section>

        {/* EVENTS */}
        <section>
          <h2 className="section-title">Upcoming Events</h2>

          <div className="card-grid">
            <div className="event-card">
              <h3>Community Clean-up Drive</h3>
              <p>Date: March 5, 2026</p>
              <button className="secondary-btn">View Details</button>
            </div>

            <div className="event-card">
              <h3>Neighborhood Meeting</h3>
              <p>Date: March 12, 2026</p>
              <button className="secondary-btn">View Details</button>
            </div>
          </div>
        </section>

        {/* PRIVATE MESSAGING SYSTEM */}
        <section className="card private-chat-section">
          <div className="card-header">
            <h2>Private Messages</h2>
          </div>

          <div className="chat-layout">

            {/* Conversations */}
            <div className="chat-sidebar">
              <div className="conversation active">
                <div className="conversation-avatar">S</div>
                <div>
                  <h4>Sarah Khan</h4>
                  <p>Street light issue</p>
                </div>
              </div>

              <div className="conversation">
                <div className="conversation-avatar">A</div>
                <div>
                  <h4>Ahmed Ali</h4>
                  <p>Drainage problem</p>
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="chat-window">
              <div className="chat-messages">
                <div className="message received">
                  Can you provide more details?
                </div>
                <div className="message sent">
                  Yes, it's near building 5.
                </div>
              </div>

              <div className="chat-input">
                <input type="text" placeholder="Type a message..." />
                <button className="primary-btn">Send</button>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default UserDashboardV1;