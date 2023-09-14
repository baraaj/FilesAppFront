import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { isDate } from 'moment';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Add this line

export default function ConsultationList() {
  const navigate = useNavigate();
  const handleEditClick = (id) => {
    // Implement your edit logic here
    console.log(`Edit clicked for ID ${id}`);
    navigate(`/updateconsultation/${id}`);
  };
  const handleReadClick = (id) => {
    // Implement your edit logic here
    console.log(`Edit clicked for ID ${id}`);
    navigate(`/viewconsultation/${id}`);
  };
  const handleDeleteClick = (id) => {
    const apiUrl = `https://localhost:7120/api/ConsultationAPI/${id}`;
  
    axios.delete(apiUrl)
      .then(response => {
        console.log(`Successfully deleted resource with ID ${id}`);
        // You can also perform additional actions or UI updates here if needed.
        alert(`Successfully deleted resource with ID ${id}`);
      })
      .catch(error => {
        console.error(`Error deleting resource with ID ${id}:`, error);
        // Handle the error and possibly show an error message to the user.
        alert(`Error deleting resource with ID ${id}. Please try again later.`);
      });
  };
    const [Consultations,setConsultations]=  useState([]);
    const location = useLocation();
    //const id = new URLSearchParams(location.search).get("id");
    const { id } = useParams();
   // console.log(location.state)
const fetchConsultationsByPatientId = async (id) => {
  try {
    const response = await axios.get(`https://localhost:7120/api/ConsultationAPI/patient/${id}`);
   setConsultations(response.data);

  } catch (error) {
    console.log(error);
    // Handle error
    //throw new Error('Failed to fetch consultations by patient ID');
    setConsultations([]);
  }
};
    useEffect(()=>{
    fetchConsultationsByPatientId(id);
        
    },[id]
    )
    const columns= [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'motif',
          headerName: 'Motif',
          width: 150,
          
         
        },
        {
          field: 'allergies',
          headerName: 'Allergies',
          width: 150,
          
         
        },
        {
          field: 'date',
          headerName: 'Date',
          width: 120,
          
        },
        {
          field: 'frais',
          headerName: 'Fee',
          width: 100,
          
        },
        /*{
            field: 'motif',
            headerName: 'motif',
            width: 150,
            
          },*/
          
          {
            field: 'traitement',
            headerName: 'Traitement',
            width: 150,
            
          },
        {

          field: 'type_consultation',
          headerName: 'type_consultation',
          width: 200,
         
        },
        {field: 'Actions',
        headerName: 'Actions',
        width: 150,
         renderCell:(params)=>{
            return(
              <div>
              {/* Edit Icon */}
              <EditIcon
                onClick={() => handleEditClick(params.id)} // Replace with your edit functionality
                style={{ cursor: 'pointer' }}
              />
      
              {/* Delete Icon */}
              <DeleteIcon
                onClick={() => handleDeleteClick(params.id)} // Replace with your delete functionality
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
               {/* Lire Icon */}
               <VisibilityIcon
        onClick={() => handleReadClick(params.id)} // Replace with your read/view functionality
        style={{ cursor: 'pointer', marginLeft: '10px' }}
      />
            </div>
            )
          }
        },

       ];
       console.log(Consultations)
       const rows =Consultations.map(e => ({
        key:e.id,
        id: e.id,
        motif:e.motif,
        allergies: e.allergies,
        date: e.date,
        frais: e.frais +"$",
        //motif: e.motif,
        traitement: e.traitement,
        type_consultation: e.typeConsultation,

      }));
    /*  const rows = Consultations
      ? Consultations.map((e) => {
          return {
            id: e.id,
            allergies: e.allergies,
            date: e.date,
            frais: e.frais,
            motif: e.motif,
            traitement: e.traitement,
            type_consultation: e.type_consultation
          };
        })
      : [];*/
    
        
       
      
      
  return (
 

    
<div style={{marginLeft:"300px",marginTop:"50px"}}>
<h1 style={{marginLeft:"300px"}}>Patient Consultations</h1>
    
<br></br>
<br></br>
<br></br>
 

    <Box sx={{ height: 400, width: '90%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>

    </div>
  );
}

  