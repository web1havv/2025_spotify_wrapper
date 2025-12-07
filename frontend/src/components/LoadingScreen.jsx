function LoadingScreen({ username }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-white"></div>
          <div className="absolute inset-2 border-4 border-white animate-spin"></div>
          <div className="absolute inset-4 border-4 border-white"></div>
        </div>
        
        <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-widest">
          ANALYZING
        </h2>
        
        <div className="space-y-3 text-mono-light uppercase tracking-wider text-sm">
          <p className="animate-pulse">[ FETCHING {username.toUpperCase()}'S DATA ]</p>
          <p className="animate-pulse">[ ANALYZING TOPICS ]</p>
          <p className="animate-pulse">[ MATCHING COMPANIES ]</p>
          <p className="animate-pulse">[ CALCULATING STATS ]</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;

