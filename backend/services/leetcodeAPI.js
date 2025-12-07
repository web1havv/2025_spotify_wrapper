import axios from 'axios';

const LEETCODE_API_URL = 'https://leetcode.com/graphql';

// Helper function to make GraphQL requests
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

// Fetch user profile
export async function fetchUserProfile(username) {
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

// Fetch user statistics
export async function fetchUserStats(username) {
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

// Fetch recent submissions
export async function fetchRecentSubmissions(username, limit = 100) {
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

// Fetch problem details (for getting difficulty and topics)
export async function fetchProblemDetails(titleSlug) {
  const query = `
    query getProblemDetails($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        title
        titleSlug
        difficulty
        topicTags {
          name
          slug
        }
        likes
        dislikes
        categoryTitle
      }
    }
  `;

  const data = await makeGraphQLRequest(query, { titleSlug });
  return data.data.question;
}

