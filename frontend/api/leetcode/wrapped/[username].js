// Vercel Serverless Function with ALL features
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

// Calculate longest streak
function calculateLongestStreak(yearSubmissions) {
  if (yearSubmissions.length === 0) return 0;
  
  const sortedDates = yearSubmissions
    .map(([timestamp]) => parseInt(timestamp))
    .sort((a, b) => a - b);
  
  let maxStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const dayDiff = Math.floor((sortedDates[i] - sortedDates[i-1]) / 86400);
    if (dayDiff === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else if (dayDiff > 1) {
      currentStreak = 1;
    }
  }
  
  return maxStreak;
}

// Company recommendations
function getCompanyRecommendations(topics, totalProblems) {
  const COMPANIES = {
    'Google': { topics: ['Dynamic Programming', 'Graph', 'Tree', 'Array'], minProblems: 50 },
    'Meta': { topics: ['Dynamic Programming', 'Array', 'String', 'Tree'], minProblems: 40 },
    'Amazon': { topics: ['Array', 'String', 'Tree', 'Dynamic Programming'], minProblems: 40 },
    'Microsoft': { topics: ['Array', 'String', 'Dynamic Programming', 'Tree'], minProblems: 35 },
    'Apple': { topics: ['Array', 'String', 'Tree', 'Dynamic Programming'], minProblems: 35 },
    'Netflix': { topics: ['Dynamic Programming', 'Array', 'String', 'Design'], minProblems: 30 },
    'Uber': { topics: ['Array', 'Hash Table', 'String', 'Graph'], minProblems: 30 },
    'ByteDance': { topics: ['Array', 'String', 'Dynamic Programming', 'Graph'], minProblems: 35 },
    'LinkedIn': { topics: ['Hash Table', 'Array', 'String', 'Design'], minProblems: 30 },
    'Airbnb': { topics: ['Array', 'String', 'Design', 'Backtracking'], minProblems: 30 }
  };
  
  const userTopics = topics.map(t => t.name);
  const recommendations = [];

  for (const [company, data] of Object.entries(COMPANIES)) {
    const matchedTopics = data.topics.filter(companyTopic => 
      userTopics.some(userTopic => 
        userTopic.toLowerCase().includes(companyTopic.toLowerCase()) ||
        companyTopic.toLowerCase().includes(userTopic.toLowerCase())
      )
    );

    const matchPercentage = (matchedTopics.length / data.topics.length) * 100;
    const meetsThreshold = totalProblems >= data.minProblems;
    const score = matchPercentage * (meetsThreshold ? 1 : 0.7);

    if (matchPercentage >= 25) {
      recommendations.push({
        company,
        matchPercentage: Math.round(matchPercentage),
        matchedTopics,
        meetsThreshold,
        score
      });
    }
  }

  recommendations.sort((a, b) => b.score - a.score);
  return recommendations.slice(0, 5);
}

// Personality types
function determinePersonalityType(data) {
  const TYPES = {
    'donald-knuth': { name: 'Donald Knuth', title: 'Algorithm Perfectionist', field: 'Algorithms', icon: '█' },
    'grace-hopper': { name: 'Grace Hopper', title: 'Practical Pioneer', field: 'Compilers', icon: '█' },
    'alan-turing': { name: 'Alan Turing', title: 'Theoretical Mastermind', field: 'Theory', icon: '█' },
    'edsger-dijkstra': { name: 'Edsger Dijkstra', title: 'Elegant Solver', field: 'Graph Theory', icon: '█' },
    'ada-lovelace': { name: 'Ada Lovelace', title: 'Visionary Programmer', field: 'Early Computing', icon: '▓' }
  };
  
  const { difficulty, topics } = data;
  const totalProblems = difficulty.all || 0;
  const hardPercentage = totalProblems > 0 ? (difficulty.hard / totalProblems) * 100 : 0;
  
  const topicNames = topics.slice(0, 3).map(t => t.name.toLowerCase());
  const hasGraph = topicNames.some(t => t.includes('graph') || t.includes('tree'));
  const hasDp = topicNames.some(t => t.includes('dynamic'));
  
  let scores = {
    'donald-knuth': totalProblems > 500 ? 50 : 20,
    'grace-hopper': totalProblems >= 200 && totalProblems <= 500 ? 50 : 20,
    'alan-turing': hardPercentage > 30 ? 60 : 20,
    'edsger-dijkstra': hasGraph ? 60 : 20,
    'ada-lovelace': hasDp ? 50 : 30
  };
  
  const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topType = sortedTypes[0][0];
  
  return {
    primary: TYPES[topType]
  };
}

