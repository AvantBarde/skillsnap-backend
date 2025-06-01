const express = require('express');
const cors = require('cors');
// Loads any .env variables in Render (optional but good)
require('dotenv').config();

const app = express();


//Prevents CORS errors when frontend is hosted elsewhere
app.use(cors());

//Enables JSON parsing for POST requests
app.use(express.json());

const jobRoutes = require('./routes/jobs')
//Gives you a test route at / to verify the server is up
app.get('/', (req, res) => res.send('SkillSnap API is live'));

app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;

	// Starts the server and confirms deployment worked
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
