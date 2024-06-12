
// Function to execute the Python script and return a promise
function runPythonScript(college) {
    const { spawn } = require('child_process');

    return new Promise((resolve, reject) => {
        const python = spawn('python', ['api.py', college]);

        let dataToSend = '';

        python.stdout.on('data', (data) => {
            dataToSend += data.toString();
        });

        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        python.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            } else {
                resolve(dataToSend);
            }
        });
    });
}

// Execute the function
function executePython(){
    const college = "Stanford";
runPythonScript(college)
    .then(result => {
        console.log('Result:', result);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}

