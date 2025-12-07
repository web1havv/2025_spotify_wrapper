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
        <div className="mb-8 ">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter relative">
            <span className=" inline-block">LEETCODE</span>
            <span className="block text-white  mt-2">
              WRAPPED
            </span>
          </h1>
          <div className="h-1 w-32 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-mono-light font-light uppercase tracking-widest">
            Your 2025 in Code
          </p>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto">
          <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
            <div className="text-3xl font-bold">█</div>
            <div className="text-sm mt-2 uppercase tracking-wider">Stats</div>
          </div>
          <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
            <div className="text-3xl font-bold">▓</div>
            <div className="text-sm mt-2 uppercase tracking-wider">Companies</div>
          </div>
          <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
            <div className="text-3xl font-bold">▒</div>
            <div className="text-sm mt-2 uppercase tracking-wider">Growth</div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ENTER USERNAME"
              className="w-full px-6 py-4 text-lg bg-black border-2 border-white text-white placeholder-mono-gray focus:outline-none focus:bg-mono-darkest transition-all uppercase tracking-wider"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="max-w-md mx-auto bg-mono-darker border-2 border-white p-4 text-white">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!username.trim()}
            className="bg-white text-black font-bold text-lg px-12 py-4 uppercase tracking-widest hover:bg-mono-lightest transition-all transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 "
          >
            Generate Wrapped
          </button>
        </form>

        {/* Footer */}
        <div className="mt-16 text-mono-gray text-xs uppercase tracking-widest">
          <p>Powered by LeetCode API</p>
          <p className="mt-2">2025 Edition</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

