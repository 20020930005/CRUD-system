import React, { useState } from 'react';
import Navigate from '../Navigation/Navigate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Import the custom CSS file for styling
import CustomAlert from '../CustomAlert/CustomAlert'
function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest()
      .then(() => {
        CustomAlert.success("Successfully registered");
        history("/log");
      })
      .catch((err) => {
        CustomAlert.info(err.message);
      });
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/Register", {
        username: String(user.username),
        email: String(user.email),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  return (
    <div><Navigate />
    <div className="register-container">
      
      <div className="register-card">
        <h1 className="register-heading">User Registration</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-container">
            <label className="input-label">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Register;

