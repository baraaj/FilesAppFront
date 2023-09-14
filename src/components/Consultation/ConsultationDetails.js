import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text ,Image} from '@react-pdf/renderer';
import './consultation.css';
import { Avatar, colors } from '@mui/material';
function ConsultationDetails() {
 
    const [data, setData] = useState(null);
    const [pdata, setPatient] = useState(null);
    const [pId, setPatientId] = useState(null);
    const [stampImage, setStampImage] = useState(null); 
    const { id } = useParams();
    const [uploadedImage, setUploadedImage] = useState(null);
    //const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const[imageUrl,setImageUrl]=useState("");
     
  /*const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      axios
        .post('YOUR_API_ENDPOINT', formData) // Replace with your API endpoint
        .then((response) => {
          // Handle the success response
          console.log('Image uploaded successfully');
          setUploadedImage(URL.createObjectURL(file)); // Display the uploaded image
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }
  };*/

  const handleClickUpload = () => {
    //console.log("Upload Image button clicked");
    fileInputRef.current.click();
  };
   const handleImageUpload = (event,consId) => {
 
    const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
       
      axios.put(`https://localhost:7120/api/ConsultationAPI/consultations/${consId}/image`, formData)
        .then(response => {
           
          console.log("Image uploaded successfully");
       // fetchConsultationData();
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        }); 
    };
    useEffect(() => {
      // Function to fetch patient data by ID
      const fetchPatientById = async (patientId) => {
        try {
          const response = await axios.get(`https://localhost:7120/api/PatientAPI/${patientId}`);
          setPatient(response.data);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      };
  
      // Fetch consultation data
      const fetchConsultationData = async () => {
        try {
          const response = await axios.get(`https://localhost:7120/api/ConsultationAPI/${id}`);
          setData(response.data);
          console.log(response.data)
          // Assuming that the consultation data has a patientId field
          const patientId = response.data.patientId;
         //const  uploadedImage=response.data.stamp?response.data.stamp.split("C:/reactp/proj/CorilusAppManager/public")[1]:null;
         setImageUrl(response.data.stamp);
         setStampImage(imageUrl?imageUrl.split("C:/reactp/proj/CorilusAppManager/public")[1]:null);
         if (patientId) {
            // Fetch patient data based on the patientId
            fetchPatientById(patientId);
          }
        } catch (error) {
          console.error('Error fetching consultation data:', error);
        }
      };
  
      // Call the function to fetch consultation data
      fetchConsultationData();
    }, [id]);
  
    if (!data) return <div>Loading...</div>;
  
    return (
        
        
      <div>
    <div style={{marginLeft:"300px"}}className="containerc">
        <table className="patient-table">
  <tbody>
    <tr>

      <td className="patient-name">Consultation Sheet</td>
      <td>
        <table className="patient-info-table">
          <tbody>
          <tr>
              <td>Patient Name:</td>
              <td>{pdata && pdata.patientName}</td>
          </tr>
            
          <tr>
              <td>Birth Date:</td>
              <td>{pdata && pdata.dateNaiss.split("T")[0]}</td>
            </tr>
            <tr>
              <td>Date :</td>
              <td>{data.date.split("T")[0]}</td>
            </tr>
            <tr>
              <td>Motif :</td>
              <td>{data.motif}</td>
            </tr>
            <tr>
              <td>Consultation Type:</td>
              <td>{data.typeConsultation}</td>
            </tr>
            <tr>
              <td>Fee:</td>
              <td>{data.frais}</td>
            </tr>
            <tr>
              <td>Traitement:</td>
              <td>{data.traitement}</td>
            </tr>
            <tr>
              <td>Allergies:</td>
              <td>{data.allergies}</td>
            </tr>
            <tr>
            <td>Stamp & Signature:</td>
  <td>
    <div className="cachet-input">
      <div className="cachet-input-border">
       
  
      </div>
      <div className="cachet-input-text">
  <input
          accept="image/*"
          id="profile-image-upload"
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
        onChange={(e)=>handleImageUpload(e,data.id)} />
        
      {data.stamp?<img onClick={handleClickUpload} src={data.stamp.split("C:/reactp/proj/CorilusAppManager/public")[1]} alt="Uploaded" width="190" height="90" />:<button onClick={handleClickUpload}>Upload Image</button>}
       
      </div>
    </div>
  </td>
  </tr>

          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>


     
        
        <div className="consultation-details">
  <h2>Resume Consultation</h2>
  <div className="consultation-data">
   
    <div className="consultation-item">
      <label>Date:</label>
      <label>{data.date.split("T")[0]}</label>
      <span id="consultation-date"></span>
    </div>
    <div className="consultation-item">
      <label>Motif:</label>
      <label>{data.motif}</label>
      <span id="consultation-motif"></span>
    </div>
    <div className="consultation-item">
      <label>Consultation Type :</label>
      <label>{data.typeConsultation}</label>
      <span id="consultation-type"></span>
    </div>
    <div className="consultation-item">
      <label>Fee:</label>
      <label>{data.frais}</label>
      <span id="consultation-frais"></span>
    </div>
    <div className="consultation-item">
      <label>Traitement:</label>
      <label>{data.traitement}</label>
      <span id="consultation-traitement"></span>
    </div>
    <div className="consultation-item">
      <label>Allergies:</label>
      <label>{data.allergies}</label>
      <span id="consultation-allergies"></span>
    </div>
    <div className="consultation-item">
      <label>Patient Name:</label>
      <label>{pdata && pdata.patientName}</label>
      <span id="consultation-nom"></span>
</div>
</div>
 {/*
 <div className="consultation-item">
        <label>Stamp & Signature:</label>
        <div class="cachet-input">
        <input
        accept="image/*"
        id="image-upload"
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <button onClick={handleClickUpload}>Upload Image</button>
      {uploadedImage && <img src={uploadedImage} alt="Uploaded" width="300" height="200" />}
       
  
      
 

          </div>
          <div class="cachet-input-text"></div>
    </div> */}
      
  <div className="button-container">
    <button id="download-button">
    <div>
          <PDFDownloadLink
            document={
              <Document>
                <Page>
                  <Text>ID: {data.id}</Text>
                  <Text>Date: {data.date}</Text>
                  <Text>Motif: {data.motif}</Text>
                  <Text>Consultation Type : {data.typeConsultation}</Text>
                  <Text>Fee: {data.frais}</Text>
                  <Text>Traitement: {data.traitement}</Text>
                  <Text>Allergies: {data.allergies}</Text>
                  <Text>Patient Name: {pdata && pdata.patientName}</Text>
                  <Text>Stamp: </Text>
                  {data.stamp && (
          <Image src={data.stamp} alt="Uploaded" width={190} height={90} />
        )}
                </Page>
              </Document>
            }
            fileName="consultation.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </div>
        </button>
  </div>
</div>
        </div>
        </div>
    
    );
  }

export default ConsultationDetails;
