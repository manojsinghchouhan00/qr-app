import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./Dashboard.css"
function Dashboard() {
  return (
    <nav>
      <ul id="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/qrapp">Add user</Link></li>
        <li><Link to="/qrlist">Listing</Link></li>
      </ul>
    </nav>
  );
}

export default Dashboard;
