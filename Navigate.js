import React from 'react'
import './Navigate.css';
import {Link} from "react-router-dom";

function Navigate() {
  return (
    <nav class="navbar">
    <div class="navbar-container">
      <h1 class="navbar-logo">CRUDO the USER</h1>
      <ul class="navbar-menu">

        <Link to="/mainhome" className="active home-a">
        <li className="navlist">Home</li>
        </Link>

    
        <Link to="/Userdetails" className="active home-a">
        <li className="navlist">User Details</li>
        </Link>

        
        <Link to="/Addusernew" className="active home-a">
        <li className="navlist">Add Users</li>
        </Link>


        <Link to="/Contact" className="active home-a">
        <li className="navlist">Contact Us</li>
        </Link>

        <Link to="/SendPdfnew" className="active home-a">
        <li className="navlist">Send Pdf</li>
        </Link>

        <Link to="/ImageUploader" className="active home-a">
        <li className="navlist">Gallery</li>
        </Link>

        <Link to="/Regi" className="active home-a">
        <li className="navlist">Register</li>
        </Link>

        <Link to="/log" className="active home-a">
        <li className="navlist">Login</li>
        </Link>

        
      </ul>
    </div>
  </nav>
  )
}

export default Navigate
