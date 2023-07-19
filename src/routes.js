
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import UploadFile from "components/UploadFile/UploadFile";
import EventIcon from '@mui/icons-material/Event';
// @mui icons
import Icon from "@mui/material/Icon";
import SplitFile from "components/SplitFile/SplitFile";
import Split from "components/SplitFile/Split";
import Logout from "layouts/authentication/logout/Logout";

import Facture from "components/Facture/Facture";
import Calendar from "components/calendar/calendar";
import Consultation from "components/Consultation/Consultation";
import Cover from "layouts/authentication/reset-password/cover";
import ConsultationList from "components/Consultation/ConsultationList";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    
    name: "UploadFile",
    key: "upload",
   
    route: "/upload",
    component: <UploadFile />,
  },
  
  {
  name: "SplitFile",
  key: "split",
  route: "/split/:id",
  component: <SplitFile />,
  },
  {
    name: "Split",
    key: "splitf",
    route: "/splits/:id",
    component: <Split />,
    },
    {
     // type: "collapse",
      name: "reset",
      key: "reset",
      route: "/reset",
      component: <Cover />,
      },
  {
    type: "collapse",
    name: "Files",
    key: "files",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/files",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Patients",
    key: "patient",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/patient",
    component: <Billing />,
  },
  {
   // type: "collapse",
    name: "Consultations",
    key: "Consultations",
    //icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/consultation/:id",
    component: <Consultation />,
  },
  {
    // type: "collapse",
     name: "ConsultationsL",
     key: "ConsultationsL",
     //icon: <Icon fontSize="small">receipt_long</Icon>,
     route: "/consultationList/:id",
     component: <ConsultationList />,
   },
 
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Calendar",
    key: "calendar",
   icon:  <EventIcon fontSize="small" />,
    route: "/consultation",
    component: <Calendar />,
  },
  {
    //type: "collapse",
    //name: "Sign In",
    key: "sign-in",
    //icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },

  {
     type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
  },
  {
    //type: "collapse",
    //name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
