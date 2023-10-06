import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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

export default function SplitNoError() {
  const [fields, setFields] = useState([]);
  const [zoneContents, setZoneContents] = useState({});
  const { id } = useParams();
  const [recE, setRecE] = useState('');
  const [zoneE, setZoneE] = useState('');
  const [filetype, setFileType] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [data, setData] = useState([]);
  const [titleHide, setTitleHide] = useState(false);
  const [titleHide1, setTitleHide1] = useState(false);
  const [titleHide2, setTitleHide2] = useState(false);
  const [attestation, setAttestation] = useState([]);
  const [record10, setRecord10] = useState({ zones: [], errors: [] });
  const [record90, setRecord90] = useState({ zones: [], errors: [] });
  const [record200, setRecord200] = useState({ zones: [], errors: [] });
  const [record300, setRecord300] = useState({ zones: [], errors: [] });
  const [record95, setRecord95] = useState({ zones: [], errors: [] });
  const [record96, setRecord96] = useState({ zones: [], errors: [] });
 const[filteredData,setfd]=useState([]);
  const classes = useStyles();
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
 
   
    
 
  
 
   

  const getZoneContent = (recordId) => {
    axios
      .get(`https://localhost:7268/api/ZoneContentAPI/record/${recordId}`)
      .then((response) => {
        const zoneContent = response.data.result;

        setZoneContents((prevZoneContents) => ({
          ...prevZoneContents,
          [recordId]: zoneContent,
        }));
      })
      .catch((error) => {
        console.error('Error fetching ZoneContent:', error);
      });
  };
    

  const getfilterZoneContent = (recordId) => {
    axios
      .get(`https://localhost:7268/api/ZoneContentAPI/record/${recordId}`)
      .then((response) => {
         
        setfd(response.data.result);
        console.log(response.data.result)
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

  const getFileContentById = (fieldId) => {
    axios
      .get(`https://localhost:7268/api/FieldsAPI/GetAllFieldsByFileId?fileId=${fieldId}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].hide = false;
        }

        const datas = response.data;

        setData(datas);
        
        let attestation1 = [];
        let attestationArray = [];
        attestationArray.hide = false;
        let prestationArray = [];
        prestationArray.hide = false;
        response.data.forEach((record, ind) => {
          if (record.numRec === '200') {
            setRecord200(record);
          }
          if (record.numRec === '300') {
            setRecord300(record);
          }
          if (record.numRec === '10') {
            setRecord10(record);
          }
          if (record.numRec === '20') {
            attestationArray.push(record);
          }
          if (record.numRec === '50') {
            prestationArray.push(record);
            if (response.data[ind + 1].numRec !== '51') {
              attestationArray.push(prestationArray);
              prestationArray = [];
            }
          }
          if (record.numRec === '51') {
            prestationArray.push(record);
            attestationArray.push(prestationArray);
            prestationArray = [];
          }
          if (record.numRec === '80') {
            attestationArray.push(record);
            attestation1.push(attestationArray);
            attestationArray = [];
          }
          if (record.numRec === '90') {
            setRecord90(record);
          }
          if (record.numRec === '95') {
            setRecord95(record);
          }
          if (record.numRec === '96') {
            setRecord96(record);
          }
        });

        setAttestation(attestation1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlehide = (k) => {
    data.map((m) => {
      if (m.id === k.id) {
        m.hide = !m.hide;
      }
    });
    setData([...data]);
  };

  const handleHideArray = (k) => {
    k.hide = !k.hide;
    setData([...data]);
  };

  useEffect(() => {
    getFileById(id);
  }, [id]);

  useEffect(() => {
    getFileContentById(id);
  }, [id]);
 
  
  return (
    <div style={{marginTop:"10px"}}>
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
         
       
 
  {data.forEach((field) => {
              getZoneContent(field.id);
              
            })}
 
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
      ) : 
            <div>
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
                {/*getZoneContent(record200.id)*/}
                {/*console.log(record200?.id)*/}
                {/*console.log(zoneContents[62])*/}
                {zoneContents[record200.id]?.map((zoneContent, index) => {
          
                  const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
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
                {/*getZoneContent(record300.id)*/}
                {zoneContents[record300.id]?.map((zoneContent, index) => {
          
                  const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
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
       
        {/*getZoneContent(record10.id)*/}
    
        {zoneContents[record10.id]?.map((zoneContent, index) => {
        
          const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
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
      {/*getZoneContent(k.id)*/}
        {zoneContents[k.id]?.map((zoneContent, index) => {
          //const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
          const cellStyle = {
            textAlign: 'center',
            whiteSpace: 'nowrap',
            minWidth: '200px',
            //color: isHighlighted ? 'red' : 'inherit',
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
      {/*getZoneContent(h.id)*/}
        {zoneContents[h.id]?.map((zoneContent, index) => {
          const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
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
       
        {/*getZoneContent(record90.id)*/}
  
        {zoneContents[record90.id]?.map((zoneContent, index) => {
        
          const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
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
  
 {filetype!=="Refus d'envoi aprés bloquer les erreurs détectés" && (
  <div style={{ marginLeft: '2%', fontWeight: '600', marginTop: '20px' }}>
    <h5 style={{ paddingBottom: '2%' }}>
      {titleHide2 ? (
        <FontAwesomeIcon
          onClick={() => setTitleHide2(!titleHide2)}
          style={{ color: '#289304', marginRight: '1%' }}
          fade
          icon={faChevronRight}
          size={'xs'}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => setTitleHide2(!titleHide2)}
          style={{ color: '#289304', marginRight: '1%' }}
          icon={faChevronDown}
          size={'xs'}
        />
      )}
      Bas de Facture
    </h5>

    <div hidden={titleHide2}>
      <div style={{ marginLeft: '2%' }}>
        <div style={{ marginBottom: '40px' }}>
          <p>
            {record95.hide ? (
              <FontAwesomeIcon
                onClick={() => handlehide(record95)}
                style={{ color: '#289304', marginRight: '1%' }}
                fade
                icon={faChevronRight}
                size={'xs'}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => handlehide(record95)}
                style={{ color: '#289304', marginRight: '1%' }}
                icon={faChevronDown}
                size={'xs'}
              />
            )}
            Enregistrement type {record95?.numRec}
          </p>

          <TableContainer hidden={record95?.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* getZoneContent(record95.id)*/}
                  {zoneContents[record95.id]?.map((zoneContent, index) => {
                    const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
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
            {record96.hide ? (
              <FontAwesomeIcon
                onClick={() => handlehide(record96)}
                style={{ color: '#289304', marginRight: '1%' }}
                fade
                icon={faChevronRight}
                size={'xs'}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => handlehide(record96)}
                style={{ color: '#289304', marginRight: '1%' }}
                icon={faChevronDown}
                size={'xs'}
              />
            )}
            Enregistrement type {record96?.numRec}
          </p>

          <TableContainer hidden={record96?.hide} style={{ borderCollapse: 'separate', borderSpacing: '0px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/*getZoneContent(record96.id)*/}
                  {zoneContents[record96.id]?.map((zoneContent, index) => {
                    const isHighlighted = recE === zoneContent.numRec.toString() && zoneE === zoneContent.zoneNumber.toString();
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
)}
</div>
}
</div>
 

    );
}
