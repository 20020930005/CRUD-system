
import './App.css';
import React from "react";
import {Route,Routes} from "react-router";
import Homes from './component/Home/Homes';
import Details from './component/userdetails/Details';
import User from './component/adduser/User';
import Addusernew from './component/Addusernew/Addusernew';
import Updateuser from './component/Updateuser/Updateuser';
import Register from './component/Register/Register';
import Login from './component/Login/login';
import Contactus from './component/contactus/Contactus';
import SendPdfnew from './component/SendPdfnew/SendPdfnew';
import ImageUploader from './component/ImageUploader/ImageUploader';


function App() {



  return (
    <div>
      

      <React.Fragment>
        <Routes>
          <Route path="/" element={<Homes/>}/>
          <Route path="/mainhome" element={<Homes/>}/>
          <Route path="/Adduser" element={<User/>}/>
          <Route path="/Addusernew" element={<Addusernew/>}/>
          <Route path="/Userdetails" element={<Details/>}/>
          <Route path="/SendPdfnew" element={<SendPdfnew/>}/>
          <Route path="/Regi" element={<Register/>}/>
          <Route path="/log" element={<Login/>}/>
          <Route path="/Contact" element={<Contactus/>}/>
          <Route path="/ImageUploader" element={<ImageUploader/>}/>
          <Route path="/Userdetails/:id" element={<Updateuser/>}/>
          
          
          
        </Routes>
      </React.Fragment>
      
    </div>
  );
}

export default App;
