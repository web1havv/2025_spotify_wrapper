import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

function FinalSlide({ data, onReset }) {
  const [showSharePreview, setShowSharePreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const shareCardRef = useRef(null);

  const topCompany = data.companyRecommendations?.[0]?.company || 'Tech Companies';
  const personality = data.personality?.primary?.name || 'Coder';
  
  const shareText = `MY 2025 LEETCODE WRAPPED

${data.summary.totalProblemsThisYear} problems solved
${data.summary.activeDays} active days  

${data.summary.longestStreak} day streak

Personality: ${personality}

Ready for: ${topCompany}

#LeetCodeWrapped #2025 #CodingJourney`;

  const handleShare = async () => {
    setIsGeneratingImage(true);
    
    try {
      // Generate image from share card
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        width: 1200,
        height: 630,
      });
      
      // Convert to blob
      canvas.toBlob(async (blob) => {
        // Copy text to clipboard first
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
        
        // Try to copy image to clipboard (works in modern browsers)
        if (navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]);
            alert('✅ Image & text copied! Paste on LinkedIn (Ctrl+V / Cmd+V) 📋');
          } catch (err) {
            // Fallback: download image
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'leetcode-wrapped-2025.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            alert('✅ Text copied & image downloaded! Upload image to LinkedIn 📋');
          }
        } else {
          // Fallback for older browsers
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'leetcode-wrapped-2025.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          alert('✅ Text copied & image downloaded! Upload image to LinkedIn 📋');
        }
        
        setIsGeneratingImage(false);
        setShowSharePreview(true);
      });
    } catch (error) {
      console.error('Error generating image:', error);
      // Fallback: just copy text
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      alert('✅ Text copied to clipboard! (Image generation failed)');
      setIsGeneratingImage(false);
      setShowSharePreview(true);
    }
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = 'https://www.linkedin.com/feed/';
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative">
      {/* Hidden Share Card for Screenshot */}
      <div 
        ref={shareCardRef}
        className="fixed -left-[9999px] top-0 w-[1200px] h-[630px] bg-white p-16"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <div className="h-full flex flex-col">
          {/* Header with animated scientist */}
          <div className="mb-8 relative">
            <h1 className="text-7xl font-black text-black mb-4 tracking-tighter uppercase">
              MY 2025 LEETCODE WRAPPED
            </h1>
            <div className="h-2 w-full bg-black"></div>
            
            {/* Scientist character icon */}
            <div className="absolute -top-4 right-0 text-9xl">
              {data.personality?.primary?.icon || '█'}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="border-8 border-black p-8 text-center">
              <div className="text-8xl font-black text-black mb-2">
                {data.summary.totalProblemsThisYear}
              </div>
              <div className="text-2xl font-bold uppercase tracking-wider">
                PROBLEMS SOLVED
              </div>
            </div>
            <div className="border-8 border-black p-8 text-center">
              <div className="text-8xl font-black text-black mb-2">
                {data.summary.activeDays}
              </div>
              <div className="text-2xl font-bold uppercase tracking-wider">
                ACTIVE DAYS
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 text-black mb-auto">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black">■</div>
              <div className="text-3xl font-bold">
                {data.summary.longestStreak} day streak
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black">▓</div>
              <div className="text-3xl font-bold">
                Personality: {personality}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black">▒</div>
              <div className="text-3xl font-bold">
                Ready for: {topCompany}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black pt-6">
            <div className="text-2xl font-bold text-gray-600 text-center tracking-wider">
              #LEETCODEWRAPPED #2025 #CODINGJOURNEY
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full">
        {!showSharePreview ? (
          // Main Summary View
          <div className="text-center animate-scale-in">
            {/* Year Banner */}
            <div className="border-8 border-white text-white p-12 mb-12">
              <div className="text-9xl font-black mb-6 uppercase tracking-tighter">
                {data.year}
              </div>
              <div className="text-3xl uppercase tracking-widest">
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
                <div className="text-7xl font-black mb-2">{data.summary.activeDays || 0}</div>
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
              disabled={isGeneratingImage}
              className="bg-white text-black font-bold text-2xl px-16 py-8 uppercase tracking-widest hover:bg-mono-lightest transition-all mb-6 w-full md:w-auto disabled:opacity-50"
            >
              {isGeneratingImage ? 'Generating Image...' : 'Share on LinkedIn'}
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
                {copied ? '✅ Image & Text Copied!' : 'Paste on LinkedIn (Ctrl+V / Cmd+V)'}
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
                  ✓ Ready to Paste on LinkedIn!
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
