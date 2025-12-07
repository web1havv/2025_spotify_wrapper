// Company recommendations based on LeetCode topics and patterns
// ~100 companies included

const COMPANY_TOPIC_PREFERENCES = {
  // FAANG & Big Tech
  'Google': {
    topics: ['Dynamic Programming', 'Graph', 'Tree', 'Array', 'Backtracking', 'Design', 'String'],
    minProblems: 50,
    description: 'Algorithm-heavy interviews focusing on optimization'
  },
  'Meta': {
    topics: ['Dynamic Programming', 'Array', 'String', 'Tree', 'Graph', 'Hash Table', 'Design'],
    minProblems: 40,
    description: 'Practical problem-solving and system design'
  },
  'Amazon': {
    topics: ['Array', 'String', 'Tree', 'Dynamic Programming', 'Graph', 'BFS', 'DFS'],
    minProblems: 40,
    description: 'Data structures and leadership principles'
  },
  'Microsoft': {
    topics: ['Array', 'String', 'Dynamic Programming', 'Tree', 'Linked List', 'Design'],
    minProblems: 35,
    description: 'Balanced approach with clean code focus'
  },
  'Apple': {
    topics: ['Array', 'String', 'Tree', 'Dynamic Programming', 'Design', 'Hash Table'],
    minProblems: 35,
    description: 'Efficiency and elegant solutions'
  },
  
  // Streaming & Entertainment
  'Netflix': {
    topics: ['Dynamic Programming', 'Array', 'String', 'Design', 'Hash Table'],
    minProblems: 30,
    description: 'Scalability and optimization focus'
  },
  'Spotify': {
    topics: ['Graph', 'Hash Table', 'Array', 'Design', 'String'],
    minProblems: 30,
    description: 'Recommendation systems and data processing'
  },
  'Disney': {
    topics: ['Array', 'String', 'Design', 'Hash Table', 'Tree'],
    minProblems: 25,
    description: 'Content delivery and user experience'
  },
  'Hulu': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 25,
    description: 'Streaming optimization'
  },
  
  // Automotive & Transportation
  'Tesla': {
    topics: ['Array', 'String', 'Dynamic Programming', 'Math', 'Simulation'],
    minProblems: 30,
    description: 'Real-world problem-solving applications'
  },
  'Uber': {
    topics: ['Array', 'Hash Table', 'String', 'Design', 'Graph', 'BFS'],
    minProblems: 30,
    description: 'Real-time systems and location algorithms'
  },
  'Lyft': {
    topics: ['Array', 'Hash Table', 'Graph', 'Design', 'String'],
    minProblems: 28,
    description: 'Ride-sharing optimization'
  },
  'Waymo': {
    topics: ['Graph', 'Dynamic Programming', 'Math', 'Array'],
    minProblems: 35,
    description: 'Autonomous vehicle algorithms'
  },
  'Cruise': {
    topics: ['Graph', 'Array', 'Math', 'Simulation'],
    minProblems: 33,
    description: 'Self-driving technology'
  },
  
  // Social & Communication
  'LinkedIn': {
    topics: ['Hash Table', 'Array', 'String', 'Design', 'Tree', 'Graph'],
    minProblems: 30,
    description: 'System design and scalability'
  },
  'Twitter': {
    topics: ['Hash Table', 'Array', 'String', 'Design', 'Heap'],
    minProblems: 30,
    description: 'Real-time data processing'
  },
  'Snap': {
    topics: ['Array', 'Design', 'Hash Table', 'String'],
    minProblems: 28,
    description: 'Media processing and user engagement'
  },
  'Pinterest': {
    topics: ['Array', 'Hash Table', 'Design', 'Graph'],
    minProblems: 28,
    description: 'Recommendation engines'
  },
  'Reddit': {
    topics: ['Hash Table', 'Array', 'String', 'Tree'],
    minProblems: 25,
    description: 'Content aggregation'
  },
  
  // E-commerce & Retail
  'Airbnb': {
    topics: ['Array', 'String', 'Design', 'Backtracking', 'Hash Table'],
    minProblems: 30,
    description: 'Clean code and practical solutions'
  },
  'eBay': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 28,
    description: 'Marketplace algorithms'
  },
  'Shopify': {
    topics: ['Array', 'String', 'Hash Table', 'Design'],
    minProblems: 25,
    description: 'E-commerce platforms'
  },
  'Etsy': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 25,
    description: 'Marketplace optimization'
  },
  'Walmart Labs': {
    topics: ['Array', 'String', 'Hash Table', 'Design'],
    minProblems: 28,
    description: 'Retail technology'
  },
  'Target': {
    topics: ['Array', 'Hash Table', 'String'],
    minProblems: 25,
    description: 'Supply chain optimization'
  },
  
  // Cloud & Infrastructure
  'Databricks': {
    topics: ['Array', 'Hash Table', 'Design', 'String'],
    minProblems: 30,
    description: 'Big data processing'
  },
  'Snowflake': {
    topics: ['Hash Table', 'Array', 'Design', 'String'],
    minProblems: 30,
    description: 'Data warehousing'
  },
  'MongoDB': {
    topics: ['Hash Table', 'Design', 'Array', 'Tree'],
    minProblems: 28,
    description: 'Database systems'
  },
  'Redis Labs': {
    topics: ['Hash Table', 'Design', 'String'],
    minProblems: 28,
    description: 'In-memory databases'
  },
  'Elastic': {
    topics: ['Hash Table', 'String', 'Array', 'Design'],
    minProblems: 28,
    description: 'Search and analytics'
  },
  
  // Fintech & Payments
  'Stripe': {
    topics: ['Array', 'String', 'Hash Table', 'Design', 'Tree'],
    minProblems: 25,
    description: 'API design and payment processing'
  },
  'Square': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 25,
    description: 'Payment systems'
  },
  'PayPal': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 28,
    description: 'Transaction processing'
  },
  'Coinbase': {
    topics: ['Array', 'Hash Table', 'String', 'Math', 'Design'],
    minProblems: 25,
    description: 'Cryptocurrency and security'
  },
  'Robinhood': {
    topics: ['Array', 'Hash Table', 'Design', 'Math', 'Queue'],
    minProblems: 25,
    description: 'Trading systems'
  },
  'Plaid': {
    topics: ['Hash Table', 'Array', 'String', 'Design'],
    minProblems: 25,
    description: 'Financial data APIs'
  },
  'Affirm': {
    topics: ['Array', 'Math', 'Hash Table', 'String'],
    minProblems: 25,
    description: 'Lending algorithms'
  },
  'Chime': {
    topics: ['Array', 'Hash Table', 'Design'],
    minProblems: 23,
    description: 'Banking technology'
  },
  
  // Enterprise & Business
  'Salesforce': {
    topics: ['Array', 'String', 'Tree', 'Hash Table', 'Design'],
    minProblems: 25,
    description: 'Enterprise solutions'
  },
  'Oracle': {
    topics: ['Array', 'String', 'Tree', 'Database', 'Design'],
    minProblems: 25,
    description: 'Database optimization'
  },
  'SAP': {
    topics: ['Array', 'String', 'Design', 'Hash Table'],
    minProblems: 25,
    description: 'Enterprise resource planning'
  },
  'ServiceNow': {
    topics: ['Array', 'String', 'Hash Table', 'Design'],
    minProblems: 25,
    description: 'IT service management'
  },
  'Workday': {
    topics: ['Array', 'String', 'Hash Table', 'Tree'],
    minProblems: 25,
    description: 'HR and finance software'
  },
  
  // Gaming
  'Riot Games': {
    topics: ['Graph', 'Array', 'Dynamic Programming', 'Math'],
    minProblems: 28,
    description: 'Game mechanics and matchmaking'
  },
  'Blizzard': {
    topics: ['Array', 'Graph', 'Math', 'Simulation'],
    minProblems: 28,
    description: 'Game engine development'
  },
  'Epic Games': {
    topics: ['Array', 'Math', 'Graph', 'Simulation'],
    minProblems: 30,
    description: 'Unreal Engine optimization'
  },
  'Unity': {
    topics: ['Array', 'Math', 'Graph', 'Tree'],
    minProblems: 28,
    description: 'Game development platform'
  },
  'Roblox': {
    topics: ['Array', 'Design', 'Hash Table', 'Graph'],
    minProblems: 28,
    description: 'User-generated content platform'
  },
  
  // International Tech Giants
  'ByteDance': {
    topics: ['Array', 'String', 'Dynamic Programming', 'Graph', 'DFS'],
    minProblems: 35,
    description: 'Algorithm complexity and optimization'
  },
  'Tencent': {
    topics: ['Array', 'Dynamic Programming', 'Graph', 'String'],
    minProblems: 35,
    description: 'Large-scale systems'
  },
  'Alibaba': {
    topics: ['Array', 'Hash Table', 'Dynamic Programming', 'Design'],
    minProblems: 33,
    description: 'E-commerce at scale'
  },
  'Baidu': {
    topics: ['Array', 'String', 'Dynamic Programming', 'Graph'],
    minProblems: 30,
    description: 'Search and AI'
  },
  'Samsung': {
    topics: ['Array', 'String', 'Design', 'Math'],
    minProblems: 28,
    description: 'Hardware-software integration'
  },
  
  // Cybersecurity
  'Palo Alto Networks': {
    topics: ['Hash Table', 'String', 'Array', 'Design'],
    minProblems: 28,
    description: 'Network security'
  },
  'CrowdStrike': {
    topics: ['Hash Table', 'Array', 'String', 'Graph'],
    minProblems: 28,
    description: 'Endpoint security'
  },
  'Okta': {
    topics: ['Hash Table', 'Design', 'String', 'Array'],
    minProblems: 25,
    description: 'Identity management'
  },
  
  // Chip & Hardware
  'NVIDIA': {
    topics: ['Array', 'Math', 'Dynamic Programming', 'Graph'],
    minProblems: 33,
    description: 'GPU computing and AI'
  },
  'Intel': {
    topics: ['Array', 'Math', 'Bit Manipulation', 'Design'],
    minProblems: 30,
    description: 'Processor design'
  },
  'AMD': {
    topics: ['Array', 'Math', 'Bit Manipulation'],
    minProblems: 30,
    description: 'Chip architecture'
  },
  'Qualcomm': {
    topics: ['Array', 'Math', 'Bit Manipulation', 'Design'],
    minProblems: 28,
    description: 'Mobile chip design'
  },
  
  // Software Tools & DevOps
  'Atlassian': {
    topics: ['Array', 'String', 'Design', 'Graph', 'Hash Table'],
    minProblems: 28,
    description: 'Collaboration software'
  },
  'GitHub': {
    topics: ['Graph', 'Tree', 'Hash Table', 'Design'],
    minProblems: 28,
    description: 'Version control systems'
  },
  'GitLab': {
    topics: ['Graph', 'Tree', 'Hash Table', 'Design'],
    minProblems: 25,
    description: 'DevOps platform'
  },
  'Docker': {
    topics: ['Design', 'Hash Table', 'Graph'],
    minProblems: 25,
    description: 'Containerization'
  },
  
  // Communication & Collaboration
  'Zoom': {
    topics: ['Array', 'Design', 'Queue', 'Hash Table'],
    minProblems: 25,
    description: 'Video communication'
  },
  'Slack': {
    topics: ['Array', 'Design', 'Hash Table', 'Queue'],
    minProblems: 25,
    description: 'Team collaboration'
  },
  'Discord': {
    topics: ['Array', 'Hash Table', 'Design', 'Queue'],
    minProblems: 25,
    description: 'Real-time communication'
  },
  'Twilio': {
    topics: ['Array', 'Hash Table', 'Design', 'Queue'],
    minProblems: 25,
    description: 'Communication APIs'
  },
  
  // Healthcare Tech
  'Oscar Health': {
    topics: ['Array', 'Design', 'Hash Table', 'String'],
    minProblems: 23,
    description: 'Healthcare technology'
  },
  'Epic Systems': {
    topics: ['Array', 'String', 'Design', 'Tree'],
    minProblems: 25,
    description: 'Electronic health records'
  },
  'Cerner': {
    topics: ['Array', 'String', 'Hash Table', 'Design'],
    minProblems: 23,
    description: 'Healthcare IT'
  },
  
  // Food & Delivery
  'DoorDash': {
    topics: ['Array', 'Hash Table', 'Graph', 'Design'],
    minProblems: 28,
    description: 'Delivery optimization'
  },
  'Instacart': {
    topics: ['Array', 'Hash Table', 'Graph', 'Design'],
    minProblems: 25,
    description: 'Grocery delivery algorithms'
  },
  'GrubHub': {
    topics: ['Array', 'Hash Table', 'Graph'],
    minProblems: 23,
    description: 'Food delivery routing'
  },
  
  // Travel & Hospitality
  'Booking.com': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 28,
    description: 'Travel booking systems'
  },
  'Expedia': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 28,
    description: 'Travel search optimization'
  },
  'TripAdvisor': {
    topics: ['Array', 'Hash Table', 'String'],
    minProblems: 23,
    description: 'Review and ranking systems'
  },
  
  // Education Tech
  'Coursera': {
    topics: ['Array', 'Hash Table', 'Design', 'Graph'],
    minProblems: 23,
    description: 'Online learning platforms'
  },
  'Udacity': {
    topics: ['Array', 'Hash Table', 'Design'],
    minProblems: 20,
    description: 'Educational content delivery'
  },
  'Duolingo': {
    topics: ['Array', 'Hash Table', 'Design', 'Graph'],
    minProblems: 23,
    description: 'Language learning algorithms'
  },
  
  // Consulting & Professional Services
  'Bloomberg': {
    topics: ['Array', 'String', 'Design', 'Hash Table', 'Sorting'],
    minProblems: 30,
    description: 'Financial systems and real-time data'
  },
  'Capital One': {
    topics: ['Array', 'Hash Table', 'String', 'Design'],
    minProblems: 28,
    description: 'Banking technology'
  },
  'Goldman Sachs': {
    topics: ['Array', 'Math', 'Dynamic Programming', 'Design'],
    minProblems: 30,
    description: 'Trading systems'
  },
  'JP Morgan': {
    topics: ['Array', 'String', 'Hash Table', 'Design'],
    minProblems: 28,
    description: 'Financial technology'
  },
  'Morgan Stanley': {
    topics: ['Array', 'Math', 'String', 'Design'],
    minProblems: 28,
    description: 'Quantitative finance'
  },
  
  // Analytics & Data
  'Palantir': {
    topics: ['Graph', 'Dynamic Programming', 'Array', 'Design'],
    minProblems: 35,
    description: 'Complex data analysis'
  },
  'Splunk': {
    topics: ['Hash Table', 'String', 'Array', 'Design'],
    minProblems: 28,
    description: 'Log analysis and search'
  },
  'Tableau': {
    topics: ['Array', 'Hash Table', 'Design'],
    minProblems: 23,
    description: 'Data visualization'
  },
  
  // Emerging Tech
  'OpenAI': {
    topics: ['Dynamic Programming', 'Graph', 'Math', 'Array'],
    minProblems: 35,
    description: 'AI and machine learning'
  },
  'Anthropic': {
    topics: ['Dynamic Programming', 'Math', 'Array'],
    minProblems: 33,
    description: 'AI safety research'
  },
  'Scale AI': {
    topics: ['Array', 'Hash Table', 'Design', 'String'],
    minProblems: 28,
    description: 'ML data infrastructure'
  },
  'Hugging Face': {
    topics: ['Array', 'Hash Table', 'Design'],
    minProblems: 25,
    description: 'ML model platform'
  }
};

export default function getCompanyRecommendations(topics, totalProblems) {
  const userTopics = topics.map(t => t.name);
  const recommendations = [];

  for (const [company, data] of Object.entries(COMPANY_TOPIC_PREFERENCES)) {
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
        totalTopics: data.topics.length,
        meetsThreshold,
        minProblems: data.minProblems,
        description: data.description,
        score
      });
    }
  }

  recommendations.sort((a, b) => b.score - a.score);
  return recommendations.slice(0, 5);
}

