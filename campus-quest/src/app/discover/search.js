const SerpApi = require('serpapi');
const apiKey = "N4shxJsBsGLLvTM9VQvKxXdn"; // Replace with your SerpApi API key

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

const dict = {
    "Cornell University": "https://upload.wikimedia.org/wikipedia/commons/4/42/Cornell_University_Logo.png",
    "Cornell": "https://upload.wikimedia.org/wikipedia/commons/4/42/Cornell_University_Logo.png",
    "Stanford University": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/670px-Stanford_Cardinal_logo.svg.png"
};

async function getIcon(college) {
    try {
        console.log("Fetching image for " + college + "...");
        const search = new SerpApi.GoogleSearch(apiKey);

        const params = {
            engine: "google",
            q: college + " logo",
            tbm: "isch"
        };

        return new Promise((resolve, reject) => {
            search.json(params, (data) => {
                if (data && data.images_results && data.images_results.length > 0) {
                    resolve(data.images_results[0].thumbnail);
                } else {
                    reject("No image found");
                }
            });
        });
    } catch (error) {
        console.log("Error fetching image for " + college + ": " + error);
        throw new Error("Failed to fetch image for " + college);
    }
}


// Checks if icon pic is in dictionary. If it is, it returns the image link
async function checkIcon(college) {
    try {
        console.log("Searching for " + college + "...");
        if (college in dict) {
            console.log("Found \"" + college + "\" in dictionary");
            return dict[college];
        } else {
            console.log("Image not found");
            try {
                const icon = await getIcon(college);
                dict[college] = icon;
                dict[college.split(' ')[0]] = icon;
                return icon;
            } catch (error) {
                console.log("Error getting image for " + college + ": " + error);
                throw new Error("Failed to fetch image for " + college);
            }
        }
    } catch (error) {
        console.log("Error fetching image for " + college + ": " + error);
        throw new Error("Failed to get college icon for " + college);
    }
}


module.exports = { search, logChanges, checkIcon };
