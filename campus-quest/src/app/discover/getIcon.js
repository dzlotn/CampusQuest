const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const college = "Stanford";
    let dataToSend;

    // spawn new child process to call the python script 
    // and pass the variable values to the python script
    const python = spawn('python', ['api.py', college]);

    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
        // res.send(dataToSend); // send data to browser
    });

    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}!`);
});
