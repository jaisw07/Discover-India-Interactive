let states = {};
let districts = {};

// Fetch states and GeoJSON data
Promise.all([
    fetch('assets/states.json').then(response => response.json()),
    d3.json("assets/indiageojson.geojson")
]).then(([stateData, geoData]) => {
    states = stateData;
    console.log("States' and districts' data loaded successfully!");

    // Separate districts from states
    const districtFeatures = geoData.features.filter(d => d.properties.district); // District features
    const stateFeatures = geoData.features.filter(d => !d.properties.district); // State features

    const svg = d3.select("#india-map")
        .attr("width", "100%")
        .attr("height", "100%");

    const projection = d3.geoMercator().fitSize([1000, 600], geoData);
    const path = d3.geoPath().projection(projection);

// Draw districts as the interactive foreground layer
svg.selectAll(".district")
    .data(districtFeatures)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "district")
    .style("fill", "white") // Initial color
    .style("stroke", "grey") // District boundary color
    .style("stroke-width", "1px") // Thinner stroke for district boundaries
    .on("mouseover", handleMouseOverDistrict)
    .on("mousemove", handleMouseMove)
    .on("mouseout", handleMouseOut);

// Draw state boundaries on top of the district boundaries
svg.selectAll(".state")
    .data(stateFeatures)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "state")
    .style("fill", "none") // Ensure state boundaries only provide the outline
    .style("stroke", "black") // State boundary color overrides district boundaries
    .style("stroke-width", "1px"); // Thicker stroke for prominence



    // Event Handlers for Districts
    function handleMouseOverDistrict(event, d) {
        const districtName = d.properties.district;
        if (districtName) {
            d3.select("#state-name").text(districtName); // Update district name
            d3.select("#state-details").text(`District of ${d.properties.st_nm}`); // Show associated state
            d3.select("#state-image").attr("src", states[d.properties.st_nm]?.image || ""); // Optional: State image
            d3.select("#state-info")
                .style("display", "block")
                .style("top", `${event.pageY + 10}px`)
                .style("left", `${event.pageX + 10}px`);
        }
        d3.select(this).style("fill", "red"); // Highlight district
    }

    function handleMouseMove(event) {
        const tooltip = d3.select("#state-info");
        let tooltipX = event.pageX + 10;
        let tooltipY = event.pageY + 10;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Ensure tooltip stays within the viewport
        if (tooltipX + tooltip.node().offsetWidth > windowWidth) {
            tooltipX = windowWidth - tooltip.node().offsetWidth - 10;
        }
        if (tooltipY + tooltip.node().offsetHeight > windowHeight) {
            tooltipY = windowHeight - tooltip.node().offsetHeight - 10;
        }

        tooltip.style("top", `${tooltipY}px`).style("left", `${tooltipX}px`);
    }

    function handleMouseOut() {
        d3.select("#state-info").style("display", "none"); // Hide tooltip
        d3.select(this).style("fill", "white"); // Reset color
    }
}).catch(error => console.error('Error fetching data:', error));
