import React, {useContext, useEffect, useState} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import './App.css';
import BootcampFinalProjectMenuDrawer from "./Shared/Menu/menu";
import BootcampFinalProjectStartupDashboard from "./Components/StartupDahsboard/startup-dashboard";
import BootcampFinalProjectTechHistory from "./Components/TechHistory/tech-history";
import BootcampFinalProjectMLTableContainer from "./Components/MLTable/ml-table-container";
import Grid from "@material-ui/core/Grid";
function App() {
  return (
    <div className="App">
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <BootcampFinalProjectMenuDrawer />
            </Grid>
            <Switch>
                <Redirect exact from="/" to="/ml-table" />
                <Route path="/tech-history" exact>
                    <BootcampFinalProjectTechHistory />
                </Route>
                <Route path="/startup-dashboard" exact>
                    <BootcampFinalProjectStartupDashboard />
                </Route>
                <Route path="/ml-table" exact>
                    <BootcampFinalProjectMLTableContainer />
                </Route>
            </Switch>
        </Grid>
    </div>
  );
};

export default App;
