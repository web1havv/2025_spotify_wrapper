import { getCompanyRecommendations } from './companyRecommendations.js';
import { determinePersonalityType, generateInterestingFacts } from './personalityTypes.js';

// Analyze user's LeetCode data for year wrap-up
export function analyzeYearData({ profile, stats, submissions, year }) {
  const currentYear = parseInt(year);
  const yearStart = new Date(currentYear, 0, 1).getTime() / 1000;
  const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59).getTime() / 1000;

  // Parse submission calendar
  const submissionCalendar = submissions.matchedUser?.userCalendar?.submissionCalendar;
  const calendarData = submissionCalendar ? JSON.parse(submissionCalendar) : {};

  // Filter submissions for the current year
  const yearSubmissions = Object.entries(calendarData).filter(([timestamp]) => {
    const ts = parseInt(timestamp);
    return ts >= yearStart && ts <= yearEnd;
  });

  // Calculate total problems solved in the year
  const totalProblemsThisYear = yearSubmissions.reduce((sum, [, count]) => sum + count, 0);

  // Get active days and calculate streak
  const activeDays = yearSubmissions.length;
  const streak = calculateLongestStreak(yearSubmissions);

  // Get ALL-TIME difficulty breakdown for career overview slide only
  const acSubmissions = stats.matchedUser?.submitStats?.acSubmissionNum || [];
  const difficultyBreakdownAllTime = {
    easy: acSubmissions.find(d => d.difficulty === 'Easy')?.count || 0,
    medium: acSubmissions.find(d => d.difficulty === 'Medium')?.count || 0,
    hard: acSubmissions.find(d => d.difficulty === 'Hard')?.count || 0,
    all: acSubmissions.find(d => d.difficulty === 'All')?.count || 0
  };

  // For 2025 specific: Estimate based on proportion
  // If user solved X problems in 2025 out of total Y, assume similar difficulty distribution
  const yearProportion = difficultyBreakdownAllTime.all > 0 
    ? totalProblemsThisYear / difficultyBreakdownAllTime.all 
    : 0;
  
  const difficulty2025 = {
    easy: Math.round(difficultyBreakdownAllTime.easy * yearProportion),
    medium: Math.round(difficultyBreakdownAllTime.medium * yearProportion),
    hard: Math.round(difficultyBreakdownAllTime.hard * yearProportion),
    all: totalProblemsThisYear
  };

  // Get topic analysis - ALL TIME
  const tagCounts = submissions.matchedUser?.tagProblemCounts || {};
  const allTimeTopTopics = getTopTopics(tagCounts, 10);
  
  // Calculate 2025-specific topics using same proportion as problems
  const topTopics2025 = allTimeTopTopics.map(topic => ({
    name: topic.name,
    count: Math.round(topic.count * yearProportion)
  })).filter(topic => topic.count > 0); // Remove topics with 0 count in 2025

  // Calculate monthly breakdown for the year
  const monthlyBreakdown = calculateMonthlyBreakdown(calendarData, currentYear);
  
  console.log(`📅 Year: ${currentYear}`);
  console.log(`📊 Total submissions in ${currentYear}:`, totalProblemsThisYear);
  console.log(`📈 Active days in ${currentYear}:`, activeDays);
  console.log(`📉 Monthly breakdown:`, monthlyBreakdown);

  // Get recent submissions details
  const recentSubmissions = submissions.recentSubmissionList || [];
  const acceptedSubmissions = recentSubmissions.filter(s => s.statusDisplay === 'Accepted');
  
  // Language breakdown
  const languageStats = calculateLanguageStats(acceptedSubmissions);

  // Calculate some fun stats
  const totalSubmissions = stats.matchedUser?.submitStats?.totalSubmissionNum
    ?.find(d => d.difficulty === 'All')?.count || 0;
  const acceptanceRate = totalSubmissions > 0 
    ? ((difficultyBreakdownAllTime.all / totalSubmissions) * 100).toFixed(1)
    : 0;

  // Ranking and percentile
  const ranking = profile.profile?.ranking || null;

  // Get company recommendations based on 2025 topics and problems
  const companyRecommendations = getCompanyRecommendations(topTopics2025, totalProblemsThisYear);

  // Prepare data for personality and facts (2025-specific)
  const analysisData = {
    difficulty: difficulty2025,
    topics: topTopics2025,
    summary: {
      totalProblems: totalProblemsThisYear,
      totalProblemsThisYear,
      activeDays,
      longestStreak: streak,
      acceptanceRate: parseFloat(acceptanceRate),
      ranking
    },
    languages: languageStats
  };

  // Determine personality type based on 2025 data
  const personality = determinePersonalityType(analysisData);
  
  // Generate interesting facts based on 2025 data
  const interestingFacts = generateInterestingFacts(analysisData);
  
  return {
    username: profile.username,
    year: currentYear,
    summary: {
      // 2025 SPECIFIC
      totalProblemsThisYear,
      activeDays,
      longestStreak: streak,
      // ALL TIME (for career overview slide only)
      totalProblemsAllTime: difficultyBreakdownAllTime.all,
      acceptanceRate: parseFloat(acceptanceRate),
      ranking
    },
    difficulty: difficulty2025, // 2025 ONLY
    topics: topTopics2025, // 2025 ONLY
    languages: languageStats,
    monthlyActivity: monthlyBreakdown,
    profile: {
      realName: profile.profile?.realName,
      countryName: profile.profile?.countryName,
      ranking: profile.profile?.ranking,
      reputation: profile.profile?.reputation,
      starRating: profile.profile?.starRating
    },
    achievements: generateAchievements({
      totalProblems: totalProblemsThisYear,
      totalProblemsThisYear,
      activeDays,
      streak,
      difficulty: difficulty2025,
      topTopics: topTopics2025
    }),
    companyRecommendations,
    personality,
    interestingFacts,
    // ALL-TIME STATS (for career overview slide only)
    careerStats: {
      totalProblems: difficultyBreakdownAllTime.all,
      difficulty: difficultyBreakdownAllTime,
      topics: allTimeTopTopics, // All-time topics for career slide
      ranking,
      acceptanceRate: parseFloat(acceptanceRate)
    }
  };
}

