import { useState } from "react";
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
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
//import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import bgImage from "assets/images/login2.png";
function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSignIn = async (e) => {
    e.preventDefault();
console.log(email,password)
try {
  const response = await axios.post("https://localhost:7213/api/Account/authenticate", {
    userName: email,
    password: password,
  });

      const { userName, jwtToken, expiresIn } = response.data;
     
//console.log(response.data)
      //navigate("/dashboard");
    
      // Handle the response as needed
    //  console.log("Logged in as:", userName);
      //console.log("JWT Token:", jwtToken);
      //console.log("Token Expires In:", expiresIn);
       localStorage.setItem("token", jwtToken);
     localStorage.setItem("userName", userName);
      // Store the token in localStorage or a state management solution
      // Redirect the user to the desired page
  navigate("/code");
 
      //console.log(localStorage)

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        alert(error.response.data);
        //navigate("/authentication/sign-up");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
    }
  };

  

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
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Username" fullWidth onChange={handleEmailChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={handlePasswordChange} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={e=>handleSignIn(e)} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
              
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
             >
                  Sign up
                </MDTypography>
              </MDTypography>

            
            </MDBox>
            <MDBox>
            <MDTypography style={{marginLeft:"55px"}}variant="button" color="text">
                Forget Password?{" "}
                <MDTypography
                  component={Link}
                  to="/reset"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
             >
                 Reset Password
                </MDTypography>
              </MDTypography>

            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      
      <img src={bgImage} alt="Logo" style={{ width: "600px", height: "auto" }} />
          </div>
         
  );
}

export default Basic;
