import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateConsultation() {
  // Les hooks useState permettent de gérer l'état du composant
  const [allergies, setAllergies] = useState('');
  const [date, setDate] = useState('');
  const [frais, setFrais] = useState('');
  const [motif, setMotif] = useState('');
  const [nom_patient, setNom_patient] = useState('');
  const [traitement, setTraitement] = useState('');
  const [type_consultation, setType_consultation] = useState('');
  const [employee, setEmployee] = useState({ id: 0 });

  // Le hook useParams permet de récupérer les paramètres de l'URL
  const { id } = useParams();

  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "Save"
  function add(e) {
    e.preventDefault();
    axios
      .put(`https://localhost:7120/api/ConsultationAPI/${id}`, {
        id:employee.id,
        allergies: allergies,
        date: date,
        frais: frais,
        //motif: motif,
        //nom_patient: nom_patient,
        traitement: traitement,
        typeConsultation: type_consultation,
      })
      .then((response) => {
        console.log(response);
        alert('Successfully updated')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "Cancel"
  function handleClickCancel() {
    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = '/patients';
  }

  // Cette fonction est appelée au chargement du composant pour récupérer les informations de la consultation à modifier
  function getById() {
    axios
      .get(`https://localhost:7120/api/ConsultationAPI/${id}`)
      .then(function (response) {
        setEmployee(response.data);
         
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Cette fonction est appelée au chargement du composant pour récupérer les informations de la consultation à modifier
  useEffect(() => {
    getById();
  }, []);

  // Afficher le formulaire pour modifier la consultation
  return (
    <div style={{marginTop:"80px"}}className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center">Update consultation</h3>
          <div className="card-body">
            <form onSubmit={add}>
              <div className="form-group">
                <label htmlFor="allergies">Allergies :</label>
                <input
                  type="text"
                  id="allergies"
                  name="Allergies"
                  className="form-control"
                  placeholder={employee.allergies}
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date :</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="frais">Fee :</label>
                <input
                  type="number"
                  id="frais"
                  name="Fee"
                  className='form-control'
                  value={frais}
                  placeholder={employee.frais}
                  onChange={(e) => setFrais(e.target.value)}
                />
              </div>
               
             
              <div className='form-group'>
                <label>Traitement:</label>
                <input
                  type='text'
                  
                  name='traitement'
                  className='form-control'
                 placeholder={employee.traitement}
                 value={traitement}
                  onChange={(e) => setTraitement(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label> Consultation Type:</label>
               
                            <input placeholder={employee.typeConsultation} name='type_consultation' className='form-control' value={type_consultation}
                             onChange={(e)=>setType_consultation(e.target.value)} />
                        </div>
                        <div style={{marginTop:"50px"}}>
                            <button className='btn btn-success' type="submit" onClick={add}>Save</button>
                            <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={handleClickCancel}>Cancel</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>

    </div>
    

  )
  }
