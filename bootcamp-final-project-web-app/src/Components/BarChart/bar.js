import React, {useContext, useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";
import {BootcampAppContext} from "../../Shared/app-context";
import {getAllVcsByCountry} from "./bar-utils";

const BootCampFinalProjectStartupBarChart = () => {
    const { startupDir } = useContext(BootcampAppContext);
    const [data, setData] = useState(() => []);
    const [isMounted, setIsMounted] = useState(() => false);
    const barRef = useRef();
    useEffect(() => {
        if(!isMounted) {
            setIsMounted(true);
        }
    },[data]);

    useEffect(() => {
        if(startupDir.startups) {
            const { startups } = startupDir;
            const vcsByCountry = getAllVcsByCountry(startups);
            setData(vcsByCountry);
        }
    },[startupDir]);

    useEffect(() => {
        if(isMounted && data.length > 0) {
            console.log("Data",data);

        }
    },[data]);

    return <div id="startup-types-chart" style={{position: "relative", height: "100%", backgroundColor: "rgb(36,36,36)"}} ref={barRef}>VCs by country</div>;
};

export default BootCampFinalProjectStartupBarChart;
