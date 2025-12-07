// Personality types based on famous computer scientists and their coding patterns

const PERSONALITY_TYPES = {
  'donald-knuth': {
    name: 'Donald Knuth',
    title: 'The Algorithm Perfectionist',
    field: 'Algorithms & Mathematical Analysis',
    traits: ['High problem count', 'Loves complexity', 'Theory-driven'],
    description: 'Like Knuth, you approach problems with mathematical precision and thoroughness.',
    icon: '█'
  },
  'grace-hopper': {
    name: 'Grace Hopper',
    title: 'The Practical Pioneer',
    field: 'Compilers & Programming Languages',
    traits: ['Consistent solver', 'Medium difficulty focus', 'Pragmatic'],
    description: 'Like Admiral Hopper, you value practical solutions and steady progress.',
    icon: '█'
  },
  'alan-turing': {
    name: 'Alan Turing',
    title: 'The Theoretical Mastermind',
    field: 'Theoretical Computer Science',
    traits: ['Hard problems', 'Deep thinker', 'Mathematical'],
    description: 'Like Turing, you tackle the hardest problems with mathematical elegance.',
    icon: '█'
  },
  'barbara-liskov': {
    name: 'Barbara Liskov',
    title: 'The System Architect',
    field: 'Software Engineering & Design',
    traits: ['Balanced approach', 'Design patterns', 'Structured'],
    description: 'Like Liskov, you focus on clean design and solid engineering principles.',
    icon: '█'
  },
  'edsger-dijkstra': {
    name: 'Edsger Dijkstra',
    title: 'The Elegant Solver',
    field: 'Graph Theory & Algorithms',
    traits: ['Graph problems', 'Elegant solutions', 'Optimization'],
    description: 'Like Dijkstra, you seek the most elegant and efficient paths.',
    icon: '█'
  },
  'linus-torvalds': {
    name: 'Linus Torvalds',
    title: 'The Systems Builder',
    field: 'Operating Systems & Kernel Development',
    traits: ['High volume', 'Practical', 'C/C++ focus'],
    description: 'Like Torvalds, you build robust systems through consistent effort.',
    icon: '█'
  },
  'john-carmack': {
    name: 'John Carmack',
    title: 'The Performance Optimizer',
    field: 'Graphics & Game Engines',
    traits: ['Speed focused', 'Math heavy', 'Optimization'],
    description: 'Like Carmack, you obsess over performance and mathematical optimization.',
    icon: '█'
  },
  'frances-allen': {
    name: 'Frances Allen',
    title: 'The Compiler Genius',
    field: 'Compiler Optimization',
    traits: ['Code optimization', 'Analysis', 'Efficiency'],
    description: 'Like Allen, you optimize everything for maximum efficiency.',
    icon: '█'
  },
  'leslie-lamport': {
    name: 'Leslie Lamport',
    title: 'The Distributed Thinker',
    field: 'Distributed Systems & Concurrency',
    traits: ['Concurrent problems', 'System design', 'Theory'],
    description: 'Like Lamport, you excel at thinking about distributed and concurrent systems.',
    icon: '█'
  },
  'shafi-goldwasser': {
    name: 'Shafi Goldwasser',
    title: 'The Cryptography Expert',
    field: 'Cryptography & Complexity Theory',
    traits: ['Hard problems', 'Mathematical', 'Security focus'],
    description: 'Like Goldwasser, you master complex cryptographic and mathematical challenges.',
    icon: '█'
  },
  'ken-thompson': {
    name: 'Ken Thompson',
    title: 'The Systems Hacker',
    field: 'Unix & Programming Languages',
    traits: ['Diverse topics', 'Practical', 'Innovative'],
    description: 'Like Thompson, you innovate across multiple domains with practical solutions.',
    icon: '█'
  },
  'tim-berners-lee': {
    name: 'Tim Berners-Lee',
    title: 'The Connector',
    field: 'Web & Information Systems',
    traits: ['Graph problems', 'Trees', 'Connectivity'],
    description: 'Like Berners-Lee, you excel at connecting and organizing information.',
    icon: '█'
  },
  'ada-lovelace': {
    name: 'Ada Lovelace',
    title: 'The Visionary Programmer',
    field: 'Early Computing & Algorithms',
    traits: ['Mathematical', 'Creative', 'Pattern recognition'],
    description: 'Like Lovelace, you see the bigger picture and find elegant patterns.',
    icon: '▓'
  },
  'dennis-ritchie': {
    name: 'Dennis Ritchie',
    title: 'The Systems Pioneer',
    field: 'Operating Systems & C Language',
    traits: ['Low-level focus', 'Efficient', 'Foundational'],
    description: 'Like Ritchie, you build robust foundations for complex systems.',
    icon: '▒'
  },
  'bjarne-stroustrup': {
    name: 'Bjarne Stroustrup',
    title: 'The Performance Engineer',
    field: 'C++ & System Programming',
    traits: ['Performance-focused', 'Object-oriented', 'Practical'],
    description: 'Like Stroustrup, you balance abstraction with performance.',
    icon: '░'
  },
  'guido-van-rossum': {
    name: 'Guido van Rossum',
    title: 'The Pragmatic Developer',
    field: 'Python & Language Design',
    traits: ['Readable code', 'Practical', 'User-friendly'],
    description: 'Like van Rossum, you value simplicity and readability.',
    icon: '▓'
  }
};

