function CareerOverviewSlide({ data }) {
  const { careerStats } = data;
  
  if (!careerStats) {
    return null;
  }

  const { totalProblems, difficulty, ranking, acceptanceRate } = careerStats;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-6xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          Your LeetCode Career
        </h2>
        <p className="text-center text-mono-light mb-16 uppercase tracking-widest text-sm">
          All-Time Statistics
        </p>

        {/* Career Total - Hero */}
        <div className="border-8 border-white bg-white text-black p-16 text-center mb-12">
          <div className="text-sm uppercase tracking-widest mb-4">Lifetime Total</div>
          <div className="text-9xl font-black mb-4">
            {totalProblems || 0}
          </div>
          <div className="text-2xl uppercase tracking-wider">
            Problems Solved Ever
          </div>
        </div>

        {/* All-Time Difficulty */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="border-4 border-white p-10 text-center">
            <div className="text-7xl font-black text-white mb-4">░</div>
            <div className="text-5xl font-black text-white mb-2">{difficulty.easy || 0}</div>
            <div className="text-lg uppercase tracking-wider text-mono-light">Easy</div>
          </div>
          <div className="border-4 border-white p-10 text-center">
            <div className="text-7xl font-black text-white mb-4">▒</div>
            <div className="text-5xl font-black text-white mb-2">{difficulty.medium || 0}</div>
            <div className="text-lg uppercase tracking-wider text-mono-light">Medium</div>
          </div>
          <div className="border-4 border-white p-10 text-center">
            <div className="text-7xl font-black text-white mb-4">▓</div>
            <div className="text-5xl font-black text-white mb-2">{difficulty.hard || 0}</div>
            <div className="text-lg uppercase tracking-wider text-mono-light">Hard</div>
          </div>
        </div>

        {/* Career Metrics */}
        <div className="grid grid-cols-2 gap-6">
          {ranking && (
            <div className="border-4 border-white p-8 text-center">
              <div className="text-sm uppercase tracking-widest text-mono-light mb-2">
                Global Ranking
              </div>
              <div className="text-5xl font-black text-white">
                #{ranking.toLocaleString()}
              </div>
            </div>
          )}
          <div className="border-4 border-white p-8 text-center">
            <div className="text-sm uppercase tracking-widest text-mono-light mb-2">
              Acceptance Rate
            </div>
            <div className="text-5xl font-black text-white">
              {acceptanceRate || 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerOverviewSlide;

