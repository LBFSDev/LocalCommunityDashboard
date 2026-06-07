import './app.css'


function UrgentReq(){
   
   
    return(



<div class="urgent-container">
    <h2>🚨 Urgent Requests</h2>

    <div class="urgent-card critical">
        <div class="urgent-header">
            <span class="urgent-title">Account Hacked</span>
            <span class="urgent-badge">CRITICAL</span>
        </div>
        <p class="urgent-message">
            My account was accessed without permission. Please lock it immediately.
        </p>
        <div class="urgent-footer">
            <span>Request ID: #2045</span>
            <span>Reported: 06 Feb 2026</span>
        </div>
    </div>

    <div class="urgent-card high">
        <div class="urgent-header">
            <span class="urgent-title">Payment Failed</span>
            <span class="urgent-badge">HIGH</span>
        </div>
        <p class="urgent-message">
            Payment deducted but services not activated.
        </p>
        <div class="urgent-footer">
            <span>Request ID: #2038</span>
            <span>Reported: 06 Feb 2026</span>
        </div>
    </div>

    <div class="urgent-card medium">
        <div class="urgent-header">
            <span class="urgent-title">Service Down</span>
            <span class="urgent-badge">MEDIUM</span>
        </div>
        <p class="urgent-message">
            Unable to access the dashboard since morning.
        </p>
        <div class="urgent-footer">
            <span>Request ID: #2031</span>
            <span>Reported: 05 Feb 2026</span>
        </div>
    </div>


     <div class="urgent-card medium">
        <div class="urgent-header">
            <span class="urgent-title">Service Down</span>
            <span class="urgent-badge">MEDIUM</span>
        </div>
        <p class="urgent-message">
            Unable to access the dashboard since morning.
        </p>
        <div class="urgent-footer">
            <span>Request ID: #2031</span>
            <span>Reported: 05 Feb 2026</span>
        </div>
    </div>

</div>


    );
}
export default UrgentReq;