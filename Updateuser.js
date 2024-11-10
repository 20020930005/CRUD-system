import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import Navigate from '../Navigation/Navigate';
import CustomAlert from '../CustomAlert/CustomAlert';

function Updateuser() {
  const [inputs, setInputs] = useState({
    name: '',
    gmail: '',
    age: '',
    address: '',
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        const data = res.data;
        if (data && data.user) {
          setInputs(data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: inputs.name,
        gmail: inputs.gmail,
        age: inputs.age,
        address: inputs.address,
      });
      CustomAlert.success("User information updated successfully!");
    } catch (err) {
      console.error("Error updating user", err);
      CustomAlert.error("Unable to update");
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/Userdetails'));
  };

  return (
    <div style={styles.container}>
      <Navigate />
      <h2 style={styles.heading}>User Information Update Form</h2>
      {inputs && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} value={inputs.name || ''} required style={styles.input} />

          <label htmlFor="gmail" style={styles.label}>Gmail:</label>
          <input type="email" id="gmail" name="gmail" onChange={handleChange} value={inputs.gmail || ''} required style={styles.input} />

          <label htmlFor="age" style={styles.label}>Age:</label>
          <input type="number" id="age" name="age" onChange={handleChange} value={inputs.age || ''} required style={styles.input} />

          <label htmlFor="address" style={styles.label}>Address:</label>
          <input type="text" id="address" name="address" onChange={handleChange} value={inputs.address || ''} required style={styles.input} />

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Updateuser;

