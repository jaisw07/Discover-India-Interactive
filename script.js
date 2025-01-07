// script.js
const states = {
    "Maharashtra": {
        "name": "Maharashtra",
        "details": "Known for Mumbai, the financial capital of India.",
        "image": "images/mumbai.jpg"
    },
    // Add more states here
};

const svg = d3.select("#india-map")
    .attr("width", "100%")
    .attr("height", "100%");

d3.json("assets/indiageojson.geojson").then(data => {
    const projection = d3.geoMercator().fitSize([1000, 600], data);
    const path = d3.geoPath().projection(projection);

    svg.selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "state")
        .style("fill", "black") // Set the initial color to black
        .on("mouseover", function (event, d) {
            const stateName = d.properties.name;
            if (states[stateName]) {
                const stateInfo = states[stateName];
                d3.select("#state-name").text(stateInfo.name);
                d3.select("#state-details").text(stateInfo.details);
                d3.select("#state-info")
                    .style("display", "block")
                    .style("top", event.pageY + "px")
                    .style("left", event.pageX + "px");
            }
            d3.select(this).style("fill", "red"); // Change color to red on hover
        })
        .on("mouseout", function () {
            d3.select("#state-info").style("display", "none"); // Hide the info box
            d3.select(this).style("fill", "black"); // Reset to default black color
        });

});
