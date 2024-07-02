// Import node-fetch using dynamic import
const fetch = import('node-fetch');

// Function to fetch admissions data from the College Scorecard API
async function fetchAdmissionsData(college) {
    const apiKey = "5elOYbbfPfFRR0JwuFqKOmwz2PxqVlNZKuvTpukC";
    const apiUrl = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&school.name=${encodeURIComponent(college)}`;

    try {
        const response = await (await fetch).default(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch college data');
        }
        const json = await response.json();

        // Check if the JSON structure is as expected
        if (!json.results || json.results.length === 0 || !json.results[0].latest) {
            throw new Error('No data found for college: ' + college);
        }

        // Access admissions rate and tuition cost
        const admissionsData = {
            admissionRate: json.results[0].latest.admissions.admission_rate.overall.toFixed(2),
            tuitionCost: json.results[0].latest.cost.tuition.in_state
        };

        return admissionsData;
    } catch (error) {
        console.error('Error fetching admissions data:', error);
        throw new Error('Failed to fetch admissions data for ' + college);
    }
}

// Function to test fetching college admissions data
async function testCollegeInfo(college) {
    try {
        const admissionsData = await fetchAdmissionsData(college);
        console.log("College:", college);
        console.log("Admissions Data:", admissionsData);
    } catch (error) {
        console.error("Error fetching college info:", error);
    }
}

// Example usage
const collegeName = "Cornell University";
testCollegeInfo(collegeName);
