const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Endpoint to handle predictions
app.post('/predict', (req, res) => {
  const { product } = req.body;

  // Spawn a Python process to run your machine learning model
  const pythonProcess = spawn('python', ['./health.py', product]);

  // Collect data from the Python process
  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  // Handle the end of the Python process
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.json({ result: result.trim() });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
