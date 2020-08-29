const API_URL = "https://technological-progress-project.herokuapp.com/project-2-api/";
const computingPath = API_URL + 'computing_efficiency.json';
const microprocessorsPath = API_URL + 'microprocessor_clock_speed.json';
const priceChangesPath = API_URL + 'price_changes_in_consumer_goods_and_services_in_the_usa_1997_2017.json';
const nonCommercialFlightsPath = API_URL + 'non_commercial_flight_distance_records.json';
const humanGenomePath = API_URL + 'number_of_human_genome_base_pairs_sequenced_per_us.json';
const supercomputerFlopsPath = API_URL + 'supercomputer_power_flops.json';
const transistorsPerMicroprocessorPath = API_URL + 'transistors_per_microprocessor.json';
const investmentMexicoPath = API_URL + 'conacyt_investment_by_entity_mexico.json';


// ------- ***Computing efficiency**** --------
var xIntel = []
var yIntel = []

var xFrantz = []
var yFrantz = []

var xSmailagic = []
var ySmailagic = []

var elementos = 0
var nuevaData = []

d3.json(computingPath).then(data => {
    computingData = data.values


    computingData.forEach(el => {

        if (el["entity"] == "Intel") {
            xIntel.push(parseInt(el["year"]))
        }

        if (el["entity"] == "Frantz") {
            xFrantz.push(parseInt(el["year"]))
        }

        if (el["entity"] == "Smailagic") {
            xSmailagic.push(parseInt(el["year"]))
        }

        function comparar(a, b) {
            return a - b;
        }
        xIntel.sort(comparar);
        xFrantz.sort(comparar);
        xSmailagic.sort(comparar);
    })

    computingData.forEach(ele => {
        elementos++
        nuevaData.push(ele)
    })

    for (let i = 0; i < elementos; i++) {
        for (let j = 0; j < xIntel.length; j++) {
            if (xIntel[j] == nuevaData[i]["year"]) {
                yIntel[j] = (parseFloat(nuevaData[i]["computing"]))
            }

        }
        for (let j = 0; j < xFrantz.length; j++) {
            if (xFrantz[j] == nuevaData[i]["year"]) {
                yFrantz[j] = (parseFloat(nuevaData[i]["computing"]))
            }

        }
        for (let j = 0; j < xSmailagic.length; j++) {
            if (xSmailagic[j] == nuevaData[i]["year"]) {
                ySmailagic[j] = (parseFloat(nuevaData[i]["computing"]))
            }
        }

    }

});


// ---------- *** Price changes in consumer goods and services in the USA *** --------


var priceChangeYears = []
var nuevaDataPriceChange = []

var pcChildcare = []
var pcClothing = []
var pcCollegeTuitionFees = []
var pcEducation = []
var pcFood = []
var pcHouseholdEnergy = []
var pcHousing = []
var pcMedical = []
var pcNewCards = []
var pcPublicTransport = []
var pcSoftware = []
var pcToys = []
var pcTVs = []
var pcMedial = []

d3.json(priceChangesPath).then(data => { // console.log("Price changes data", data);
    priceChange = data.values

    priceChange.forEach(el => {
        priceChangeYears.push(parseInt(el["year"]))

        function comparar(a, b) {
            return a - b;
        }
        priceChangeYears.sort(comparar);
    })

    priceChange.forEach(ele => {
        elementos++
        nuevaDataPriceChange.push(ele)
    })

    for (let j = 0; j < priceChangeYears.length; j++) {

        for (let i = 0; i < nuevaDataPriceChange.length; i++) {
            if (priceChangeYears[j] == nuevaDataPriceChange[i]["year"]) { // **** */
                pcChildcare[j] = (parseFloat(nuevaDataPriceChange[i]["childcare"]))
                pcClothing[j] = (parseFloat(nuevaDataPriceChange[i]["clothing"]))
                pcCollegeTuitionFees[j] = (parseFloat(nuevaDataPriceChange[i]["collegeTuitionFees"]))
                pcEducation[j] = (parseFloat(nuevaDataPriceChange[i]["education"]))
                pcFood[j] = (parseFloat(nuevaDataPriceChange[i]["foodBeverages"]))
                pcHouseholdEnergy[j] = (parseFloat(nuevaDataPriceChange[i]["householdEnergy"]))
                pcHousing[j] = (parseFloat(nuevaDataPriceChange[i]["housing"]))
                pcNewCards[j] = (parseFloat(nuevaDataPriceChange[i]["newCars"]))
                pcPublicTransport[j] = (parseFloat(nuevaDataPriceChange[i]["publicTransportation"]))
                pcSoftware[j] = (parseFloat(nuevaDataPriceChange[i]["software"]))
                pcToys[j] = (parseFloat(nuevaDataPriceChange[i]["toys"]))
                pcTVs[j] = (parseFloat(nuevaDataPriceChange[i]["year"])) // ******* */
                pcTVs[j] = (parseFloat(nuevaDataPriceChange[i]["medicalCare"]))

            }
        }
    }

});


