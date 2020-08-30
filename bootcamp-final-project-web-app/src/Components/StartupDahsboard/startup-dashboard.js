import React, {useContext, useEffect, useState} from "react";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import BootcampFinalProjectMap from "../Map/map";
import BootcampFinalProjectStartupTypePieChart from "../PieChart/pie";
import BootCampFinalProjectStartupTreemapChart from "../TreemapChart/treemap";

const BootcampFinalProjectStartupDashboard = () => {
    const { getStartupDirs } = useContext(BootcampAppContext);
    const [dataFetched, setDataFetched] = useState(() => false);
    useEffect(() => {
        if(!dataFetched) {
            getStartupDirs();
            setDataFetched(true);
        }
    },[dataFetched, getStartupDirs, setDataFetched])
    return (
        <>
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
        </>
    );
};

export default BootcampFinalProjectStartupDashboard;