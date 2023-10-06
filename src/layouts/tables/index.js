// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import FilesData from "layouts/tables/data/FilesData";
import { Upload } from "@mui/icons-material";
import UploadFile from "components/UploadFile/UploadFile";
//import Upload from "layouts/UploadFile/Upload";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tables() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = list.length;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const username = localStorage.userName;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7213/api/Account/users/${username}`);
        setUserData(response.data);
        
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUserData();
  
  }, []);
  
 
  const handleDelete = (id) => {
    axios.delete(`https://localhost:7268/api/FileAPI/${id}`)
      .then(response => {
        // Refresh the data after successful deletion
        show();
        toast.success("File deleted successfully!");
      })
      .catch(error => {
        toast.error("Failed to delete file!");
      });
  };

  const show = () => {
  
    if(userData.role==="User"){
      axios.get(`https://localhost:7268/api/FileAPI/user/${userData.id}`)
      .then(response => {
        const list = response.data.result;
        setList(list);
      });
     
    }
   else if(userData.role==="Administrator"){ axios.get("https://localhost:7268/api/FileAPI")
      .then(response => {
        const list = response.data.result;
        setList(list);
      });}
  };
  useEffect(() => {
    show();
  }, [userData, currentPage]); // Update the data whenever userData or currentPage changes

const { columns, rows } = FilesData(list, handleDelete, currentPage, itemsPerPage);

const handlePageChange = (page) => {
  setCurrentPage(page);
};
 

  return (
  
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {userData.role==="User" &&  <UploadFile />}
       
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Efact Files
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    list={list}
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={false}
                    noEndBorder
                    currentPage={currentPage}
                    itemsPerPageOptions={[5, 10, 25, 50]} // Optional: Customize the available options for items per page
                    onPageChange={handlePageChange}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Tables;