export function determinePersonalityType(data) {
  const { difficulty, topics, summary, languages } = data;
  
  // Calculate various metrics
  const totalProblems = difficulty.all || 0;
  const hardPercentage = totalProblems > 0 ? (difficulty.hard / totalProblems) * 100 : 0;
  const easyPercentage = totalProblems > 0 ? (difficulty.easy / totalProblems) * 100 : 0;
  const mediumPercentage = totalProblems > 0 ? (difficulty.medium / totalProblems) * 100 : 0;
  
  // Get top topics
  const topicNames = topics.slice(0, 3).map(t => t.name.toLowerCase());
  const hasGraph = topicNames.some(t => t.includes('graph') || t.includes('tree'));
  const hasDp = topicNames.some(t => t.includes('dynamic') || t.includes('dp'));
  const hasMath = topicNames.some(t => t.includes('math'));
  const hasArray = topicNames.some(t => t.includes('array'));
  
  // Language analysis
  const primaryLanguage = languages[0]?.language.toLowerCase() || '';
  const isCppC = primaryLanguage.includes('c++') || primaryLanguage.includes('c');
  
  // Scoring system
  let scores = {};
  
  // Donald Knuth - high problem count, loves theory and complexity
  scores['donald-knuth'] = 0;
  if (totalProblems > 500) scores['donald-knuth'] += 30;
  if (hasDp || hasMath) scores['donald-knuth'] += 30;
  if (hardPercentage > 20) scores['donald-knuth'] += 20;
  if (summary.longestStreak > 50) scores['donald-knuth'] += 20;
  
  // Grace Hopper - practical, consistent, medium difficulty
  scores['grace-hopper'] = 0;
  if (mediumPercentage > 40) scores['grace-hopper'] += 40;
  if (summary.activeDays > 100) scores['grace-hopper'] += 30;
  if (totalProblems >= 200 && totalProblems <= 500) scores['grace-hopper'] += 30;
  
  // Alan Turing - loves hard problems, theoretical
  scores['alan-turing'] = 0;
  if (hardPercentage > 30) scores['alan-turing'] += 50;
  if (hasMath) scores['alan-turing'] += 30;
  if (difficulty.hard > 100) scores['alan-turing'] += 20;
  
  // Barbara Liskov - balanced, design-focused
  scores['barbara-liskov'] = 0;
  const isBalanced = Math.abs(easyPercentage - mediumPercentage) < 15 && Math.abs(mediumPercentage - hardPercentage) < 15;
  if (isBalanced) scores['barbara-liskov'] += 40;
  if (topicNames.some(t => t.includes('design') || t.includes('tree') || t.includes('linked'))) scores['barbara-liskov'] += 30;
  if (totalProblems > 300) scores['barbara-liskov'] += 30;
  
  // Edsger Dijkstra - graph problems, elegant solutions
  scores['edsger-dijkstra'] = 0;
  if (hasGraph) scores['edsger-dijkstra'] += 50;
  if (hardPercentage > 20) scores['edsger-dijkstra'] += 25;
  if (topicNames.some(t => t.includes('shortest'))) scores['edsger-dijkstra'] += 25;
  
  // Linus Torvalds - high volume, C/C++, systems
  scores['linus-torvalds'] = 0;
  if (totalProblems > 800) scores['linus-torvalds'] += 40;
  if (isCppC) scores['linus-torvalds'] += 30;
  if (summary.activeDays > 150) scores['linus-torvalds'] += 30;
  
  // John Carmack - optimization, math, performance
  scores['john-carmack'] = 0;
  if (hasMath) scores['john-carmack'] += 35;
  if (hardPercentage > 25) scores['john-carmack'] += 35;
  if (topicNames.some(t => t.includes('bit') || t.includes('math'))) scores['john-carmack'] += 30;
  
  // Frances Allen - optimization, efficiency
  scores['frances-allen'] = 0;
  if (hasDp) scores['frances-allen'] += 40;
  if (hardPercentage > 15) scores['frances-allen'] += 30;
  if (summary.acceptanceRate > 60) scores['frances-allen'] += 30;
  
  // Leslie Lamport - distributed systems, concurrency
  scores['leslie-lamport'] = 0;
  if (topicNames.some(t => t.includes('concurrency') || t.includes('queue') || t.includes('stack'))) scores['leslie-lamport'] += 40;
  if (hasGraph) scores['leslie-lamport'] += 30;
  if (hardPercentage > 20) scores['leslie-lamport'] += 30;
  
  // Shafi Goldwasser - cryptography, hard math
  scores['shafi-goldwasser'] = 0;
  if (hasMath) scores['shafi-goldwasser'] += 40;
  if (hardPercentage > 35) scores['shafi-goldwasser'] += 40;
  if (difficulty.hard > 150) scores['shafi-goldwasser'] += 20;
  
  // Ken Thompson - diverse, innovative
  scores['ken-thompson'] = 0;
  if (topics.length > 15) scores['ken-thompson'] += 40;
  if (languages.length > 2) scores['ken-thompson'] += 30;
  if (totalProblems > 400) scores['ken-thompson'] += 30;
  
  // Tim Berners-Lee - graphs, trees, connectivity
  scores['tim-berners-lee'] = 0;
  if (hasGraph) scores['tim-berners-lee'] += 40;
  if (topicNames.some(t => t.includes('tree'))) scores['tim-berners-lee'] += 30;
  if (hasArray) scores['tim-berners-lee'] += 30;

  // Ada Lovelace - visionary, patterns, mathematical
  scores['ada-lovelace'] = 0;
  if (hasMath || hasDp) scores['ada-lovelace'] += 40;
  if (totalProblems > 200) scores['ada-lovelace'] += 30;
  if (topics.length > 10) scores['ada-lovelace'] += 30;

  // Dennis Ritchie - low-level, C/C++, systems
  scores['dennis-ritchie'] = 0;
  if (isCppC) scores['dennis-ritchie'] += 50;
  if (topicNames.some(t => t.includes('bit') || t.includes('pointer'))) scores['dennis-ritchie'] += 30;
  if (hardPercentage > 15) scores['dennis-ritchie'] += 20;

  // Bjarne Stroustrup - C++, performance, OOP
  scores['bjarne-stroustrup'] = 0;
  if (primaryLanguage.includes('c++')) scores['bjarne-stroustrup'] += 50;
  if (hardPercentage > 20) scores['bjarne-stroustrup'] += 30;
  if (totalProblems > 300) scores['bjarne-stroustrup'] += 20;

  // Guido van Rossum - Python, pragmatic, readable
  scores['guido-van-rossum'] = 0;
  if (primaryLanguage.includes('python')) scores['guido-van-rossum'] += 50;
  if (mediumPercentage > 35) scores['guido-van-rossum'] += 30;
  if (summary.acceptanceRate > 55) scores['guido-van-rossum'] += 20;
  
  // Find highest score
  const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topType = sortedTypes[0][0];
  const secondType = sortedTypes[1][0];
  
  return {
    primary: PERSONALITY_TYPES[topType],
    secondary: PERSONALITY_TYPES[secondType],
    score: sortedTypes[0][1]
  };
}

