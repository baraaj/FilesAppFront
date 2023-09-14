
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import { Avatar } from '@mui/material';
import best from "layouts/dashboard/components/Projects/best";

function Projects() {
 
  //const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [currentMonthFiles, setCurrentMonthFiles] = useState([]);
  const [currentMonthLastFiles, setCurrentMonthLastFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [imgp,setImg]=useState("");
  const[imageUrl,setImageUrl]=useState("");
  //const { columns, rows } = data(currentMonthLastFiles);
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
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );
  /*const rows = currentMonthFiles.map((file) => {
    const user =fetchUser(file.userId);
    console.log(user);
 
    return{
    id:file.id,
    companies: file.name,
   // members: user.id,
    budget: file.budget,
    completion: file.completion,
  }
  });*/
  useEffect(() => {
    const fetchData = async () => {
      const rowsData = await Promise.all(
        currentMonthFiles.map(async (file) => {
          try {
            const user = await fetchUser(file.userId);
          
            return {
              id: file.id,
              companies: file.name,
           members: user.userName,
           
           members: (
      <MDBox display="flex" py={1}>
       
         <Avatar src={user?user.image.split("C:/reactp/proj/CorilusAppManager/public")[1]:null}/>
       <p style={{marginLeft:"20px"}}> {user.userName}</p>
      </MDBox>
    ),
              budget: file.budget,
              completion: file.completion,
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
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Files
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{currentMonthFiles.length} done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
        table={{ columns: data().columns, rows:users}}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
