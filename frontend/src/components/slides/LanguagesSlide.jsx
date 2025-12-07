function LanguagesSlide({ data }) {
  const { languages } = data;

  const languageSymbols = {
    'Python': '⟫',
    'Python3': '⟫',
    'JavaScript': '{ }',
    'Java': '☕',
    'C++': '++',
    'C': 'C',
    'Go': 'GO',
    'Rust': 'RS',
    'TypeScript': 'TS',
    'Swift': 'SW',
    'Kotlin': 'KT',
    'Ruby': 'RB',
  };

  const getSymbol = (lang) => languageSymbols[lang] || '█';

  if (languages.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4 font-black">█</div>
          <h2 className="text-4xl font-black text-white uppercase">No language data</h2>
        </div>
      </div>
    );
  }

  const topLanguage = languages[0];
  const totalSubmissions = languages.reduce((sum, lang) => sum + lang.count, 0);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-black text-white text-center mb-16 animate-fade-in uppercase tracking-wider ">
          Your Languages
        </h2>

        {/* Top Language Highlight */}
        <div className="border-8 border-white bg-white text-black p-12 mb-8 text-center animate-scale-in group hover:">
          <div className="text-7xl mb-4 font-black group-hover:">{getSymbol(topLanguage.language)}</div>
          <div className="text-2xl mb-2 uppercase tracking-widest">Primary Language</div>
          <div className="text-6xl font-black mb-4 uppercase tracking-tight group-hover:">{topLanguage.language}</div>
          <div className="text-3xl font-bold group-hover:">
            {topLanguage.count || 0} submissions ({totalSubmissions > 0 ? ((topLanguage.count / totalSubmissions) * 100).toFixed(1) : 0}%)
          </div>
        </div>

        {/* All Languages */}
        <div className="space-y-4">
          {languages.map((lang, index) => {
            const percentage = (lang.count / totalSubmissions) * 100;
            
            return (
              <div
                key={lang.language}
                className="border-2 border-white text-white p-6 animate-slide-up hover:bg-white hover:text-black transition-all group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black border-2 border-white group-hover:border-black w-16 h-16 flex items-center justify-center group-hover:">
                      {getSymbol(lang.language)}
                    </div>
                    <div className="text-2xl font-bold uppercase tracking-wider group-hover:">{lang.language}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black group-hover:">{lang.count || 0}</div>
                    <div className="text-sm uppercase tracking-wider">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="w-full bg-mono-darker h-3 overflow-hidden border border-white group-hover:border-black">
                  <div
                    className="bg-white group-hover:bg-black h-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {languages.length > 1 && (
          <div className="mt-8 text-center border-2 border-white text-white p-6">
            <div className="text-xl uppercase tracking-widest">
              <span className="font-black text-3xl">{languages.length}</span> Languages Mastered
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguagesSlide;