// Calculate longest streak
function calculateLongestStreak(yearSubmissions) {
  if (yearSubmissions.length === 0) return 0;

  const timestamps = yearSubmissions.map(([ts]) => parseInt(ts)).sort((a, b) => a - b);
  
  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < timestamps.length; i++) {
    const dayDiff = Math.floor((timestamps[i] - timestamps[i - 1]) / 86400);
    
    if (dayDiff <= 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

// Get top topics
function getTopTopics(tagCounts, limit = 10) {
  const allTags = [
    ...(tagCounts.fundamental || []),
    ...(tagCounts.intermediate || []),
    ...(tagCounts.advanced || [])
  ];

  return allTags
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, limit)
    .map(tag => ({
      name: tag.tagName,
      count: tag.problemsSolved
    }));
}

// Calculate monthly breakdown
function calculateMonthlyBreakdown(calendarData, year) {
  const months = Array(12).fill(0);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Convert calendar data to array and process
  Object.entries(calendarData).forEach(([timestamp, count]) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const submissionYear = date.getFullYear();
    
    if (submissionYear === year) {
      const month = date.getMonth();
      months[month] += count;
    }
  });

  console.log(`📊 Processing monthly data for ${year}:`, months);
  
  return months.map((count, index) => ({
    month: monthNames[index],
    count
  }));
}

// Calculate language statistics
function calculateLanguageStats(submissions) {
  const langCount = {};

  submissions.forEach(sub => {
    if (sub.lang) {
      langCount[sub.lang] = (langCount[sub.lang] || 0) + 1;
    }
  });

  return Object.entries(langCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang, count]) => ({ language: lang, count }));
}

// Generate achievements and fun facts
function generateAchievements(data) {
  const achievements = [];

  if (data.totalProblemsThisYear >= 365) {
    achievements.push({
      title: '🎯 Problem A Day',
      description: 'Solved 365+ problems this year!'
    });
  }

  if (data.streak >= 30) {
    achievements.push({
      title: '🔥 On Fire!',
      description: `${data.streak} day streak!`
    });
  }

  if (data.difficulty.hard >= 50) {
    achievements.push({
      title: '💪 Hard Mode',
      description: `Conquered ${data.difficulty.hard} hard problems!`
    });
  }

  if (data.totalProblems >= 1000) {
    achievements.push({
      title: '🏆 Legendary',
      description: '1000+ total problems solved!'
    });
  }

  if (data.activeDays >= 200) {
    achievements.push({
      title: '📅 Consistency King/Queen',
      description: `Active ${data.activeDays} days this year!`
    });
  }

  if (data.topTopics.length > 0 && data.topTopics[0].count >= 100) {
    achievements.push({
      title: '🎓 Topic Master',
      description: `${data.topTopics[0].name} expert with ${data.topTopics[0].count} problems!`
    });
  }

  return achievements;
}

