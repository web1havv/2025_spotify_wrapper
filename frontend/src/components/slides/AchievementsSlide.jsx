function AchievementsSlide({ data }) {
  const { achievements } = data;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-black text-white text-center mb-16 animate-fade-in uppercase tracking-wider ">
          Achievements
        </h2>

        {achievements.length === 0 ? (
          <div className="text-center border-4 border-white text-white p-12">
            <div className="text-6xl mb-4 font-black">░</div>
            <div className="text-2xl uppercase tracking-widest">
              Keep grinding - achievements await
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="border-4 border-white text-white p-8 transform hover:scale-105 transition-all animate-scale-in hover:bg-white hover:text-black group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4 font-black">{achievement.title.split(' ')[0]}</div>
                <div className="text-2xl font-black mb-2 uppercase tracking-wide">
                  {achievement.title.substring(achievement.title.indexOf(' ') + 1)}
                </div>
                <div className="text-lg uppercase tracking-wider border-t-2 border-white group-hover:border-black pt-4 mt-4">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {achievements.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white text-black border-4 border-white p-8 inline-block animate-fade-in">
              <div className="text-4xl font-black uppercase tracking-wider">
                {achievements.length} Achievement{achievements.length !== 1 ? 's' : ''} Unlocked
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AchievementsSlide;
