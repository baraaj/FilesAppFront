import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';



const EMPLOYEE_API_URL="http://localhost:8089/all";
export default function ConsultationList() {
    const [Employees,setEmployees]=  useState(null);

    const deleteEmployee=async(id)=>{
      try {
        await axios.delete(`http://localhost:8089/delete/${id}`).then(res =>{
          Employees= Employees.filter(item => item.id !==id);
          setEmployees(Employees);
          alert("Employee deleted successfully !");


        })
        
      } catch (error) {
        console.log(error);
        
      }
      Show()
    };
    const Show=()=>{
      axios.get("http://localhost:8080/api/v1/employees").then(response =>{
        const Employees= response.data;
        setEmployees(Employees)
      })
    }
    function EmployeeList(){
        axios.get(EMPLOYEE_API_URL).then(
            response =>{
                const employees= response.data;
                setEmployees(employees);
                
                
            })
    }
    
    function handleClick() {
        window.location.href = '/ADDConsultation';
      }
    
    useEffect(()=>{
        EmployeeList()
        
    },[]
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
            field: 'nom_patient',
            headerName: 'nom_patient',
            width: 150,
            
          },
          {
            field: 'traitement',
            headerName: 'traitement',
            width: 150,
            
          },
        {

          field: 'type_consultation,',
          headerName: 'type_consultation,',
          width: 150,
          renderCell:(params)=>{
            return(
              <div>
           
                <a onClick={(e)=>{deleteEmployee(params.id,e)}}> delete </a>
                <a href={'/updateConsultation/'+`${params.row.id}`} >Edit</a>
                <a href={'/getone/'+`${params.row.id}`} >show</a>
              </div>
            )
          }
        },

       ];
      console.log(Employees);
      
      const rows =Employees ? Employees?.map((e)=>{
        
        return{
     id: e.id,
     allergies: e.allergies,
     date: e.date,
    frais:e.frais, 
    motif:e.motif, 
    nom_patient:e.nom_patient, 
    traitement:e.traitement, 
    type_consultation :e.type_consultation
        }}):[];
       
    
        
       
      
      
  return (
 


<div style={{marginTop:50}}>

<br></br>
<br></br>
<br></br>
    <button onClick={handleClick} class="btn btn-primary mb-2" >Add Consultation</button>

    

    <Box sx={{ height: 400, width: '100%'}}>
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

  