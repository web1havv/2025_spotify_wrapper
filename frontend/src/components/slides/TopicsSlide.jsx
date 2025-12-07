function TopicsSlide({ data }) {
  const { topics } = data;
  const topTopics = topics.slice(0, 6);
  const maxCount = topTopics.length > 0 ? topTopics[0].count : 1;
  const totalProblems = data.summary.totalProblemsThisYear || 1;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-6xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          Your {data.year} Topics
        </h2>
        <p className="text-center text-mono-light mb-16 uppercase tracking-widest text-sm">
          What you practiced this year
        </p>

        {/* Visual Topic Bars */}
        <div className="space-y-6 mb-12">
          {topTopics.map((topic, index) => {
            // Percentage relative to the top topic for visual bar width
            const barWidth = (topic.count / maxCount) * 100;
            // Actual percentage of total problems
            const actualPercentage = (topic.count / totalProblems) * 100;
            
            return (
              <div
                key={topic.name}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-black text-white border-4 border-white w-16 h-16 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="text-3xl font-black text-white uppercase tracking-wide">
                      {topic.name}
                    </div>
                  </div>
                  <div className="text-5xl font-black text-white">
                    {topic.count || 0}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-12 bg-mono-darker border-4 border-white relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-white transition-all duration-1000 flex items-center px-6"
                    style={{ width: `${barWidth}%` }}
                  >
                    <div className="text-black text-xl font-black">
                      {actualPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Topic Highlight */}
        {topTopics.length > 0 && (
          <div className="border-8 border-white bg-white text-black p-12 text-center">
            <div className="text-sm uppercase tracking-widest mb-2">Your #1 Topic in {data.year}</div>
            <div className="text-6xl font-black mb-4 uppercase tracking-tight">
              {topTopics[0].name}
            </div>
            <div className="text-4xl font-black">
              {topTopics[0].count} Problems This Year
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopicsSlide;
