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
      icon: '█'
    },
    {
      label: 'Active Days',
      user: userStats.activeDaysPerYear,
      avg: avgUser.activeDaysPerYear,
      icon: '▓'
    },
    {
      label: 'Longest Streak',
      user: userStats.longestStreak,
      avg: avgUser.longestStreak,
      icon: '▒'
    },
    {
      label: 'Hard Problems %',
      user: Math.round(userStats.hardPercentage),
      avg: avgUser.hardPercentage,
      icon: '░'
    },
    {
      label: 'Topics Practiced',
      user: userStats.topicsCount,
      avg: avgUser.topicsCount,
      icon: '■'
    }
  ];

  const topPercentile = calculatePercentile(userStats.problemsPerYear);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <h2 className="text-6xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          You vs Average User
        </h2>
        <p className="text-center text-white mb-12 uppercase tracking-widest text-sm">
          How you stack up in {data.year}
        </p>

        {/* Top Percentile Banner */}
        <div className="border-8 border-white bg-white text-black p-12 mb-12 text-center animate-scale-in">
          <div className="text-sm uppercase tracking-widest mb-2">Your Rank</div>
          <div className="text-9xl font-black mb-2">
            TOP {topPercentile}%
          </div>
          <div className="text-2xl uppercase tracking-wider">
            of LeetCode users in {data.year}
          </div>
        </div>

        {/* Bar Graph Comparisons */}
        <div className="space-y-8">
          {comparisons.map((comp, index) => {
            const maxValue = Math.max(comp.user, comp.avg) * 1.2; // Add 20% padding
            const userPercentage = (comp.user / maxValue) * 100;
            const avgPercentage = (comp.avg / maxValue) * 100;
            const multiplier = comp.avg > 0 ? (comp.user / comp.avg).toFixed(1) : 0;
            
            return (
              <motion.div
                key={comp.label}
                className="border-4 border-white p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl font-black text-white">{comp.icon}</div>
                    <div className="text-3xl font-black text-white uppercase tracking-wide">
                      {comp.label}
                    </div>
                  </div>
                  {multiplier > 0 && (
                    <div className="text-4xl font-black text-white">
                      {multiplier > 1 ? `${multiplier}x` : `${multiplier}x`}
                    </div>
                  )}
                </div>

                {/* Bar Graphs */}
                <div className="space-y-6">
                  {/* You */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xl font-black text-white uppercase tracking-wider">
                        YOU
                      </div>
                      <div className="text-3xl font-black text-white">
                        {comp.user}
                      </div>
                    </div>
                    <div className="h-16 bg-mono-darker border-4 border-white relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-white flex items-center justify-end px-6"
                        initial={{ width: 0 }}
                        animate={{ width: `${userPercentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                      >
                        <div className="text-black text-2xl font-black">
                          █
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Average User */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xl font-black text-white uppercase tracking-wider opacity-60">
                        AVERAGE USER
                      </div>
                      <div className="text-3xl font-black text-white opacity-60">
                        {comp.avg}
                      </div>
                    </div>
                    <div className="h-16 bg-mono-darker border-4 border-white relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 border-4 border-white flex items-center justify-end px-6"
                        initial={{ width: 0 }}
                        animate={{ width: `${avgPercentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      >
                        <div className="text-white text-2xl font-black">
                          ░
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Verdict */}
                <div className="mt-6 border-t-4 border-white pt-4">
                  <div className="text-2xl font-black text-white text-center uppercase tracking-wider">
                    {multiplier > 1.5 ? '■ Crushing It!' : 
                     multiplier > 1 ? '▓ Above Average!' : 
                     multiplier === 1 ? '▒ Right On Track!' : 
                     '░ Keep Grinding!'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-12 border-8 border-white bg-white text-black p-12 text-center">
          <div className="text-4xl font-black uppercase tracking-wider">
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
