import { useState } from 'react';

function FinalSlide({ data, onReset }) {
  const [showSharePreview, setShowSharePreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const topCompany = data.companyRecommendations?.[0]?.company || 'Tech Companies';
  const personality = data.personality?.primary?.name || 'Coder';
  
  const shareText = `My ${data.year} LeetCode Wrapped

${data.summary.totalProblemsThisYear} problems solved
${data.summary.activeDays} active days  
${data.summary.longestStreak} day streak
Personality: ${personality}
Ready for: ${topCompany}

#LeetCodeWrapped #${data.year} #CodingJourney`;

  const handleShare = () => {
    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
    
    // Show preview
    setShowSharePreview(true);
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative">
      <div className="max-w-5xl w-full">
        {!showSharePreview ? (
          // Main Summary View
          <div className="text-center animate-scale-in">
            {/* Year Banner */}
            <div className="border-8 border-white text-white p-12 mb-12">
              <div className="text-9xl font-black text-white mb-6 uppercase tracking-tighter">
                {data.year}
              </div>
              <div className="text-3xl text-white uppercase tracking-widest">
                LeetCode Wrapped
              </div>
            </div>

            {/* Username Card */}
            <div className="border-8 border-white bg-white text-black p-12 mb-12">
              <div className="text-sm uppercase tracking-widest mb-3">Your Year</div>
              <div className="text-6xl font-black uppercase tracking-tight">
                {data.username}
              </div>
            </div>

            {/* Summary Grid - 2025 ONLY */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="border-8 border-white bg-white text-black p-8">
                <div className="text-7xl font-black mb-2">{data.summary.totalProblemsThisYear || 0}</div>
                <div className="text-xs uppercase tracking-wider font-bold">Problems</div>
                <div className="text-xs mt-1 opacity-60">{data.year}</div>
              </div>
              <div className="border-8 border-white text-white p-8">
                <div className="text-7xl font-black text-white mb-2">{data.summary.activeDays || 0}</div>
                <div className="text-xs text-mono-light uppercase tracking-wider">Days</div>
                <div className="text-xs text-mono-gray mt-1">{data.year}</div>
              </div>
              <div className="border-8 border-white bg-white text-black p-8">
                <div className="text-7xl font-black mb-2">{data.topics?.length || 0}</div>
                <div className="text-xs uppercase tracking-wider font-bold">Topics</div>
                <div className="text-xs mt-1 opacity-60">{data.year}</div>
              </div>
            </div>

            {/* Top Company Match */}
            {data.companyRecommendations && data.companyRecommendations.length > 0 && (
              <div className="border-8 border-white bg-white text-black p-10 mb-12">
                <div className="text-sm uppercase tracking-widest mb-3">Interview Ready</div>
                <div className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-3">
                  {topCompany}
                </div>
                <div className="text-3xl font-black">
                  {data.companyRecommendations[0].matchPercentage}% Match
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleShare}
              className="bg-white text-black font-bold text-2xl px-16 py-8 uppercase tracking-widest hover:bg-mono-lightest transition-all mb-6 w-full md:w-auto"
            >
              Share on LinkedIn
            </button>

            <div className="mt-6">
              <button
                onClick={onReset}
                className="border-4 border-white text-white font-bold text-lg px-12 py-6 uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Try Another User
              </button>
            </div>
          </div>
        ) : (
          // Share Preview View
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-wider">
                Ready to Share
              </h2>
              <p className="text-mono-light uppercase tracking-widest text-sm">
                {copied ? 'Copied to clipboard!' : 'Preview your post'}
              </p>
            </div>

            {/* Visual Preview Card */}
            <div className="border-8 border-white bg-white text-black p-12 mb-8">
              <div className="text-left space-y-6">
                <div className="border-b-4 border-black pb-6">
                  <div className="text-4xl font-black uppercase tracking-tight">
                    My {data.year} LeetCode Wrapped
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="border-4 border-black p-6">
                    <div className="text-6xl font-black mb-2">{data.summary.totalProblemsThisYear}</div>
                    <div className="text-sm uppercase tracking-wider font-bold">Problems Solved</div>
                  </div>
                  <div className="border-4 border-black p-6">
                    <div className="text-6xl font-black mb-2">{data.summary.activeDays}</div>
                    <div className="text-sm uppercase tracking-wider font-bold">Active Days</div>
                  </div>
                </div>

                <div className="border-t-4 border-black pt-6">
                  <div className="text-xl font-black mb-3">
                    █ {data.summary.longestStreak} day streak
                  </div>
                  <div className="text-xl font-black mb-3">
                    ▓ Personality: {personality}
                  </div>
                  <div className="text-xl font-black">
                    ▒ Ready for: {topCompany}
                  </div>
                </div>

                <div className="border-t-4 border-black pt-6 text-center">
                  <div className="text-sm uppercase tracking-widest font-bold opacity-60">
                    #LeetCodeWrapped #{data.year} #CodingJourney
                  </div>
                </div>
              </div>
            </div>

            {/* Copy Text Display */}
            <div className="border-4 border-white text-white p-6 mb-8 text-left">
              <div className="text-white text-sm font-mono mb-4 uppercase tracking-wider">
                [ Text Copied to Clipboard ]
              </div>
              <pre className="text-mono-light text-sm whitespace-pre-wrap font-mono">
{shareText}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={handleLinkedInShare}
                className="bg-white text-black font-bold text-xl px-12 py-6 uppercase tracking-widest hover:bg-mono-lightest transition-all"
              >
                Open LinkedIn
              </button>
              
              <button
                onClick={() => setShowSharePreview(false)}
                className="border-4 border-white text-white font-bold text-xl px-12 py-6 uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Back
              </button>

              <button
                onClick={handleShare}
                className="border-4 border-white text-white font-bold text-xl px-12 py-6 uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Copy Again
              </button>
            </div>

            {copied && (
              <div className="mt-6 border-4 border-white bg-white text-black p-4 text-center animate-fade-in">
                <div className="text-xl font-black uppercase tracking-wider">
                  ✓ Copied! Paste on LinkedIn
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-mono-gray uppercase tracking-widest text-xs">
          <p>LeetCode Wrapped {data.year}</p>
        </div>
      </div>
    </div>
  );
}

export default FinalSlide;
