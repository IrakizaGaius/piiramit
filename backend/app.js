const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');
const clinicsRoute = require('./routes/clinics');
const appointmentsRoute = require('./routes/appointments');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the '../src' directory
const staticPath = path.join(__dirname, '../src');
app.use(express.static(staticPath));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);
app.use('/clinics', clinicsRoute);
app.use('/appointments', appointmentsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
