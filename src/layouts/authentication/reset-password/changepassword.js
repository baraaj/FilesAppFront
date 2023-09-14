// @mui material components
import Card from "@mui/material/Card";
import React, { useEffect, useState } from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios'; // Import axios
//import bgImage from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/doctor.jpg";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Images
//import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useNavigate } from "react-router-dom";
function ChangePasswordForm() {
  const navigate = useNavigate();
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
 
  const [newPassword, setNewPassword] = useState('');

  return (
   
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
           
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
           
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
         
         <form >
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  //value={Password}
                 // onChange={(e) => setPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="ConfirmPassword"
                  variant="standard"
                  fullWidth
                  //value={confirmPassword}
                  //onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </MDBox>
             
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Reset
                </MDButton>
              </MDBox>
            </form>
        

       
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ChangePasswordForm;
