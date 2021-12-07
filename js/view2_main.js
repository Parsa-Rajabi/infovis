const BC = {
    "01 - Vancouver Island": ["Colwood City Hall", "Courtenay Elementary School", "Crofton Elementary", "Crofton Substation", "Duncan College Street", "Duncan Deykin Avenue", "Elk Falls Dogwood", "Harmac Cedar Woobank", "Harmac Nanaimo Dukepoint", "Harmac Pacific Met_15", "Harmac Pacific Met_60", "Nanaimo Labieux Road", "Port Alberni Elementary", "Victoria Topaz", "Victoria Topaz Met_15", "Victoria Topaz Met_60"],
    "02 - Lower Mainland": ["Abbotsford A Columbia Street", "Abbotsford A Columbia Street Met", "Abbotsford Central", "Agassiz Municipal Hall", "Agassiz Municipal Hall Met", "Burnaby Burmount", "Burnaby Kensington Park", "Burnaby Mountain", "Burnaby North Eton", "Burnaby South", "Chilliwack Airport", "Coquitlam Douglas College", "CSpice Met_01", "CSpice_Met_60", "Hope Airport", "Hope Othello Compressor Station_15", "Hope Othello Compressor Station_60", "Horseshoe Bay", "Langdale Elementary", "Langley Central", "Maple Ridge Golden Ears School", "Mission School Works Yard", "Mission School Works Yard Met", "New Westminster Sapperton Park", "New Westminster Sapperton Park Met", "North Burnaby Capitol Hill", "North Delta", "North Vancouver Mahon Park", "North Vancouver Second Narrows", "Pitt Meadows Meadowlands School", "Port Mellon_15", "Port Mellon_60", "Port Moody Rocky Point Park", "Port Moody Rocky Point Park Met", "Powell River James Thomson School", "Powell River Pacifica Met_15", "Powell River Pacifica Met_60", "Powell River Townsite Helipad", "Richmond South", "Squamish Elementary", "Squamish Elementary_15", "Squamish Elementary_60", "Surrey East", "Tsawwassen", "Vancouver Clark Drive", "Vancouver Clark Drive Met", "Vancouver International Airport #2", "Vancouver Robson Square", "Whistler Meadow Park"],
    "03 - Southern Interior": ["Kamloops Federal Building", "Kelowna KLO Road", "Merritt Parcel Street Met_15", "Merritt Parcel Street Met_60", "Penticton Industrial Place", "Vernon Science Centre", "Vernon Science Centre_15", "Vernon Science Centre_60"],
    "04 - Kootenay": ["Birchbank Golf Course", "Birchbank Golf Course_15", "Birchbank Golf Course_60", "Castlegar Hospital", "Castlegar Zinio Park", "Celgar Pulp Met_15", "Celgar Pulp Met_60", "Cranbrook Muriel Baxter", "Golden Helipad", "Golden Lady Grey School Met_15", "Golden Lady Grey School Met_60", "Grand Forks Airport Met_15", "Grand Forks Airport Met_60", "Grand Forks City Hall", "Robson", "Scotties Marina", "Skookumchuck Farstad Way", "Skookumchuck Farstad Way_60", "Trail Butler Park", "Trail Butler Park Met_15", "Trail Butler Park Met_60", "Trail Columbia Gardens Airport", "Trail Columbia Gardens Airport_15", "Trail Columbia Gardens Airport_60", "Warfield Elementary", "Warfield Elementary Met_15", "Warfield Elementary Met_60"],
    "05 - Cariboo": ["Quesnel Anderson Drive", "Quesnel CP Met_15", "Quesnel CP Met_60", "Quesnel Kinchant St MAML", "Williams Lake Columneetza School", "Williams Lake Columneetza School_15", "Williams Lake Columneetza School_60"],
    "06 - Skeena": ["Burns Lake Fire Centre", "Burns Lake Fire Centre_15", "Burns Lake Fire Centre_60", "Burns Lake Sheraton East Met_15", "Burns Lake Sheraton East Met_60", "Fraser Lake Endako Mines_15", "Fraser Lake Endako Mines_60", "Houston Firehall", "Houston Firehall_15", "Houston Firehall_60", "Kitimat Haisla Village", "Kitimat Haul Road", "Kitimat Haul Road Met_15", "Kitimat Haul Road Met_60", "Kitimat Industrial Ave", "Kitimat Riverlodge", "Kitimat Whitesail", "Kitimat Whitesail Met_15", "Kitimat Whitesail Met_60", "Kitimat Yacht Club_15", "Kitimat Yacht Club_60", "Prince Rupert Fairview", "Prince Rupert Roosevelt Park School Met_15", "Prince Rupert Roosevelt Park School Met_60", "Smithers Muheim Memorial", "Smithers Muheim Memorial_15", "Smithers Muheim Memorial_60", "Stewart Youth Centre Met_15", "Stewart Youth Centre Met_60", "Telkwa_15", "Telkwa_60", "Terrace Skeena Middle School", "Terrace Skeena Middle School_15", "Terrace Skeena Middle School_60"],
    "07 - Omineca-Peace": ["Bessborough 237 Road", "Farmington Community Hall", "Farmington Community Hall Met_1", "Farmington Community Hall Met_15", "Farmington Community Hall Met_60", "Fort St John 85th Avenue_1", "Fort St John 85th Avenue_60", "Fort St John Key Learning Centre", "Fort St John North Camp C_1", "Fort St John North Camp C_60", "Fort St John North Camp C_Met_60", "Fort St John Old Fort_1", "Fort St John Old Fort_60", "Hudsons Hope Dudley Drive", "Peace Valley Attachie Flat Upper Terrace_1", "Peace Valley Attachie Flat Upper Terrace_60", "Peace Valley Attachie Flat Upper Terrace_Met_60", "PG Marsulex Met_1", "PG Marsulex Met_15", "PG Marsulex Met_60", "Pine River Gas Plant_60", "Pine River Hasler_60", "Prince George Exploration Place", "Prince George Exploration Place_1", "Prince George Exploration Place_60", "Prince George Jail", "Prince George Lakewood", "Prince George Marsulex Acid Plant", "Prince George Plaza 400", "Prince George Plaza 400 Met_15", "Prince George Plaza 400 Met_60", "Prince George Pulp Met_15", "Prince George Pulp Met_60", "Taylor South Hill", "Taylor Townsite", "Valemount", "Valemount Met_15", "Valemount Met_60", "Vanderhoof Courthouse", "Vanderhoof Courthouse Met_15", "Vanderhoof Courthouse Met_60"]
}

