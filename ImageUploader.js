import React, { useEffect, useState } from 'react';
import Navigate from '../Navigation/Navigate';
import axios from 'axios';
import './ImageUploader.css';  // Import the CSS file
import CustomAlert from '../CustomAlert/CustomAlert'

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  const submitImg = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      const result = await axios.post(
        "http://localhost:5000/UploadImg",
        formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      // Display a success message if the upload was successful
      if (result.data.status === "ok") {
        CustomAlert.success("Image uploaded successfully!");
        
        // Refresh the page to get the updated image list
        window.location.reload();
      } else {
        CustomAlert.error("Failed to upload image.");
      }
      
    } catch (error) {
      console.error("Error uploading image:", error);
      CustomAlert.info("An error occurred while uploading the image.");
    }
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getImage");
      console.log(result.data); // Log the response to check the format

      if (result.data.status === "ok") {
        setAllImage(result.data.data);
      }
    } catch (error) {
      console.error("Error in Getting Image", error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="image-uploader-container">
      <Navigate />
      <h1 className="image-uploader-heading">This is Your Gallery</h1>
      <form className="image-uploader-form" onSubmit={submitImg}>
        <input 
          className="image-upload-input"
          type="file" 
          accept="image/*" 
          onChange={onImageChange} 
        />
        <button className="image-upload-button" type="submit">Upload</button>
      </form>
      {allImage && allImage.length > 0 ? (
        <div className="image-gallery">
          {allImage.map((data) => (
            <img 
              key={data._id}
              className="image-gallery-item"
              src={`http://localhost:5000/files/${data.image}`} 
              height={100} 
              width={100} 
              alt={data.image} 
            />
          ))}
        </div>
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
}

export default ImageUploader;

