import React, {useContext, useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";
const BootcampFinalProjectStartupTypePieChart = () => {
  const { startupDir, selCountry } = useContext(BootcampAppContext);
  const [data, setData] = useState(() => []);
  const [isMounted, setIsMounted] = useState(() => false);
  const pieRef = useRef();

  useEffect(() => {
    if(!isMounted) {
      setIsMounted(true);
    }
  },[data]);

  useEffect(() => {
    if(startupDir.startups) {
      const { startups } = startupDir;
      let startupSectors = [];
      if(selCountry !== "") {
        startupSectors = startups.filter(stp => stp.hq === selCountry).map(stp => stp.sector);
      } else {
        startupSectors =  startups.map(stp => stp.sector);
      }
      const startupSectorsCount = startupSectors.reduce((acc,currentVal,idx) => {
        if(typeof acc !== "string" && Array.isArray(acc)) {
          const foundIndex = acc.findIndex(obj => {
            return obj.name === currentVal
          });
          if(foundIndex !== -1) {
            const newObj = { name: acc[foundIndex].name, count: acc[foundIndex].count +1 };
            return foundIndex === 0 ? [newObj,...acc.slice(1)] : [...acc.slice(0,foundIndex),newObj,...acc.slice(foundIndex+1)];
          } else {
            return [...acc,{ name: currentVal, count: 1 }];
          }
        }
        if(currentVal === acc) {
          return [{ name: currentVal, count: 2 }];
        } else {
          return [{ name: acc, count: 1 }, {name: currentVal, count: 1}];
        }

      })
      setData(startupSectorsCount);
    }
  },[startupDir, selCountry]);

  const formatPercent = d3.format(".2%");

  useEffect(() => {
    if(d3.select("#svgCanvas")) {
      d3.select("#svgCanvas").remove();
    }
    if(isMounted && data.length > 0) {

      let currentAngle = 0;
      const minimumStepAngle =
          (Math.PI * 2) / data.map(f => f.count).reduce((acc, val) => acc + val);
      const dataset = data.map((d, idx) => {
        const newAngle = d.count * minimumStepAngle;
        const set = {
          data: {
            name: d.name,
            count: d.count
          },
          index: idx,
          value: d.count,
          startAngle: currentAngle,
          endAngle: newAngle + currentAngle,
          padAngle: 0
        };
        currentAngle += newAngle;
        return set;
      });

//dataset equal to pieArcData
      const pieArcData = d3.pie().value(d => d.count)(data);
      const svgHeight = 800;
      const svgWidth = pieRef.current.clientWidth*1.8;
      const total = data.reduce((acc,val,idx) => idx === 1 ? acc.count+val.count : acc+val.count);
      const margin = {
        top: 50,
        bottom: 30,
        left: 30,
        right: 30
      };

      const chartWidth = svgWidth - margin.left - margin.right;
      const chartHeight = svgHeight - margin.top - margin.bottom;

      const svg = d3
          .select(pieRef.current)
          .append("svg")
          .attr("id","svgCanvas")
          .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

      const title = svg
          .append("text")
          .text( (selCountry !== "" ? selCountry : "Latam")+" Startups By Sectors")
          .attr("transform", 'translate(50,100)')
          .attr("fill","white")
          .attr("font-size","45px")
          .attr("font-family","Open Sans");

      const pie = svg
          .append("g")
          .attr("transform", `translate(${chartWidth / 2},${chartHeight/2 + margin.top})`);

      if(selCountry !== "") {
        const button = svg
            .append("g")
            .attr("transform",`translate(${margin.left},${chartHeight})`)
            .append("rect")
            .attr("width","200px")
            .attr("height","100px")
            .attr("fill","transparent")
            .attr("stroke","rgb(72,137,247)")
            .style("padding","30px")
            .append("text")
            .attr("fill","white")
            .text("Clear");
      }

      const arcPie = d3
          .arc()
          .innerRadius(110)
          .outerRadius(310)
          .padRadius(300)
          .padAngle(4 / 300)
          .cornerRadius(8);

      const tooltip = d3Tip()
          .attr("class","tooltip")
          .style("background-color","rgb(36,36,36)")
          .style("font-size","12px")
          .style("font-family","Open Sans")
          .style("padding","8px")
          .style("color","white")
          .style("width","120px")
          .style("height","80px")
          .style("text-align","center")
          .style("border","1px solid rgba(72,137,247,0.6)")
          .offset([0,0])
          .html(d => `
                    <div>
                        <h4 style="margin: 4px">Sector</h4>
                        <h5 style="margin: 4px">${d.data.name}</h5>
                        <p style="font-family: 'Open Sans'; text-align: center ; margin: 8px">${formatPercent(d.data.count/total)}</p>
                    </div>`);

      pie
          .selectAll("path")
          .data(pieArcData)
          .join("path")
          .classed("startup-path",true)
          .attr("d", (d, idx) => arcPie(d))
          .attr("id", d=>  d.data.name)
          .attr("fill", "rgba(72,137,247,0.6)")
          .attr("stroke","rgb(72,137,247)")
          .attr("stroke-width","3")
          .style("cursor","pointer")
          .on("mouseover", tooltip.show)
          .on("mouseout", tooltip.hide);

      pie
          .selectAll("path")
          .data(pieArcData)
          .each(function(d) {
            const data = d;
            const text = pie
                .append("text")
                .attr("fill", "white")
                .attr("text-anchor", "middle")
                .style("text-anchor", "middle")
                .attr("dy", ".50em")
                .attr("transform", () => {
                  var _d = arcPie.centroid(data);
                  _d[0] *= 1.5;
                  _d[1] *= 1.5;
                  return "translate(" + _d + ")";
                });

            text
                .append("tspan")
                .attr("font-size", "24")
                .text(data.value.toLocaleString("en") > 2 || selCountry !== "" ? data.data.name : "");

            text
                .append("tspan")
                .attr("x", "0")
                .attr("font-size", "20")
                .attr("font-weight",700)
                .attr("dy", "1.3em")
                .text(data.value.toLocaleString("en") > 5 || selCountry !== "" ? `${data.value.toLocaleString("en")} (${formatPercent(data.data.count/total)})` : "");
            pie.call(tooltip);
          });
    }
  },[data])

  return (
      <div id="startup-types-chart" style={{position: "relative", height: "100%", backgroundColor: "rgb(36,36,36)", borderBottom: "3px solid rgb(72,137,247)"}} ref={pieRef} />
  )
};

export default BootcampFinalProjectStartupTypePieChart;