import { useState } from 'react';

function LandingPage({ onSubmit, error }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter relative">
            <span className="inline-block">LEETCODE</span>
            <span className="block text-white mt-2">
              WRAPPED
            </span>
          </h1>
          <div className="h-1 w-32 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-white font-light uppercase tracking-widest">
            Your 2025 in Code
          </p>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto">
          <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
            <div className="text-3xl font-bold text-white">█</div>
            <div className="text-sm mt-2 uppercase tracking-wider text-white">Stats</div>
          </div>
          <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
            <div className="text-3xl font-bold text-white">▓</div>
            <div className="text-sm mt-2 uppercase tracking-wider text-white">Companies</div>
          </div>
          <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
            <div className="text-3xl font-bold text-white">▒</div>
            <div className="text-sm mt-2 uppercase tracking-wider text-white">Growth</div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter LeetCode Username"
              className="w-full px-6 py-4 text-lg bg-black border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition-all uppercase tracking-wider"
              required
            />
          </div>

          {error && (
            <div className="border-2 border-white bg-white text-black px-4 py-3 max-w-md mx-auto">
              <p className="text-sm font-bold uppercase tracking-wider">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!username.trim()}
            className="bg-white text-black font-bold text-lg px-12 py-4 uppercase tracking-widest hover:bg-gray-200 transition-all transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Get Your Wrapped
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-white text-sm uppercase tracking-widest opacity-60 space-y-2">
          <p>Analyze your 2025 LeetCode journey</p>
          <div className="border-t border-white pt-3 mt-3">
            <p className="text-xs">Made with ♥ by webhavvv</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
