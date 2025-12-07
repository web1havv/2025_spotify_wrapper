import { motion } from 'framer-motion';

function ComparisonsSlide({ data }) {
  // Average LeetCode user stats (realistic estimates)
  const avgUser = {
    problemsPerYear: 50,
    activeDaysPerYear: 60,
    longestStreak: 5,
    hardPercentage: 5,
    mediumPercentage: 35,
    easyPercentage: 60,
    topicsCount: 5
  };

  const userStats = {
    problemsPerYear: data.summary.totalProblemsThisYear || 0,
    activeDaysPerYear: data.summary.activeDays || 0,
    longestStreak: data.summary.longestStreak || 0,
    hardPercentage: data.difficulty.all > 0 ? (data.difficulty.hard / data.difficulty.all * 100) : 0,
    mediumPercentage: data.difficulty.all > 0 ? (data.difficulty.medium / data.difficulty.all * 100) : 0,
    easyPercentage: data.difficulty.all > 0 ? (data.difficulty.easy / data.difficulty.all * 100) : 0,
    topicsCount: data.topics?.length || 0
  };

  const comparisons = [
    {
      label: 'Problems Solved',
      user: userStats.problemsPerYear,
      avg: avgUser.problemsPerYear,
      multiplier: (userStats.problemsPerYear / avgUser.problemsPerYear).toFixed(1),
      icon: '█'
    },
    {
      label: 'Active Days',
      user: userStats.activeDaysPerYear,
      avg: avgUser.activeDaysPerYear,
      multiplier: (userStats.activeDaysPerYear / avgUser.activeDaysPerYear).toFixed(1),
      icon: '▓'
    },
    {
      label: 'Longest Streak',
      user: userStats.longestStreak,
      avg: avgUser.longestStreak,
      multiplier: (userStats.longestStreak / avgUser.longestStreak).toFixed(1),
      icon: '▒'
    },
    {
      label: 'Hard Problems %',
      user: userStats.hardPercentage.toFixed(0),
      avg: avgUser.hardPercentage,
      multiplier: (userStats.hardPercentage / avgUser.hardPercentage).toFixed(1),
      icon: '░',
      suffix: '%'
    }
  ];

  const problemsPerDay = userStats.activeDaysPerYear > 0 
    ? (userStats.problemsPerYear / userStats.activeDaysPerYear).toFixed(1) 
    : 0;
  
  const avgProblemsPerDay = 0.8; // Average user solves less than 1 per day
  
  const topPercentile = calculatePercentile(userStats.problemsPerYear);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          You vs Average User
        </h2>
        <p className="text-center text-white mb-12 uppercase tracking-widest text-sm">
          How you stack up in {data.year}
        </p>

        {/* Top Percentile Banner */}
        <div className="border-8 border-white bg-white text-black p-8 mb-12 text-center animate-scale-in">
          <div className="text-sm uppercase tracking-widest mb-2">Your Rank</div>
          <div className="text-7xl font-black mb-2">
            TOP {topPercentile}%
          </div>
          <div className="text-xl uppercase tracking-wider">
            of LeetCode users in {data.year}
          </div>
        </div>

        {/* Comparison Grid with Bigger Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {comparisons.map((comp, index) => {
            const maxVal = Math.max(comp.user, comp.avg);
            const userHeight = (comp.user / maxVal) * 100;
            const avgHeight = (comp.avg / maxVal) * 100;
            
            return (
              <motion.div
                key={comp.label}
                className="border-8 border-white p-10 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon & Label */}
                <div className="text-center mb-8">
                  <div className="text-7xl font-black text-white mb-4">{comp.icon}</div>
                  <div className="text-lg uppercase tracking-widest text-white font-bold">
                    {comp.label}
                  </div>
                </div>
                
                {/* Vertical Bars */}
                <div className="flex items-end justify-center gap-12 mb-8">
                  {/* User Bar */}
                  <div className="flex flex-col items-center w-24">
                    <div className="text-4xl font-black text-white mb-4">
                      {comp.user}{comp.suffix || ''}
                    </div>
                    <div className="w-full h-48 border-8 border-white relative bg-black">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-1000 ease-out"
                        style={{ height: `${userHeight}%` }}
                      ></div>
                    </div>
                    <div className="text-lg uppercase tracking-wider text-white mt-4 font-black">
                      YOU
                    </div>
                  </div>
                  
                  {/* Average Bar */}
                  <div className="flex flex-col items-center w-24">
                    <div className="text-4xl font-black text-white mb-4 opacity-50">
                      {comp.avg}{comp.suffix || ''}
                    </div>
                    <div className="w-full h-48 border-8 border-white relative bg-black opacity-40">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-1000 ease-out"
                        style={{ height: `${avgHeight}%` }}
                      ></div>
                    </div>
                    <div className="text-lg uppercase tracking-wider text-white mt-4 opacity-50 font-black">
                      AVG
                    </div>
                  </div>
                </div>

                {/* Multiplier */}
                <div className="border-t-8 border-white pt-6 text-center">
                  <div className="text-5xl font-black text-white">
                    {parseFloat(comp.multiplier) >= 1 ? `${comp.multiplier}x` : comp.multiplier}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-white mt-2 opacity-80">
                    {parseFloat(comp.multiplier) > 1 ? 'BETTER' : parseFloat(comp.multiplier) < 1 ? 'KEEP GOING' : 'ON PAR'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Speed Metric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-4 border-white text-white p-8 text-center">
            <div className="text-sm uppercase tracking-widest mb-2">Your Speed</div>
            <div className="text-6xl font-black mb-2">{problemsPerDay}</div>
            <div className="text-lg uppercase tracking-wider">Problems per day</div>
            {problemsPerDay > avgProblemsPerDay && (
              <div className="mt-4 text-xl font-black">
                {(problemsPerDay / avgProblemsPerDay).toFixed(1)}x faster than average!
              </div>
            )}
          </div>

          <div className="border-4 border-white text-white p-8 text-center">
            <div className="text-sm uppercase tracking-widest mb-2">Topic Mastery</div>
            <div className="text-6xl font-black mb-2">{userStats.topicsCount}</div>
            <div className="text-lg uppercase tracking-wider">Topics practiced</div>
            {userStats.topicsCount > avgUser.topicsCount && (
              <div className="mt-4 text-xl font-black">
                {Math.round((userStats.topicsCount / avgUser.topicsCount) * 100)}% more diverse!
              </div>
            )}
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-12 border-4 border-white bg-white text-black p-8 text-center">
          <div className="text-2xl font-black uppercase tracking-wider">
            {getFunComparison(userStats, avgUser)}
          </div>
        </div>
      </div>
    </div>
  );
}

function calculatePercentile(problems) {
  // Rough percentile estimates based on problem count
  if (problems >= 500) return 1;
  if (problems >= 300) return 5;
  if (problems >= 200) return 10;
  if (problems >= 150) return 15;
  if (problems >= 100) return 25;
  if (problems >= 50) return 40;
  return 60;
}

function getFunComparison(user, avg) {
  const ratio = user.problemsPerYear / avg.problemsPerYear;
  
  if (ratio >= 5) {
    return "█ You're coding like there's no tomorrow!";
  } else if (ratio >= 3) {
    return "▓ You're in the fast lane to success!";
  } else if (ratio >= 2) {
    return "▒ You're crushing it this year!";
  } else if (ratio >= 1.5) {
    return "░ You're above average - keep pushing!";
  } else if (ratio >= 1) {
    return "■ You're right on track!";
  } else {
    return "□ Every problem solved is progress!";
  }
}

export default ComparisonsSlide;

