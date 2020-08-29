import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import BootcampFinalProjectMap from "./Components/Map/map";
import BootcampFinalProjectStartupTypePieChart from "./Components/PieChart/pie";
import BootCampFinalProjectStartupTreemapChart from "./Components/TreemapChart/treemap";
import BootcampFinalProjectMenuDrawer from "./Shared/Menu/menu";
import {BootcampAppContext} from "./Shared/AppSession/app-context";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

function App() {
    const { getStartupDirs } = useContext(BootcampAppContext);
    const [dataFetched, setDataFetched] = useState(() => false);
    useEffect(() => {
        if(!dataFetched) {
            getStartupDirs();
            setDataFetched(true);
        }
    },[dataFetched, getStartupDirs, setDataFetched])
  return (
    <div className="App" style={{backgroundColor: "rgb(36, 36, 36)", height: "100vh"}}>
        <Grid container spacing={0} style={{height: "100%"}}>
            <Grid item xs={12}>
                <BootcampFinalProjectMenuDrawer />
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{padding: "20px", backgroundColor: "rgb(36, 36, 36)", height: "100%"}}>
                    <Typography variant="h2" style={{fontFamily: "Open Sans", color: "White", padding: "16px"}}>LatAm Startups panorama</Typography>
                <BootcampFinalProjectMap />
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item xs={12} style={{height: "48%"}}>
                    <BootcampFinalProjectStartupTypePieChart />
                </Grid>
                <Grid item xs={12} style={{height: "52%", marginTop: "40px"}}>
                    <BootCampFinalProjectStartupTreemapChart />
                </Grid>
            </Grid>
        </Grid>
    </div>
  );
};

export default App;
