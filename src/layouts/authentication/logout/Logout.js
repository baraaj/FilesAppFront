import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Basic from '../sign-in';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any necessary logout logic here
    // For example, you can clear the user token from local storage
    localStorage.setItem('token', null);
    localStorage.setItem('userName', null);

    // Simulate a delay to demonstrate the spinner
    setTimeout(() => {
      // Redirect to the sign-in page
      navigate("/authentication/sign-in");
    }, 2000); // Change the delay as needed
  }, [navigate]);

  return (
    null
  );
}
