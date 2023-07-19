import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { isDate } from 'moment';
import { useParams } from 'react-router-dom';


export default function ConsultationList() {
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
          field: ' allergies',
          headerName: ' allergies',
          width: 150,
          
         
        },
        {
          field: 'date',
          headerName: 'date',
          width: 150,
          
        },
        {
          field: 'frais',
          headerName: 'frais',
          width: 150,
          
        },
        {
            field: 'motif',
            headerName: 'motif',
            width: 150,
            
          },
          
          {
            field: 'traitement',
            headerName: 'traitement',
            width: 150,
            
          },
        {

          field: 'type_consultation',
          headerName: 'type_consultation',
          width: 150,
          renderCell:(params)=>{
            return(
              <div>
          
              </div>
            )
          }
        },

       ];
       console.log(Consultations)
       const rows =Consultations.map(e => ({
        id: e.id,
        allergies: e.allergies,
        date: e.date,
        frais: e.frais,
        motif: e.motif,
        traitement: e.traitement,
        type_consultation: e.type_consultation
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

  