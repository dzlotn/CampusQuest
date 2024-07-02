// Import isomorphic-fetch
import fetch from 'isomorphic-fetch';

// Function to fetch admissions data from the College Scorecard API
export async function fetchAdmissionsData(college) {
    const apiKey = "5elOYbbfPfFRR0JwuFqKOmwz2PxqVlNZKuvTpukC";
    const apiUrl = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&school.name=${encodeURIComponent(college)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch college data');
        }
        const json = await response.json();

        // Check if the JSON structure is as expected
        if (!json.results || json.results.length === 0 || !json.results[0].latest) {
            throw new Error('No data found for college: ' + college);
        }

        // Access admissions rate and tuition cost
        const acceptanceRate = json.results[0].latest.admissions.admission_rate.overall.toFixed(2);
        const tuitionCost = json.results[0].latest.cost.tuition.in_state;
        
        // Access city and state information
        const city = json.results[0].school.city;
        const state = json.results[0].school.state
        
        

        return { acceptanceRate, tuitionCost, city, state};
    } catch (error) {
        console.error('Error fetching admissions data:', error);
        throw new Error('Failed to fetch admissions data for ' + college);
    }
}

// Function to test fetching college admissions data
export async function testCollegeInfo(college) {
    try {
        const { acceptanceRate, tuitionCost, city, state } = await fetchAdmissionsData(college);
        return { acceptanceRate, tuitionCost, city, state };
    } catch (error) {
        console.error("Error fetching college info:", error);
        throw error; // Re-throw the error for handling elsewhere if needed
    }
}