export function generateInterestingFacts(data) {
  const facts = [];
  
  const { difficulty, summary, topics, languages } = data;
  
  // Time-based facts
  if (summary.totalProblemsThisYear > 0) {
    const avgPerDay = (summary.totalProblemsThisYear / Math.max(summary.activeDays, 1)).toFixed(1);
    facts.push(`You solve an average of ${avgPerDay} problems per active day`);
  }
  
  // Difficulty facts
  const hardRatio = difficulty.all > 0 ? ((difficulty.hard / difficulty.all) * 100).toFixed(0) : 0;
  if (hardRatio > 30) {
    facts.push(`${hardRatio}% of your solutions are HARD problems - you're fearless!`);
  }
  
  // Topic mastery
  if (topics.length > 0 && topics[0].count > 50) {
    facts.push(`You've mastered ${topics[0].name} with ${topics[0].count} problems`);
  }
  
  // Streak facts
  if (summary.longestStreak > 30) {
    facts.push(`Your ${summary.longestStreak}-day streak shows incredible discipline`);
  }
  
  // Language diversity
  if (languages.length > 3) {
    facts.push(`Polyglot alert: ${languages.length} programming languages!`);
  }
  
  // Total achievement
  if (difficulty.all > 1000) {
    facts.push('1000+ problems solved - you\'re in the elite club');
  } else if (difficulty.all > 500) {
    facts.push('500+ problems solved - you\'re on fire!');
  }
  
  return facts;
}

