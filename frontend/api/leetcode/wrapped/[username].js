// Vercel Serverless API Function
const axios = require('axios');

const LEETCODE_API_URL = 'https://leetcode.com/graphql';

async function makeGraphQLRequest(query, variables = {}) {
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
}

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { username } = req.query;
    const year = req.query.year || new Date().getFullYear();

    console.log(`Fetching wrapped data for ${username}...`);

    // Fetch user profile
    const profileQuery = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            ranking
            reputation
            countryName
            starRating
          }
        }
      }
    `;
    const profileData = await makeGraphQLRequest(profileQuery, { username });
    
    if (!profileData.data?.matchedUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Fetch stats
    const statsQuery = `
      query getUserStats($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
            totalSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;
    const statsData = await makeGraphQLRequest(statsQuery, { username });

    // Fetch submissions and calendar
    const submissionsQuery = `
      query getRecentSubmissions($username: String!, $limit: Int) {
        recentSubmissionList(username: $username, limit: $limit) {
          title
          timestamp
          statusDisplay
          lang
        }
        matchedUser(username: $username) {
          userCalendar {
            submissionCalendar
          }
          tagProblemCounts {
            advanced { tagName problemsSolved }
            intermediate { tagName problemsSolved }
            fundamental { tagName problemsSolved }
          }
        }
      }
    `;
    const submissionsData = await makeGraphQLRequest(submissionsQuery, { username, limit: 100 });

    // Process data for the year
    const profile = profileData.data.matchedUser;
    const stats = statsData.data;
    const submissions = submissionsData.data;

    const currentYear = parseInt(year);
    const yearStart = new Date(currentYear, 0, 1).getTime() / 1000;
    const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59).getTime() / 1000;

    const calendar = submissions.matchedUser?.userCalendar?.submissionCalendar;
    const calendarData = calendar ? JSON.parse(calendar) : {};

    const yearSubmissions = Object.entries(calendarData).filter(([timestamp]) => {
      const ts = parseInt(timestamp);
      return ts >= yearStart && ts <= yearEnd;
    });

    const totalProblemsThisYear = yearSubmissions.reduce((sum, [, count]) => sum + count, 0);
    const activeDays = yearSubmissions.length;

    // All-time difficulty
    const acSubmissions = stats.matchedUser?.submitStats?.acSubmissionNum || [];
    const difficultyAllTime = {
      easy: acSubmissions.find(d => d.difficulty === 'Easy')?.count || 0,
      medium: acSubmissions.find(d => d.difficulty === 'Medium')?.count || 0,
      hard: acSubmissions.find(d => d.difficulty === 'Hard')?.count || 0,
      all: acSubmissions.find(d => d.difficulty === 'All')?.count || 0
    };

    // 2025 difficulty (estimated)
    const yearProportion = difficultyAllTime.all > 0 ? totalProblemsThisYear / difficultyAllTime.all : 0;
    const difficulty2025 = {
      easy: Math.round(difficultyAllTime.easy * yearProportion),
      medium: Math.round(difficultyAllTime.medium * yearProportion),
      hard: Math.round(difficultyAllTime.hard * yearProportion),
      all: totalProblemsThisYear
    };

    // Topics
    const tagCounts = submissions.matchedUser?.tagProblemCounts || {};
    const allTags = [
      ...(tagCounts.fundamental || []),
      ...(tagCounts.intermediate || []),
      ...(tagCounts.advanced || [])
    ];
    const topics2025 = allTags
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 10)
      .map(tag => ({ name: tag.tagName, count: Math.round(tag.problemsSolved * yearProportion) }))
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
    const monthlyActivity = months.map((count, i) => ({ month: monthNames[i], count }));

    // Languages
    const recentSubmissions = submissions.recentSubmissionList || [];
    const langCount = {};
    recentSubmissions.forEach(sub => {
      if (sub.lang) langCount[sub.lang] = (langCount[sub.lang] || 0) + 1;
    });
    const languages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([lang, count]) => ({ language: lang, count }));

    const wrappedData = {
      username: profile.username,
      year: currentYear,
      summary: {
        totalProblemsThisYear,
        activeDays,
        longestStreak: 0,
        totalProblemsAllTime: difficultyAllTime.all,
        acceptanceRate: 0,
        ranking: profile.profile?.ranking
      },
      difficulty: difficulty2025,
      topics: topics2025,
      languages,
      monthlyActivity,
      profile: profile.profile,
      achievements: [],
      companyRecommendations: [],
      personality: { primary: { name: 'Developer', title: 'Coder', icon: '█', field: 'Software', description: 'Keep coding!' } },
      interestingFacts: [`You solved ${totalProblemsThisYear} problems in ${currentYear}`],
      careerStats: {
        totalProblems: difficultyAllTime.all,
        difficulty: difficultyAllTime,
        ranking: profile.profile?.ranking,
        acceptanceRate: 0
      }
    };

    res.status(200).json({
      success: true,
      data: wrappedData
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch data'
    });
  }
}

