
import axios from 'axios';
import { useState, useEffect,useRef } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import {TextField } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import {ListItemIcon } from "@mui/material";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/doctor.jpg";
import Overview from 'layouts/profile';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { Add,List } from "@mui/icons-material";
import { Navigate} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from 'layouts/profile/components/Header';
function Patients() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 //console.log(localStorage.userName)
 const name=localStorage.userName;
  const [imgp,setImg]=useState("");
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
 
  const [userInfo,setUserInfo]=useState([]);
  const [Users,setUsers]=useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
   const[imageUrl,setImageUrl]=useState("");
   const [showAddPatient, setShowAddPatient] = useState(false);
   const [editedProfile, setEditedProfile] = useState({ username: name, email: "",password:"" });
   const [isEditingProfile, setIsEditingProfile] = useState(false);
   const [patientName, setPatientName] = useState('');
   const [patientID, setPatientID] = useState('');
    const [dateNaiss, setDateNaiss] = useState('');
   const [patients, setPatients] = useState([]);
  const[idd,setIdd]=useState(null);
   useEffect(() => {  getUserInfo();
   },[]);
   useEffect(() => {
    getPatientsByUserId(userInfo.id);
  }, [userInfo.id]);
   const handleToggleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile);
  };
  
  const [editedPatient, setEditedPatient] = useState({
    id: null,
    patientName: '',
    dateNaiss: '',
    patienID: '',
  });
  const handleMenuItemClick = (e,id) => {
   e.preventDefault();
   navigate(`/consultation/${id}`);
  };
  const handleList = (e,id) => {
    e.preventDefault();
    //navigate(`/consultationList?id=${id}`);
    navigate(`/consultationList/${id}`);
   };
   const updatePatient = async ( updatedData) => {
    try {
      const response = await axios.put(
        `https://localhost:7120/api/PatientAPI/${updatedData.id}`,
        updatedData
      );
  
      // Handle the success response here
      console.log('Patient updated successfully', response.data);
  
      // You can perform any necessary actions after a successful update.
    } catch (error) {
      // Handle errors here
      console.error('Error updating patient', error);
    }
  };
  
  const handleEdit = (patienId) => {
   /* setEditedPatient({
      id: patientId,
      patientName: patient.patientName,
      dateNaiss: patient.dateNaiss,
      patientID: patient.patientID,
    });*/

    setEditedPatient({
      ...editedPatient,
      id: patienId,
    })
    setIsEditDialogOpen(true);
  };

  const handleCancelClick = () => {
     
    // Exit edit mode
    setIsEditDialogOpen(false);
  };
  const handleEditSave = () => {
    // Prepare the updated data with changes made by the user
    const updatedData = {
      id:editedPatient.id,
      patientName: editedPatient.patientName,
      dateNaiss: editedPatient.dateNaiss,
      patienID: editedPatient.patienID,
    };
  console.log(updatedData)
    // Call the updatePatient function with the patient's ID and updated data
    updatePatient(updatedData);
  
    // Close the edit dialog
    setIsEditDialogOpen(false);
  };
  
  /*const handleEditSave = () => {
    // Perform the update of the patient details using the editedPatient state
    // You can make an API request to update the patient data here

    // After successfully updating, close the dialog
    setIsEditDialogOpen(false);
  };*/

 // const openMenu = ({ currentTarget }) => setMenu(currentTarget);
 const openMenu = (id, { currentTarget }) => {
  setMenu({ id, anchorEl: currentTarget });
};
  const closeMenu = () => setMenu(null);
  const renderMenu = (params) => (
    <Menu
    id="simple-menu"
    anchorEl={menu ? menu.anchorEl : null} // Check if menu is null
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    open={Boolean(menu?.anchorEl)} // Check if menu.anchorEl is not null
    onClose={closeMenu}
  >
      <MenuItem onClick={()=>handleEdit(menu.id)}>
        <ListItemIcon>
          <Edit fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={() => handleDeletePatient(menu.id)}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        Delete
      </MenuItem>
      <MenuItem onClick={(e) => handleMenuItemClick(e, menu.id)}>
        <ListItemIcon>
          <Add fontSize="small" />
        </ListItemIcon>
        Add Consultation
      </MenuItem>
      <MenuItem onClick={(e) => handleList(e, menu.id)}>
        <ListItemIcon>
          <List fontSize="small" />
        </ListItemIcon>
        Show Consultations
      </MenuItem>
    </Menu>
  );
  
  
