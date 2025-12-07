function DifficultySlide({ data }) {
  const { difficulty } = data;
  const total = difficulty.easy + difficulty.medium + difficulty.hard;

  const getDifficultyPercentage = (count) => {
    return total > 0 ? ((count / total) * 100).toFixed(1) : 0;
  };

  // Create visual grid representation
  const createDots = (count, maxDots = 100) => {
    const displayDots = Math.min(count, maxDots);
    return Array(displayDots).fill('•');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-6xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          Difficulty Breakdown
        </h2>
        <p className="text-center text-mono-light mb-16 uppercase tracking-widest text-sm">
          {data.year} Only
        </p>

        {/* Large Stacked Bar */}
        <div className="mb-12 border-8 border-white p-8">
          <div className="space-y-8">
            {/* Easy */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="text-2xl font-black text-white uppercase tracking-wider">Easy</div>
                <div className="text-2xl font-black text-white">{difficulty.easy || 0}</div>
              </div>
              <div className="h-16 bg-mono-darker border-2 border-white relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-white flex items-center justify-center text-black text-3xl font-black transition-all duration-1000"
                  style={{ width: `${getDifficultyPercentage(difficulty.easy)}%` }}
                >
                  {difficulty.easy > 0 && getDifficultyPercentage(difficulty.easy) + '%'}
                </div>
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="text-2xl font-black text-white uppercase tracking-wider">Medium</div>
                <div className="text-2xl font-black text-white">{difficulty.medium || 0}</div>
              </div>
              <div className="h-16 bg-mono-darker border-2 border-white relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-white flex items-center justify-center text-black text-3xl font-black transition-all duration-1000"
                  style={{ width: `${getDifficultyPercentage(difficulty.medium)}%` }}
                >
                  {difficulty.medium > 0 && getDifficultyPercentage(difficulty.medium) + '%'}
                </div>
              </div>
            </div>

            {/* Hard */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="text-2xl font-black text-white uppercase tracking-wider">Hard</div>
                <div className="text-2xl font-black text-white">{difficulty.hard || 0}</div>
              </div>
              <div className="h-16 bg-mono-darker border-2 border-white relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-white flex items-center justify-center text-black text-3xl font-black transition-all duration-1000"
                  style={{ width: `${getDifficultyPercentage(difficulty.hard)}%` }}
                >
                  {difficulty.hard > 0 && getDifficultyPercentage(difficulty.hard) + '%'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Alternative - Circular Segments */}
        <div className="grid grid-cols-3 gap-4">
          <div className="border-4 border-white p-8 text-center">
            <div className="text-7xl font-black text-white mb-4">░</div>
            <div className="text-4xl font-black text-white mb-2">{difficulty.easy || 0}</div>
            <div className="text-sm uppercase tracking-wider text-mono-light">Easy</div>
          </div>
          <div className="border-4 border-white p-8 text-center">
            <div className="text-7xl font-black text-white mb-4">▒</div>
            <div className="text-4xl font-black text-white mb-2">{difficulty.medium || 0}</div>
            <div className="text-sm uppercase tracking-wider text-mono-light">Medium</div>
          </div>
          <div className="border-4 border-white p-8 text-center">
            <div className="text-7xl font-black text-white mb-4">▓</div>
            <div className="text-4xl font-black text-white mb-2">{difficulty.hard || 0}</div>
            <div className="text-sm uppercase tracking-wider text-mono-light">Hard</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DifficultySlide;
