import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import companies from "../../Data/companies_marketshare.csv";
import { createTitles, createScales, createAxis, styleAxis, createBars, ticker } from "./animated-bar-chart-companies-utils";
const BootCampFinalProjectAnimatedBarChartCompanies = ({play, currentYear, sliderYear, handleCurrentYear}) => {
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
    let year = currentYear;
    useEffect(() => {
        const status = d3.csv(companies).then((dataset) => {
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
        if(d3.select("#svgCanvas")) {
            d3.select("#svgCanvas").remove();
        }
        console.log("Asking render")
        console.log("Is Mounter",isMounted)
        if(isMounted && data.length > 0) {
            console.log("Render chart")

            const svgHeight = animatedChart.current.clientHeight;
            const svgWidth = animatedChart.current.clientWidth;

            const svg = d3
                .select(animatedChart.current)
                .append("svg")
                .attr("id","svgCanvas")
                .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

            const chartWidth = d3
                .select("#svgCanvas").node().getBoundingClientRect().width - margin.left - margin.right;
            const chartHeight = svgHeight - margin.top - margin.bottom;
            const chart = svg
                .append("g")
                .attr("id", "chart")
                .attr("transform", `translate(${margin.left},${margin.top})`);
            const tickDuration = 1500;
            const top_n = 12
            const barPadding = (svgHeight - (margin.bottom + margin.top)) / (top_n * 5);
            createTitles(svg, margin);
            let yearSlice = data.filter(d => d.year == year && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);
            yearSlice.forEach((d, i) => d.rank = i);
            const { xScale, yScale } = createScales(yearSlice, chartHeight, chartWidth, top_n, margin);
            const xAxis = createAxis(xScale, chartHeight, chartWidth, margin, chart)
            createBars(chart, yearSlice, xScale, yScale, barPadding);
            const { yearText } = styleAxis(chart, chartWidth, chartHeight, year);
            if(play) {
                const tick = ticker(yearSlice, data, xScale, yScale, xAxis, barPadding, yearText, top_n, chart, tickDuration, year, handleCurrentYear);
                setTickerInterval(tick);
            }
        }
    },[data, play]);

    useEffect(() => {
        if(tickerInterval) {
            tickerInterval.stop();
        }
        if(d3.select("#svgCanvas")) {
            d3.select("#svgCanvas").remove();
        }
        console.log("Asking render")
        console.log("Is Mounter",isMounted)
        if(isMounted && data.length > 0) {
            console.log("Render chart")
            const svgHeight = animatedChart.current.clientHeight * 1;
            const svgWidth = animatedChart.current.clientWidth;

            const svg = d3
                .select(animatedChart.current)
                .append("svg")
                .attr("id", "svgCanvas")
                .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

            const chartWidth = d3
                .select("#svgCanvas").node().getBoundingClientRect().width - margin.left - margin.right;
            const chartHeight = svgHeight - margin.top - margin.bottom;
            const chart = svg
                .append("g")
                .attr("id", "chart")
                .attr("transform", `translate(${margin.left},${margin.top})`);
            const tickDuration = 1500;
            const top_n = 12
            const barPadding = (chartHeight - (margin.bottom + margin.top)) / (top_n * 5);
            createTitles(svg, margin);
            let yearSlice = data.filter(d => d.year == year && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);
            yearSlice.forEach((d, i) => d.rank = i);
            const {xScale, yScale} = createScales(yearSlice, chartHeight, chartWidth, top_n, margin);
            const xAxis = createAxis(xScale, chartHeight, chartWidth, margin, chart)
            createBars(chart, yearSlice, xScale, yScale, barPadding);
            const {yearText} = styleAxis(chart, chartWidth, chartHeight, year);
        }
    },[sliderYear]);

    return <div id="animated-bar-chart" style={{position: "relative", height: "50%"}} ref={animatedChart} />
};

export default BootCampFinalProjectAnimatedBarChartCompanies;