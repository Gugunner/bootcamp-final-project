import React, {useContext, useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";
import {getAllVcsByCountry} from "./treemap-utils";
import Grid from "@material-ui/core/Grid";

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
        if(d3.select("#svgCanvas2")) {
            d3.select("#svgCanvas2").remove();
        }
        if(isMounted && Object.keys(data).length > 0) {
            // console.log("Data",data);
            const svgHeight = treemapChart.current.clientHeight;
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
                .attr("id","svgCanvas2")
                .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
            const chartWidth = d3.select("#svgCanvas2").node().getBoundingClientRect().width - margin.left - margin.right;
            const chartHeight = svgHeight - margin.top - margin.bottom;
            const chart = svg
                .append("g")
                .attr("id","treemap-chart")
                .attr("transform", `translate(${margin.left},${margin.top})`);
                console.log("Dataset",data);
                const root = d3.stratify()
                    .id((d, idx) => {
                        return d.name
                    })
                    .parentId((d) => d.parent)
                    (data);
                root.sum((d) => d.value < 10 ? +d.value*3 : +d.value);
                d3.treemap()
                    .size([chartWidth,chartHeight])
                (root);

            const tooltip = d3Tip()
                .attr("class","tooltip")
                .style("background-color","rgb(36,36,36)")
                .style("font-size","12px")
                .style("font-family","Open Sans")
                .style("padding","8px")
                .style("color","white")
                .style("max-width","400px")
                .style("min-width","100px")
                .style("height","auto")
                .style("text-align","center")
                .style("border","1px solid rgba(72,137,247,0.6)")
                .offset([0,0])
                .html(d => {
                    console.log("D",d)
                    return `<div>
                        <h3>${d.data.name}</h3>
                        <h4>Venture Capitals</h4>
                        <p>${d.data.vcs.join(", ")}</p>
                    </div>`
                });

                chart
                    .selectAll("rect")
                    .data(root.leaves())
                    .enter()
                    .append("rect")
                    .classed("startup-rect",true)
                    .attr("x", (d) => d.x0)
                    .attr("y", (d) => d.y0)
                    .attr("width",(d) => d.x1 - d.x0)
                    .attr("height",(d) => d.y1 - d.y0)
                    .attr("fill","rgba(72,137,247,0.6)")
                    .attr("stroke","rgb(72,137,247)")
                    .attr("stroke-width","3")
                    .style("cursor","pointer")
                    .on("mouseover",tooltip.show)
                    .on("mouseout",tooltip.hide);
                chart
                    .selectAll("text")
                    .data(root.leaves())
                    .enter()
                    .append("text")
                        .attr("x",(d) => d.x0+10)
                        .attr("y",(d) => d.y0+20)
                        .text((d) => d.data.value > 10 ? d.data.name : "")
                        .attr("font-size","15px")
                        .attr("fill","white");
                chart.call(tooltip);
        }
    },[data]);
    return <div id="vcs-treemap-chart" style={{position: "relative", height: "100%", backgroundColor: "rgb(36,36,36)"}} ref={treemapChart} />;
};

export default BootCampFinalProjectStartupTreemapChart;
