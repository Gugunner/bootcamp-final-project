import React, {useContext, useEffect} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import BootcampFinalProjectMLTable from "./ml-table";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";
import Iframe from "./iframe";
const BootcampFinalProjectMLTableContainer = () => {
    const { getLastYears, predictNewYear, mlData,  } = useContext(BootcampAppContext);
    useEffect(() => {
        console.log("Hello!");
        getLastYears();
    },[]);
    const handlePredictNewYear = (data) => {
        console.log("Data", data);
        predictNewYear(data);
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} style={{padding: "16px"}}>
                <Iframe source={"https://technological-progress-project.herokuapp.com/"} />
            </Grid>
            <Grid item xs={12} style={{padding: "16px 10%"}}>
                <div style={{display: "flex", alignItems: "center", marginBottom: "16px"}}>
                    <Typography variant="h5" style={{color: "white", fontFamily: "Open Sand", textAlign: "left", flexGrow: "1"}}>Microprocessors Clock Speed ML</Typography>
                    {
                        Object.keys(mlData["microprocessor"]).length > 0 ? (
                            <Button style={{fontFamily: "Open Sans", marginLeft: "16px", backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}} variant="contained" onClick={() => handlePredictNewYear(mlData["microprocessor"][mlData["microprocessor"].length -1])}>Predict {mlData["microprocessor"][mlData["microprocessor"].length -1].year}</Button>
                        ) : ""
                    }
                </div>
                <BootcampFinalProjectMLTable mlData={mlData["microprocessor"]}/>
            </Grid>
            <Grid item xs={12} style={{padding: "16px 10%"}}>
                <div style={{display: "flex", alignItems: "center", marginBottom: "16px"}}>
                    <Typography variant="h5" style={{color: "white", fontFamily: "Open Sand", textAlign: "left", flexGrow: "1"}}>Flip Flops ML</Typography>
                    {
                        Object.keys(mlData["flip-flops"]).length > 0 ? (
                            <Button style={{fontFamily: "Open Sans", marginLeft: "16px", backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}} variant="contained" onClick={() => handlePredictNewYear(mlData["flip-flops"][mlData["flip-flops"].length -1])}>Predict {mlData["flip-flops"][mlData["flip-flops"].length -1].year}</Button>
                        ) : ""
                    }
                </div>
                <BootcampFinalProjectMLTable mlData={mlData["flip-flops"]}/>
            </Grid>
            <Grid item xs={12} style={{padding: "16px 10%"}}>
                <div style={{display: "flex", alignItems: "center", marginBottom: "16px"}}>
                    <Typography variant="h5" style={{color: "white", fontFamily: "Open Sand", textAlign: "left", flexGrow: "1"}}>Transistors in microprocessor ML</Typography>
                    {
                        Object.keys(mlData["transistors"]).length > 0 ? (
                            <Button style={{fontFamily: "Open Sans", marginLeft: "16px", backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}} variant="contained" onClick={() => handlePredictNewYear(mlData["transistors"][mlData["transistors"].length -1])}>Predict {mlData["transistors"][mlData["transistors"].length -1].year}</Button>
                        ) : ""
                    }
                </div>
                <BootcampFinalProjectMLTable mlData={mlData["transistors"]}/>
            </Grid>
        </Grid>
    )
};

export default BootcampFinalProjectMLTableContainer;