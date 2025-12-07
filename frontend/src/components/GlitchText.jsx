import { useState, useEffect } from 'react';

function GlitchText({ children, className = '' }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={isGlitching ? '' : ''}>{children}</span>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 opacity-70"
            style={{
              transform: 'translate(-2px, 0)',
              color: 'white',
              mixBlendMode: 'difference',
            }}
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 opacity-70"
            style={{
              transform: 'translate(2px, 0)',
              color: 'white',
              mixBlendMode: 'difference',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

export default GlitchText;

