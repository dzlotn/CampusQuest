// Import isomorphic-fetch
import fetch from 'isomorphic-fetch';

async function abbrState(input, to){
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
     if (to == 'name'){
        for(var i = 0; i < states.length; i++){
            if(states[i][1] == input){
                console.log("ABBR-ST-fd")
                return(states[i][0]);
            }
        }    
    }
}
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
        const tC = json.results[0].latest.cost.tuition.in_state;
        const tuitionCost = tC.toLocaleString();
        console.log(tuitionCost)
        console.log(tC)
        
        // Access city and state information
        const city = json.results[0].school.city;
        const st = json.results[0].school.state;
        const state = await abbrState(String(st), "name")
        
        

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
