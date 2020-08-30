function pintar2grafico() {
    var svg2 = d3.select("#bar-char-race2").append("svg").attr("width", 1000).attr("height", 700);
    var tickDuration2 = 150;
    var top_n = 12;
    var width = 1000;
    var height = 700;
    const margin2 = {
        top: 80,
        right: 0,
        bottom: 5,
        left: 0
    };
    let barPadding2 = (height - (margin2.bottom + margin2.top)) / (top_n * 5);
    let title2 = svg2.append('text').attr('class', 'title').attr('y', 24).html('Counties With the Most Investment in Technology');
    let subTitle2 = svg2.append("text").attr("class", "subTitle").attr("y", 55).html("Investment in Technology as % of GDP, % - Source: World Bank");
    let caption2 = svg2.append('text').attr('class', 'caption').attr('x', width).attr('y', height - 5).style('text-anchor', 'end')
    let year2 = 2005;
    d3.csv('../static/js/brand_values2.csv').then(function (data) {
        // if (error) throw error;
        // brand_values2.csv
        // Empresas.csv


        data.forEach(d => {
            d.value = + d.value,
                d.lastValue = + d.lastValue,
                d.value = isNaN(d.value) ? 0 : d.value,
                d.year = + d.year,
                d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75)
        });


        let yearSlice2 = data.filter(d => d.year == year2 && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);

        yearSlice2.forEach((d, i) => d.rank = i);

        console.log('yearSlice: ', yearSlice2)

        let x = d3.scaleLinear().domain([
            0, d3.max(yearSlice2, d => d.value)
        ]).range([
            margin2.left,
            width - margin2.right - 65
        ]);

        let y = d3.scaleLinear().domain([top_n, 0]).range([
            height - margin2.bottom,
            margin2.top
        ]);

        let xAxis = d3.axisTop().scale(x).ticks(width > 500 ? 5 : 2).tickSize(-(height - margin2.top - margin2.bottom)).tickFormat(d => d3.format(',')(d));

        svg2.append('g').attr('class', 'axis xAxis').attr('transform', `translate(0, ${
            margin2.top
        })`).call(xAxis).selectAll('.tick line').classed('origin', d => d == 0);

        svg2.selectAll('rect.bar').data(yearSlice2, d => d.name).enter().append('rect').attr('class', 'bar').attr('x', x(0) + 1).attr('width', d => x(d.value) - x(0) - 1).attr('y', d => y(d.rank) + 5).attr('height', y(1) - y(0) - barPadding2).style('fill', d => d.colour);

        svg2.selectAll('text.label').data(yearSlice2, d => d.name).enter().append('text').attr('class', 'label').attr('x', d => x(d.value) - 8).attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1).style('text-anchor', 'end').html(d => d.name);

        svg2.selectAll('text.valueLabel').data(yearSlice2, d => d.name).enter().append('text').attr('class', 'valueLabel').attr('x', d => x(d.value) + 5).attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1).text(d => d3.format(',.0f')(d.lastValue));

        let yearText = svg2.append('text').attr('class', 'yearText').attr('x', width - margin2.right).attr('y', height - 25).style('text-anchor', 'end').html(~~ year2).call(halo2, 10);

        let ticker2 = d3.interval(e => {

            yearSlice2 = data.filter(d => d.year == year2 && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);

            yearSlice2.forEach((d, i) => d.rank = i);

            // console.log('IntervalYear: ', yearSlice);

            x.domain([
                0, d3.max(yearSlice2, d => d.value)
            ]);

            svg2.select('.xAxis').transition().duration(tickDuration2).ease(d3.easeLinear).call(xAxis);

            let bars = svg2.selectAll('.bar').data(yearSlice2, d => d.name);

            bars.enter().append('rect').attr('class', d => `bar ${
                d.name.replace(/\s/g, '_')
            }`).attr('x', x(0) + 1).attr('width', d => x(d.value) - x(0) - 1).attr('y', d => y(top_n + 1) + 5).attr('height', y(1) - y(0) - barPadding2).style('fill', d => d.colour).transition().duration(tickDuration2).ease(d3.easeLinear).attr('y', d => y(d.rank) + 5);

            bars.transition().duration(tickDuration2).ease(d3.easeLinear).attr('width', d => x(d.value) - x(0) - 1).attr('y', d => y(d.rank) + 5);

            bars.exit().transition().duration(tickDuration2).ease(d3.easeLinear).attr('width', d => x(d.value) - x(0) - 1).attr('y', d => y(top_n + 1) + 5).remove();

            let labels = svg2.selectAll('.label').data(yearSlice2, d => d.name);

            labels.enter().append('text').attr('class', 'label').attr('x', d => x(d.value) - 8).attr('y', d => y(top_n + 1) + 5 + ((y(1) - y(0)) / 2)).style('text-anchor', 'end').html(d => d.name).transition().duration(tickDuration2).ease(d3.easeLinear).attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);


            labels.transition().duration(tickDuration2).ease(d3.easeLinear).attr('x', d => x(d.value) - 8).attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

            labels.exit().transition().duration(tickDuration2).ease(d3.easeLinear).attr('x', d => x(d.value) - 8).attr('y', d => y(top_n + 1) + 5).remove();


            let valueLabels = svg2.selectAll('.valueLabel').data(yearSlice2, d => d.name);

            valueLabels.enter().append('text').attr('class', 'valueLabel').attr('x', d => x(d.value) + 5).attr('y', d => y(top_n + 1) + 5).text(d => d3.format(',.0f')(d.lastValue)).transition().duration(tickDuration2).ease(d3.easeLinear).attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

            valueLabels.transition().duration(tickDuration2).ease(d3.easeLinear).attr('x', d => x(d.value) + 5).attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1).tween("text", function (d) {
                let i = d3.interpolateRound(d.lastValue, d.value);
                return function (t) {
                    this.textContent = d3.format('.2r')(i(t));
                };
            });


            valueLabels.exit().transition().duration(tickDuration2).ease(d3.easeLinear).attr('x', d => x(d.value) + 5).attr('y', d => y(top_n + 1) + 5).remove();

            yearText.html(~~ year2);

            if (year2 == 2018)
                ticker2.stop();


            year2 = d3.format('.1f')((+ year2) + 0.1);
        }, tickDuration2);

    });

    const halo2 = function (text, strokeWidth) {
        text.select(function () {
            return this.parentNode.insertBefore(this.cloneNode(true), this);
        }).style('fill', '#ffffff').style('stroke', '#ffffff').style('stroke-width', strokeWidth).style('stroke-linejoin', 'round').style('opacity', 1);

    }
}