// ----- ***Number of human genome base pairs sequenced per US$*** -----------------------------------

var genomeYears = []
var nuevaDataGenome = []
var yGenome = []

d3.json(humanGenomePath).then(data => { // console.log("Human genome pairs data", data);
    humanGenome = data.values

    humanGenome.forEach(el => {

        if (el["entity"] == "Genome") {
            genomeYears.push(parseInt(el["year"]))

        }
        function comparar(a, b) {
            return a - b;
        }
        genomeYears.sort(comparar);
    })


    humanGenome.forEach(ele => {
        elementos++
        nuevaDataGenome.push(ele)
    })

    for (let j = 0; j < genomeYears.length; j++) {
        for (let i = 0; i < nuevaDataGenome.length; i++) {
            if (genomeYears[j] == nuevaDataGenome[i]["year"]) {
                yGenome[j] = (parseFloat(nuevaDataGenome[i]["pairs"]))
            }
        }
    }

});


// -------- *** Non-commercial flight distance records *** ------------


var nonCommericalYears = []
var nuevaDataNonCommercial = []
var yNonCommercial = []
d3.json(nonCommercialFlightsPath).then(data => { // console.log("Non commercial flights data", data);
    nonCommercial = data.values

    nonCommercial.forEach(el => {

        if (el["entity"] == "Global") {
            nonCommericalYears.push(parseInt(el["year"]))

        }
        function comparar(a, b) {
            return a - b;
        }
        nonCommericalYears.sort(comparar);
    })


    nonCommercial.forEach(ele => {
        elementos++
        nuevaDataNonCommercial.push(ele)
    })

    for (let j = 0; j < nonCommericalYears.length; j++) {
        for (let i = 0; i < nuevaDataNonCommercial.length; i++) {
            if (nonCommericalYears[j] == nuevaDataNonCommercial[i]["year"]) {
                yNonCommercial[j] = (parseFloat(nuevaDataNonCommercial[i]["kilometers"]))
            }
        }
    }


});


// ------- *** Microprocessor clock speed *** -----------------

var microprocessorYears = []
var nuevaDataMicroprocessor = []
var yMicroprocessor = []

d3.json(microprocessorsPath).then(data => { // console.log("Microprocessors data", data);

    microprocessor = data.values

    microprocessor.forEach(el => {

        if (el["entity"] == "World") {
            microprocessorYears.push(parseInt(el["year"]))

        }
        function comparar(a, b) {
            return a - b;
        }
        microprocessorYears.sort(comparar);
    })


    microprocessor.forEach(ele => {
        elementos++
        nuevaDataMicroprocessor.push(ele)
    })

    for (let j = 0; j < microprocessorYears.length; j++) {
        for (let i = 0; i < nuevaDataMicroprocessor.length; i++) {
            if (microprocessorYears[j] == nuevaDataMicroprocessor[i]["year"]) {
                yMicroprocessor[j] = (parseFloat(nuevaDataMicroprocessor[i]["microprocessor"]))
            }
        }
    }
});


// ----- *** Supercomputer Power (FLOPS) *** ---------
var supercomputerYear = []
var nuevaDataSuperComputer = []
var ySuperComputer = []

d3.json(supercomputerFlopsPath).then(data => { // console.log("Supercomputer flops data", data);
    superComputer = data.values

    superComputer.forEach(el => {

        if (el["entity"] == "World") {
            supercomputerYear.push(parseInt(el["year"]))

        }
        function comparar(a, b) {
            return a - b;
        }
        supercomputerYear.sort(comparar);
    })


    superComputer.forEach(ele => {
        elementos++
        nuevaDataSuperComputer.push(ele)
    })

    for (let j = 0; j < supercomputerYear.length; j++) {
        for (let i = 0; i < nuevaDataSuperComputer.length; i++) {
            if (supercomputerYear[j] == nuevaDataSuperComputer[i]["year"]) {
                ySuperComputer[j] = (parseFloat(nuevaDataSuperComputer[i]["flops"]))
            }
        }
    }

});

