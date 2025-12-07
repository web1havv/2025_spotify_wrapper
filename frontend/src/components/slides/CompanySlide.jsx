function CompanySlide({ data }) {
  const { companyRecommendations } = data;

  if (!companyRecommendations || companyRecommendations.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4 font-black">█</div>
          <h2 className="text-4xl font-black text-white uppercase">No company matches yet</h2>
        </div>
      </div>
    );
  }

  const topMatch = companyRecommendations[0];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <h2 className="text-5xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider ">
          Companies for You
        </h2>
        <p className="text-center text-mono-light mb-16 uppercase tracking-widest text-sm">
          Based on your skills & topics
        </p>

        {/* Top Match - Large Card */}
        <div className="border-8 border-white bg-white text-black p-12 mb-8 animate-scale-in hover:scale-105 transition-all group">
          <div className="text-sm uppercase tracking-widest mb-2">Top Match</div>
          <div className="text-6xl md:text-7xl font-black mb-4 uppercase tracking-tight group-hover:">
            {topMatch.company}
          </div>
          <div className="text-4xl font-black mb-6 group-hover:">
            {topMatch.matchPercentage || 0}% Match
          </div>
          <div className="mb-6 text-lg uppercase tracking-wide">
            {topMatch.description}
          </div>
          <div className="border-t-4 border-black pt-4">
            <div className="text-sm uppercase tracking-wider mb-2">Your Matched Skills:</div>
            <div className="flex flex-wrap gap-2">
              {topMatch.matchedTopics.slice(0, 6).map((topic, idx) => (
                <span key={idx} className="border-2 border-black px-3 py-1 text-xs uppercase tracking-wider font-bold">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          {topMatch.meetsThreshold && (
            <div className="mt-4 text-sm uppercase tracking-widest font-bold">
              ✓ Ready to apply
            </div>
          )}
          {!topMatch.meetsThreshold && (
            <div className="mt-4 text-sm uppercase tracking-widest">
              Solve {topMatch.minProblems - data.summary.totalProblems} more to be interview-ready
            </div>
          )}
        </div>

        {/* Other Matches - Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyRecommendations.slice(1, 5).map((company, index) => (
            <div
              key={company.company}
              className="border-4 border-white text-white p-6 animate-slide-up hover:bg-white hover:text-black transition-all group"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="text-3xl font-black mb-2 uppercase tracking-tight">
                {company.company}
              </div>
              <div className="text-2xl font-black mb-3">
                {company.matchPercentage}%
              </div>
              <div className="text-xs uppercase tracking-wider mb-3 opacity-80">
                {company.description}
              </div>
              <div className="border-t-2 border-white group-hover:border-black pt-3">
                <div className="text-xs uppercase tracking-wider">
                  {company.matchedTopics.length} / {company.totalTopics} topics matched
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center border-2 border-white text-white p-4">
          <div className="text-sm uppercase tracking-widest text-mono-light">
            Based on {data.topics.length} topics analyzed
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanySlide;

