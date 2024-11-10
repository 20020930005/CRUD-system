import React, { useEffect, useState } from 'react';
import Navigate from '../Navigation/Navigate';
import axios from 'axios';
import PdfComp from './PdfComp';
import { pdfjs } from 'react-pdf';
import './SendPdfnew.css';  // Import the CSS file
import CustomAlert from '../CustomAlert/CustomAlert'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function SendPdfnew() {
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState("");
  const [allpdf, setAllpdf] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    const result = await axios.get("http://localhost:5000/getFile");
    console.log(result.data.data);
    setAllpdf(result.data.data);
  };

  const submitpdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log("Uploading:", title, file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      console.log("Upload Result:", result.data); // Log the result data

      // Check if the response status is "ok" instead of 200
      if (result.data.status === "ok") {
        CustomAlert.success("Successfully uploaded");
        getpdf();
      } else {
        console.error("Error in upload response:", result.data); // Log any error response
        CustomAlert.error("Error in Upload, please try again");
      }
    } catch (error) {
      console.error("Uploading Error: ", error); // Log the error in case of failure
      CustomAlert.info("Uploading Error: " + error.message);
    }
  };

  const showPdf = (pdf) => {
    setPDFFile(`http://localhost:5000/files/${pdf}`);
  };

  return (
    <div>
       <Navigate />
    <div className="SendPdfnew-container">
     
      <h1>Upload Your Pdf</h1>
      <form className="SendPdfnew-form" onSubmit={submitpdf}>
        <label>PDF Title</label>
        <input
          required
          type='text'
          onChange={(e) => setTitle(e.target.value)}
        /><br /><br />

        <label>Select file</label>
        <input
          type='file'
          accept='application/pdf'
          onChange={(e) => saveFile(e.target.files[0])}
          required
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
      <br></br><br></br>

      <div className="SendPdfnew-pdf-details">
        <h2>PDF Details</h2>
        <h3>Please Consider that because of error in dynamically loading the PDF worker from the CDN "show pdf" functionality is <br></br>
        Temporary disabled</h3>
        {allpdf == null ? "" : allpdf.map((data) => (
          <div key={data._id}>
            <h4>Title: {data.title}</h4>
            <button onClick={() => showPdf(data.pdf)}>Show PDF</button>
          </div>
        ))}
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
    </div>
  );
}

export default SendPdfnew;



