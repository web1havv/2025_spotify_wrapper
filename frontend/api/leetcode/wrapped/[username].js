// Vercel Serverless Function (ES Module)
import https from 'https';

function makeGraphQLRequest(query, variables) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });
    
    const options = {
      hostname: 'leetcode.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Referer': 'https://leetcode.com'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { username } = req.query;
    const year = req.query.year || new Date().getFullYear();

    if (!username) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username is required' 
      });
    }

    console.log(`Fetching data for ${username}...`);

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
          }
        }
      }
    `;
    
    const profileData = await makeGraphQLRequest(profileQuery, { username });
    
    if (!profileData.data?.matchedUser) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
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
          }
        }
      }
    `;
    
    const statsData = await makeGraphQLRequest(statsQuery, { username });

    // Fetch calendar and tags
    const calendarQuery = `
      query getUserCalendar($username: String!) {
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
    
    const calendarData = await makeGraphQLRequest(calendarQuery, { username });

    // Process data
    const profile = profileData.data.matchedUser;
    const stats = statsData.data.matchedUser;
    const calendar = calendarData.data.matchedUser;

    const currentYear = parseInt(year);
    const yearStart = new Date(currentYear, 0, 1).getTime() / 1000;
    const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59).getTime() / 1000;

    // Parse calendar
    const submissionCalendar = calendar?.userCalendar?.submissionCalendar || '{}';
    const calendarObj = JSON.parse(submissionCalendar);

    // Calculate 2025 stats
    const yearSubmissions = Object.entries(calendarObj).filter(([timestamp]) => {
      const ts = parseInt(timestamp);
      return ts >= yearStart && ts <= yearEnd;
    });

    const totalProblemsThisYear = yearSubmissions.reduce((sum, [, count]) => sum + count, 0);
    const activeDays = yearSubmissions.length;

    // All-time difficulty
    const acSubmissions = stats?.submitStats?.acSubmissionNum || [];
    const difficultyAllTime = {
      easy: acSubmissions.find(d => d.difficulty === 'Easy')?.count || 0,
      medium: acSubmissions.find(d => d.difficulty === 'Medium')?.count || 0,
      hard: acSubmissions.find(d => d.difficulty === 'Hard')?.count || 0,
      all: acSubmissions.find(d => d.difficulty === 'All')?.count || 0
    };

    // 2025 difficulty (proportional estimate)
    const proportion = difficultyAllTime.all > 0 ? totalProblemsThisYear / difficultyAllTime.all : 0;
    const difficulty2025 = {
      easy: Math.round(difficultyAllTime.easy * proportion),
      medium: Math.round(difficultyAllTime.medium * proportion),
      hard: Math.round(difficultyAllTime.hard * proportion),
      all: totalProblemsThisYear
    };

    // Topics
    const tagCounts = calendar?.tagProblemCounts || {};
    const allTags = [
      ...(tagCounts.fundamental || []),
      ...(tagCounts.intermediate || []),
      ...(tagCounts.advanced || [])
    ];
    
    const topics2025 = allTags
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 10)
      .map(tag => ({ 
        name: tag.tagName, 
        count: Math.round(tag.problemsSolved * proportion) 
      }))
      .filter(t => t.count > 0);

    // Monthly breakdown
    const months = Array(12).fill(0);
    Object.entries(calendarObj).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      if (date.getFullYear() === currentYear) {
        months[date.getMonth()] += count;
      }
    });
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyActivity = months.map((count, i) => ({ 
      month: monthNames[i], 
      count 
    }));

    // Build response
    const wrappedData = {
      username: profile.username,
      year: currentYear,
      summary: {
        totalProblemsThisYear,
        activeDays,
        longestStreak: 0,
        totalProblemsAllTime: difficultyAllTime.all,
        acceptanceRate: 0,
        ranking: profile.profile?.ranking || 0
      },
      difficulty: difficulty2025,
      topics: topics2025,
      languages: [],
      monthlyActivity,
      profile: profile.profile || {},
      achievements: [],
      companyRecommendations: [],
      personality: { 
        primary: { 
          name: 'Developer', 
          title: 'Problem Solver', 
          icon: '█', 
          field: 'Software Engineering', 
          description: 'You love solving challenging problems!' 
        } 
      },
      interestingFacts: [`You solved ${totalProblemsThisYear} problems in ${currentYear}!`],
      careerStats: {
        totalProblems: difficultyAllTime.all,
        difficulty: difficultyAllTime,
        ranking: profile.profile?.ranking || 0,
        acceptanceRate: 0
      }
    };

    res.status(200).json({
      success: true,
      data: wrappedData
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
