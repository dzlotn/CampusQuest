const request = require('request');
const cheerio = require('cheerio');
function getIcon(college) {

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
getIcon("Cornell")