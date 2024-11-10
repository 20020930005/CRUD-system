import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './User.css'
import CustomAlert from '../CustomAlert/CustomAlert'


function User(props) {
  const { _id, name, gmail, age, address } = props.user || {};

  const deleteHandler = async () => {
    const isConfirmed =CustomAlert.warning("Are you sure you want to delete this user? Refresh page after deletion");
    
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${_id}`); // Correct backend URL
        // Handle success (e.g., redirect or refresh data)
        CustomAlert.success("successfully Deleted");
      } catch (err) {
        console.error("Error deleting user", err);
        // Handle error
      }
    } else {
      console.log("User deletion was canceled");
    }
  };

  return (
    <div className="user-detail-container">
      <h1>CRUDO User</h1>
      {props.user ? ( // Check if props.user is defined before rendering
        <>
          <div className="user-info">
            <h2>ID: <span className="user-id">{_id}</span></h2>
            <h2>Name: <span className="user-name">{name}</span></h2>
            <h2>Gmail: <span className="user-gmail">{gmail}</span></h2>
            <h2>Age: <span className="user-age">{age}</span></h2>
            <h2>Address: <span className="user-address">{address}</span></h2>
          </div>
          <div className="actions">
            <Link to={`/Userdetails/${_id}`} className="update-link">Update</Link>
            <button onClick={deleteHandler} className="delete-button">Delete</button>
          </div>
        </>
      ) : (
        <h2>No user data available</h2> // Fallback UI
      )}
    </div>
  );
}

export default User;
