// Black & White Illustrations for Share Card

export const LanguageIllustration = ({ language }) => {
  const lang = language?.toLowerCase() || '';
  
  // Python - Snake
  if (lang.includes('python')) {
    return (
      <svg viewBox="0 0 200 200" className="w-32 h-32">
        <path d="M40 100 Q60 80, 80 100 T120 100 T160 100" 
          stroke="black" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <circle cx="40" cy="100" r="8" fill="black"/>
        <circle cx="35" cy="95" r="2" fill="white"/>
        <path d="M30 90 L25 85 M30 110 L25 115" 
          stroke="black" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  }
  
  // JavaScript - Lightning bolt
  if (lang.includes('javascript') || lang.includes('js')) {
    return (
      <svg viewBox="0 0 200 200" className="w-32 h-32">
        <path d="M100 20 L80 100 L120 100 L100 180 L140 80 L100 80 Z" 
          fill="black"/>
      </svg>
    );
  }
  
  // Java - Coffee cup
  if (lang.includes('java')) {
    return (
      <svg viewBox="0 0 200 200" className="w-32 h-32">
        <rect x="60" y="80" width="80" height="90" fill="none" stroke="black" strokeWidth="8"/>
        <path d="M140 100 Q160 100, 160 120 Q160 140, 140 140" 
          stroke="black" strokeWidth="8" fill="none"/>
        <line x1="70" y1="60" x2="70" y2="80" stroke="black" strokeWidth="6"/>
        <line x1="100" y1="50" x2="100" y2="80" stroke="black" strokeWidth="6"/>
        <line x1="130" y1="60" x2="130" y2="80" stroke="black" strokeWidth="6"/>
      </svg>
    );
  }
  
  // C++ - Gears
  if (lang.includes('c++') || lang.includes('cpp')) {
    return (
      <svg viewBox="0 0 200 200" className="w-32 h-32">
        <circle cx="100" cy="100" r="40" fill="none" stroke="black" strokeWidth="8"/>
        <circle cx="100" cy="100" r="20" fill="black"/>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <rect 
            key={angle}
            x="95" y="50" width="10" height="20" 
            fill="black"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
      </svg>
    );
  }
  
  // C - Simple gear
  if (lang.includes('c') && !lang.includes('c++')) {
    return (
      <svg viewBox="0 0 200 200" className="w-32 h-32">
        <rect x="60" y="60" width="80" height="80" fill="none" stroke="black" strokeWidth="12"/>
        <rect x="80" y="80" width="40" height="40" fill="black"/>
      </svg>
    );
  }
  
  // Default - Code brackets
  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32">
      <path d="M60 50 L40 100 L60 150" 
        stroke="black" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M140 50 L160 100 L140 150" 
        stroke="black" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export const ScientistIllustration = ({ personality }) => {
  const name = personality?.name?.toLowerCase() || '';
  
  // Different scientist portraits in black & white
  if (name.includes('knuth') || name.includes('turing')) {
    return (
      <svg viewBox="0 0 200 200" className="w-40 h-40">
        {/* Head */}
        <circle cx="100" cy="80" r="35" fill="white" stroke="black" strokeWidth="4"/>
        {/* Glasses */}
        <circle cx="85" cy="75" r="12" fill="none" stroke="black" strokeWidth="3"/>
        <circle cx="115" cy="75" r="12" fill="none" stroke="black" strokeWidth="3"/>
        <line x1="97" y1="75" x2="103" y2="75" stroke="black" strokeWidth="3"/>
        {/* Body */}
        <rect x="70" y="115" width="60" height="60" fill="black"/>
        {/* Neck */}
        <rect x="90" y="110" width="20" height="10" fill="white" stroke="black" strokeWidth="2"/>
      </svg>
    );
  }
  
  if (name.includes('lovelace') || name.includes('hopper')) {
    return (
      <svg viewBox="0 0 200 200" className="w-40 h-40">
        {/* Head */}
        <circle cx="100" cy="80" r="35" fill="white" stroke="black" strokeWidth="4"/>
        {/* Hair */}
        <path d="M65 65 Q65 40, 100 40 Q135 40, 135 65" 
          fill="black" stroke="black" strokeWidth="2"/>
        {/* Eyes */}
        <circle cx="85" cy="80" r="3" fill="black"/>
        <circle cx="115" cy="80" r="3" fill="black"/>
        {/* Body */}
        <path d="M70 115 L70 175 L130 175 L130 115" fill="black"/>
      </svg>
    );
  }
  
  // Default scientist
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40">
      {/* Head */}
      <circle cx="100" cy="80" r="35" fill="white" stroke="black" strokeWidth="4"/>
      {/* Eyes */}
      <circle cx="85" cy="75" r="4" fill="black"/>
      <circle cx="115" cy="75" r="4" fill="black"/>
      {/* Smile */}
      <path d="M80 95 Q100 105, 120 95" 
        stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Body */}
      <rect x="70" y="115" width="60" height="60" fill="black"/>
    </svg>
  );
};

export const TrophyIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-24 h-24">
    <path d="M60 60 L60 80 Q60 120, 100 120 Q140 120, 140 80 L140 60" 
      fill="none" stroke="black" strokeWidth="8"/>
    <rect x="70" y="40" width="60" height="25" fill="black"/>
    <rect x="90" y="120" width="20" height="30" fill="black"/>
    <rect x="70" y="150" width="60" height="10" fill="black"/>
  </svg>
);

export const RocketIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-24 h-24">
    <path d="M100 40 L80 120 L100 110 L120 120 Z" fill="black"/>
    <circle cx="100" cy="80" r="8" fill="white"/>
    <path d="M80 120 L70 140 L80 135" fill="black"/>
    <path d="M120 120 L130 140 L120 135" fill="black"/>
  </svg>
);

export const StarIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-20 h-20">
    <path d="M100 40 L110 90 L160 90 L120 120 L130 170 L100 140 L70 170 L80 120 L40 90 L90 90 Z" 
      fill="black"/>
  </svg>
);

export const CodeSymbol = ({ symbol = '█' }) => (
  <div className="text-6xl font-black">{symbol}</div>
);

