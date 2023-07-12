import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import './facture.css';
function FactureDetails() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(`http://localhost:8089/facture/get/${id}`);
        setData(result.data);
      };
      fetchData();
    }, [id]);
  
   
  
    return (
        
       <div>
<p>{data.date_facture}</p>
<p>{data.nom_Cabinet}</p>
<p>{data.nom_patient}</p>
<p>{data.frais_consultation}</p>
<p>{data.frais_supplimentaire}</p>
<p>{data.frais_suivi}</p>
<p>{data.montant_assurance}</p>
<p>{data.montant_total}</p>
<p>{data.montant_mutualite}</p>

<p>{data.mutualite}</p>
<h1>{data.mode_payement}</h1>



       </div>
    );
  }

export default FactureDetails;
