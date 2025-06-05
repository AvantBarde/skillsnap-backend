const express = require('express');
const axios = require('axios');
const router = express.Router();
const https = require('https'); // ✅ Add this

// 🔧 Create agent that skips SSL validation
const agent = new https.Agent({ rejectUnauthorized: false });

router.post('/match', async (req, res) => {
  const { skills } = req.body;
  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({ error: 'Invalid skills format.' });
  }

  try {
    console.log("Fetching jobs from Remotive API...");

    // ✅ Use agent in the request
    const response = await axios.get(
      'https://remotive.io/api/remote-jobs?category=software-dev',
      { httpsAgent: agent }
    );

    const allJobs = response.data.jobs;
    const matchedJobs = allJobs.filter(job => {
      const jobText = (job.description + job.title).toLowerCase();
      return skills.some(skill => jobText.includes(skill.toLowerCase()));
    });

    res.json(matchedJobs);
  } catch (error) {
    console.error("🔥 ERROR FETCHING FROM REMOTIVE:", error.message);
    res.status(500).json({ error: 'Error retrieving jobs from external source.' });
  }
});
