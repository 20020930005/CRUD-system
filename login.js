import React, { useState } from 'react';
import Navigate from '../Navigation/Navigate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the custom CSS file for styling
import CustomAlert from '../CustomAlert/CustomAlert'
function Login() {
  const history = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.status === "ok") {
        CustomAlert.success("Login successfully done");
        history("/");
      } else {
        CustomAlert.error("Please enter valid email and password");
      }
    } catch (err) {
      CustomAlert.info("Error: " + err.message);
    }
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => res.data);
  };

  return (
    <div><Navigate />
    <div className="login-container">
      
      <div className="login-card">
        <h1 className="login-heading">User Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
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

          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;



