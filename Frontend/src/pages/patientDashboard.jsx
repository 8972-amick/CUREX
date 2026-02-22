import React from 'react'
import Footer from '../Components/Footer.jsx';

const patientDashboard = () => {
  return (
    <div>
        <h1>Patient Dashboard</h1>
        <p>Welcome to your personalized patient dashboard.</p>
        <ul>
            <li><a href="/my-appointments">My Appointments</a></li>
            <li><a href="/symptoms">Symptom Analysis</a></li>
            <li><a href="/chat">Chat with Doctor</a></li>
            <li><a href="/notification">Notifications</a></li>
        </ul>
        <Footer />
    </div>
  )
}

export default patientDashboard