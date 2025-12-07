// Vercel serverless function wrapper for Express backend
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// LeetCode API functions
const LEETCODE_API_URL = 'https://leetcode.com/graphql';

async function makeGraphQLRequest(query, variables = {}) {
  try {
    const response = await axios.post(LEETCODE_API_URL, {
      query,
      variables
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`LeetCode API Error: ${error.message}`);
  }
}

async function fetchUserProfile(username) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          ranking
          reputation
          websites
          countryName
          company
          school
          skillTags
          aboutMe
          starRating
        }
      }
    }
  `;
  const data = await makeGraphQLRequest(query, { username });
  if (!data.data?.matchedUser) {
    throw new Error('User not found');
  }
  return data.data.matchedUser;
}

async function fetchUserStats(username) {
  const query = `
    query getUserStats($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;
  const data = await makeGraphQLRequest(query, { username });
  return data.data;
}

async function fetchRecentSubmissions(username, limit = 100) {
  const query = `
    query getRecentSubmissions($username: String!, $limit: Int) {
      recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
        runtime
        memory
      }
      matchedUser(username: $username) {
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
    }
  `;
  const data = await makeGraphQLRequest(query, { username, limit });
  return data.data;
}

// Import analytics inline to avoid file issues
function analyzeYearData({ profile, stats, submissions, year }) {
  const currentYear = parseInt(year);
  const yearStart = new Date(currentYear, 0, 1).getTime() / 1000;
  const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59).getTime() / 1000;

  const submissionCalendar = submissions.matchedUser?.userCalendar?.submissionCalendar;
  const calendarData = submissionCalendar ? JSON.parse(submissionCalendar) : {};

  const yearSubmissions = Object.entries(calendarData).filter(([timestamp]) => {
    const ts = parseInt(timestamp);
    return ts >= yearStart && ts <= yearEnd;
  });

  const totalProblemsThisYear = yearSubmissions.reduce((sum, [, count]) => sum + count, 0);
  const activeDays = yearSubmissions.length;

  const acSubmissions = stats.matchedUser?.submitStats?.acSubmissionNum || [];
  const difficultyBreakdownAllTime = {
    easy: acSubmissions.find(d => d.difficulty === 'Easy')?.count || 0,
    medium: acSubmissions.find(d => d.difficulty === 'Medium')?.count || 0,
    hard: acSubmissions.find(d => d.difficulty === 'Hard')?.count || 0,
    all: acSubmissions.find(d => d.difficulty === 'All')?.count || 0
  };

  const yearProportion = difficultyBreakdownAllTime.all > 0 
    ? totalProblemsThisYear / difficultyBreakdownAllTime.all 
    : 0;
  
  const difficulty2025 = {
    easy: Math.round(difficultyBreakdownAllTime.easy * yearProportion),
    medium: Math.round(difficultyBreakdownAllTime.medium * yearProportion),
    hard: Math.round(difficultyBreakdownAllTime.hard * yearProportion),
    all: totalProblemsThisYear
  };

  // Simple topic extraction
  const tagCounts = submissions.matchedUser?.tagProblemCounts || {};
  const allTags = [
    ...(tagCounts.fundamental || []),
    ...(tagCounts.intermediate || []),
    ...(tagCounts.advanced || [])
  ];
  const topTopics = allTags
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, 10)
    .map(tag => ({
      name: tag.tagName,
      count: Math.round(tag.problemsSolved * yearProportion)
    }))
    .filter(t => t.count > 0);

  // Monthly breakdown
  const months = Array(12).fill(0);
  Object.entries(calendarData).forEach(([timestamp, count]) => {
    const date = new Date(parseInt(timestamp) * 1000);
    if (date.getFullYear() === currentYear) {
      months[date.getMonth()] += count;
    }
  });
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyBreakdown = months.map((count, index) => ({ month: monthNames[index], count }));

  return {
    username: profile.username,
    year: currentYear,
    summary: {
      totalProblemsThisYear,
      activeDays,
      longestStreak: 0,
      totalProblemsAllTime: difficultyBreakdownAllTime.all,
      acceptanceRate: 0,
      ranking: profile.profile?.ranking
    },
    difficulty: difficulty2025,
    topics: topTopics,
    languages: [],
    monthlyActivity: monthlyBreakdown,
    profile: profile.profile,
    achievements: [],
    companyRecommendations: [],
    personality: { primary: { name: 'Coder', title: 'Developer', icon: '█', field: 'Software', description: 'Keep coding!' } },
    interestingFacts: [],
    careerStats: {
      totalProblems: difficultyBreakdownAllTime.all,
      difficulty: difficultyBreakdownAllTime,
      ranking: profile.profile?.ranking,
      acceptanceRate: 0
    }
  };
}

// Routes
app.get('/api/leetcode/wrapped/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const year = req.query.year || new Date().getFullYear();

    const [profile, stats, submissions] = await Promise.all([
      fetchUserProfile(username),
      fetchUserStats(username),
      fetchRecentSubmissions(username)
    ]);

    const wrappedData = analyzeYearData({ profile, stats, submissions, year });

    res.json({
      success: true,
      data: wrappedData
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch LeetCode data'
    });
  }
});

app.get('/api/leetcode/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;

