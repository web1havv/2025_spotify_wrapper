function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated Loading Blocks */}
        <div className="flex gap-4 mb-8 justify-center">
          <div className="w-8 h-8 bg-white animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-8 h-8 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-8 h-8 bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-wider">
          Analyzing Your Code
        </h2>
        <p className="text-white uppercase tracking-widest text-sm">
          Fetching your 2025 stats...
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