// Generate facts
function generateFacts(data) {
  const facts = [];
  const { difficulty, summary, topics } = data;
  
  if (summary.totalProblemsThisYear > 0) {
    const avgPerDay = (summary.totalProblemsThisYear / Math.max(summary.activeDays, 1)).toFixed(1);
    facts.push(`You solve an average of ${avgPerDay} problems per active day in 2025`);
  }
  
  const hardRatio = difficulty.all > 0 ? ((difficulty.hard / difficulty.all) * 100).toFixed(0) : 0;
  if (hardRatio > 30) {
    facts.push(`${hardRatio}% of your 2025 solutions are HARD problems`);
  }
  
  if (topics.length > 0 && topics[0].count > 20) {
    facts.push(`You practiced ${topics[0].name} the most with ${topics[0].count} problems in 2025`);
  }
  
  if (summary.longestStreak > 7) {
    facts.push(`Your ${summary.longestStreak}-day streak in 2025 shows great discipline`);
  }
  
  if (difficulty.all > 100) {
    facts.push(`${difficulty.all} problems solved in 2025 - impressive progress!`);
  }
  
  return facts;
}

// Achievements
function generateAchievements(data) {
  const achievements = [];
  const { difficulty, summary } = data;
  
  if (summary.totalProblemsThisYear >= 365) {
    achievements.push({ title: 'Problem-A-Day Master', description: 'Solved 365+ problems in 2025' });
  } else if (summary.totalProblemsThisYear >= 200) {
    achievements.push({ title: '200 Problems Club', description: 'Solved 200+ problems in 2025' });
  } else if (summary.totalProblemsThisYear >= 100) {
    achievements.push({ title: 'Century Solver', description: 'Solved 100+ problems in 2025' });
  }
  
  if (summary.longestStreak >= 30) {
    achievements.push({ title: 'Month-Long Streak', description: `${summary.longestStreak} days of consistency in 2025` });
  } else if (summary.longestStreak >= 7) {
    achievements.push({ title: 'Week Warrior', description: `${summary.longestStreak}-day streak in 2025` });
  }
  
  if (difficulty.hard >= 50) {
    achievements.push({ title: 'Hard Problems Crusher', description: `${difficulty.hard} hard problems in 2025` });
  } else if (difficulty.hard >= 20) {
    achievements.push({ title: 'Challenge Seeker', description: `${difficulty.hard} hard problems tackled in 2025` });
  }
  
  if (summary.activeDays >= 200) {
    achievements.push({ title: 'Always Active', description: `${summary.activeDays} active days in 2025` });
  } else if (summary.activeDays >= 100) {
    achievements.push({ title: 'Consistent Coder', description: `${summary.activeDays} active days in 2025` });
  }
  
  return achievements;
}

