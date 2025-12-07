function IntroSlide({ data }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 max-w-4xl">
        <div className="animate-scale-in">
          <div className="text-sm uppercase tracking-[0.3em] text-mono-light mb-8">
            Here is your
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase">
            LEETCODE
          </h1>
          
          <div className="mb-12">
            <div className="inline-block border-4 border-white px-12 py-6">
              <div className="text-6xl md:text-7xl font-black text-white tracking-tighter">
                WRAPPED
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="h-px w-32 bg-white"></div>
            <div className="text-4xl font-black text-white">{data.year}</div>
            <div className="h-px w-32 bg-white"></div>
          </div>

          <div className="text-3xl font-black text-white mb-4">
            {data.username.toUpperCase()}
          </div>

          <div className="text-mono-light uppercase tracking-widest text-sm">
            Your Year in Code
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroSlide;
