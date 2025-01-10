let states = {};

// Fetch states and GeoJSON data
Promise.all([
    fetch('assets/states.json').then(response => response.json()),
    d3.json("assets/indiageojson.geojson")
]).then(([stateData, geoData]) => {
    states = stateData;
    console.log("States' data loaded successfully!");

    const svg = d3.select("#india-map")
        .attr("width", "100%")
        .attr("height", "100%");

    const projection = d3.geoMercator().fitSize([1000, 600], geoData);
    const path = d3.geoPath().projection(projection);

    // Draw states
    svg.selectAll("path")
        .data(geoData.features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "state")
        .style("fill", "white") // Initial color
        .style("stroke", "black")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut);

    // Add hitbox for Lakshadweep
    svg.selectAll(".hitbox")
        .data(geoData.features.filter(d => d.properties.st_nm === "Lakshadweep"))
        .enter().append("circle")
        .attr("cx", d => path.centroid(d)[0])
        .attr("cy", d => path.centroid(d)[1])
        .attr("r", 15) // Larger radius for easier hover
        .style("fill", "transparent") // Invisible fill
        .style("fill-opacity", "0") // Ensure no visual opacity
        .style("pointer-events", "all") // Maintain interactivity
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut);

    // Event Handlers
    function handleMouseOver(event, d) {
        const stateName = d.properties.st_nm;
        if (states[stateName]) {
            const stateInfo = states[stateName];
            d3.select("#state-name").text(stateInfo.name); // Update state name
            d3.select("#state-details").text(stateInfo.details); // Update state details
            d3.select("#state-image").attr("src", stateInfo.image); // Update state image
            d3.select("#state-info")
                .style("display", "block")
                .style("top", `${event.pageY + 10}px`) // Position the tooltip
                .style("left", `${event.pageX + 10}px`);
        }
        d3.select(this).style("fill", d => d.geometry.type === "Point" ? "none" : "red"); // Highlight state
    }

    function handleMouseMove(event) {
        d3.select("#state-info")
            .style("top", `${event.pageY}px`)
            .style("left", `${event.pageX - 100}px`);
    }

    function handleMouseOut() {
        d3.select("#state-info").style("display", "none"); // Hide tooltip
        d3.select(this).style("fill", d => d.geometry.type === "Point" ? "none" : "white"); // Reset color
    }
}).catch(error => console.error('Error fetching data:', error));
