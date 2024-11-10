import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';
import Navigate from '../Navigation/Navigate';
import User from '../adduser/User';
import '../adduser/User.css'
import './Details.css';


const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data; // Returns the entire response, including Users key
  } catch (error) {
    console.error("Error fetching users:", error);
    return { Users: [] }; // Return an empty array if there's an error
  }
};

function Details() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.Users) {
        setUsers(data.Users);  // Make sure you access `Users` from the response
      } else {
        setUsers([]);  // If no users found, set an empty array
      }
      setLoading(false);
    });
  }, []);

  const componentsRef = useRef(null);

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: componentsRef,
    documentTitle: "User Report",
    onBeforeGetContent: () => {
      setIsPrinting(true); // Set the flag to true when print dialog is about to open
    },
    onAfterPrint: () => {
      if (isPrinting) {
        // Only show the alert if printing was initiated
        alert("User Report Successfully Downloaded!");
        setIsPrinting(false); // Reset the flag after alert
      }
    },
  });

  const [searchQuery, setSearchQuery] = useState(""); // Fix typo in setSearchQuery
  const [noResults, setNoResults] = useState(false); // Fix typo in setNoResults

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.Users.filter((user) => // Access `Users` instead of `users`
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0); // Set noResults after filtering
    });
  };

  const handleSendReport = () => {
    //create the whatsapp chat url
    const phoneNumber = "+94705774196";
    const message = `selected user Reports`;
    const WhatsAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    //open the whatsapp in new tab
    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div>
      <Navigate />
    <div className="details-container">
      
      <div ref={componentsRef}>
        <h1>User Details Display Page</h1>
        <div style={{ textAlign: "center" }}>
          <input
            onChange={(e) => setSearchQuery(e.target.value)} // Typo fixed
            type="text"
            name="search"
            placeholder="Search Users Details"
          />

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : noResults ? (
          <div>
            <p>No users Found</p>
          </div>
        ) : (
          <div className="user-detail-card-wrapper">
            {users.map((user, i) => (
              <div key={i} className="user-detail-card">
                <User user={user} />
                <div className="user-id">
                  {user.id} {/* Or whatever field holds the ID */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="button-container">
    <button onClick={handlePrint}>Download Report</button>
    <button onClick={handleSendReport}>Send WhatsApp Message</button>
  </div>
    </div>
    </div>
  );
}

export default Details;











