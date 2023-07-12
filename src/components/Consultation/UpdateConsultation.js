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
      .put(`http://localhost:8089/put/${id}`, {
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

  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "Cancel"
  function handleClickCancel() {
    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = '/listConsultation';
  }

  // Cette fonction est appelée au chargement du composant pour récupérer les informations de la consultation à modifier
  function getById() {
    axios
      .get(`http://localhost:8089/get/${id}`)
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
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center">Modifier la consultation</h3>
          <div className="card-body">
            <form onSubmit={add}>
              <div className="form-group">
                <label htmlFor="allergies">Allergies :</label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  className="form-control"
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
                <label htmlFor="frais">Frais :</label>
                <input
                  type="number"
                  id="frais"
                  name="frais"
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
