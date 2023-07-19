import React, { useState } from 'react';
import axios from 'axios';

import { Navigate} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Consultation() {
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState('');
  const [date, setDate] = useState('');
  const [frais, setFrais] = useState('');
  const [motif, setMotif] = useState('');
  const [traitement, setTraitement] = useState('');
  const [type_consultation, setType_consultation] = useState('');
  const { id } = useParams();
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = '/profile';
  };

  const add = (e) => {
    e.preventDefault();
    const requestData = {
      patientId: id,
      allergies,
      date,
      frais,
      motif,
      traitement,
      typeConsultation: type_consultation,
    };
  
    axios
      .post('https://localhost:7120/api/ConsultationAPI', requestData)
      .then((response) => {
        console.log(response);
        alert("Consultation added successfully!")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function handleClickSave() {
    //add(e);
    //window.location.href = '/listConsultation';
  }

  return (
    <div className='container'>
      
        <br></br>
        <br></br>
        <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h3 className='text-center'>Add</h3>
          <div className='card-body'>
            <form onSubmit={add}>
              <div className='form-group'>
                <label>allergies:</label>
                <input
                  type='text'
                  placeholder='allergies'
                  name='allergies'
                  className='form-control'
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>date:</label>
                <input
                  type='date'
                  placeholder='date'
                  name='date'
                  className='form-control'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>frais:</label>
                <input
                  type='number'
                  placeholder='frais'
                  name='frais'
                  className='form-control'
                  value={frais}
                  onChange={(e) => setFrais(e.target.value)}
                />
              </div>
        
               
              <div className='form-group'>
                <label>traitement:</label>
                <input
                  type='text'
                  placeholder='traitement'
                  name='traitement'
                  className='form-control'
                  value={traitement}
                  onChange={(e) => setTraitement(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>type_consultation:</label>
               
                            <input placeholder='type_consultation ' name='type_consultation' className='form-control'
                             onChange={(e)=>setType_consultation(e.target.value)} />
                        </div>
                        <div>
                            <button className='btn btn-success' type="submit" onClick={(e) => {add(e)}}>Save</button>
                            <a href="/profile">
      <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={handleClick}>
        Cancel
      </button>
    </a>
                        </div>
                    </form>
                </div>

            </div>

        </div>
        <br></br>
        <br></br>
        <br></br>
        
    </div>
    

  )
  }
