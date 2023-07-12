import React, { useState } from 'react';
import axios from 'axios';


export default function Consultation() {
  const [allergies, setAllergies] = useState('');
  const [date, setDate] = useState('');
  const [frais, setFrais] = useState('');
  const [motif, setMotif] = useState('');
  const [nom_patient, setNom_patient] = useState('');
  const [traitement, setTraitement] = useState('');
  const [type_consultation, setType_consultation] = useState('');

  function add(e) {
    e.preventDefault();
    axios
      .post('http://localhost:8089/add', {
        allergies: allergies,
        date: date,
        frais: frais,
        motif: motif,
        nom_patient: nom_patient,
        traitement: traitement,
        type_consultation: type_consultation,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClickSave() {
    window.location.href = '/listConsultation';
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
                <label>motif:</label>
                <input
                  type='text'
                  placeholder='motif'
                  name='motif'
                  className='form-control'
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>nom_patient:</label>
                <input
                  type='text'
                  placeholder='nom_patient'
                  name='nom_patient'
                  className='form-control'
                  value={nom_patient}
                  onChange={(e) => setNom_patient(e.target.value)}
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
                            <button className='btn btn-success' type="submit" onClick={handleClickSave}>Save</button>
                            <button className='btn btn-danger' style={{marginLeft:"10px"}}>Cancel</button>
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
