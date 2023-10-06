import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { v4 as uuidv4 } from 'uuid';
import './split.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import SplitNoError from './SplitNoError';
import SplitError from './SplitError';
const useStyles = makeStyles({
  tableContainer: {
    overflowX: 'auto',
  },
  cell: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    minWidth: '200px',
  },
  coloredCell: {
    color: 'red',
  },
});

export default function SplitFile() {
  const [fields, setFields] = useState([]);
  const [zoneContents, setZoneContents] = useState({});
  const { id } = useParams();
  const [recE, setRecE] = useState('');
  const [zoneE, setZoneE] = useState('');
  const [filetype, setFileType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const[data,setData]=useState([]);
  const [titleHide, setTitleHide] = useState(false);
  const [titleHide1, setTitleHide1] = useState(false);
  const [titleHide2, setTitleHide2] = useState(false);
  const [attestation,setAttestation] = useState([])
  const [record10,setRecord10] = useState({zones:[],errors:[]});
  const [record90,setRecord90] = useState({zones:[],errors:[]});
  const [record200,setRecord200] = useState({zones:[],errors:[]});
  const [record300,setRecord300] = useState({zones:[],errors:[]});
  const [record95,setRecord95] = useState({zones:[],errors:[]});
  const [record96,setRecord96] = useState({zones:[],errors:[]});
  const [errors,setErrors]=useState({zoneE:"",recE:""});
  const [bla, setBla] = useState(false);
  const fileTypeNumbers = {
    'Fichier de Facturation: Reception': '920000',
    'Refus de Fichier': '920999',
    'Acceptation de fichier': '931000',
    "Refus d'envoi aprés bloquer les erreurs détectés": '920099',
    "Taux d'erreur acceptable: Acceptation message": '920098',
    'Fichier de décompte': '920500',
  };
 
  const classes = useStyles();
   
 
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm === null || searchTerm === '') {
       
      setFilteredResults(fields);
      return  filteredResults;
    } else {
      const filteredResults = fields.filter((record) => {
        const segmentZoneContents = zoneContents[record.id] || [];
        return segmentZoneContents.some((zoneContent) =>
          zoneContent.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredResults(filteredResults);
    }
  };

  const getMessageError = (fieldId) => {
    axios
      .get(`https://localhost:7268/api/MessageErrorsAPI/file/${fieldId}`)
      .then((response) => {
        const Msg = response.data.result;
        console.log(Msg)
        /*const mappedErrors = Msg.map((msg) => ({
          zoneE: msg.numzone,
          recE: msg.numRec,
        }));
        setErrors(mappedErrors);*/
 
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });
  };
  
  const getFileById = (fieldId) => {
    axios
      .get(`https://localhost:7268/api/FileAPI/${fieldId}`)
      .then((response) => {
        const file = response.data.result;
        setFileType(file.description);
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });
  };
   
  useEffect(()=>{
   
    getFileById(id);
 

},[id])

 
  const renderNavbarLinks = () => {
    return Object.entries(fileTypeNumbers).map(([type, number]) => (
      <li className={`nav-item ${type === filetype ? 'navbar-primary' : ''}`} key={number}>
        <a className="nav-link" href="#" >
          {number}
        </a>
      </li>
    ));
  };
  
  return (
    <div style={{ marginTop: 20, marginLeft: '330px', marginRight: '80px', marginBottom: '100px' }}>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div id="navbarTogglerDemo01" style={{ display: 'flex', alignItems: 'center' }}>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={{ display: 'flex', alignItems: 'center' }}>
      {renderNavbarLinks()}
    </ul>
   {/* <form
            className="form-inline my-2 my-lg-0"
            style={{ display: 'flex', alignItems: 'center', marginLeft: '250px' }}
            onSubmit={(e) =>handleSearch(e)} // Prevent form submission
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
  </form>*/}
  </div>
 
</nav>
 
{ (filetype==="Fichier de Facturation: Reception") && <SplitNoError searchTerm={searchTerm}  />    }
{ (filetype==="Refus d'envoi aprés bloquer les erreurs détectés") && <SplitError />   }
</div>
 

    );
}
