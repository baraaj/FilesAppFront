import React, { useEffect, useState } from 'react';
import axios from "axios";
// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
 
import bgImage from "assets/images/login2.png";
function Code() {
    const navigate = useNavigate();
 const [inputCode,setInputCode]=useState("");
 const [userData, setUserData] = useState([]);
 const[verificationCode,setVerif]=useState("");
 const handlelogin = (e) => {
    e.preventDefault();
    if (inputCode === verificationCode) {
      // Code verification is successful, proceed with login logic
     alert("Login successful");
     navigate("/dashboard");
    } else {
      // Code verification failed
    alert("Invalid verification code");
       
    }
  };
  
 useEffect(() => {
    const username = localStorage.userName;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7213/api/Account/users/${username}`);
        setUserData(response.data);
        setVerif(response.data.verificationCode);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
     
    <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "100px",
    }}
  >
    <Card style={{width:"400px",marginRight:"100px"}}>
    <MDBox mb={2}>
              <h3 style={{marginTop:"50px",justifySelf:"center",marginLeft:"90px"}}> Welcome back!</h3>
               
            </MDBox>
            <MDBox mb={2} >
             
              <h4 style={{alignItems:"center",margin:"40px"}}> We just sent a confirmation code over to {userData.email}</h4>
            </MDBox>
            
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Enter Code" fullWidth onChange={(e) => setInputCode(e.target.value)}/>
            </MDBox>
            
            <MDBox mt={4} mb={1}>
              <MDButton   variant="gradient" color="info" fullWidth onClick={e=>handlelogin(e)}>
               Login
              </MDButton>
              
            </MDBox>
    
            
          </MDBox>
        </MDBox>
      </Card>
      
      <img src={bgImage} alt="Logo" style={{ width: "600px", height: "auto" }} />
          </div>
         
  );
}

export default Code;
