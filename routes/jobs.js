const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/match', async (req, res) => {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({ error: 'Invalid skills format.' });
  }

  try {
    console.log("🔍 Querying JSearch with skills:", skills);

    // Join skills into a single keyword string
    const query = skills.join(' ');

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: query,
        page: '1',
        num_pages: '1',
      },
      headers: {
        'x-rapidapi-key': '08a97a9b3dmsh3e72c766fc639e8p1338b6jsn565594af14f8',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      }
    };

    const response = await axios.request(options);
    const jobs = response.data.data || [];

    console.log(`✅ Found ${jobs.length} jobs from JSearch.`);

    res.json(jobs);
  } catch (error) {
    console.error("🔥 ERROR FETCHING FROM JSEARCH:", error.message);
    res.status(500).json({ error: 'Error retrieving jobs from JSearch.' });
  }
});

module.exports = router;
