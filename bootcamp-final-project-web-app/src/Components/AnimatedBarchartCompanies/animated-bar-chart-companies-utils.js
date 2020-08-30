import * as d3 from "d3";

export const createTitles = (svg,margin) => {
    const title = svg
        .append('text')
        .attr('class', 'title')
        .attr("fill","white")
        .attr("font-family","Open Sans")
        .attr("x", margin.left)
        .attr('y', 24)
        .html('Most Valuable Companies By Market Cap from 2005-2020');

    const subTitle = svg
        .append("text")
        .attr("class", "subTitle")
        .attr("fill","white")
        .attr("font-family","Open Sans")
        .attr("x", margin.left)
        .attr("y", 55)
        .html("Market Capitalization, $mm - Source: Bloomberg");
};

export const createScales = (yearSlice, chartHeight, chartWidth, top_n, margin) => {

    const xScale = d3.scaleLinear().domain([
        0, d3.max(yearSlice, d => d.value)
    ]).range([
        margin.left,
        chartWidth
    ]);
    console.log("Maximum Value", d3.max(yearSlice, d => d.value));

    const yScale = d3.scaleLinear().domain([top_n, 0]).range([
        chartHeight,
        margin.top
    ]);
    return { xScale, yScale };
};

export const createAxis = (xScale, chartHeight, chartWidth, margin, chart) => {
    const xAxis = d3.axisTop().scale(xScale).ticks(chartWidth > 500 ? 5 : 2).tickSize(-(chartHeight - margin.top - margin.bottom)).tickFormat(d => d3.format(',')(d));
    chart
        .append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${
            margin.top
        })`).call(xAxis)
        .selectAll('.tick line')
        .classed('origin', d => d == 0);

    d3
        .select("#x-axis")
        .selectAll(".tick")
        .select("text")
        .attr("fill","white")
        .attr("font-family","Open Sans")

    d3
        .select("#x-axis")
        .selectAll(".tick")
        .select("line")
        .attr("stroke","white");

    d3
        .select("#x-axis")
        .select(".domain")
        .attr("stroke","white");

    return xAxis;
};

export const styleAxis = (chart, chartWidth, chartHeight, year) => {
    const yearText = chart
        .append('text')
        .attr('x', chartWidth)
        .attr('y', chartHeight)
        .attr("fill","white")
        .attr("font-family","Open Sans")
        .style('text-anchor', 'end')
        .html(~~ year)
    return { yearText };
};

export const createBars = (chart, yearSlice, xScale, yScale, barPadding) => {
    chart
        .selectAll('rect.bar')
        .data(yearSlice, d => d.name).enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', xScale(0) + 1)
        .attr('width', d => xScale(d.value) - xScale(0) - 1).attr('y', d => yScale(d.rank) + 5).attr('height', yScale(1) - yScale(0) - barPadding).attr('fill', "rgba(72,137,247,0.6)").attr("stroke","rgb(72,137,247)").attr("stroke-width",3);

    chart
        .selectAll('text.label')
        .data(yearSlice, d => d.name)
        .enter().append('text')
        .attr('class', 'label')
        .attr('x', d => xScale(d.value) - 8)
        .attr('y', d => yScale(d.rank) + 5 + ((yScale(1) - yScale(0)) / 2) + 1)
        .attr("fill","white")
        .attr("font-family","Open Sans")
        .style('text-anchor', 'end').html(d => d.name);

    chart
        .selectAll('text.valueLabel')
        .data(yearSlice, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => xScale(d.value) + 5)
        .attr('y', d => yScale(d.rank) + 5 + ((yScale(1) - yScale(0)) / 2) + 1)
        .attr("fill","white")
        .attr("font-family","Open Sans")
        .text(d => d3.format(',.0f')(d.lastValue));
};

export const ticker = (yearSlice, data, xScale, yScale, xAxis, barPadding, yearText, top_n, chart, tickDuration, year, handleCurrentYear) => {
    return d3.interval(e => {
        yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
            .sort((a, b) => b.value - a.value)
            .slice(0, top_n);
        yearSlice.forEach((d, i) => d.rank = i);
        xScale.domain([
            0, d3.max(yearSlice, d => d.value)
        ]);
        chart
            .select('#x-axis')
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .call(xAxis);

        d3
            .select("#x-axis")
            .selectAll(".tick")
            .select("text")
            .attr("fill","white")
            .attr("font-family","Open Sans")

        d3
            .select("#x-axis")
            .selectAll(".tick")
            .select("line")
            .attr("stroke","white");

        d3
            .select("#x-axis")
            .select(".domain")
            .attr("stroke","white");

        let bars = chart
            .selectAll('.bar')
            .data(yearSlice, d => d.name);

        bars
            .enter()
            .append('rect')
            .attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
            .attr('x', xScale(0) + 1)
            .attr('width', d => xScale(d.value) - xScale(0) - 1)
            .attr('y', d => yScale(top_n + 1) + 5)
            .attr('height', yScale(1) - yScale(0) - barPadding)
            .attr('fill', "rgba(72,137,247,0.6)")
            .attr("stroke","rgb(72,137,247)")
            .attr("stroke-width",3)
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('y', d => yScale(d.rank) + 5);

        bars.transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('width', d => xScale(d.value) - xScale(0) - 1)
            .attr('y', d => yScale(d.rank) + 5);

        bars.exit()
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('width', d => xScale(d.value) - xScale(0) - 1).attr('y', d => yScale(top_n + 1) + 50)
            .remove();

        let labels = chart.selectAll('.label')
            .data(yearSlice, d => d.name);

        labels.enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', d => xScale(d.value) - 8)
            .attr('y', d => yScale(top_n + 1) + 5 + ((yScale(1) - yScale(0)) / 2))
            .attr("fill","white")
            .attr("font-family","Open Sans")
            .style('text-anchor', 'end')
            .html(d => d.name)
            .transition()
            .duration(tickDuration).ease(d3.easeLinear)
            .attr('y', d => yScale(d.rank) + 5 + ((yScale(1) - yScale(0)) / 2) + 1);


        labels.transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('x', d => xScale(d.value) - 8)
            .attr('y', d => yScale(d.rank) + 5 + ((yScale(1) - yScale(0)) / 2) + 1);

        labels.exit()
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('x', d => xScale(d.value) - 8)
            .attr('y', d => yScale(top_n + 1) + 50)
            .remove();


        let valueLabels = chart.selectAll('.valueLabel')
            .data(yearSlice, d => d.name);

        valueLabels.enter()
            .append('text')
            .attr('class', 'valueLabel')
            .attr('x', d => xScale(d.value) + 5)
            .attr('y', d => yScale(top_n + 1) + 5)
            .attr("fill","white")
            .attr("font-family","Open Sans")
            .text(d => d3.format(',.0f')(d.lastValue))
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('y', d => yScale(d.rank) + 5 + ((yScale(1) - yScale(0)) / 2) + 1);

        valueLabels
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('x', d => xScale(d.value) + 5)
            .attr('y', d => yScale(d.rank) + 5 + ((yScale(1) - yScale(0)) / 2) + 1)
            .attr("fill","white")
            .attr("font-family","Open Sans")
            .tween("text", function (d) {
                let i = d3.interpolateRound(d.lastValue, d.value);
                return function (t) {
                    this.textContent = d3.format(',')(i(t));
                };
            });


        valueLabels.exit()
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('x', d => xScale(d.value) + 5)
            .attr('y', d => yScale(top_n + 1) + 50)
            .remove();

        yearText.html(~~ year);

        if (year == 2020) {
            ticker.stop();
        }
        console.log("Year Before",year);
        year = d3.format('.1f')((+ year) + 0.1);
        handleCurrentYear(year);
    }, tickDuration);
};
