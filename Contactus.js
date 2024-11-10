import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Navigate from '../Navigation/Navigate';
import './Contactus.css'; // Make sure to import the CSS file
import CustomAlert from '../CustomAlert/CustomAlert'
function Contactus() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_hz723z8', 'template_uo8vdhj', form.current, {
        publicKey: '0PdJLFZM_m0UZdM6n',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          CustomAlert.success("Success");

          // Reset form fields after successful submission
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          CustomAlert.error("Failed to send");
        }
      );
  };

  return (
    <div>
      <Navigate />
      <div className="Contactus_form-container">
        <h1 className="Contactus_h1">Contact Us Here</h1>
        <h2 className="Contactus_h2">We'd love to hear from you</h2>
        <form ref={form} onSubmit={sendEmail}>
          <label className="Contactus_label">Name</label>
          <input className="Contactus_input" type="text" name="user_name" /><br />
          <label className="Contactus_label">Email</label>
          <input className="Contactus_input" type="email" name="user_email" /><br />
          <label className="Contactus_label">Message</label>
          <textarea className="Contactus_textarea" name="message" /><br />
          <input className="Contactus_button" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default Contactus;

