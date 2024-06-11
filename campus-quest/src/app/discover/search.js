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
                dict[college] = icon.url;
                dict[college.split(' ')[0]] = icon.url;
                return icon.url;
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

// Function to call the API route and get the icon URL
async function getIcon(college) {
    const response = await fetch('./get-icon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ college: college })
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch icon: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.error) {
        throw new Error(`API error: ${data.error}`);
    }

    return data;
}

// Example usage
checkIcon('Cornell University')
    .then(result => {
        console.log('Icon URL:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });

module.exports = { search, logChanges, checkIcon };
