import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import companies from "../../Data/companies_marketshare.csv";
import { createTitles, createScales, createAxis, styleAxis, createBars, ticker } from "./animated-bar-chart-utils";
const BootCampFinalProjectAnimatedBarChartCompanies = ({play, currentYear, sliderYear, handleCurrentYear}) => {
    const [data, setData] = useState(() => []);
    const [isMounted, setIsMounted] = useState(() => false);
    const [tickerInterval, setTickerInterval] = useState(() => undefined);
    const animatedChartCompanies = useRef();
    const margin = {
        top: 16,
        bottom: 16,
        left: 1,
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
        if(tickerInterval && currentYear > 2020) {
            console.log("I'm stopping on current year companies", currentYear);
            tickerInterval.stop()
        }
    },[currentYear]);

    useEffect(() => {
        if(d3.select("#svgCanvas")) {
            d3.select("#svgCanvas").remove();
        }
        if(isMounted && data.length > 0) {
            const svgHeight = animatedChartCompanies.current.clientHeight;
            const svgWidth = animatedChartCompanies.current.clientWidth;
            const svg = d3
                .select(animatedChartCompanies.current)
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
            const maxYear = d3.max(data, d => d.year);
            let yearSlice = data.filter(d => d.year == year && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);
            yearSlice.forEach((d, i) => d.rank = i);
            const { xScale, yScale } = createScales(yearSlice, chartHeight, chartWidth, top_n, margin);
            const xAxis = createAxis(xScale, chartHeight, chartWidth, margin, chart);
            createBars(chart, yearSlice, xScale, yScale, barPadding);
            const { yearText } = styleAxis(chart, chartWidth, chartHeight, year);
            if(play) {
                const tick = ticker(yearSlice, data, xScale, yScale, xAxis, barPadding, yearText, top_n, chart, tickDuration, year, handleCurrentYear, maxYear, "companies");
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
        if(isMounted && data.length > 0) {
            const svgHeight = animatedChartCompanies.current.clientHeight;
            const svgWidth = animatedChartCompanies.current.clientWidth;
            const svg = d3
                .select(animatedChartCompanies.current)
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
            const top_n = 12
            const barPadding = (chartHeight - (margin.bottom + margin.top)) / (top_n * 5);
            let yearSlice = data.filter(d => d.year == year && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);
            yearSlice.forEach((d, i) => d.rank = i);
            const {xScale, yScale} = createScales(yearSlice, chartHeight, chartWidth, top_n, margin);
            const xAxis = createAxis(xScale, chartHeight, chartWidth, margin, chart)
            createBars(chart, yearSlice, xScale, yScale, barPadding);
            const {yearText} = styleAxis(chart, chartWidth, chartHeight, year);
        }
    },[sliderYear]);

    return <div id="animated-bar-chart" style={{position: "relative", height: "50%"}} ref={animatedChartCompanies} />
};

export default BootCampFinalProjectAnimatedBarChartCompanies;