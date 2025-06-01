const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const jobsPath = path.join(__dirname, '../data/jobs.json');
const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));


router.post('/match', (req, res) => {
  try {
    const { skills } = req.body;
  
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Invalid skills format.' });
    }
  
    const matchedJobs = jobs.filter(job => {
      const jobSkills = job.description.toLowerCase();
      return skills.some(skill => jobSkills.includes(skill.toLowerCase()));
    });
  
    res.json(matchedJobs);
  } catch (error) {
    console.error(`MATCH ROUTE ERROR: ${error}`);
    res.status(500).json({error: 'Server error while matching jobs.'})
  }


});

module.exports = router;
