import { useState } from 'react';
const request = require('request');
const cheerio = require('cheerio');

// Initial text state
let txt = "";

// Function to return the current search text
function search() {
    return txt;
}

// Function to update the text based on an element's value
function logChanges(id) {
    try {
        txt = document.getElementById(id).value;
    } catch (error) {
        console.error(`Error getting element with ID ${id}:`, error);
        throw new Error("Failed to get element");
    }
}

// Dictionary of college icons
const dict = {
    "Cornell University": "https://upload.wikimedia.org/wikipedia/commons/4/42/Cornell_University_Logo.png",
    "Cornell": "https://upload.wikimedia.org/wikipedia/commons/4/42/Cornell_University_Logo.png",
    "Stanford University": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/670px-Stanford_Cardinal_logo.svg.png"
};

// Function to check if the college icon is in the dictionary, otherwise fetch it
async function checkIcon(college) {
    try {
        console.log("Searching for " + college + "...");
        if (dict[college]) {
            console.log("Found \"" + college + "\" in dictionary");
            return dict[college];
        } else {
            console.log("Image not found, fetching...");
            try {
                const icon = await executePython(college);
                dict[college] = icon;
                dict[college.split(' ')[0]] = icon;
                return icon;
            } catch (error) {
                console.error("Error getting image for " + college + ": " + error);
                throw new Error("Failed to fetch image for " + college);
            }
        }
    } catch (error) {
        console.error("Error fetching image for " + college + ": " + error);
        throw new Error("Failed to get college icon for " + college);
    }
}

function getIcon(college) {
    const college = "Stanford";
    const query = college + " logo wikimedia transparent background";
    const url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}`;

    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);
            const images = [];

            $('img').each((index, element) => {
                const imageUrl = $(element).attr('src');
                if (imageUrl) {
                    images.push(imageUrl);
                }
            });

            if (images.length > 0) {
                console.log(images[0]);
            } else {
                console.error('No images found for the query:', query);
            }
        } else {
            console.error('Failed to fetch images:', error);
        }
    });
}



export { search, logChanges, checkIcon, executePython };
