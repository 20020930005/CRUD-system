import React, { useState } from 'react';
import Navigate from '../Navigation/Navigate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addusernew.css';  // Import the CSS file for the Addusernew component
import CustomAlert from '../CustomAlert/CustomAlert'
function Addusernew() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const response = await sendRequest();
    if (response) {
      CustomAlert.success("User added successfully");
      history('/Userdetails');
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/users", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      });
      return res.data;
    } catch (error) {
      console.error("Error adding user:", error);
      return null;
    }
  };

  return (
    <div>
       <Navigate />
    <div className="ADD_form-container">
     
      <h1 className="ADD_h1">Add User New</h1>
      <h2 className="ADD_h2">User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="ADD_label">Name:</label><br />
        <input type="text" id="name" name="name" onChange={handleChange} value={inputs.name} className="ADD_input" required /><br /><br />

        <label htmlFor="gmail" className="ADD_label">Gmail:</label><br />
        <input type="email" id="gmail" name="gmail" onChange={handleChange} value={inputs.gmail} className="ADD_input" required /><br /><br />

        <label htmlFor="age" className="ADD_label">Age:</label><br />
        <input type="number" id="age" name="age" onChange={handleChange} value={inputs.age} className="ADD_input" required /><br /><br />

        <label htmlFor="address" className="ADD_label">Address:</label><br />
        <input type="text" id="address" name="address" onChange={handleChange} value={inputs.address} className="ADD_input" required /><br /><br />

        <button type="submit" className="ADD_button">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Addusernew;


