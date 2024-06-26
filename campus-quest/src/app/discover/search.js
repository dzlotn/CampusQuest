import { useState } from 'react';

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
let dict = {};

// Function to read data from localStorage and populate the dict object
function readLocalStorage() {
    const data = localStorage.getItem('college_icons');
    if (data) {
        const entries = JSON.parse(data);
        for (const [college, url] of entries) {
            dict[college] = url;
        }
        console.log("Dictionary populated from localStorage:", dict);
    }
}

// Function to write data to localStorage
function writeToLocalStorage(college, url) {
    const data = localStorage.getItem('college_icons');
    const entries = data ? JSON.parse(data) : [];
    entries.push([college, url]);
    localStorage.setItem('college_icons', JSON.stringify(entries));
    console.log("Data appended to localStorage:", college, url);
    readLocalStorage()
}

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
                const icon = await getIcon(college);
                dict[college] = icon;
                dict[college.split(' ')[0]] = icon;
                console.log("Image fetched:", icon);
                writeToLocalStorage(college, icon);
                console.log("Hello")
                console.log(dict)
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

// Function to fetch college logo from Yahoo
async function getIcon(college) {
    const query = college + " logo wikimedia transparent background";
    const url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);
        return images[1]; // Returning the first image URL
    } catch (error) {
        console.error('Failed to fetch images. Error:', error);
        throw new Error('Failed to fetch all images ' + college);
    }
}

// Read data from localStorage on application start

// Example usage


export { search, logChanges, checkIcon };
