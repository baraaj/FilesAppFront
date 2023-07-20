import axios from 'axios';
import { connect } from 'react-redux';

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from 'react';
import PieChart from 'examples/Charts/PieChart';
import { blue, green, red } from '@mui/material/colors';
 
function Dashboard() {
  const [chartdata, setChartData] = useState({labels:[],datasets:{label:"",data:[]}});
  const [pieChartData,setPieChartData]=useState({labels:[],datasets:{}});
  const [consData,setDataC]=useState({labels:[],datasets:{}});
  const[files,setFiles]=useState([]);
  const[users,setUsers]=useState([]);
   const[patients,setPatients]=useState([]);
   const[consultations,setConsultations]=useState([]);
  
   const getConsultations=()=>{

    // Make the API request to fetch the patient data
    axios.get(' https://localhost:7120/api/ConsultationAPI')
    .then(response => {
      // Handle the successful response
      setConsultations(response.data);
      const consData=generateChartDataC(response.data);
      setDataC(consData);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
   }
   
   const getPatients=()=>{

    // Make the API request to fetch the patient data
    axios.get('https://localhost:7120/api/PatientAPI')
    .then(response => {
      // Handle the successful response
      setPatients(response.data);
       
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
   }
   const getFiles=()=>{
    
    axios.get('https://localhost:7268/api/FileAPI')
    .then(response => {
      // Handle the successful response here
      
      setFiles(response.data.result);
     
      const chartData = generateChartData(response.data.result);
      const piechartData= pieData(response.data.result);
   
      setChartData(chartData);
      setPieChartData(piechartData);
    })
    .catch(error => {
      // Handle the error here
      console.error(error);
    });
    axios.get('https://localhost:7213/api/Account/users')
    .then(response => {
  setUsers(response.data);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
   }
  useEffect(()=>{
    getFiles();
    getPatients();
    getConsultations();
  },[])
  const generateChartData = (data) => {
    const fileCounts = {};
  
    // Initialize the fileCounts object with default values
    ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].forEach(month => {
      fileCounts[month] = 0;
    });
  
    data.forEach(file => {
      const monthNumber = file.created_date.split('-')[1];
      const dateObj = new Date(`2000-${monthNumber}-01`);
      const monthName = dateObj.toLocaleString('en-US', { month: 'short' });
    
      if (fileCounts[monthName]) {
        fileCounts[monthName] += 1;
      } else {
        fileCounts[monthName] = 1;
      }
    });
    
  
    const labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datasets = 
      {
        label: 'Number of Files',
        data: labels.map(month => fileCounts[month]),
      }
    

    return { labels, datasets };
  };
  //piechart
  const pieData = (data) => {
    const fileCounts = {};
  
  
    data.forEach(file => {
      const description = file.description;
       
    
      if (fileCounts[description]) {
        fileCounts[description] += 1;
      } else {
        fileCounts[description] = 1;
      }
    });
    
  
    const labels = ["Refus d'envoi aprés bloquer les erreurs détectés", 'Fichier de Facturation: Reception'];
    const datasets = 
      {
        label: 'Number of Files',
        data: labels.map(description => fileCounts[description]),
        backgroundColor: ['red', 'blue', 'green'],
      }
    

    return { labels, datasets };
  };
  
 
 

  const generateChartDataC = (data) => {
    const consultationCounts = {};
  
    // Initialize the consultationCounts object with default values
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
    const currentWeekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
    
    let currentDatePointer = new Date(currentWeekStart);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    while (currentDatePointer <= currentWeekEnd) {
      const currentWeekday = weekdays[currentDatePointer.getDay()];
      consultationCounts[currentWeekday] = 0;
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }
  
    data.forEach(consultation => {
      const consultationDate = new Date(consultation.date);
      const consultationWeekday = weekdays[consultationDate.getDay()];
  
      if (consultationCounts[consultationWeekday] !== undefined) {
        consultationCounts[consultationWeekday]++;
      }
    });
  
    const labels = Object.keys(consultationCounts);
    const datasets = {
      label: 'Number of Consultations',
      data: labels.map(weekday => consultationCounts[weekday]),
    };
  
    return { labels, datasets };
  };
  


  return (

    <DashboardLayout>
      <DashboardNavbar />
    
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Facturation"
                count={files.length}
                percentage={{
                  color: "success",
                  //amount: "+55%",
                  //label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Patients"
                count={patients.length}
               /* percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}*/
              />
            </MDBox>
          </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Consultations"
                count={consultations.length}
               /* percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}*/
              />
            </MDBox>
          </Grid>  
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Users"
                count={users.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
              <PieChart
                  title="Files Types"
                  height={247}
                  chart={pieChartData}
                  backgroundColor={'#e3f2fd'}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily Consultations"
               description={
                    <>
                     (<strong>+15%</strong>) increase in today consultations.  
                   
                    </>
                  } 
                  date="updated Today"
                  chart={consData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
              {chartdata && (
  <ReportsLineChart
  color="dark"
  title="completed Files"
  description="Last Campaign Performance"
  date="just updated"
  chart={chartdata}
/>
)}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
     
      <Footer />
    </DashboardLayout>
  );
}
 

export default Dashboard;