const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

// Endpoint to handle predictions
app.post('/predict', (req, res) => {
  const { calories, calories_from_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carb } = req.body;

  // Spawn a Python process to run the model
  const pythonProcess = spawn('python', ['health.py', calories, calories_from_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carb]);

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