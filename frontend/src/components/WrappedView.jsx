import { useState } from 'react';
import IntroSlide from './slides/IntroSlide';
import StatsOverviewSlide from './slides/StatsOverviewSlide';
import DifficultySlide from './slides/DifficultySlide';
import TopicsSlide from './slides/TopicsSlide';
import PersonalitySlide from './slides/PersonalitySlide';
import CompanySlide from './slides/CompanySlide';
import ActivitySlide from './slides/ActivitySlide';
import LanguagesSlide from './slides/LanguagesSlide';
import AchievementsSlide from './slides/AchievementsSlide';
import CareerOverviewSlide from './slides/CareerOverviewSlide';
import FinalSlide from './slides/FinalSlide';

function WrappedView({ data, onReset }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <IntroSlide key="intro" data={data} />,
    <StatsOverviewSlide key="stats" data={data} />,
    <DifficultySlide key="difficulty" data={data} />,
    <TopicsSlide key="topics" data={data} />,
    <PersonalitySlide key="personality" data={data} />,
    <CompanySlide key="company" data={data} />,
    <ActivitySlide key="activity" data={data} />,
    <LanguagesSlide key="languages" data={data} />,
    <AchievementsSlide key="achievements" data={data} />,
    <CareerOverviewSlide key="career" data={data} />,
    <FinalSlide key="final" data={data} onReset={onReset} />
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Slide Content */}
      <div className="relative z-10">
        {slides[currentSlide]}
      </div>

      {/* Minimal Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-black border-t-2 border-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left: Previous */}
          <div className="w-32">
            {currentSlide > 0 ? (
              <button
                onClick={prevSlide}
                className="text-white hover:text-mono-light transition-all text-sm uppercase tracking-widest font-bold"
              >
                ← Prev
              </button>
            ) : (
              <div className="w-20"></div>
            )}
          </div>

          {/* Center: Progress Dots */}
          <div className="flex items-center gap-3">
            <div className="text-white text-xs font-bold uppercase tracking-wider mr-2">
              {currentSlide + 1} / {slides.length}
            </div>
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all ${
                    index === currentSlide
                      ? 'bg-white w-6 h-1'
                      : 'bg-white opacity-30 w-1 h-1 hover:opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Next */}
          <div className="w-32 text-right">
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={nextSlide}
                className="bg-white text-black px-6 py-2 hover:bg-mono-light transition-all text-sm uppercase tracking-widest font-bold"
              >
                Next →
              </button>
            ) : (
              <div className="w-20"></div>
            )}
          </div>
        </div>
      </div>

      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-black border-b-2 border-white z-30">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default WrappedView;

