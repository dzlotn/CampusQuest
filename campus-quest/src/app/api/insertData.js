const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'public', 'data.json');


// Read data from JSON file
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
    console.log("data read")

  } catch (error) {
    console.error('Error reading data file:', error);
    return [];

  }
}

// Write data to JSON file
function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    console.log('Data written to file successfully');
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}

// Add new entry to data file
function addEntry(newEntry) {
  const data = readData();
  data.push(newEntry);
  writeData(data);
}

module.exports = {
  addEntry
};