// ----- *** Moore's Law: Transistors per microprocessor*** ---------

var transistorYear = []
var nuevaDataTransistor = []
var yTransistor = []

d3.json(transistorsPerMicroprocessorPath).then(data => { // console.log('Transistors per microprocessor data',data);
    transistor = data.values

    transistor.forEach(el => {

        if (el["entity"] == "World") {
            transistorYear.push(parseInt(el["year"]))

        }
        function comparar(a, b) {
            return a - b;
        }
        transistorYear.sort(comparar);
    })


    transistor.forEach(ele => {
        elementos++
        nuevaDataTransistor.push(ele)
    })

    for (let j = 0; j < microprocessorYears.length; j++) {
        for (let i = 0; i < nuevaDataTransistor.length; i++) {
            if (transistorYear[j] == nuevaDataTransistor[i]["year"]) {
                yTransistor[j] = (parseFloat(nuevaDataTransistor[i]["transistors"]))
            }
        }
    }

    creartablaFLOPS()
    creartablaPrice()
    creartablaHuman()
    creartablaNonComer()
    creartablaMicro()
    creartabla()

});


// ************************************************
d3.json(investmentMexicoPath).then(data => { // console.log("Investment by entity Mexico data", data);
});
// ************************************************


// ****************************************************************************************************/
// -------------   Graficas ------------------------------------------------------//
// ************************************************************************************************* */


// --------- *** Grafica de Computing efficiency *** ------

function creartabla(data) {
    var xField = 'esdfsdfDate';
    var selectorOptions = {
        buttons: [
            {
                step: 'year',
                stepmode: 'todate',
                count: 2,
                label: '5y'
            }, {
                step: 'all'
            }
        ]
    };

    var Intel = {
        x: xIntel,
        y: yIntel,
        name: "Intel Y axis2",
        yaxis: "y2",
        type: 'lines'
    };

    var Frantz = {
        x: xFrantz,
        y: yFrantz,
        name: "Frantz",
        type: 'lines'
    };


    var Smailagic = {
        x: xSmailagic,
        y: ySmailagic,
        name: "Smailagic",
        type: 'lines'
    };
    var data1 = [Intel, Frantz, Smailagic];
    var layout = {
        title: {
            text: 'Computing Efficiency, 1971 to 2015',
            font: {
                family: 'Playfair Display,Georgia,Times New Roman,serif',
                size: 24
            },
            xref: 'paper',
            x: 2
        },
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {},
            title: 'Years'
        },
        yaxis: {
            title: 'W per MIPS',

            titlefont: {
                color: 'rgb(148, 103, 189)'
            },
            tickfont: {
                color: 'rgb(148, 103, 189)'
            },
            fixedrange: true
        },
        yaxis2: {
            title: 'W per MIPS',
            titlefont: {
                color: 'rgb(148, 103, 189)'
            },
            tickfont: {
                color: 'rgb(148, 103, 189)'
            },
            overlaying: 'y',
            side: "right"
        }
    };

    Plotly.newPlot('plot', data1, layout);
    Plotly.newPlot('plot2', data1, layout);
}

d3.select("#computing-card").on("click", () => creartabla());

// --------- *** Microprocessor clock speed *** ------

