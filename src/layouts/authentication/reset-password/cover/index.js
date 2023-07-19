// @mui material components
import Card from "@mui/material/Card";
import React, { useState } from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios'; // Import axios

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Cover() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState(''); // Add state for the token

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the API endpoint for resetting the password
      const response = await axios.post('https://localhost:7213/api/Account/reset-password', {
        emailOrUsername: email,
        newPassword: newPassword
      });

      if (response.status === 200) {
        setSuccess(true);
        setError('');
        setToken(response.data.token); // Store the received token in state
      } else {
        setSuccess(false);
        setError('Reset password request failed');
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleConfirmResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7213/api/Account/reset-password/confirm', {
        token: token,
        newPassword: newPassword
      });

      if (response.status === 200) {
        setSuccess(true);
        setError('');
      } else {
        setSuccess(false);
        setError('Reset password confirmation failed');
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setError('An error occurred. Please try again later.');
    }
  };

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
          {token ? (
            <form onSubmit={handleConfirmResetPassword}>
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
          ) : (
            <form onSubmit={handleResetPassword}>
              <MDBox mb={4}>
                <MDInput
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </MDBox>
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
                  Reset
                </MDButton>
              </MDBox>
            </form>
          )}
          {success && <p>Password reset successful.</p>}
          {error && <p>{error}</p>}
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
