function InsightsSlide({ data }) {
  const insights = generateInsights(data);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <h2 className="text-5xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          Crazy Stats
        </h2>
        <p className="text-center text-white mb-12 uppercase tracking-widest text-sm">
          Mind-blowing facts about your {data.year}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="border-4 border-white text-white p-8 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl font-black mb-4">{insight.icon}</div>
              <div className="text-3xl font-black mb-3">{insight.value}</div>
              <div className="text-lg uppercase tracking-wider opacity-80">
                {insight.label}
              </div>
              <div className="mt-4 border-t-2 border-white pt-4">
                <div className="text-sm uppercase tracking-wider">
                  {insight.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Insight */}
        <div className="mt-12 border-8 border-white bg-white text-black p-12 text-center">
          <div className="text-sm uppercase tracking-widest mb-3">If you keep this pace...</div>
          <div className="text-5xl font-black mb-4">
            {Math.round(data.summary.totalProblemsThisYear * 5)} Problems
          </div>
          <div className="text-2xl uppercase tracking-wider">
            By 2030!
          </div>
        </div>
      </div>
    </div>
  );
}

function generateInsights(data) {
  const insights = [];
  const stats = data.summary;
  const difficulty = data.difficulty;

  // Time spent estimate
  const avgTimePerProblem = 25; // minutes
  const totalMinutes = stats.totalProblemsThisYear * avgTimePerProblem;
  const hours = Math.round(totalMinutes / 60);
  
  insights.push({
    icon: '█',
    value: `${hours}+ hours`,
    label: 'Time invested',
    description: `About ${Math.round(hours / 24)} full days of coding!`
  });

  // Lines of code estimate
  const avgLinesPerProblem = 50;
  const totalLines = stats.totalProblemsThisYear * avgLinesPerProblem;
  
  insights.push({
    icon: '▓',
    value: `${(totalLines / 1000).toFixed(1)}K+ lines`,
    label: 'Code written',
    description: `That's like writing ${Math.round(totalLines / 500)} novels!`
  });

  // Brain power
  const algorithmsLearned = data.topics?.length || 0;
  
  insights.push({
    icon: '▒',
    value: `${algorithmsLearned}+ algorithms`,
    label: 'Techniques mastered',
    description: 'Your algorithm arsenal is growing!'
  });

  // Hard problems insight
  if (difficulty.hard > 0) {
    insights.push({
      icon: '░',
      value: `${difficulty.hard} hard`,
      label: 'Tough challenges conquered',
      description: `You're in the top ${difficulty.hard > 50 ? '5%' : '15%'} of problem solvers!`
    });
  }

  // Consistency
  const consistencyScore = stats.activeDays > 0 
    ? Math.round((stats.totalProblemsThisYear / stats.activeDays) * 10) / 10
    : 0;
  
  insights.push({
    icon: '■',
    value: `${consistencyScore}`,
    label: 'Problems per active day',
    description: consistencyScore > 2 ? 'Incredible pace!' : 'Steady progress!'
  });

  // Streak power
  if (stats.longestStreak > 0) {
    insights.push({
      icon: '▪',
      value: `${stats.longestStreak} days`,
      label: 'Longest streak',
      description: stats.longestStreak > 30 ? 'Unstoppable force!' : 'Building momentum!'
    });
  }

  return insights.slice(0, 6); // Return top 6
}

export default InsightsSlide;

