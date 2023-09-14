import React from 'react';
import { Container, Typography,Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import img1 from "../../assets/images/404-removebg-preview.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ErrorPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoToDashboard = () => {
    navigate('/profile'); // Use navigate to go to the dashboard page
  };
return(
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <ErrorOutline color="error" style={{ fontSize: '5rem' }} />
      <Typography variant="h4" color="black">
      Page Not Found
      </Typography>
       
      <img src={img1} alt="404 Not Found" />
      <div>
      <Button variant="contained" style={{ color: "white" }} onClick={handleGoToDashboard}>Go To Home</Button>
      </div>
    </Container>
  );
}
