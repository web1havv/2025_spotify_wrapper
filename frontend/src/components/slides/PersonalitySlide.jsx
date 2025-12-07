function PersonalitySlide({ data }) {
  const { personality, interestingFacts } = data;

  if (!personality || !personality.primary) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4 font-black">█</div>
          <h2 className="text-4xl font-black text-white uppercase">Analyzing personality...</h2>
        </div>
      </div>
    );
  }

  const { primary, secondary } = personality;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <h2 className="text-5xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          Your Coding Personality
        </h2>
        <p className="text-center text-mono-light mb-16 uppercase tracking-widest text-sm">
          Based on famous computer scientists
        </p>

        {/* Primary Personality */}
        <div className="border-8 border-white bg-white text-black p-12 mb-8 animate-scale-in">
          <div className="text-7xl mb-6 text-center">{primary.icon}</div>
          <div className="text-sm uppercase tracking-widest mb-2 text-center">You are a</div>
          <div className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight text-center">
            {primary.title}
          </div>
          <div className="text-2xl font-bold mb-6 text-center uppercase tracking-wider">
            {primary.name}
          </div>
          <div className="border-t-4 border-black pt-6 mb-6">
            <div className="text-lg mb-4 text-center">
              {primary.description}
            </div>
            <div className="text-sm uppercase tracking-wider text-mono-dark text-center">
              Field: {primary.field}
            </div>
          </div>
        </div>

        {/* Secondary Personality */}
        {secondary && (
          <div className="border-4 border-white text-white p-8 mb-8 animate-fade-in">
            <div className="flex items-center gap-6">
              <div className="text-5xl">{secondary.icon}</div>
              <div className="flex-1">
                <div className="text-sm uppercase tracking-widest mb-1 text-mono-light">
                  Secondary Trait
                </div>
                <div className="text-3xl font-black text-white mb-2">
                  {secondary.title}
                </div>
                <div className="text-lg text-white uppercase tracking-wide">
                  {secondary.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interesting Facts */}
        {interestingFacts && interestingFacts.length > 0 && (
          <div className="border-4 border-white text-white p-8">
            <div className="text-2xl font-black text-white mb-6 uppercase tracking-wider text-center">
              Interesting Facts
            </div>
            <div className="space-y-4">
              {interestingFacts.map((fact, index) => (
                <div
                  key={index}
                  className="border-2 border-white p-4 text-white text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-lg uppercase tracking-wide">▪ {fact}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalitySlide;

