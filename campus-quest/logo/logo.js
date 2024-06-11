const express = require('express')
const { spawn } = require('child_process');
const app = express()
const port = 3000

app.get('/', (req, res) => {

    const firstNum = 4;
    const secondNum = 7;

    let dataToSend;
    // spawn new child process to call the python script 
    // and pass the variable values to the python script
    const python = spawn('python', ['index.py', firstNum , secondNum]);

    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');

        dataToSend = data.toString();
        console.log(dataToSend)

    });
    console.log("hello")
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
    });

})

app.listen(port, () => {
    console.log(`app is listening on port ${port}!`)
})