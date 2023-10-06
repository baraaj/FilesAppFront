
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import { Avatar } from '@mui/material';
// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import best from "../Projects/best";

function OrdersOverview() {
  const [currentMonthFiles, setCurrentMonthFiles] = useState([]);
  const [currentMonthLastFiles, setCurrentMonthLastFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [imgp,setImg]=useState("");
  const[imageUrl,setImageUrl]=useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7268/api/FileAPI/current-month');
        const data = response.data.result;
        // Process the data as needed
        setCurrentMonthFiles(data);
        const sortedFiles = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

        // Get the last 5 files
        const last5Files = sortedFiles.slice(0, 5);
        setCurrentMonthLastFiles(last5Files);

        //console.log(last5Files);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData();
   
  }, []); 
  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7213/api/Account/user/${userId}`);
      const user = response.data;
      setImg(user?user.image:null);
      //console.log(response.data.result)
      return user;
    } catch (error) {
      console.error('Error:', error);
    }
  };
   
  useEffect(() => {
    const fetchData = async () => {
      const rowsData = await Promise.all(
        currentMonthFiles.map(async (file) => {
          try {
            const user = await fetchUser(file.userId);
          
            return {
             //id: file.id,
             //companies: file.name,
     members: user.userName,
          total:6,
           members: (
      <MDBox display="flex" py={1}>
       
         <Avatar src={user?user.image.split("C:/reactp/proj/CorilusAppManager/public")[1]:null}/>
       <p style={{marginLeft:"20px"}}> {user.userName}</p>
      </MDBox>),
       total: (
        <MDBox display="flex" py={1}>
         
         
         <p style={{marginLeft:"20px"}}> {6}</p>
        </MDBox>
        
    ),
              //budget: file.budget,
             // completion: file.completion,
            };
          } catch (error) {
            console.error('Error:', error);
            return null;
          }
        })
      );
      setUsers(rowsData.filter((row) => row !== null));
    };
    fetchData();
  }, [currentMonthFiles]);
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Best Doctor
        </MDTypography>
       {/* <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="$2400, Design changes"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="New order #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="New card added for order #4395133"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />*/}
         <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
     
      
      </MDBox>
      <MDBox>
        <DataTable
        table={{ columns:best().columns, rows:users}}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  </MDBox>
    </Card>
  );
}

export default OrdersOverview;
