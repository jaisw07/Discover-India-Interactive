const states = {
    "Andhra Pradesh": {
        "name": "Andhra Pradesh",
        "details": "Known for the famous Tirupati Balaji temple.",
        "image": "images/tirupati.jpg"
    },
    "Arunachal Pradesh": {
        "name": "Arunachal Pradesh",
        "details": "Famous for its monasteries and serene landscapes.",
        "image": "images/tawang.jpg"
    },
    "Assam": {
        "name": "Assam",
        "details": "Known for Kaziranga National Park and tea plantations.",
        "image": "images/kaziranga.jpg"
    },
    "Bihar": {
        "name": "Bihar",
        "details": "Known for Bodh Gaya, the place of Buddha's enlightenment.",
        "image": "images/bodhgaya.jpg"
    },
    "Chhattisgarh": {
        "name": "Chhattisgarh",
        "details": "Famous for its waterfalls and temples.",
        "image": "images/chitrakoot.jpg"
    },
    "Goa": {
        "name": "Goa",
        "details": "Known for its beautiful beaches and vibrant nightlife.",
        "image": "images/goa.jpg"
    },
    "Gujarat": {
        "name": "Gujarat",
        "details": "Famous for the Rann of Kutch and Gir National Park.",
        "image": "images/kutch.jpg"
    },
    "Haryana": {
        "name": "Haryana",
        "details": "Known for its historical monuments and temples.",
        "image": "images/kurukshetra.jpg"
    },
    "Himachal Pradesh": {
        "name": "Himachal Pradesh",
        "details": "Famous for its hill stations like Shimla and Manali.",
        "image": "images/shimla.jpg"
    },
    "Jharkhand": {
        "name": "Jharkhand",
        "details": "Known for its waterfalls and national parks.",
        "image": "images/hundru.jpg"
    },
    "Kerala": {
        "name": "Kerala",
        "details": "Known for its backwaters and houseboats.",
        "image": "images/alleppey.jpg"
    },
    "Madhya Pradesh": {
        "name": "Madhya Pradesh",
        "details": "Famous for Khajuraho temples and wildlife reserves.",
        "image": "images/khajuraho.jpg"
    },
    "Maharashtra": {
        "name": "Maharashtra",
        "details": "Known for Mumbai, the financial capital of India.",
        "image": "images/mumbai.jpg"
    },
    "Manipur": {
        "name": "Manipur",
        "details": "Famous for its classical dance and Loktak Lake.",
        "image": "images/loktak.jpg"
    },
    "Meghalaya": {
        "name": "Meghalaya",
        "details": "Known for Cherrapunji and its living root bridges.",
        "image": "images/cherrapunji.jpg"
    },
    "Mizoram": {
        "name": "Mizoram",
        "details": "Famous for its scenic landscapes and cultural festivals.",
        "image": "images/aizawl.jpg"
    },
    "Nagaland": {
        "name": "Nagaland",
        "details": "Known for its Hornbill Festival and tribal culture.",
        "image": "images/kohima.jpg"
    },
    "Odisha": {
        "name": "Odisha",
        "details": "Famous for the Jagannath Temple and Konark Sun Temple.",
        "image": "images/konark.jpg"
    },
    "Punjab": {
        "name": "Punjab",
        "details": "Known for the Golden Temple in Amritsar.",
        "image": "images/goldentemple.jpg"
    },
    "Rajasthan": {
        "name": "Rajasthan",
        "details": "Famous for its palaces, forts, and deserts.",
        "image": "images/jaisalmer.jpg"
    },
    "Sikkim": {
        "name": "Sikkim",
        "details": "Known for its monasteries and scenic beauty.",
        "image": "images/gangtok.jpg"
    },
    "Tamil Nadu": {
        "name": "Tamil Nadu",
        "details": "Famous for its temples and classical music and dance.",
        "image": "images/madurai.jpg"
    },
    "Telangana": {
        "name": "Telangana",
        "details": "Known for the Charminar and Golconda Fort.",
        "image": "images/charminar.jpg"
    },
    "Tripura": {
        "name": "Tripura",
        "details": "Famous for its palaces and temples.",
        "image": "images/neermahal.jpg"
    },
    "Uttar Pradesh": {
        "name": "Uttar Pradesh",
        "details": "Known for the Taj Mahal and Varanasi.",
        "image": "images/tajmahal.jpg"
    },
    "Uttarakhand": {
        "name": "Uttarakhand",
        "details": "Famous for its hill stations and pilgrimage sites.",
        "image": "images/haridwar.jpg"
    },
    "West Bengal": {
        "name": "West Bengal",
        "details": "Known for the Sundarbans and Victoria Memorial.",
        "image": "images/kolkata.jpg"
    },
    "Andaman and Nicobar Islands": {
        "name": "Andaman and Nicobar Islands",
        "details": "Famous for its pristine beaches and marine life.",
        "image": "images/andaman.jpg"
    },
    "Chandigarh": {
        "name": "Chandigarh",
        "details": "Known for its modern architecture and gardens.",
        "image": "images/rockgarden.jpg"
    },
    "Dadra and Nagar Haveli and Daman and Diu": {
        "name": "Dadra and Nagar Haveli and Daman and Diu",
        "details": "Famous for its beaches and historical landmarks.",
        "image": "images/daman.jpg"
    },
    "Lakshadweep": {
        "name": "Lakshadweep",
        "details": "Known for its coral reefs and water sports.",
        "image": "images/agatti.jpg"
    },
    "Delhi": {
        "name": "Delhi",
        "details": "The capital city of India, known for its rich history.",
        "image": "images/delhi.jpg"
    },
    "Puducherry": {
        "name": "Puducherry",
        "details": "Famous for its French colonial architecture and beaches.",
        "image": "images/puducherry.jpg"
    },
    "Ladakh": {
        "name": "Ladakh",
        "details": "Known for its stunning landscapes and monasteries.",
        "image": "images/leh.jpg"
    },
    "Jammu and Kashmir": {
        "name": "Jammu and Kashmir",
        "details": "Famous for its beautiful valleys and houseboats.",
        "image": "images/srinagar.jpg"
    }
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
        .style("fill", "white") // Set the initial color to white
        .style("stroke", "black")
        .on("mouseover", function (event, d) {
            const stateName = d.properties.st_nm;
            
            if (states[stateName]) {
                const stateInfo = states[stateName];
                console.log("State Info Found:", stateInfo); // Debug: Log state info
                d3.select("#state-name").text(stateInfo.name); // Update state name
                d3.select("#state-details").text(stateInfo.details); // Update state details
                d3.select("#state-info")
                    .style("display", "block")
                    .style("top", `${event.pageY + 10}px`) // Adjust position
                    .style("left", `${event.pageX + 10}px`);
            }
            d3.select(this).style("fill", "red"); // Highlight the state on hover
        })        
        .on("mousemove", function (event) {
            d3.select("#state-info")
                .style("top", `${event.pageY + 10}px`)
                .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
            d3.select("#state-info").style("display", "none");
            d3.select(this).style("fill", "white"); // Reset color
        });        
});
