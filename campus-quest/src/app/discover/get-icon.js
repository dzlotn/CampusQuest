import { spawn } from 'child_process';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { college } = req.body;

        // Spawn a new Python process
        const pythonProcess = spawn('python', ['../../api.py']);

        // Send data to the Python process
        pythonProcess.stdin.write(JSON.stringify({ college: college }));
        pythonProcess.stdin.end();

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                res.status(500).json({ error: `Python script exited with code ${code}` });
            } else {
                try {
                    res.status(200).json(JSON.parse(result));
                } catch (error) {
                    res.status(500).json({ error: `Failed to parse JSON response: ${error}` });
                }
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
