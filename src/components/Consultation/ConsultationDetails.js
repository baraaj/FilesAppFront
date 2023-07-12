import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import './consultation.css';
function ConsultationDetails() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(`http://localhost:8089/get/${id}`);
        setData(result.data);
      };
      fetchData();
    }, [id]);
  
    if (!data) return <div>Loading...</div>;
  
    return (
        
        
      <div>
    <div class="containerc">
        <table class="patient-table">
  <tbody>
    <tr>

      <td class="patient-name">Fiche Consultation</td>
      <td>
        <table class="patient-info-table">
          <tbody>
          <tr>
              <td>Date de naissance:</td>
              <td>{data.nom_patient}</td>
            </tr>
            <tr>
              <td>Date de naissance:</td>
              <td>{data.date}</td>
            </tr>
            <tr>
              <td>Motif :</td>
              <td>{data.motif}</td>
            </tr>
            <tr>
              <td>type_consultation:</td>
              <td>{data.type_consultation}</td>
            </tr>
            <tr>
              <td>Frais:</td>
              <td>{data.frais}</td>
            </tr>
            <tr>
              <td>Traitement:</td>
              <td>{data.traitement}</td>
            </tr>
            <tr>
              <td>Traitement:</td>
              <td>{data.allergies}</td>
            </tr>
            <tr>
            <td>Cachet & signature:</td>
  <td>
    <div class="cachet-input">
      <div class="cachet-input-border"></div>
      <div class="cachet-input-text"></div>
    </div>
  </td>
  </tr>

          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>


     
        
        <div class="consultation-details">
  <h2>Resume Consultation</h2>
  <div class="consultation-data">
   
    <div class="consultation-item">
      <label>Date:</label>
      <label>{data.date}</label>
      <span id="consultation-date"></span>
    </div>
    <div class="consultation-item">
      <label>Motif:</label>
      <label>{data.motif}</label>
      <span id="consultation-motif"></span>
    </div>
    <div class="consultation-item">
      <label>Type Consultation:</label>
      <label>{data.type_consultation}</label>
      <span id="consultation-type"></span>
    </div>
    <div class="consultation-item">
      <label>Frais:</label>
      <label>{data.frais}</label>
      <span id="consultation-frais"></span>
    </div>
    <div class="consultation-item">
      <label>Traitement:</label>
      <label>{data.traitement}</label>
      <span id="consultation-traitement"></span>
    </div>
    <div class="consultation-item">
      <label>Allergies:</label>
      <label>{data.allergies}</label>
      <span id="consultation-allergies"></span>
    </div>
    <div class="consultation-item">
      <label>Nom Patient:</label>
      <label>{data.nom_patient}</label>
      <span id="consultation-nom"></span>
</div>
</div>
 <p>cachet</p>
  <div class="consultation-item">
    <div class="cachet-input">
      <div class="cachet-input-border"></div>
      <div class="cachet-input-text"></div>
    </div>
 </div>
  <div class="button-container">
    <button id="download-button">
    <div>
          <PDFDownloadLink
            document={
              <Document>
                <Page>
                  <Text>ID: {data.id}</Text>
                  <Text>Date: {data.date}</Text>
                  <Text>Motif: {data.motif}</Text>
                  <Text>Type Consultation: {data.type_consultation}</Text>
                  <Text>Frais: {data.frais}</Text>
                  <Text>Traitement: {data.traitement}</Text>
                  <Text>Allergies: {data.allergies}</Text>
                  <Text>Nom Patient: {data.nom_patient}</Text>
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
