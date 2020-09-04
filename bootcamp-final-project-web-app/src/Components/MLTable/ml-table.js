import React, {useContext, useEffect, useState} from "react";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        backgroundColor: "rgba(72,137,247,0.6)",
        border: "3px solid rgb(72,137,247)"
    },
    bodyHeader: {
        color: "white",
        fontSize: "16px",
        fontFamily: "Open Sans",
        fontWeight: 700
    },
    bodyCell: {
        color: "white",
        fontSize: "14px",
        fontFamily: "Open Sans",
        fontWeight: 400
    }
});

const createData = (mlData) => ({
    "year": mlData["year"],
    "value": mlData["value"],
    "t-1": mlData["t-1"],
    "t-1_Diff": mlData["t-1_Diff"],
    "t-2": mlData["t-2"],
    "t-2_Diff": mlData["t-2_Diff"]
});

const BootcampFinalProjectMLTable = ({mlData}) => {

    const [rows, setRows] = useState(() => []);
    const classes = useStyles();
    useEffect(() => {
        if(mlData.length > 0) {
            setRows(() => mlData.map(mlD => createData(mlD)));
        }
    },[mlData]);
    return (
        <div style={{width: "100%", height: "auto", margin: "0 auto"}}>
        <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" className={classes.bodyHeader}>Year</TableCell>
                        <TableCell align="left" className={classes.bodyHeader}>Value</TableCell>
                        <TableCell align="left" className={classes.bodyHeader}>T-1</TableCell>
                        <TableCell align="left" className={classes.bodyHeader}>T-1 Diff</TableCell>
                        <TableCell align="left" className={classes.bodyHeader}>T-2</TableCell>
                        <TableCell align="left" className={classes.bodyHeader}>T-2 Diff</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.year}>
                            <TableCell component="th" scope="row" className={classes.bodyHeader}>
                                {row["year"]}
                            </TableCell>
                            <TableCell align="left" className={classes.bodyCell}>{row["value"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                            <TableCell align="left" className={classes.bodyCell}>{row["t-1"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                            <TableCell align="left" className={classes.bodyCell}>{row["t-1_Diff"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                            <TableCell align="left" className={classes.bodyCell}>{row["t-2"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                            <TableCell align="left" className={classes.bodyCell}>{row["t-2_Diff"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default BootcampFinalProjectMLTable;