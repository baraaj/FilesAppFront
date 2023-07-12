import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Logout from 'layouts/authentication/logout/Logout';
import { useNavigate } from 'react-router-dom';

// Function to check if the user is signed in
const isUserSignedIn = () => {
  // Your authentication logic here
  // Return true if the user is signed in, false otherwise
  // Example:
  const user = localStorage.getItem("token");
  return !!user; // Returns true if 'user' exists in localStorage
};


export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { direction, layout, openConfigurator, darkMode } = controller;
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const signInRoute = routes.find((route) => route.route === "/authentication/sign-in");
  const signUpRoute = routes.find((route) => route.route === "/authentication/sign-up");
  const dashboardRoute = routes.find((route) => route.route === "/dashboard");
  const handleLogout = () => {
    //localStorage.removeItem('token');
    localStorage.setItem('token', null);
   
    navigate('/authentication/sign-in');
  };

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && isUserSignedIn() && (
          <>
            {pathname !== signInRoute.route && (
              <Sidenav
                color={controller.sidenavColor}
                brand={(controller.transparentSidenav && !darkMode) || controller.whiteSidenav ? brandDark : brandWhite}
                brandName="Corilus"
                routes={routes}
              />
            )}
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          <Route path={signInRoute.route} element={signInRoute.component} />
          {isUserSignedIn() ? (
            <Route path={dashboardRoute.route} element={dashboardRoute.component} />
          ) : (
            <Route path={dashboardRoute.route} element={<Navigate to={signInRoute.route} />} />
          )}
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to={signInRoute.route} />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && isUserSignedIn() && (
        <>
          {pathname !== signInRoute.route && (
            <Sidenav
              color={controller.sidenavColor}
              brand={(controller.transparentSidenav && !darkMode) || controller.whiteSidenav ? brandWhite : brandWhite}
              brandName="Corilus"
              routes={routes}
            />
          )}
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path={signInRoute.route} element={signInRoute.component} />
        {isUserSignedIn() ? (
          <Route path={dashboardRoute.route} element={dashboardRoute.component} />
        ) : (
          <Route path={dashboardRoute.route} element={<Navigate to={signInRoute.route} />} />
        )}
        {getRoutes(routes)}
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to={signInRoute.route} />} />
      </Routes>
    </ThemeProvider>
  );
}
