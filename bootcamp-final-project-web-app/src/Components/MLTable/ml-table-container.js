import React, {useContext, useEffect} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import BootcampFinalProjectMLTable from "./ml-table";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";

const BootcampFinalProjectMLTableContainer = () => {
    const { getLastYear, predictNewYear, mlData,  } = useContext(BootcampAppContext);
    useEffect(() => {
        console.log("Hello!");
        getLastYear();
    },[]);
    const handlePredictNewYear = () => {
        predictNewYear(mlData[0]);
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} style={{padding: "10%"}}>
                <div style={{display: "flex", alignItems: "center", marginBottom: "16px"}}>
                    <Typography variant="h5" style={{color: "white", fontFamily: "Open Sand", textAlign: "left", flexGrow: "1"}}>Microprocessors Clock Speed ML</Typography>
                    {
                        mlData.length === 1 ? (
                            <Button style={{fontFamily: "Open Sans", marginLeft: "16px", backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}} variant="contained" onClick={handlePredictNewYear}>Predict 2017</Button>
                        ) : ""
                    }
                </div>

                <BootcampFinalProjectMLTable mlData={mlData}/>
            </Grid>
        </Grid>
    )
};

export default BootcampFinalProjectMLTableContainer;