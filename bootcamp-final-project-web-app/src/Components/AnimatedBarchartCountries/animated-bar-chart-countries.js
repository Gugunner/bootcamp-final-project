import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import companies from "../../Data/countries_values.csv";

const BootCampFinalProjectAnimatedBarChartCountries = ({play}) => {
    const [data, setData] = useState(() => []);
    const [isMounted, setIsMounted] = useState(() => false);
    const [tickerInterval, setTickerInterval] = useState(() => undefined);
    const animatedChart = useRef();
    const margin = {
        top: 50,
        bottom: 30,
        left: 45,
        right: 80
    };
    useEffect(() => {
        const status = d3.csv(companies).then((dataset) => {
            console.log("Dataset", dataset);
            dataset.forEach(d => {
                d.value = +d.value;
                d.lastValue = +d.lastValue;
                d.value = isNaN(d.value) ? 0 : d.value;
                d.year = +d.year;
                d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75);
            });
            setData(dataset);
            return true;
        }).catch(e => false);
        setIsMounted(status.then(st => st))
    },[]);

    useEffect(() => {
        if(tickerInterval && !play) {
            tickerInterval.stop()
        }
    },[play, tickerInterval]);

    useEffect(() => {
        if(d3.select("#svgCanvas2")) {
            d3.select("#svgCanvas2").remove();
        }
        console.log("Asking render")
        console.log("Is Mounter",isMounted)
        if(isMounted && data.length > 0) {
            console.log("Render chart")
        }
        const svgHeight = animatedChart.current.clientHeight*0.8;
        const svgWidth = animatedChart.current.clientWidth;

        const svg = d3
            .select(animatedChart.current)
            .append("svg")
            .attr("id","svgCanvas2")
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
        const chartWidth = d3
            .select("#svgCanvas2").node().getBoundingClientRect().width - margin.left - margin.right;
        const chartHeight = svgHeight - margin.top - margin.bottom;
        const chart = svg
            .append("g")
            .attr("id", "chart")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    },[data,play]);


      return (
          <div id="animated-bar-chart" style={{position: "relative", height: "50%"}} ref={animatedChart} />
      );
};

export default BootCampFinalProjectAnimatedBarChartCountries;