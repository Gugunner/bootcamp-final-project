import React, {useContext, useEffect, useState} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import './App.css';
import BootcampFinalProjectMenuDrawer from "./Shared/Menu/menu";
import BootcampFinalProjectStartupDashboard from "./Components/StartupDahsboard/startup-dashboard";
import BootcampFinalProjectHome from "./Components/Home/home";
import Grid from "@material-ui/core/Grid";
function App() {
  return (
    <div className="App" style={{backgroundColor: "rgb(36, 36, 36)", height: "100vh"}}>
        <Grid container spacing={0} style={{height: "100%"}}>
            <Grid item xs={12}>
                <BootcampFinalProjectMenuDrawer />
            </Grid>
            <Switch>
                <Redirect exact from="/" to="/home" />
                <Route path="/startup-dashboard" exact>
                    <BootcampFinalProjectStartupDashboard />
                </Route>
                <Route path="/home">
                    <BootcampFinalProjectHome />
                </Route>
            </Switch>
        </Grid>
    </div>
  );
};

export default App;
