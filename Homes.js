import React from 'react';
import Navigate from "../Navigation/Navigate";
import './Home.css'

function Homes() {
  return (
    <div>
      <Navigate />
    <div className="home-container">
      
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our User Management System</h1>
          <p>Your gateway to a seamless user experience and management.</p>
        </div>
      </section>

      <section className="about-us">
        <div className="section-title">
          <h2>About Us</h2>
        </div>
        <div className="about-content">
          <p>
            We are dedicated to providing a user-friendly and secure platform that allows for effective management of users and their data. Our system is designed to meet the needs of various organizations and individuals looking for a reliable solution for user authentication, registration, and management.
          </p>
        </div>
      </section>

      <section className="definitions">
        <div className="section-title">
          <h2>Definitions</h2>
        </div>
        <div className="definitions-content">
          <ul>
            <li><strong>User:</strong> An individual who can interact with the system.</li>
            <li><strong>Admin:</strong> A user with elevated privileges to manage the system's settings.</li>
            <li><strong>Authentication:</strong> The process of verifying the identity of a user.</li>
            <li><strong>Authorization:</strong> The process of granting or denying access to specific resources based on user roles.</li>
          </ul>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 User Management System. All rights reserved.</p>
          <p>Designed by Team CRUDO</p>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default Homes;

