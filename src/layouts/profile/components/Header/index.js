
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
import { Add } from "@mui/icons-material";
function Header() {
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
   const handleToggleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile);
  };
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const renderMenu = (
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
    <MenuItem onClick={closeMenu}>
      <ListItemIcon>
        <Delete fontSize="small" />
      </ListItemIcon>
      Delete
    </MenuItem>
    <MenuItem onClick={closeMenu}>
      <ListItemIcon>
        <Add fontSize="small" />
      </ListItemIcon>
      Add Consultation
    </MenuItem>
  </Menu>
);
    // Sample data for the table
    const rowsP = [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Smith', age: 30 },
      // Add more rows as needed
    ];
  
    const columnsP = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', width: 180 },
      { field: 'age', headerName: 'Age', width: 120 },
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
            {renderMenu}
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
  /*const handleProfileEdit = () => {
    // Add your logic to handle the profile edit action
    console.log("Profile edit action");
  };*/

  const handleClickProfileImage = () => {
    fileInputRef.current.click();
  };
  const handleDelete = (userId) => {
    axios.delete(`https://localhost:7213/api/Account/users/${userId}`)
    .then(response => {
      // Handle the success response
      
    alert('User deleted successfully');
    })
    .catch(error => {
      // Handle the error
      console.error(error);
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
})
.catch(error => {
  // Handle the error
  console.error(error);
  
  
});}
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
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
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
    <TextField label="Patient Name" variant="outlined" />
    <TextField label="Patient ID" variant="outlined" />
    <Button variant="contained" color="primary"style={{color:"white"}}>
      Add
    </Button>
  </Box>
</div>
           
            )}
 </div>
</div>
</div>





  
:null}

    </div>
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
