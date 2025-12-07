import express from 'express';
import { fetchUserProfile, fetchUserStats, fetchRecentSubmissions } from '../services/leetcodeAPI.js';
import { analyzeYearData } from '../services/analytics.js';

const router = express.Router();

// Get user's year wrapped data
router.get('/wrapped/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const year = req.query.year || new Date().getFullYear();

    console.log(`📊 Fetching wrapped data for ${username}...`);

    // Fetch all data in parallel
    const [profile, stats, submissions] = await Promise.all([
      fetchUserProfile(username),
      fetchUserStats(username),
      fetchRecentSubmissions(username)
    ]);

    // Analyze the data for the year wrap-up
    const wrappedData = analyzeYearData({
      profile,
      stats,
      submissions,
      year
    });

    res.json({
      success: true,
      data: wrappedData
    });

  } catch (error) {
    console.error('Error fetching wrapped data:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch LeetCode data'
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'LeetCode API service is running' });
});

export default router;

