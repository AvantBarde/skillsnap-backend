const express = require('express');
const router = express.Router();
const axios = require('axios');
// const externalJobs = require('../data/externalJobs.json');

// router.get('/external', (req, res) => {
//   res.json(externalJobs)
// })

router.post('/match', async (req, res) => {
  console.log("RAW req.body received:", req.body);

  const { skills } = req.body;

  if (!skills || !Array.isArray(skills)) {
    console.log("Invalid skills format:", skills);
    return res.status(400).json({ error: 'Invalid skills format.' });
  }

  try {
    console.log("Fetching jobs from Remotive API...");
    const response = await axios.get('https://remotive.io/api/remote-jobs?category=software-dev');

    const allJobs = response.data.jobs;
    console.log(`Received ${allJobs.length} jobs from Remotive.`);

    const matchedJobs = allJobs.filter(job => {
      const jobText = (job.description + job.title).toLowerCase();
      return skills.some(skill => jobText.includes(skill.toLowerCase()));
    });

    console.log(`Matched ${matchedJobs.length} jobs.`);
    res.json(matchedJobs);
  } catch (error) {
    console.error("🔥 ERROR FETCHING FROM REMOTIVE:", error.message);
    res.status(500).json({ error: 'Error retrieving jobs from external source.' });
  }
});

module.exports = router;