export default async function handler(req, res) {
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
      return res.status(400).json({ success: false, error: 'Username required' });
    }

    // Fetch all data
    const profileQuery = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile { realName ranking reputation countryName }
        }
      }
    `;
    
    const profileData = await makeGraphQLRequest(profileQuery, { username });
    
    if (!profileData.data?.matchedUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const statsQuery = `
      query getUserStats($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum { difficulty count }
          }
        }
      }
    `;
    
    const statsData = await makeGraphQLRequest(statsQuery, { username });

    const calendarQuery = `
      query getUserCalendar($username: String!) {
        matchedUser(username: $username) {
          userCalendar { submissionCalendar }
          tagProblemCounts {
            advanced { tagName problemsSolved }
            intermediate { tagName problemsSolved }
            fundamental { tagName problemsSolved }
          }
        }
      }
    `;
    
    const calendarData = await makeGraphQLRequest(calendarQuery, { username });

    const recentQuery = `
      query getRecent($username: String!) {
        recentSubmissionList(username: $username, limit: 200) {
          title timestamp statusDisplay lang
        }
      }
    `;
    
    const recentData = await makeGraphQLRequest(recentQuery, { username });

    // Process data
    const profile = profileData.data.matchedUser;
    const stats = statsData.data.matchedUser;
    const calendar = calendarData.data.matchedUser;
    const submissions = recentData.data.recentSubmissionList || [];

    const currentYear = parseInt(year);
    const yearStart = new Date(currentYear, 0, 1).getTime() / 1000;
    const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59).getTime() / 1000;

    const submissionCalendar = calendar?.userCalendar?.submissionCalendar || '{}';
    const calendarObj = JSON.parse(submissionCalendar);

    const yearSubmissions = Object.entries(calendarObj).filter(([timestamp]) => {
      const ts = parseInt(timestamp);
      return ts >= yearStart && ts <= yearEnd;
    });

    const totalProblemsThisYear = yearSubmissions.reduce((sum, [, count]) => sum + count, 0);
    const activeDays = yearSubmissions.length;
    const longestStreak = calculateLongestStreak(yearSubmissions);

    // All-time stats
    const acSubmissions = stats?.submitStats?.acSubmissionNum || [];
    const difficultyAllTime = {
      easy: acSubmissions.find(d => d.difficulty === 'Easy')?.count || 0,
      medium: acSubmissions.find(d => d.difficulty === 'Medium')?.count || 0,
      hard: acSubmissions.find(d => d.difficulty === 'Hard')?.count || 0,
      all: acSubmissions.find(d => d.difficulty === 'All')?.count || 0
    };

    // 2025 difficulty
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
      .map(tag => ({ name: tag.tagName, count: Math.round(tag.problemsSolved * proportion) }))
      .filter(t => t.count > 0);

    // Monthly activity
    const months = Array(12).fill(0);
    Object.entries(calendarObj).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      if (date.getFullYear() === currentYear) {
        months[date.getMonth()] += count;
      }
    });
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyActivity = months.map((count, i) => ({ month: monthNames[i], count }));

    // Languages
    const langCount = {};
    submissions.filter(s => {
      const ts = parseInt(s.timestamp);
      return ts >= yearStart && ts <= yearEnd && s.statusDisplay === 'Accepted';
    }).forEach(sub => {
      if (sub.lang) langCount[sub.lang] = (langCount[sub.lang] || 0) + 1;
    });
    const languages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));

    const totalSubmissions = stats?.submitStats?.acSubmissionNum?.find(d => d.difficulty === 'All')?.count || 0;
    const totalAttempts = statsData.data.matchedUser?.submitStats?.totalSubmissionNum?.find(d => d.difficulty === 'All')?.count || totalSubmissions;
    const acceptanceRate = totalAttempts > 0 ? Math.round((totalSubmissions / totalAttempts) * 100) : 0;

    // Build wrapped data
    const wrappedData = {
      username: profile.username,
      year: currentYear,
      summary: {
        totalProblemsThisYear,
        activeDays,
        longestStreak,
        totalProblemsAllTime: difficultyAllTime.all,
        acceptanceRate,
        ranking: profile.profile?.ranking || 0
      },
      difficulty: difficulty2025,
      topics: topics2025,
      languages,
      monthlyActivity,
      profile: profile.profile || {},
      achievements: [],
      companyRecommendations: [],
      personality: { primary: { name: 'Developer', title: 'Coder', icon: '█', field: 'Software', description: 'Keep coding!' } },
      interestingFacts: [],
      careerStats: {
        totalProblems: difficultyAllTime.all,
        difficulty: difficultyAllTime,
        ranking: profile.profile?.ranking || 0,
        acceptanceRate
      }
    };

    // Generate features
    wrappedData.achievements = generateAchievements(wrappedData);
    wrappedData.companyRecommendations = getCompanyRecommendations(topics2025, totalProblemsThisYear);
    wrappedData.personality = determinePersonalityType(wrappedData);
    wrappedData.interestingFacts = generateFacts(wrappedData);

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
