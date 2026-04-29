const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Save admission form
app.post('/admission', (req, res) => {
  const data = req.body;

  let existing = [];
  if (fs.existsSync('data.json')) {
    existing = JSON.parse(fs.readFileSync('data.json'));
  }

  existing.push(data);
  fs.writeFileSync('data.json', JSON.stringify(existing, null, 2));

  res.json({ message: 'Admission submitted successfully!' });
});

// Get all admissions (admin use)
app.get('/admissions', (req, res) => {
  if (!fs.existsSync('data.json')) return res.json([]);
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
