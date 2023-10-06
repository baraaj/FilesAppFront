import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { v4 as uuidv4 } from 'uuid';
import './split.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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

export default function SplitError() {
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
  const [err,setErr]=useState([]);
  const [isCardVisible, setCardVisible] = useState(true);
  const [bla, setBla] = useState(false);
  
 
   
  const t=[null];
  const fileTypeNumbers = {
    'Fichier de Facturation: Reception': '920000',
    'Refus de Fichier': '920999',
    'Acceptation de fichier': '931000',
    "Refus d'envoi aprés bloquer les erreurs détectés": '920099',
    "Taux d'erreur acceptable: Acceptation message": '920098',
    'Fichier de décompte': '920500',
  };
 
  const classes = useStyles();
  const handleClose = () => {
    setCardVisible(false);
  };
 
  /*const handleSearch = (e) => {
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
  };*/
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm === null || searchTerm === '') {
       
       //setFilteredResults(data);
       filteredResults.length=0;
    // setFilteredResults(null);
      return  filteredResults;
    } else {
      const filteredResults = data.filter((record) => {
        getZoneContent(record.id);
        // Ensure that zoneContents for this record is available
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
       setErr(Msg);
        
         const mappedErrors = Msg.map((msg) => ({
          zoneE: msg.numzone,
          recE: msg.numRec,
        }));
        setErrors(mappedErrors);
 
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });
  };
  const getZoneContent = (recordId) => {
    axios
      .get(`https://localhost:7268/api/ZoneContentAPI/record/${recordId}`)
      .then((response) => {
        const zoneContent = response.data.result;
    //setZoneContents(zoneContent);
     setZoneContents((prevZoneContents) => ({
          ...prevZoneContents,
          [recordId]: zoneContent,
        }));
      })
      .catch((error) => {
        console.error('Error fetching ZoneContent:', error);
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
  const getFileContentById=(fieldId)=>{
    axios
    .get(`https://localhost:7268/api/FieldsAPI/GetAllFieldsByFileId?fileId=${fieldId}`)
 
        .then((response) => {
            for(let i=0 ;i<response.data.length;i++) {
              //console.log(response.data);
                response.data[i].hide =false;
            }
            setData(response.data);
           /* data.forEach((field) => {
              getZoneContent(field.id);
            });*/
            let attestation1=[]
            let attestationArray=[];
             attestationArray.hide=false;
            let prestationArray=[];
            prestationArray.hide=false;
            response.data.forEach((record,ind)=>{
              if(record.numRec==="200"){
                setRecord200(record);

            }
                if(record.numRec==="300"){
                    setRecord300(record);

                }if(record.numRec==="10"){
                  setRecord10(record);

              }
                
                if(record.numRec==="20"){
                    attestationArray.push(record);

                }
             if(record.numRec==="50"){

                 prestationArray.push(record);
                 if(response.data[ind+1].numRec!=="51"){
                     attestationArray.push(prestationArray);
                     prestationArray=[]
                 }
                }
             if(record.numRec==="51"){

                 prestationArray.push(record);
                 attestationArray.push(prestationArray);
                 prestationArray=[];
                }
             if(record.numRec==="80"){
                    attestationArray.push(record);
                    attestation1.push(attestationArray)
                 attestationArray=[];
                }
                if(record.numRec==="90"){
                    setRecord90(record);

                }
                
            


            })


            setAttestation(attestation1)

    // console.log(attestation1)
        })
        .catch((e) => {
            console.log(e);

        });

  }
  const handlehide=(k)=>{

    data.map((m)=>{
        if(m.id===k.id){
            m.hide=!m.hide;
            setBla(!bla);
        }
    })
    }
      const handleHideArray=(k)=>{
    
            k.hide=!k.hide;
            setBla(!bla);
    
    }
  useEffect(()=>{
    getFileContentById(id);
     
   
    getMessageError(id);

},[id])


  
  return (

    <div style={{marginTop:"20px"}}>
      <form
            className="form-inline my-2 my-lg-0"
            style={{ display: 'flex', alignItems: 'center',marginLeft: '710px' ,width:"400px"}}
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
       
        {console.log(errors[0])}
      { data.forEach((field) => {
              getZoneContent(field.id);
              
            })}
       {isCardVisible && ( <div className="card border-warning mb-3">
      <button style={{marginRight:"-1050px"}}className="btn btn-link ml-auto" onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
    <div className="card-body">
<h5 className="card-title"style={{color:"red"}}>Errors</h5>
<p className="card-text">This file contains errors.</p>


{Array.isArray(errors) ? (
  errors.map((e, index) => (
    <>
    <p key={index} className="card-text">
      The error is located in record {e.recE} and zone {e.zoneE}
    </p>
    
<h5 style={{color:"green"}}>Error message:</h5> {t}
    </>
  ))
) : (
  <p className="card-text">No errors to display</p>
  
)}


</div>
</div>)}
{filteredResults.length !== 0 ? (
        <div>
          {filteredResults.map((e) => (
            <div key={e.id}>
            
            {getZoneContent(e.id)}
              
             
           <p>Record{e.numRec}</p>
                <TableContainer   key={e.id}style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
                <Table>
                  <TableHead>
                 
                    <TableRow>
                    
                    {zoneContents[e.id].map((item, index) => {
          
          //const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
          const cellStyle = {
            textAlign: 'center',
            whiteSpace: 'nowrap',
            minWidth: '200px',
            color:  'inherit',
          };

          return (
            <TableCell key={index} style={cellStyle} align="center">
              <div>
                <p>
                  {item.zoneNumber}-{item.description}
                </p>
                <p>{item.content}</p>
               
              </div>
            </TableCell>
          );
        })}
      
                    </TableRow> 
                  </TableHead>
                </Table>
              </TableContainer>
             
            </div>
          ))}
        </div>
      ) : (<div>
<div style={{ marginLeft: '2%', fontWeight: '600',marginTop:"20px" }}>
  
  <h5 style={{ paddingBottom: '2%' }}>
    {titleHide1 ? (
      <FontAwesomeIcon
        onClick={() => setTitleHide1(!titleHide1)}
        style={{ color: "#289304", marginRight: '1%' }}
        fade
        icon={faChevronRight}
        size={'xs'}
      />
    ) : (
      <FontAwesomeIcon
        onClick={() => setTitleHide1(!titleHide1)}
        style={{ color: "#289304", marginRight: '1%' }}
        icon={faChevronDown}
        size={'xs'}
      />
    )}
    Entete
  </h5>

  <div hidden={titleHide1}>
    <div style={{ marginLeft: '2%' }}>
      <div style={{ marginBottom: '40px' }}>
        <p>
          {record200 ? (
            record200.hide ? (
              <FontAwesomeIcon
                onClick={() => handlehide(record200)}
                style={{ color: "#289304", marginRight: '1%' }}
                fade
                icon={faChevronRight}
                size={'xs'}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => handlehide(record200)}
                style={{ color: "#289304", marginRight: '1%' }}
                icon={faChevronDown}
                size={'xs'}
              />
            )
          ) : null}
          Enregistrement type {record200.numRec}
        </p>

        <TableContainer hidden={record200.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
          <Table>
            <TableHead>
              <TableRow>
               
                {zoneContents[record200.id]?.map((zoneContent, index) => {
          
                   
        const isHighlighted = errors.some(
            error =>
              error.numRec === zoneContent.numRec &&
              error.zoneNumber === zoneContent.zoneNumber
          );
                  const cellStyle = {
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    minWidth: '200px',
                    color: isHighlighted ? 'red' : 'inherit',
                  };

                  return (
                    <TableCell key={index} style={cellStyle} align="center">
 
                      <div>
                        <p>
                          {zoneContent.zoneNumber}-{zoneContent.description}
                        </p>
                        <p>{zoneContent.content}</p>
                        {zoneContent.message !== '' && <p style={{ color: 'red' }}>{zoneContent.message}</p>}
                        <p style={{display:"none"}}> {zoneContent.message !== ''&& zoneContent.content!=="R" && t.push(zoneContent.message)}  </p>
                      </div>
                    
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        
      </div>
    </div>
 
 
    <div style={{ marginLeft: '2%' }}>
      <div style={{ marginBottom: '40px' }}>
        <p>
          {record300 ? (
            record300.hide ? (
              <FontAwesomeIcon
                onClick={() => handlehide(record300)}
                style={{ color: "#289304", marginRight: '1%' }}
                fade
                icon={faChevronRight}
                size={'xs'}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => handlehide(record300)}
                style={{ color: "#289304", marginRight: '1%' }}
                icon={faChevronDown}
                size={'xs'}
              />
            )
          ) : null}
          Enregistrement type {record300.numRec}
        </p>

        <TableContainer hidden={record300.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
          <Table>
            <TableHead>
              <TableRow>
                
                {zoneContents[record300.id]?.map((zoneContent, index) => {
          
                 
        
          const isHighlighted = errors.some(
            error =>
            error.recE === zoneContent.numRec &&
            error.zoneE === zoneContent.zoneNumber
          );
                  const cellStyle = {
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    minWidth: '200px',
                    color: isHighlighted ? 'red' : 'inherit',
                  };

                  return (
                    <TableCell key={index} style={cellStyle} align="center">
 
                      <div>
                        <p>
                          {zoneContent.zoneNumber}-{zoneContent.description}
                        </p>
                        <p>{zoneContent.content}</p>
                        {zoneContent.message !== '' && <p style={{ color: 'red' }}>{zoneContent.message}</p>}
                        <p style={{display:"none"}}> {zoneContent.message !== ''&& zoneContent.content!=="R" && t.push(zoneContent.message)}  </p>
                      </div>
                     
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        
        </div>
      </div>
      </div>
</div>


 
<div style={{marginLeft:'2%',fontWeight:'600'}} >
          <h5 style={{paddingBottom:'2%'}}> {titleHide? <FontAwesomeIcon onClick={()=>setTitleHide(!titleHide)} style={{color: "#289304",marginRight:'1%'}}  fade  icon={faChevronRight} size={'xs'} /> : <FontAwesomeIcon onClick={()=>setTitleHide(!titleHide)} style={{color: "#289304",marginRight:'1%'}} icon={faChevronDown} size={'xs'} />}Détails de facture</h5>

          <div hidden={titleHide}>
          <div style={{marginLeft:'2%'}}>

              <div style={{marginBottom:'40px'}}><p> {record10? record10.hide? <FontAwesomeIcon onClick={()=>handlehide(record10)} style={{color: "#289304",marginRight:'1%'}} fade icon={faChevronRight} size={'xs'} /> : <FontAwesomeIcon onClick={()=>handlehide(record10)} style={{color: "#289304",marginRight:'1%'}} icon={faChevronDown} size={'xs'} />:null}Enregistrement type {record10.numRec} </p>
 
              <TableContainer hidden={record10.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
  <Table>
    <TableHead>
      <TableRow>
       
       
    
        {zoneContents[record10.id]?.map((zoneContent, index) => {
        
        
        const isHighlighted = errors.some(
            error =>
            error.recE === zoneContent.numRec &&
            error.zoneE === zoneContent.zoneNumber
          );
          const cellStyle = {
            textAlign: 'center',
            whiteSpace: 'nowrap',
            minWidth: '200px',
            color: isHighlighted ? 'red' : 'inherit',
          };

          return (
            <TableCell key={index} style={cellStyle} align="center">
             
              <div>
                <p>{zoneContent.zoneNumber}-{zoneContent.description}</p>
                <p>{zoneContent.content}</p>
                {zoneContent.message !== '' && <p style={{ color: 'red' }}>{zoneContent.message}</p>}
               <p style={{display:"none"}}> {zoneContent.message !== ''&& zoneContent.content!=="R" && t.push(zoneContent.message)}  </p>
              </div>
               
            </TableCell>
            
          );
        })}
          
      </TableRow>
    </TableHead>
  </Table>
</TableContainer>
  
{attestation.map((z, indexAttestation)=>(
            <div key={indexAttestation}>
                <div style={{marginLeft: '2%',paddingBottom:'2%'}}> { z.hide? <FontAwesomeIcon onClick={()=>handleHideArray(z)} style={{color: "#289304",marginRight:'1%'}} fade icon={faChevronRight} size={'xs'} /> : <FontAwesomeIcon onClick={()=>handleHideArray(z)} style={{color: "#289304",marginRight:'1%'}} icon={faChevronDown} size={'xs'} />} Attestation {indexAttestation+1}</div>

                <div hidden={z.hide}>
  {z.map((k, attesIndex) => (
    <div key={attesIndex} style={{ marginBottom: '40px' }}>
       {k.numRec ? k.hide ? <div style={{marginLeft: '6%'}}> <div> <FontAwesomeIcon onClick={()=>handlehide(k)} style={{color: "#289304",marginRight:'1%'}} icon={faChevronRight} size={'xs'} />
                                  Enregistrement type {k.numRec} </div></div>

                          : <div style={{marginLeft: '6%'}}> <div> <FontAwesomeIcon onClick={()=>handlehide(k)} style={{color: "#289304",marginRight:'1%'}} icon={faChevronDown} size={'xs'} />
                                  Enregistrement type {k.numRec} </div>
                                   
                                  <TableContainer hidden={k.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
  <Table>
    <TableHead>
      <TableRow>
  
        {zoneContents[k.id]?.map((zoneContent, index) => {
           
             const isHighlighted = errors.some(
                error =>
                  error.recE === zoneContent.numRec &&
                  error.zoneE === zoneContent.zoneNumber
              );
          const cellStyle = {
            textAlign: 'center',
            whiteSpace: 'nowrap',
            minWidth: '200px',
             color: isHighlighted ? 'red' : 'inherit',
          };

          return (
            <TableCell key={index} style={cellStyle} align="center">
      
              <div>
                <p>{zoneContent.zoneNumber}-{zoneContent.description}</p>
                <p>{zoneContent.content}</p>
                {zoneContent.message !== '' && <p style={{ color: 'red' }}>{zoneContent.message}</p>}
                <p style={{display:"none"}}> {zoneContent.message !== ''&& zoneContent.content!=="R" && t.push(zoneContent.message)}  </p>  
              </div>
              
            </TableCell>
          );
        })
        }
         
      </TableRow>
    </TableHead>
  </Table>
 
      </TableContainer>
                 
                                  
                                  </div>
                                  
                                  :<>
                                  <div style={{ marginLeft: '6%', paddingBottom: '2%' }}>
  {k.hide ? (
    <FontAwesomeIcon onClick={() => handleHideArray(k)} style={{ color: '#289304', marginRight: '1%' }} fade icon={faChevronRight} size={'xs'} />
  ) : (
    <FontAwesomeIcon onClick={() => handleHideArray(k)} style={{ color: '#289304', marginRight: '1%' }} icon={faChevronDown} size={'xs'} />
  )}
  Prestation {attesIndex}
</div>
<div hidden={k.hide}>
  {k.map((h, indexPrestation) => (
    <div key={indexPrestation}>
      {h.hide ? (
        <div style={{ marginLeft: '4%' }}>
          <div style={{ marginLeft: '4%' }}>
            <FontAwesomeIcon onClick={() => handlehide(h)} style={{ color: '#289304', marginRight: '1%' }} icon={faChevronRight} size={'xs'} />
            Enregistrement type {h.numRec}
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: '4%' }}>
          <div style={{ marginLeft: '4%' }}>
            <FontAwesomeIcon onClick={() => handlehide(h)} style={{ color: '#289304', marginRight: '1%' }} icon={faChevronDown} size={'xs'} />
            Enregistrement type {h.numRec}
          </div>
     
          <TableContainer hidden={h.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px', marginLeft: '4%' }}>
  <Table>
    <TableHead>
      <TableRow>
       
        {zoneContents[h.id]?.map((zoneContent, index) => {
      
           const isHighlighted = errors.some(
            error =>
         
            error.recE === zoneContent.numRec &&
              error.zoneE === zoneContent.zoneNumber
               
          );
          const cellStyle = {
            textAlign: 'center',
            whiteSpace: 'nowrap',
            minWidth: '200px',
            color: isHighlighted ? 'red' : 'inherit',
          };

          return (
            <TableCell key={index} style={cellStyle} align="center">
 
              <div>
                <p>{zoneContent.zoneNumber}-{zoneContent.description}</p>
                <p>{zoneContent.content}</p>
                {zoneContent.message !== '' && <p style={{ color: 'red' }}>{zoneContent.message}</p>}
                <p style={{display:"none"}}> {zoneContent.message !== ''&& zoneContent.content!=="R" && t.push(zoneContent.message)}  </p>      
              </div>
              
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  </Table>
      </TableContainer>
     
        </div>
      )}
    </div>
  ))}
</div>

                                  </>}
       
                                           
    </div>
  ))}
</div>
 

                                            









</div>))
}



 

</div>
</div>
</div>
 

          <div hidden={titleHide}>
          <div style={{marginLeft:'2%'}}>

              <div style={{marginBottom:'40px'}}><p> {record90? record90.hide? <FontAwesomeIcon onClick={()=>handlehide(record90)} style={{color: "#289304",marginRight:'1%'}} fade icon={faChevronRight} size={'xs'} /> : <FontAwesomeIcon onClick={()=>handlehide(record90)} style={{color: "#289304",marginRight:'1%'}} icon={faChevronDown} size={'xs'} />:null}Enregistrement type {record90.numRec} </p>
 
              <TableContainer hidden={record90.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
  <Table>
    <TableHead>
      <TableRow>
       
         
        {zoneContents[record90.id]?.map((zoneContent, index) => {
        
      
        const isHighlighted = errors.some(
            error =>
              error.numRec === zoneContent.numRec &&
              error.zoneNumber === zoneContent.zoneNumber
          );
          const cellStyle = {
            textAlign: 'center',
            whiteSpace: 'nowrap',
            minWidth: '200px',
            color: isHighlighted ? 'red' : 'inherit',
          };

          return (
            <TableCell key={index} style={cellStyle} align="center">
              <div>
                <p>{zoneContent.zoneNumber}-{zoneContent.description}</p>
                <p>{zoneContent.content}</p>
                {zoneContent.message !== '' && <p style={{ color: 'red' }}>{zoneContent.message}</p>}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  </Table>
</TableContainer>
</div>
</div>
</div>

</div>
  
  </div>)}
 
</div>
  

    );
}
