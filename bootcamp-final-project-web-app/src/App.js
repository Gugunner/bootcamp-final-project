import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import BootcampFinalProjectMap from "./Components/Map/map";
import BootcampFinalProjectStartupTypePieChart from "./Components/PieChart/pie";
import BootCampFinalProjectStartupTreemapChart from "./Components/TreemapChart/treemap";
import {BootcampAppContext} from "./Shared/app-context";
import Grid from "@material-ui/core/Grid";

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
    <div className="App">
        <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
                <BootcampFinalProjectMap />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item xs={12} style={{height: "48%"}}>
                    <BootcampFinalProjectStartupTypePieChart />
                </Grid>
                <Grid item xs={12} style={{height: "52%"}}>
                    <BootCampFinalProjectStartupTreemapChart />
                </Grid>
            </Grid>
        </Grid>
    </div>
  );
};

export default App;
