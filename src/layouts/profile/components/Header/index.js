import {Container, Paper} from '@mui/material';
import {  Cancel, Save } from '@mui/icons-material';
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
import React from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
function Header() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // Define state variable
  const [fullName, setFullName] = useState(''); // State for full name
  const [email, setEmail] = useState(''); // State for email
  const [address, setAddress] = useState(''); // State for address
  const [nihi, setNihi] = useState(''); // State for Nihi
  const [phone, setPhone] = useState(''); // State for phone
  const [speciality, setSpeciality] = useState(''); // State for speciality
  const handleSaveClick = (e,userId) => {
    e.preventDefault();
    const updatedUserData = {
      fullName: fullName,
       email: userInfo.email,
       address:address,
       nihi:nihi,
       phone:phone,
       speciality:speciality,
       userName:userInfo.userName,
       password:userInfo.password,
      // Add other fields you want to update here
    };
   
    // Send the updated user data to the server
    axios.put(`https://localhost:7213/api/Account/users/${userId}`, updatedUserData)
      .then(response => {
        
        console.log('User data updated successfully');
        alert('User data updated successfully');
        setIsEditing(false); // Exit edit mode after successful update
      })
      .catch(error => {
        // Handle the error
        console.error('Error updating user data:', error);
      });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
     
  };
  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handlePasswordChangeCancel = () => {
    setIsChangingPassword(false);
  };

  const handlePasswordChangeSave = () => {
     
  
    axios
      .post('https://localhost:7213/api/Account/change-password', {
        userId:userInfo.id,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword:confirmNewPassword,
      })
      .then((response) => {
        // Password changed successfully
        console.log('Password changed successfully');
        alert('Password changed successfully');
        setIsChangingPassword(false); // Close the password change dialog
      })
      .catch((error) => {
        // Handle the error (e.g., display an error message)
        console.error('Error changing password:', error);
        alert('Error changing password');
      });
  };
  
 
  const handleCancelClick = () => {
     
    // Exit edit mode
    setIsEditing(false);
  };
  useEffect(() => {
     getUserInfo();
  }, []);

 /* const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };*/
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
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
   const [patients, setPatients] = useState([]);
   const handleToggleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile);
  };


  const handleMenuItemClick = (e,id) => {
   e.preventDefault();
   navigate(`/consultation/${id}`);
  };
  const handleList = (e,id) => {
    e.preventDefault();
    //navigate(`/consultationList?id=${id}`);
    navigate(`/consultationList/${id}`);
   };
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const renderMenu = (params) => (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
       <MenuItem onClick={closeMenu}>
      <ListItemIcon>
        <Edit fontSize="small" />
      </ListItemIcon>
      Edit
    </MenuItem>
    <MenuItem onClick={() => handleDeletePatient(params.row.id)}>
      <ListItemIcon>
        <Delete fontSize="small" />
      </ListItemIcon>
      Delete
    </MenuItem>
    <MenuItem onClick={(e)=>handleMenuItemClick(e,params.row.id)}>
      <ListItemIcon>
        <Add fontSize="small" />
      </ListItemIcon>
      Add Consultation
    </MenuItem>
    <MenuItem onClick={(e)=>handleList(e,params.row.id)}>
    <ListItemIcon>
    <List fontSize="small" />
  </ListItemIcon >
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

const getPatients=()=>{

 // Make the API request to fetch the patient data
 axios.get('https://localhost:7120/api/PatientAPI')
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
      id: patient.id,
      patientName: patient.patientName,
      patientID: patient.patienID,
    }));
  
    const columnsP = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'patientName', headerName: 'Patient Name', width: 180 },
      { field: 'patientID', headerName: 'Patient ID', width: 120 },
      { 
        //field: 'actions', 
        //headerName: 'Actions', 
        width: 110,
        renderCell: (params) => (
          <div>
            <MDBox color="text" px={2}>
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
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

  const handleEdit = (userId) => {
    // Perform the edit action using the user ID
    console.log(`Editing user with ID ${userId}`);
    // Add your edit logic here
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
 console.log(response.data)
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
    getPatients();
     getUserInfo();
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
      style={{marginLeft:"100px",marginRight:"100px"}}
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
        {/*  <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab
  label="Edit"
  icon={<EditIcon fontSize="small" />}
  onClick={handleToggleProfileEdit}
/>
                <Tab
                  label="App"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  label="Message"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      email
                    </Icon>
                  }
                />
                
              </Tabs>
            </AppBar>
            

          </Grid>*/}
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
   {/*
    <div>
  
      {userInfo.role==="Administrator"?

      <div>
        <MDBox style={{width:"80%",margin:"0px 100px"}}
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="light"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h4" color="blue"style={{justifyContent: 'center',   alignItems: 'center',margin:"5px 390px"}}>
                  Users List
                  </MDTypography>
                </MDBox>
         
   
      <MDBox pt={3} style={{width:"80%",margin:"0px 100px"}}>
      <DataGrid
       
              rows={rows}
              columns={columns}
              components={{
                Toolbar: GridToolbar,
              }}
              pagination
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              checkboxSelection
              disableSelectionOnClick // Disable row selection when clicking on the row
              disableColumnMenu // Disable the column menu
              disableColumnFilter // Disable column filtering
              disableColumnSelector // Disable column selector
              density="compact" // Use compact density for a more condensed look
              autoHeight // Automatically adjusts the height based on the number of rows
              hideFooterSelectedRowCount // Hide the selected row count in the footer
              loading={!Users.length} // Show a loading indicator when the user list is being fetched
              getRowHeight={() => 60} // Set the desired row height here
            />
                </MDBox>
     </div>
    :null}




{userInfo.role==="User"? <div style={{ display: "flex" }}>
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
    <Button variant="contained" color="primary"style={{color:"white"}} onClick={(event) => handleAddP(event)}>
      Add
    </Button>
  </Box>
</div>
           
            )}
 </div>
</div>
</div>





  
:null}

         </div>*/}
         <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2,marginLeft:"100px",marginRight:"100px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1">Full Name</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body2" color="textSecondary">
              {isEditing ? (
                <input
                type="text"
                  name="fullName"
                  placeholder={userInfo.fullName}
                  value={fullName}
                  onChange={(e) => {e.preventDefault();setFullName(e.target.value);}}
                />
              ) : (
                userInfo.fullName
              )}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1">Email</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body2" color="textSecondary">
              {isEditing ? (
                <input
                type="text"
                  name="email"
                  placeholder={userInfo.email}
                  value={email}
                  onChange={(e) => {e.preventDefault();setEmail(e.target.value);}}
                />
              ) : (
                userInfo.email
              )}
            </Typography>
          </Grid>
          
          
   {userInfo.role==="User" &&  <>
   <Grid item xs={12}>
            <hr />
          </Grid>
   <Grid item xs={12} sm={3}>
            <Typography variant="body1">Nihi</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body2" color="textSecondary">
              {isEditing ? (
                <input
                type="text"
                  name="Nihi"
                  placeholder={userInfo.nihi}
                  value={nihi}
                  onChange={(e) => {e.preventDefault();setNihi(e.target.value);}}
                />
              ) : (
                userInfo.nihi
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1">Speciality</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body2" color="textSecondary">
              {isEditing ? (
                <input
                type="text"
                  name="speciality"
                  value={speciality}
                  placeholder={userInfo.speciality}
                  onChange={(e) => {e.preventDefault();setSpeciality(e.target.value);}}
                />
              ) : (
                userInfo.speciality
              )}
            </Typography>
          </Grid>
         
          </>
          }
         
          
         <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1">Phone</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body2" color="textSecondary">
              {isEditing ? (
                <input
                type="text"
                  name="phone"
                  placeholder={userInfo.phone}
                  value={phone}
                  onChange={(e) => {e.preventDefault();setPhone(e.target.value);}}
                />
              ) : (
                userInfo.phone
              )}
            </Typography>
          </Grid>
        
          <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1">Address</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body2" color="textSecondary">
              {isEditing ? (
                <input
                type="text"
                  name="address"
                  placeholder={userInfo.address}
                  value={address}
                  onChange={(e) => {
                    e.preventDefault();
                    setAddress(e.target.value);
                  }}
                />
              ) : (
                userInfo.address
              )}
            </Typography>
          </Grid>
        </Grid>
        <div className="button-container" style={{textAlign:"right",marginTop:"20px"}}>
  {isEditing ? (
      <div>
    <Button
      variant="contained"
      startIcon={<Save />}
      onClick={e=>handleSaveClick(e,userInfo.id)}
    >
      Save
    </Button>
     <Button
     variant="outlined"
     startIcon={<Cancel />}
     onClick={handleCancelClick}
     style={{
       marginLeft: '10px', // Add some spacing between "Save" and "Cancel"
       color: 'red',       // Text color
       borderColor: 'red', // Border color
       boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' // Box shadow
     }}
   >
     Cancel
   </Button>
   </div>
  ) : (
    <div>
    <Button
  variant="outlined"
  startIcon={<Edit />}
  onClick={(e) => {
    //e.preventDefault();
    handleEditClick(e);
  }}
  style={{
    color: 'green',                 // Text color
    borderColor: 'green',           // Border color
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' // Box shadow
  }}
>
  Edit
</Button>
     <Button
     variant="outlined"
     //startIcon={<Cancel />}
     onClick={handlePasswordChangeClick}
     style={{
       marginLeft: '10px', // Add some spacing between "Save" and "Cancel"
       color: 'red',       // Text color
       borderColor: 'red', // Border color
       boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' // Box shadow
     }}
   >
     Change Password
   </Button>
</div>
  )}
    <Dialog open={isChangingPassword} onClose={handlePasswordChangeCancel}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordChangeCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordChangeSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
</div>

      </Paper>
    </Container>
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
 

export default Header;
