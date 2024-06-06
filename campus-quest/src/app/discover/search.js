const axios = require("axios");
const cheerio = require("cheerio");

let txt = "";

function search() {
    return txt;
}

function logChanges(id) {
    try {
        txt = document.getElementById(id).value;
    } catch (error) {
        console.error(`Error getting element with ID ${id}:`, error);
        throw new Error("Failed to get element");
    }
}

async function getCollegeInfo(collegeName) {
    try {
        const response = await axios.get("https://example.com", {
            params: { query: collegeName }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        const acceptanceRate = $('selector-for-acceptance-rate').text();
        console.log(acceptanceRate);
        return {
            name: collegeName,
            acceptanceRate
        };
    } catch (error) {
        console.error("Error fetching college information:", error);
        throw new Error("Failed to fetch college information");
    }
}

module.exports = { search, logChanges, getCollegeInfo };
