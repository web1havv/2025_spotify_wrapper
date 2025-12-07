# 🎁 LeetCode Wrapped 2025 - Features

## ✅ Completed Features

### 🎨 Design
- ⚫⚪ **Pure Black & White Theme** - Minimalist, high-contrast design
- 📐 **Clean Layout** - No glitchy effects, professional presentation
- 🎯 **Smooth Animations** - Fade-in, slide-up, scale-in only

### 📊 2025-Specific Stats
- **Problems Solved in 2025** - Tracked separately from all-time
- **Active Days in 2025** - How many days you coded this year
- **Monthly Activity Graph** - Visual breakdown by month (Jan-Dec 2025)
- **Clear Labeling** - "All Time" vs "2025" clearly marked

### 👤 Personality Types (NEW!)
Based on **12 Famous Computer Scientists**:

1. **Donald Knuth** - The Algorithm Perfectionist
2. **Grace Hopper** - The Practical Pioneer  
3. **Alan Turing** - The Theoretical Mastermind
4. **Barbara Liskov** - The System Architect
5. **Edsger Dijkstra** - The Elegant Solver
6. **Linus Torvalds** - The Systems Builder
7. **John Carmack** - The Performance Optimizer
8. **Frances Allen** - The Compiler Genius
9. **Leslie Lamport** - The Distributed Thinker
10. **Shafi Goldwasser** - The Cryptography Expert
11. **Ken Thompson** - The Systems Hacker
12. **Tim Berners-Lee** - The Connector

**How It Works:**
- Analyzes your coding patterns, problem types, difficulty preferences
- Matches you with a primary and secondary scientist personality
- Shows which famous researcher's approach matches yours!

### 💡 Interesting Facts (NEW!)
Auto-generated insights like:
- "You solve an average of X problems per active day"
- "Y% of your solutions are HARD problems - you're fearless!"
- "You've mastered [Topic] with X problems"
- "Your X-day streak shows incredible discipline"
- "Polyglot alert: X programming languages!"
- Achievement milestones (500+, 1000+ club)

### 🏢 Company Recommendations
**18 Top Tech Companies** matched to your skills:
- Google, Meta, Amazon, Microsoft, Apple
- Netflix, Tesla, LinkedIn, Uber, Airbnb
- ByteDance, Salesforce, Oracle, Adobe
- Bloomberg, Stripe, Coinbase, Robinhood

**Matching Algorithm:**
- Analyzes your practiced topics
- Compares with company interview patterns
- Shows match percentage
- Tells you if you're ready to apply!

### 📈 Comprehensive Analytics
1. **Intro** - Your name + 2025
2. **Stats Overview** - Problems solved, active days, streak
3. **Difficulty Breakdown** - Easy/Medium/Hard with percentages
4. **Top Topics** - Your 5 most-practiced topics
5. **Personality Type** - Which computer scientist are you?
6. **Company Matches** - Top 5 companies for you
7. **Activity Graph** - Monthly 2025 breakdown
8. **Languages** - Your programming language stats
9. **Achievements** - Unlocked badges
10. **Final Summary** - Share-worthy wrap-up

## 🔧 Technical Details

### Data Sources
- **LeetCode GraphQL API** - Public endpoint
- **Real-time fetching** - No storage needed
- **2025-specific filtering** - Calendar data parsed for current year

### Stack
- **Backend:** Node.js, Express, Axios
- **Frontend:** React, Vite, TailwindCSS
- **Styling:** Pure CSS, no external animation libs
- **Data:** JSON processing, algorithmic analysis

## 📅 Year-Specific Implementation

### How 2025 Data is Extracted:
```javascript
// Filter calendar data for 2025 only
const yearStart = new Date(2025, 0, 1).getTime() / 1000;
const yearEnd = new Date(2025, 11, 31, 23, 59, 59).getTime() / 1000;

// Process only submissions in 2025
const yearSubmissions = calendarData.filter(ts => 
  ts >= yearStart && ts <= yearEnd
);

// Calculate monthly breakdown for 2025
monthlyActivity = calculateByMonth(yearSubmissions, 2025);
```

### All-Time vs 2025 Separation:
- **All-Time:** Total problems, difficulty breakdown, ranking, success rate
- **2025 Only:** Problems this year, active days, monthly graph

## 🎯 Personality Matching Algorithm

Analyzes:
- Total problem count
- Hard/Medium/Easy ratios
- Favorite topics (DP, Graph, Math, Array, etc.)
- Primary programming language
- Streak and consistency
- Acceptance rate

Scores each personality type (0-100) and picks top 2 matches.

## 🚀 Ready to Deploy

All features complete and tested!
- Clean, professional black & white design
- 2025-specific data filtering
- Personality types based on real CS legends
- Interesting auto-generated facts
- Company recommendations

**Visit: `http://localhost:5173`**