function creartablaMicro(data) {

    var Micro = {
        x: microprocessorYears,
        y: yMicroprocessor,
        type: 'lines'
    };

    var data1 = [Micro];

    var layout = {
        title: {
            text: 'Microprocessor clock speed',
            font: {
                family: 'Playfair Display,Georgia,Times New Roman,serif',
                size: 24
            },
            xref: 'paper',
            x: 2
        },
        xaxis: {

            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };
    Plotly.newPlot('plot', data1, layout);
    Plotly.newPlot('plot3', data1, layout);
}
d3.select("#microprocessor-card").on("click", () => creartablaMicro());

// --------- *** Non-commercial flight distance records*** ------

function creartablaNonComer(data) {

    var Micro = {
        x: nonCommericalYears,
        y: ySuperComputer,
        type: 'scatter'
    };
    var data1 = [Micro];
    var layout = {
        title: {
            text: 'Non-commercial flight distance records, 1800 to 2006',
            font: {
                family: 'Playfair Display,Georgia,Times New Roman,serif',
                size: 24
            },
            xref: 'paper',
            x: 2
        },
        xaxis: {

            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };
    Plotly.newPlot('plot', data1, layout);
    Plotly.newPlot('plot4', data1, layout);
}
d3.select("#flightrecords-card").on("click", () => creartablaNonComer());

// --------- *** Number of human genome base pairs sequenced per US$*** ------
function creartablaHuman(data) {

    var human = {
        x: genomeYears,
        y: yGenome,
        type: 'scatter'
    };
    var data1 = [human];
    var layout = {
        title: {
            text: 'Number of human genome base pairs sequenced per US$',
            font: {
                family: 'Playfair Display,Georgia,Times New Roman,serif',
                size: 24
            },
            xref: 'paper',
            x: 2
        },
        xaxis: {

            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };
    Plotly.newPlot('plot', data1, layout);
    Plotly.newPlot('plot5', data1, layout);
}
d3.select("#genomepairs-card").on("click", () => creartablaHuman());

// --------- *** Price changes in consumer goods and services in the USA*** ------
function creartablaPrice(data) {
    var pcChildcareH = {
        x: priceChangeYears,
        y: pcChildcare,
        name: "childcare",
        type: 'lines'
    };
    var pcClothingH = {
        x: priceChangeYears,
        y: pcClothing,
        name: "clothing",
        type: 'lines'
    };
    var pcCollegeTuitionFeesH = {
        x: priceChangeYears,
        y: pcCollegeTuitionFees,
        name: "College Tuition Fees",
        type: 'lines'
    };
    var pcEducationH = {
        x: priceChangeYears,
        y: pcEducation,
        name: "Education",
        type: 'lines'
    };
    var pcFoodH = {
        x: priceChangeYears,
        y: pcFood,
        name: "Food and Beverages",
        type: 'lines'
    };
    var pcHouseholdEnergyH = {
        x: priceChangeYears,
        y: pcHouseholdEnergy,
        name: "Energy",
        type: 'lines'
    };
    var pcHousingH = {
        x: priceChangeYears,
        y: pcHousing,
        name: "Housing",
        type: 'lines'
    };
    var pcMedicalH = {
        x: priceChangeYears,
        y: pcMedical,
        name: "Medical Care",
        type: 'lines'
    };
    var pcNewCardsH = {
        x: priceChangeYears,
        y: pcNewCards,
        name: "New Cars",
        type: 'lines'
    };
    var pcPublicTransportH = {
        x: priceChangeYears,
        y: pcPublicTransport,
        name: "Public Transportation",
        type: 'lines'
    };
    var pcSoftwareH = {
        x: priceChangeYears,
        y: pcSoftware,
        name: "Software",
        type: 'lines'
    };
    var pcToysH = {
        x: priceChangeYears,
        y: pcToys,
        name: "Toys",
        type: 'lines'
    };
    var pcTVsH = {
        x: priceChangeYears,
        y: pcTVs,
        name: "Toys",
        type: 'lines'
    };
    var pcMedialH = {
        x: priceChangeYears,
        y: pcMedial,
        name: "TVs",
        type: 'lines'
    };
    var data1 = [
        pcChildcareH,
        pcClothingH,
        pcCollegeTuitionFeesH,
        pcEducationH,
        pcFoodH,
        pcHouseholdEnergyH,
        pcHousingH,
        pcMedicalH,
        pcNewCardsH,
        pcPublicTransportH,
        pcPublicTransportH,
        pcSoftwareH,
        pcToysH,
        pcTVsH,
        pcMedialH
    ];
    var layout = {
        title: {
            text: 'Price changes in consumer goods and services in the USA',
            font: {
                family: 'Playfair Display,Georgia,Times New Roman,serif',
                size: 24
            },
            xref: 'paper',
            x: 2
        },
        xaxis: {

            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };
    Plotly.newPlot('plot', data1, layout);
    Plotly.newPlot('plot6', data1, layout);
}
d3.select("#pricechanges-card").on("click", () => creartablaPrice());

// --------- *** Supercomputer Power (FLOPS)*** ------
function creartablaFLOPS(data) {

    var human = {
        x: supercomputerYear,
        y: ySuperComputer,
        type: 'scatter'
    };
    var data1 = [human];
    var layout = {
        title: {
            text: 'Supercomputer Power (FLOPS), 1993 to 2017',
            font: {
                family: 'Playfair Display,Georgia,Times New Roman,serif',
                size: 24
            },
            xref: 'paper',
            x: 2
        },
        xaxis: {

            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };
    Plotly.newPlot('plot', data1, layout);
    Plotly.newPlot('plot75', data1, layout);
}
creartablaFLOPS()
d3.select("#supercomputer-card").on("click", () => creartablaFLOPS());


// ///********* PRIMER GRAFICO DE BARRAS*********/////


// Countries with ther bifgfest investment in Technology //

function pintar1grafico() {
    var svg = d3.select("#bar-char-race").append("svg").attr("width", 1000).attr("height", 700);


    // Duracion total de la gráfica
    var tickDuration = 500;

    // Tamaño de las barras
    var top_n = 12; // Ancho de las barras
    var width = 1000; // Tamaño SVG
    var height = 700;
    // Tamaño SVG

    // Margen de las graficas dentro del svg
    const margin = {
        top: 80,
        right: 0,
        bottom: 5,
        left: 0
    };

    // Espacio que hay entre las barras de la grafica
    let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5); // poniendo "1" para que sean tipo puntos

    let title = svg.append('text').attr('class', 'title').attr('y', 24).html('Most Valuable Copmanies By Market Cap from 2005-2020');

    let subTitle = svg.append("text").attr("class", "subTitle").attr("y", 55).html("Market Capitalization, $mm - Source: Bloomberg");


    // let caption = svg.append('text').attr('class', 'caption').attr('x', width).attr('y', height - 5).style('text-anchor', 'end')


    let year = 1998;

    d3.csv('../static/js/empresas2.csv').then(function (data) {
        // if (error) throw error;
        // brand_values2.csv
        // Empresas.csv

        // console.log(data);

        data.forEach(d => { // console.log(d.value);
            d.value = + d.value,
            // console.log(d.value);
            d.lastValue = + d.lastValue,
            d.value = isNaN(d.value) ? 0 : d.value,
            d.year = + d.year,
            d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75)
            // console.log(d)
            // console.log(d.color)
        });
        // console.log("data", data)

        // console.log(data);

        // Ordenando los data set por años para que coincidan con cada uno de los datos
        let yearSlice = data.filter(d => d.year == year && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);

        // Agregando el ranking
        yearSlice.forEach((d, i) => d.rank = i);

        // Imprimiendo la data ya lista para que la podamos usar en los graficos (incluye color y rango)
        console.log('yearSlice: ', yearSlice)

        // Dando el tamaño a lo ejes!
        let x = d3.scaleLinear().domain([
            0, d3.max(yearSlice, d => d.value)
        ]).range([
            margin.left,
            width - margin.right - 65
        ]);

        let y = d3.scaleLinear().domain([top_n, 0]).range([
            height - margin.bottom,
            margin.top
        ]);

        let xAxis = d3.axisTop().scale(x).ticks(width > 500 ? 5 : 2).tickSize(-(height - margin.top - margin.bottom)).tickFormat(d => d3.format(',')(d));

        svg.append('g')
        .attr('class', 'axis xAxis')
        .attr('transform', `translate(0, ${
            margin.top
        })`).call(xAxis)
        .selectAll('.tick line')
        .classed('origin', d => d == 0);

        svg.selectAll('rect.bar')
            .data(yearSlice, d => d.name).enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', x(0) + 1)
            .attr('width', d => x(d.value) - x(0) - 1).attr('y', d => y(d.rank) + 5).attr('height', y(1) - y(0) - barPadding).style('fill', d => d.colour);

        svg.selectAll('text.label')
            .data(yearSlice, d => d.name)
            .enter().append('text')
            .attr('class', 'label')
            .attr('x', d => x(d.value) - 8)
            .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
            .style('text-anchor', 'end').html(d => d.name);

        svg.selectAll('text.valueLabel')
            .data(yearSlice, d => d.name)
            .enter()
            .append('text')
            .attr('class', 'valueLabel')
            .attr('x', d => x(d.value) + 5)
            .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
            .text(d => d3.format(',.0f')(d.lastValue));

        let yearText = svg.append('text')
                        .attr('class', 'yearText')
                        .attr('x', width - margin.right)
                        .attr('y', height - 25)
                        .style('text-anchor', 'end')
                        .html(~~ year)
                        .call(halo, 10);

        let ticker = d3.interval(e => {
        
            yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
                            .sort((a, b) => b.value - a.value)
                            .slice(0, top_n);

            yearSlice.forEach((d, i) => d.rank = i);

            // let yearSlice = data.filter(d => d.year == year && !isNaN(d.value)).sort((a, b) => b.value - a.value).slice(0, top_n);


            // console.log('IntervalYear: ', yearSlice);

            x.domain([
                0, d3.max(yearSlice, d => d.value)
            ]);

            svg.select('.xAxis')
                .transition()
                .duration(tickDuration)
                .ease(d3.easeLinear)
                .call(xAxis);

            let bars = svg
                .selectAll('.bar')
                .data(yearSlice, d => d.name);

            bars.enter()
                .append('rect')
                .attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
                .attr('x', x(0) + 1)
                .attr('width', d => x(d.value) - x(0) - 1)
                .attr('y', d => y(top_n + 1) + 5)
                .attr('height', y(1) - y(0) - barPadding)
                .style('fill', d => d.colour)
                .transition()
                .duration(tickDuration)
                .ease(d3.easeLinear)
                .attr('y', d => y(d.rank) + 5);

            bars.transition()
                .duration(tickDuration)
                .ease(d3.easeLinear)
                .attr('width', d => x(d.value) - x(0) - 1)
                .attr('y', d => y(d.rank) + 5);

            bars.exit()
                .transition()
                .duration(tickDuration)
                .ease(d3.easeLinear)
                .attr('width', d => x(d.value) - x(0) - 1).attr('y', d => y(top_n + 1) + 5)
                .remove();

            let labels = svg.selectAll('.label')
                            .data(yearSlice, d => d.name);

            labels.enter()
                .append('text')
                .attr('class', 'label')
                .attr('x', d => x(d.value) - 8)
                .attr('y', d => y(top_n + 1) + 5 + ((y(1) - y(0)) / 2))
                .style('text-anchor', 'end')
                .html(d => d.name)
                .transition()
                .duration(tickDuration).ease(d3.easeLinear)
                .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);


            labels.transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('x', d => x(d.value) - 8)
                    .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

            labels.exit()
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('x', d => x(d.value) - 8)
                    .attr('y', d => y(top_n + 1) + 5)
                    .remove();


            let valueLabels = svg.selectAll('.valueLabel')
                                    .data(yearSlice, d => d.name);

            valueLabels.enter()
                        .append('text')
                        .attr('class', 'valueLabel')
                        .attr('x', d => x(d.value) + 5)
                        .attr('y', d => y(top_n + 1) + 5)
                        .text(d => d3.format(',.0f')(d.lastValue))
                        .transition()
                        .duration(tickDuration)
                        .ease(d3.easeLinear)
                        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

            valueLabels.transition()
                        .duration(tickDuration)
                        .ease(d3.easeLinear)
                        .attr('x', d => x(d.value) + 5)
                        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
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
                        .attr('x', d => x(d.value) + 5)
                        .attr('y', d => y(top_n + 1) + 5)
                        .remove();

            yearText.html(~~ year);

            if (year == 2020) 
                ticker.stop();
            

            year = d3.format('.1f')((+ year) + 0.1);
        }, tickDuration);

    });

    const halo = function (text, strokeWidth) {
        text.select(function () {
            return this.parentNode.insertBefore(this.cloneNode(true), this);
        }).style('fill', '#ffffff').style('stroke', '#ffffff').style('stroke-width', strokeWidth).style('stroke-linejoin', 'round').style('opacity', 1);

    }

}
pintar1grafico()








// ********************Segundo Grafico - Companies with the Biggest Market Share //

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

pintar2grafico()




///////BOTONES

// Agregar botón para que se repita el primer grafico
var repeat1 = document.querySelector('#repeat1')

repeat1.addEventListener('click', () => {
    var grafico1 = document.querySelector("#bar-char-race")
    grafico1.innerHTML = ""
    pintar1grafico()
})

// Agregar botón para que se repita el segundo grafico
var repeat2 = document.querySelector('#repeat2')

repeat2.addEventListener('click', () => {
    var grafico2 = document.querySelector("#bar-char-race2")
    grafico2.innerHTML = ""
    pintar2grafico()
})