const handleDeletePatient = (patientId) => {
  axios
    .delete(`https://localhost:7120/api/PatientAPI/${patientId}`)
    .then(response => {
      // Handle the success response
     alert('Patient deleted successfully');
      // Refresh the patient list or perform any other necessary action
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
};
const handleAddP = async (e) => {
  e.preventDefault();

  try {
    const patientData = {
      userId: userInfo.id,
      patientName: patientName,
      dateNaiss:dateNaiss,
      patienID: patientID,
    };

    const response = await axios.post('https://localhost:7120/api/PatientAPI', patientData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle the success response
   // console.log(response.data);
    alert('Patient added successfully');
  
  } catch (error) {
    // Handle the error
    //console.error(error);
     alert(error.response.data)
 
  }
  
};

const getPatientsByUserId=(userId)=>{

 // Make the API request to fetch the patient data
 //axios.get('https://localhost:7120/api/PatientAPI')
 axios.get(`https://localhost:7120/api/PatientAPI/byUserId/${userId}`)
 .then(response => {
   // Handle the successful response
   setPatients(response.data);
   console.log(response.data)
 })
 .catch(error => {
   // Handle the error
   console.error(error);
 });
}
    
    const rowsP =patients.map(patient => ({
     
      key:patient.id,
      id: patient.id,
      dateNaiss:patient.dateNaiss.split("T")[0],
      patientName: patient.patientName,
      patientID: patient.patienID,
    }));
     
    const columnsP = [
      { field: 'id', headerName: 'ID', width: 60 },
      { field: 'patientName', headerName: 'Patient Name', width: 180 },
      { field: 'dateNaiss', headerName: 'Birth Date', width: 120 },
      { field: 'patientID', headerName: 'Patient ID', width: 120 },
      { 
        //field: 'actions', 
        //headerName: 'Actions', 
        width: 110,
        renderCell: (params) => (
          <div>
            <MDBox color="text" px={2}>
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small"
                 onClick={(e) => openMenu(params.row.id, e)}
                 >
 
            
                more_vert
              </Icon>
            </MDBox>
            {renderMenu(params)}
          </div>
        )
      },
    ] ;
    
  const handleAddPatient = () => {
    setShowAddPatient(!showAddPatient);
  };
   const handleImageUpload = (event,userId) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
  
    axios.put(`https://localhost:7213/api/Account/users/${userId}/image`, formData)
      .then(response => {
        // Handle the success response
        console.log("Image uploaded successfully");
        // Refresh the user info or perform any other necessary action
        getUserInfo();
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };


  const handleClickProfileImage = () => {
    fileInputRef.current.click();
  };
 
const handleDelete = (userId) => {
  // Delete the user
  axios.delete(`https://localhost:7213/api/Account/users/${userId}`)
    .then(() => {
      // Delete the files associated with the user
      axios.delete(`https://localhost:7268/api/FileAPI/user/files/${userId}`)
        .then(response => {
           console.log(response)
        })
        .catch(error => {
          console.error('Error retrieving user files:', error);
        });
      
      alert('User and associated files deleted successfully');
    })
    .catch(error => {
      // Handle the error
      console.error('Error deleting user:', error);
    });
};

 
 
  const getUsers=()=>{axios.get(`https://localhost:7213/api/Account/users`)
  .then(response => {
    // Handle the successful response
 
   setUsers(response.data);
   setImg(userInfo.image);
   setImageUrl(imgp?imgp.split("C:/reactp/proj/CorilusAppManager/public")[1]:null);
  // s=imageUrl?imageUrl.split("C:/reactp/proj/CorilusAppManager/public")[1]:null;
  })
  .catch(error => {
    // Handle the error
    console.error(error);
    
  });}
const getUserInfo=()=>{axios.get(`https://localhost:7213/api/Account/users/${name}`)
.then(response => {
  // Handle the successful response

 setUserInfo(response.data);
 setIdd(response.data.id);
})
.catch(error => {
  // Handle the error
  console.error(error);
  
  
});}
const handlePatientChange = (field) => (event) => {
  setEditedProfile((prevState) => ({
    ...prevState,
    [field]: event.target.value,
  }));
};
const handleProfileChange = (field) => (event) => {
  setEditedProfile((prevState) => ({
    ...prevState,
    [field]: event.target.value,
  }));
};

const handleProfileEdit = (id) => {
  //const { username, ...profileData } = editedProfile;
  // Send the PUT request to update the profile using the editedProfile state
  axios
    .put(`https://localhost:7213/api/Account/users/${id}`, editedProfile)
    .then((response) => {
      // Handle the success response
      console.log('Profile updated successfully');
      // Perform any necessary actions after updating the profile
    })
    .catch((error) => {
      // Handle the error
      console.error('Error updating profile:', error);
    });
};
useEffect(() => {getUsers();},[Users]);

  useEffect(() => {
   
   
    // A function that sets the orientation state of the tabs.
    
 
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const columns= [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'Username', headerName: 'Username', width: 180 ,  renderCell: (params) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' ,margin:"100px 10px"}}>
          <Avatar style={{height:"34px",width:"34px"}}src={params.row.Image} alt="" />
          <div style={{margin:"20px"}}>
          {params.row.Username}
          </div>
        </div>
      );
    },},
    { field: 'Email', headerName: 'Email', width: 180 },
    {
      field: "Approved",
      headerName: "Aproved",
      width: 180,
      renderCell: (params) => {
        const user = params.row;
  
        const handleApprove = () => {
          // Perform the approval action using the user ID
          const updatedUser = { ...user, isApproved: true };
          axios.put(`https://localhost:7213/api/Account/users/${user.id}/approve`, updatedUser)
            .then(response => {
              // Handle the success response
              alert("User approved successfully");
              // Refresh the user list or perform any other necessary action
              getUsers();
            })
            .catch(error => {
              // Handle the error
              console.error(error);
            });
        };
        
   const buttonColor = user.isApproved ? "greenyellow" : "yellow";

    return (
      <Button
        variant="contained"
        style={{ backgroundColor: buttonColor }}
        onClick={handleApprove}
       // disabled={user.isApproved}
      >
        Approve
      </Button>
        );
      },
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => {
        //console.log('Delete component:', Delete);
        //console.log('Edit component:', Edit);
        
        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Delete
            onClick={() => handleDelete(params.row.id)}
            style={{ marginRight: '0.5rem' }}
          />
          <Edit onClick={() => handleEdit(params.row.id)} />
        </div>
        );
      },
    },
    
  ];
  
  const rows = Users.map(user => ({
    key:user.id,
    id: user.id,
    Username: user.userName,
    Email: user.email,
    isApproved:user.isApproved,
    Image:user.image?user.image.split("C:/reactp/proj/CorilusAppManager/public")[1]:null,
     
  }));

  return (
  
    <div style={{marginBottom:"100px"}}> 
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
        <Grid item>
       
      </Grid>
      <Grid item>
        <input
          accept="image/*"
          id="profile-image-upload"
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(event) => handleImageUpload(event, userInfo.id)}
        />
        <label htmlFor="profile-image-upload" >
         
  <Avatar alt="Profile Image" src={imageUrl} sx={{ width: 100, height: 100 }} /> 
  
      
       
        </label>

       
      </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {userInfo.userName}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
               {userInfo.email}
             
              </MDTypography>
            </MDBox>
            
          </Grid>
          
        </Grid>
        {isEditingProfile && (
  <Box sx={{ display: 'flex',marginTop:"30px" , alignItems: 'center', gap: '1rem', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
    <Typography variant="h6">Edit Profile</Typography>
    <TextField label="Username" variant="outlined" value={editedProfile.username} onChange={handleProfileChange('username')} required />
 
    <TextField label="Nihi" variant="outlined" value={editedProfile.nihi} onChange={handleProfileChange('nihi')} />
    <TextField label="Email" variant="outlined" value={editedProfile.email} onChange={handleProfileChange('email')} />
    <TextField label="Password" variant="outlined" value={editedProfile.password} onChange={handleProfileChange('password')} required />
    <Button variant="contained" color="primary" style={{ color: 'white' }} onClick={() => handleProfileEdit(userInfo.id)}>
      Edit Profile
    </Button>
  </Box>
)}
      </Card>
    </MDBox>
   
    <div>
  
       


  <div style={{ display: "flex" }}>
<div style={{ flex: 1.3}}>
<Box display="flex" alignItems="center">
     
      
        
        <Typography style={{marginLeft:"170px"}}variant="h3">Patients</Typography>
     
      
    </Box>
    <Box mt={3} ml={5} width="80%">
        <DataGrid rows={rowsP} columns={columnsP} />
      </Box>
</div>
<div style={{ flex: 1}}>
<Button variant="contained" color="primary" style={{color:"white",marginLeft:"50px"}}startIcon={<PersonAdd />}onClick={handleAddPatient}>
              {showAddPatient ? 'Cancel' : 'Add Patient'}
            </Button>
         <div>
         {showAddPatient && (
             
<div style={{ flex: 1, marginTop: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
  <h2>Add Patient</h2>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
  <TextField label="PatientName" variant="outlined" value={patientName}  onChange={(event) => setPatientName(event.target.value)}required/>
  <TextField label="PatientID" variant="outlined" value={patientID}  onChange={(event) => setPatientID(event.target.value)} required/>
  <TextField  type="date" variant="outlined" value={dateNaiss}  onChange={(event) => setDateNaiss(event.target.value)} required/>
    <Button variant="contained" color="primary"style={{color:"white"}} onClick={(event) => handleAddP(event)}>
      Add
    </Button>
  </Box>
</div>
           
            )}
 </div>
</div>
</div>





  
 

    </div>
    <Dialog open={isEditDialogOpen} onClose={handleCancelClick}>
  <DialogTitle>Edit Patient</DialogTitle>
  <DialogContent>
    <TextField
      label="PatientID"
      
      fullWidth
      //value={currentPassword}
      //onChange={(e) => setCurrentPassword(e.target.value)}
      value={editedPatient.patientID}
      onChange={(e) =>
        setEditedPatient({
          ...editedPatient,
          patientID: e.target.value,
        })
      }
      margin="normal"
    />
    <TextField
      label="PatientName"
      value={editedPatient.patientName}
      onChange={(e) =>
        setEditedPatient({
          ...editedPatient,
          patientName: e.target.value,
        })
      }
      fullWidth
     // value={newPassword}
      //onChange={(e) => setNewPassword(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Birth Date"
      type="date"
      fullWidth
      value={editedPatient.dateNaiss}
      onChange={(e) =>
        setEditedPatient({
          ...editedPatient,
          dateNaiss: e.target.value,
        })
      }
      //value={confirmNewPassword}
      //onChange={(e) => setConfirmNewPassword(e.target.value)}
      margin="normal"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCancelClick} color="primary">
      Cancel
    </Button>
    <Button onClick={handleEditSave} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>
    </div>
    
  );
}

// Setting default props for the Header
  Header.defaultProps = {
  children: "",
}; 

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};
 

export default Patients;
