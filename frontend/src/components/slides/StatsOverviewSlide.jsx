function StatsOverviewSlide({ data }) {
  const { summary } = data;

  // Calculate circular progress for year completion
  const yearProgress = ((new Date().getMonth() + 1) / 12) * 100;
  const problemsPerMonth = summary.activeDays > 0 
    ? (summary.totalProblemsThisYear / Math.max(new Date().getMonth() + 1, 1)).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-6xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          In {data.year}
        </h2>
        <p className="text-center text-mono-light mb-16 uppercase tracking-widest text-sm">
          You accomplished
        </p>

        {/* Main 2025 Stats - Large Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Problems in 2025 - HERO */}
          <div className="md:col-span-2 border-8 border-white bg-white text-black p-16 text-center">
            <div className="text-sm uppercase tracking-widest mb-4">Your {data.year}</div>
            <div className="text-9xl font-black mb-4">
              {summary.totalProblemsThisYear || 0}
            </div>
            <div className="text-2xl uppercase tracking-wider">
              Problems Solved This Year
            </div>
            <div className="text-lg mt-4 opacity-70">
              Average: {problemsPerMonth} per month
            </div>
          </div>

          {/* Active Days Circle Graph */}
          <div className="border-4 border-white text-white p-12 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  opacity="0.2"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - (summary.activeDays / 365))}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-black text-white">{summary.activeDays || 0}</div>
                  <div className="text-sm text-mono-light uppercase tracking-wider">Days</div>
                </div>
              </div>
            </div>
            <div className="text-xl text-white uppercase tracking-wider text-center">
              Active Days
            </div>
            <div className="text-mono-light text-sm mt-2">
              {summary.activeDays > 0 ? ((summary.activeDays / 365) * 100).toFixed(0) : 0}% of {data.year}
            </div>
          </div>

          {/* Streak */}
          <div className="border-4 border-white text-white p-12 flex flex-col items-center justify-center">
            <div className="mb-6">
              {[...Array(Math.min(summary.longestStreak, 20))].map((_, i) => (
                <span key={i} className="text-3xl">▓</span>
              ))}
            </div>
            <div className="text-6xl font-black text-white mb-2">
              {summary.longestStreak || 0}
            </div>
            <div className="text-xl text-white uppercase tracking-wider text-center">
              Longest Streak
            </div>
            <div className="text-mono-light text-sm mt-2 uppercase tracking-wider">
              Days in a Row
            </div>
          </div>
        </div>

        {/* Progress Bar - Year Timeline */}
        <div className="border-4 border-white text-white p-8">
          <div className="text-center text-white text-xl uppercase tracking-wider mb-4">
            {data.year} Progress
          </div>
          <div className="relative h-12 bg-mono-darker border-2 border-white">
            <div 
              className="absolute inset-y-0 left-0 bg-white transition-all duration-1000"
              style={{ width: `${yearProgress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xl font-black">
              {yearProgress.toFixed(0)}% Complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsOverviewSlide;