window.onload = function () {
    const station = localStorage.getItem("view1_station")
    const region = localStorage.getItem("view1_region")

    if (station && region) {
        displayRegion.textContent = "Region [" + region.slice(5) + "]"
        displayStation.textContent = "Air Station [" + station + "]"
        draw(region, station)
    } else if (!region && station) {
        displayRegion.textContent = getKeyByValue(BC, station)
        displayStation.textContent = station
        draw(getKeyByValue(BC, station), station)
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(k => object[k].includes(value))
}

const TIME = "TIME",
    REGION = "REGION",
    STATION_NAME_FULL = "STATION_NAME_FULL",
    STATION_NAME = "STATION_NAME",
    DATE_PST = "DATE_PST",
    DATE = "DATE",
    CO = "CO",
    CO_ppm = "CO_ppm",
    O3 = "O3",
    SO2 = "SO2",
    NO = "NO",
    NO2 = "NO2",
    NOX = "NOX",
    CO_full = "Carbon Monoxide (CO)",
    O3_full = "Ground-level Ozone (O3)",
    SO2_full = "Sulfur Dioxide (SO2)",
    NO_full = "Nitric Oxide (NO)",
    NO2_full = "Nitrogen Dioxide (NO2)",
    NOX_full = "Nitrogen Oxides (NOx)",
    red = "#e41a1c",
    orange = "#FFA500",
    gray = "#808080",
    brown = "#852415",
    green = "#228B22",
    black = "#000000",
    purple = "#800080";


function missingData(chartID, gas, colour) {
    console.log("Not enough data for " + gas)
    document.getElementById(chartID).style.display = "none"
    document.getElementById(chartID + "-missingText").textContent = "This air station is missing data for " + gas
    document.getElementById(chartID + "-missingText").style.color = colour
}

function draw(view1_region, view1_station) {
    console.log("selected region " + view1_region)
    console.log("selected station " + view1_station)

    d3.csv("data/1_CO_12.csv", function (d) {
        if (d[REGION] === view1_region && d[STATION_NAME].toLowerCase() === view1_station.toLowerCase()) {
            return d
        }
    }).then(d => {
        d.forEach(d => {
            delete d[DATE_PST]
            delete d[CO_ppm]
            delete d[STATION_NAME_FULL]
            delete d[STATION_NAME]
            delete d[REGION]
            delete d[TIME]
            Object.defineProperty(d, DATE.toLowerCase(), Object.getOwnPropertyDescriptor(d, DATE));
            delete d[DATE];
        })
        d.columns = [DATE.toLowerCase(), CO]
        if (d.length > 0) {
            chart(d, "chart1", CO_full, orange)
            console.log("Loading CO")
        } else {
            missingData("chart1", CO_full, red)
        }

    })

    d3.csv("data/2_O3_12.csv", function (d) {
        if (d[REGION] === view1_region && d[STATION_NAME].toLowerCase() === view1_station.toLowerCase()) {
            return d
        }
    }).then(d => {
        if (d.length > 0) {
            d.forEach(d => {
                delete d[DATE_PST]
                delete d[STATION_NAME_FULL]
                delete d[STATION_NAME]
                delete d[REGION]
                delete d[TIME]
                delete d["O3_OK"]
                Object.defineProperty(d, DATE.toLowerCase(), Object.getOwnPropertyDescriptor(d, DATE));
                delete d[DATE];
            })
            d.columns = [DATE.toLowerCase(), O3]
            chart(d, "chart2", O3_full, gray)
            console.log("Loading O3")
        } else {
            missingData("chart2", O3_full, red)
        }
    })

    d3.csv("data/3_SO2_12.csv", function (d) {
        if (d[REGION] === view1_region && d[STATION_NAME].toLowerCase() === view1_station.toLowerCase()) {
            return d
        }
    }).then(d => {
        d.forEach(d => {
            delete d[DATE_PST]
            delete d[STATION_NAME_FULL]
            delete d[STATION_NAME]
            delete d[REGION]
            delete d[TIME]
            Object.defineProperty(d, DATE.toLowerCase(), Object.getOwnPropertyDescriptor(d, DATE));
            delete d[DATE];
        })
        d.columns = [DATE.toLowerCase(), SO2]
        if (d.length > 0) {
            chart(d, "chart3", SO2_full, brown)
            console.log("Loading SO2")
        } else {
            missingData("chart3", SO2_full, red)
        }
    })

    d3.csv("data/4_NO_12.csv", function (d) {
        if (d[REGION] === view1_region && d[STATION_NAME].toLowerCase() === view1_station.toLowerCase()) {
            return d
        }
    }).then(d => {
        d.forEach(d => {
            delete d[DATE_PST]
            delete d[STATION_NAME_FULL]
            delete d[STATION_NAME]
            delete d[REGION]
            delete d[TIME]
            Object.defineProperty(d, DATE.toLowerCase(), Object.getOwnPropertyDescriptor(d, DATE));
            delete d[DATE];
        })
        d.columns = [DATE.toLowerCase(), NO]
        if (d.length > 0) {
            chart(d, "chart4", NO_full, purple)
        } else {
            missingData("chart4", NO_full, red)
        }
    })

    d3.csv("data/5_NO2.csv", function (d) {
        if (d[REGION] === view1_region && d[STATION_NAME].toLowerCase() === view1_station.toLowerCase()) {
            return d
        }
    }).then(d => {
        d.forEach(d => {
            delete d[DATE_PST]
            delete d[STATION_NAME_FULL]
            delete d[STATION_NAME]
            delete d[REGION]
            delete d[TIME]
            Object.defineProperty(d, DATE.toLowerCase(), Object.getOwnPropertyDescriptor(d, DATE));
            delete d[DATE];
        })
        d.columns = [DATE.toLowerCase(), NO2]
        if (d.length > 0) {
            chart(d, "chart5", NO2_full, green)
            console.log("Loading NO2")
        } else {
            missingData("chart5", NO2_full, red)
        }
    })

    d3.csv("data/6_NOx_12.csv", function (d) {
        if (d[REGION] === view1_region && d[STATION_NAME].toLowerCase() === view1_station.toLowerCase()) {
            return d
        }
    }).then(d => {
        d.forEach(d => {
            delete d[DATE_PST]
            delete d[STATION_NAME_FULL]
            delete d[STATION_NAME]
            delete d[REGION]
            delete d[TIME]
            Object.defineProperty(d, DATE.toLowerCase(), Object.getOwnPropertyDescriptor(d, DATE));
            delete d[DATE];
        })
        d.columns = [DATE.toLowerCase(), NOX]
        if (d.length > 0) {
            chart(d, "chart6", NOX_full, black)
            console.log("Loading NOx")
        } else {
            missingData("chart6", NOX_full, red)
        }
    })
}