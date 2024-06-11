// Import the Serply module
const Serply = require('serply');

// Initialize Serply with your API key
const serply = new Serply('N4shxJsBsGLLvTM9VQvKxXdn');

// Function to get the logo image link from Wikimedia for a given college
async function getImage(college) {
  // Get image results from Serply
  const results = await serply.image(college + "logo wikimedia transparent background");
  const imgs = results.image_results;

  // Iterate through the image results
  for (const img of imgs) {
    if (img.link.domain.includes("commons.wikimedia.org")) {
    //   console.log("WIKIMEDIA FOUND");
      console.log(img.link.href)
      return img.link.href;
    }
  }
}

// Call the function with the college name
getImage("Cornell University")
  .then((logoLink) => console.log(logoLink))
  .catch((error) => console.error(error));
