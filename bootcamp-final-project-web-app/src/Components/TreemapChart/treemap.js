import React, {useContext, useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";
import {getAllVcsByCountry} from "./treemap-utils";

const BootCampFinalProjectStartupTreemapChart = () => {
    const { startupDir } = useContext(BootcampAppContext);
    const [data, setData] = useState(() => []);
    const [isMounted, setIsMounted] = useState(() => false);
    const treemapChart = useRef();
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
        if(d3.select("#svgCanvas")) {
            d3.select("#svgCanvas").remove();
        }
        if(isMounted && Object.keys(data).length > 0) {
            // console.log("Data",data);
            const svgHeight = treemapChart.current.clientHeight*1.2;
            const svgWidth = treemapChart.current.clientWidth;
            const margin = {
                top: 10,
                bottom: 10,
                left: 20,
                right: 20
            };
            const svg = d3
                .select(treemapChart.current)
                .append("svg")
                .attr("id","svgCanvas")
                .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
            const chartWidth = d3.select("#svgCanvas").node().getBoundingClientRect().width - margin.left - margin.right;
            const chartHeight = svgHeight - margin.top - margin.bottom;
            const chart = svg
                .append("g")
                .attr("id","treemap-chart")
                .attr("transform", `translate(${margin.left},${margin.top})`);



            d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv', function(d) {
                return {
                    name: d.name ? d.name : "",
                    parent: d.parent ? d.parent : "",
                    value: d.value ? d.value : ""
                }
            }).then((dataset) => {
                console.log("Dataset",data);
                const root = d3.stratify()
                    .id((d, idx) => {
                        return d.name
                    })
                    .parentId((d) => d.parent)
                    (data);
                root.sum((d) => +d.value);
                d3.treemap()
                    .size([chartWidth,chartHeight])
                (root);
                console.log(root.leaves());
                chart
                    .selectAll("rect")
                    .data(root.leaves())
                    .enter()
                    .append("rect")
                    .attr("x", (d) => d.x0)
                    .attr("y", (d) => d.y0)
                    .attr("width",(d) => d.x1 - d.x0)
                    .attr("height",(d) => d.y1 - d.y0)
                    .style("stroke","black")
                    .style("fill","rgb(72,137,247)");


                chart
                    .selectAll("text")
                    .data(root.leaves())
                    .enter()
                    .append("text")
                        .attr("x",(d) => d.x0+10)
                        .attr("y",(d) => d.y0+20)
                        .text((d) => d.data.name)
                        .attr("font-size","15px")
                        .attr("fill","white");
            });
        }
    },[data]);
    return <div id="vcs-treemap-chart" style={{position: "relative", height: "100%", backgroundColor: "rgb(36,36,36)"}} ref={treemapChart} />;
};

export default BootCampFinalProjectStartupTreemapChart;
