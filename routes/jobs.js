const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/match', (req, res) => {
  try {
    console.log("✅ Request body received:", req.body);

    const { skills } = req.body;
    if (!skills || !Array.isArray(skills)) {
      console.log("❌ Invalid skills format:", skills);
      return res.status(400).json({ error: 'Invalid skills format.' });
    }

    const jobsPath = path.join(__dirname, '../data/jobs.json');
    console.log("🗂 Reading jobs from:", jobsPath);

    const jobsRaw = fs.readFileSync(jobsPath, 'utf8');
    const jobs = JSON.parse(jobsRaw);
    console.log("📄 Jobs loaded:", jobs.length);

    const matchedJobs = jobs.filter(job => {
      const jobSkills = job.description.toLowerCase();
      return skills.some(skill => jobSkills.includes(skill.toLowerCase()));
    });

    console.log("✅ Matched jobs:", matchedJobs.length);
    res.json(matchedJobs);

  } catch (error) {
    console.error("🔥 MATCH ROUTE ERROR:", error.message);
    res.status(500).json({ error: 'Server error while matching jobs.' });
  }
});

module.exports = router;
