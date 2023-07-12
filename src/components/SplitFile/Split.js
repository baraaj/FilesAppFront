import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { v4 as uuidv4 } from 'uuid';
import './split.css';
 
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

export default function Split() {
  const [fields, setFields] = useState([]);
  const [zoneContents, setZoneContents] = useState({});
  const { id } = useParams();
  const [recE, setRecE] = useState('');
  const [zoneE, setZoneE] = useState('');
  const [fileType, setFileType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const fileTypeNumbers = {
    'Fichier de Facturation: Reception': '920000',
    'Refus de Fichier': '920999',
    'Acceptation de fichier': '931000',
    "Refus d'envoi aprés bloquer les erreurs détectés": '920099',
    "Taux d'erreur acceptable: Acceptation message": '920098',
    'Fichier de décompte': '920500',
  };
 let numPrestation=0;
  let numAttestation=0;
  const classes = useStyles();
  /*const filterRecords = () => {
    if (searchTerm === null || searchTerm === '') {
      return zoneContents;
    } else {
      return zoneContents.filter((record) =>
        record.desription?.toLowerCase().includes(searchTerm.toLowerCase())
       // record.zoneContents.some((zoneContent) =>
          //zoneContent.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      
    }
  };*/
 
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

  const getFields = (fieldId) => {
    axios
      .get(`https://localhost:7268/api/FieldsAPI/GetAllFieldsByFileId?fileId=${fieldId}`)
      .then((response) => {
        const fields = response.data;
        setFields(fields);
        setFilteredResults(fields);
        fields.forEach((field) => {
          getZoneContent(field.id);
        });
      })
      .catch((error) => {
        console.error('Error fetching fields:', error);
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

  const getMessageError = (fieldId) => {
    axios
      .get(`https://localhost:7268/api/MessageErrorsAPI/file/${fieldId}`)
      .then((response) => {
        const Msg = response.data.result[0];
        setRecE(Msg.numRec);
        setZoneE(Msg.numzone);
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });
  };

  const getZoneContent = (fieldId) => {
    axios
      .get(`https://localhost:7268/api/ZoneContentAPI/record/${fieldId}`)
      .then((response) => {
        const zoneContent = response.data.result;

        setZoneContents((prevZoneContents) => ({
          ...prevZoneContents,
          [fieldId]: zoneContent,
        }));
      })
      .catch((error) => {
        console.error('Error fetching ZoneContent:', error);
      });
  };

  useEffect(() => {
    getFields(id);
    getFileById(id);
    getMessageError(id);
   
  }, [id]);

  const renderNavbarLinks = () => {
    return Object.entries(fileTypeNumbers).map(([type, number]) => (
      <li className={`nav-item ${type === fileType ? 'navbar-primary' : ''}`} key={number}>
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
    <form
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
          </form>
  </div>
 
</nav>
 


      <div style={{ marginTop: 20 }}>
      {recE!=="" && zoneE!=="" &&<p style={{color:"red"}}>Error dans le record {recE} pour la zone {zoneE}</p>}
       
        {filteredResults.map((e) => {
          const segmentZoneContents = zoneContents[e.id] || [];
          const key = `${e.numRec}-${uuidv4()}`;
          let label = '';
          switch (e.numRec) {
            case "20":
              numAttestation++;
              label = `Attestation ${numAttestation}`;
              break;
            case "50":
              numPrestation++;
              label = `Prestation ${numPrestation}`;
              break;
            case "80":
              // Handle case 80
              numPrestation=0;
              break;
            default:
              // Handle other cases
              break;
          }
          
          return (
            <div key={key} className={classes.tableContainer}>
                  {label && <h2>{label}</h2>}
              <p>Segment {e.numRec}</p>
          
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                    {segmentZoneContents.map((zoneContent, index) => {
                      console.log(zoneContent.zoneNumber)
  const isHighlighted = recE === zoneContent.numRec.toString() && zoneE=== zoneContent.zoneNumber.toString();
  const cellStyle = {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    minWidth: '200px',
    color: isHighlighted ? 'red' : 'inherit',
  };

  return (
    <TableCell
      key={index}
      style={cellStyle}
      align="center"
    >
      {zoneContent && (
        <div>
          <p>{zoneContent.zoneNumber}-{zoneContent.description}</p>
          <p>{zoneContent.content}</p>
          {zoneContent.message !== '' && <p style={{ color: 'red' }}>{zoneContent.message}</p>}
        </div>
      )}
    </TableCell>
  );
})}

 
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
