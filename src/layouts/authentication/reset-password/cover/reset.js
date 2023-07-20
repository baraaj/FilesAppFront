// @mui material components
import Card from "@mui/material/Card";
import React, { useEffect, useState } from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios'; // Import axios
import { useParams } from "react-router-dom";
//import bgImage from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/doctor.jpg";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useLocation } from 'react-router-dom';
// Images
//import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useNavigate } from "react-router-dom";
function ResetPasswordForm() {
  const navigate = useNavigate();
   const confirmResetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const response = await axios.post('https://localhost:7213/api/Account/reset-password/confirm', {
      token: token,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    });

    // Handle the response
    console.log(response.data); // Assuming the server returns a success message
    alert("Password reset Successfully");
    navigate('/sign-in');
    // Redirect to a success page or perform any other necessary actions
  } catch (error) {
    // Handle the error
    console.error('Error:', error.response.data);

    // Display an error message to the user or handle the error accordingly
  }
};
const handleResetPassword = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  try {

    await confirmResetPassword(token, Password, confirmPassword);

   
  } catch (error) {
    
    console.error('Error:', error.response.data);

   
  }
};

  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
 const [token, setToken] = useState(''); // Add state for the token

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
   setToken(token);
    // Use the token in your component logic
    console.log('Token:', token);
  }, [location.search]);

   
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
            {token ? 'Confirm Reset Password' : 'Reset Password'}
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {token ? 'Enter your new password' : 'You will receive an e-mail in maximum 60 seconds'}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {token ?(
         <form onSubmit={e=>{handleResetPassword(e)}}>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="ConfirmPassword"
                  variant="standard"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </MDBox>
             
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Reset
                </MDButton>
              </MDBox>
            </form>
          ): (
            <form>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="New Password"
                  variant="standard"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Confirm Reset
                </MDButton>
              </MDBox>
            </form>
          ) }
          {success && alert("Password reset successful")}
          {error && <p>{error}</p>}
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPasswordForm;
