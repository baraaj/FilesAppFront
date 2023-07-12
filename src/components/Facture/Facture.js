import React, { useState } from 'react';
import axios from 'axios';
 

export default function Facture() {
  //const [date_facture, setDate_facture] = useState('');
  const [nom_Cabinet, setNom_Cabinet] = useState('');
  const [nom_patient, setNom_patient] = useState('');
  const [frais_consultation, setFrais_consultation] = useState('');
  const [frais_supplimentaire, setFrais_supplimentaire] = useState('');
  const [frais_suivi, setFrais_suivi] = useState('');
  const [montant_assurance, setMontant_assurance] = useState('');
  const [montant_mutualite, setMontant_mutualite] = useState('');
  const [montant_total, setMontant_total] = useState('');
  const [mode_payement, setMode_payement] = useState('');
  const [mutualite, setMutualite] = useState('');
  

  function add(e) {
    e.preventDefault();
    axios
      .post('http://localhost:8089/facture/add', {
       
        nom_Cabinet: nom_Cabinet,
        //date_facture: date_facture,
        nom_patient: nom_patient,
        frais_consultation:frais_consultation,
        frais_supplimentaire: frais_supplimentaire,
      
        frais_suivi: frais_suivi,
        montant_assurance: montant_assurance,
        montant_mutualite:montant_mutualite,
        montant_total:montant_total,
        mode_payement:mode_payement,
        mutualite:mutualite,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClickSave() {
    window.location.href = '/';
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
                <label>nom_Cabinet:</label>
                <input
                  type='text'
                  placeholder='nom_Cabinet'
                  name='nom_Cabinet'
                  className='form-control'
                 // value={date_facture}
                  onChange={(e) => setNom_Cabinet(e.target.value)}
                />
              </div>
        
              <div className='form-group'>
                <label>frais_consultation:</label>
                <input
                  type='number'
                  placeholder='frais_consultation'
                  name='frais_consultation'
                  className='form-control'
                  value={frais_consultation}
                  onChange={(e) => setFrais_consultation(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>frais_supplimentaire:</label>
                <input
                  type='number'
                  placeholder='frais_supplimentaire'
                  name='frais_supplimentaire'
                  className='form-control'
                  value={frais_supplimentaire}
                  onChange={(e) => setFrais_supplimentaire(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>frais_suivi:</label>
                <input
                  type='number'
                  placeholder='frais_suivi'
                  name='frais_suivi'
                  className='form-control'
                  value={frais_suivi}
                  onChange={(e) => setFrais_suivi(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>mutualite:</label>
                <input
                  type='text'
                  placeholder='mutualite'
                  name='mutualite'
                  className='form-control'
                  value={mutualite}
                  onChange={(e) => setMutualite(e.target.value)}
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
                <label>mode_payement:</label>
                <input
                  type='text'
                  placeholder='mode_payement'
                  name='mode_payement'
                  className='form-control'
                  value={mode_payement}
                  onChange={(e) => setMode_payement(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>montant_assurance:</label>
                <input
                  type='number'
                  placeholder='montant_assurance'
                  name='montant_assurance'
                  className='form-control'
                  value={montant_assurance}
                  onChange={(e) => setMontant_assurance(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>montant_mutualite:</label>
                <input
                  type='number'
                  placeholder='montant_mutualite'
                  name='montant_mutualite'
                  className='form-control'
                  value={montant_mutualite}
                  onChange={(e) => setMontant_mutualite(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>montant_total:</label>
                <input
                  type='number'
                  placeholder='montant_total'
                  name='montant_total'
                  className='form-control'
                  value={montant_total}
                  onChange={(e) => setMontant_total(e.target.value)}
                />
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
