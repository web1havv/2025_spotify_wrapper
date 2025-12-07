function ActivitySlide({ data }) {
  const { monthlyActivity } = data;
  const maxCount = Math.max(...monthlyActivity.map(m => m.count));
  const totalThisYear = monthlyActivity.reduce((sum, m) => sum + m.count, 0);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-6xl font-black text-white text-center mb-4 animate-fade-in uppercase tracking-wider">
          Your {data.year} Journey
        </h2>
        <p className="text-center text-mono-light mb-16 uppercase tracking-widest text-sm">
          Month by Month
        </p>

        {/* Large Bar Chart */}
        <div className="border-8 border-white p-12 mb-8 bg-black">
          <div className="flex items-end justify-between h-80 gap-2">
            {monthlyActivity.map((month, index) => {
              const height = maxCount > 0 ? (month.count / maxCount) * 100 : 0;
              const currentMonth = new Date().getMonth();
              const isFuture = index > currentMonth;
              
              return (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-3 h-full">
                  <div className="flex-1 w-full flex items-end justify-center">
                    {!isFuture && (
                      <div className="w-full flex flex-col items-center justify-end h-full">
                        <div
                          className={`w-full bg-white relative group transition-all duration-1000 ${month.count > 0 ? 'hover:bg-mono-light' : ''}`}
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 0.05}s`
                          }}
                        >
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black border-2 border-black">
                            {month.count || 0} problems
                          </div>
                        </div>
                      </div>
                    )}
                    {isFuture && (
                      <div className="w-full h-2 bg-mono-darker border border-white opacity-30"></div>
                    )}
                  </div>
                  <div className="text-white text-sm font-black uppercase tracking-wider">{month.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-4 border-white p-6 text-center bg-white text-black">
            <div className="text-5xl font-black mb-2">
              {Math.max(...monthlyActivity.map(m => m.count)) || 0}
            </div>
            <div className="text-xs uppercase tracking-wider font-bold">Best Month</div>
          </div>

          <div className="border-4 border-white text-white p-6 text-center">
            <div className="text-5xl font-black mb-2">
              {monthlyActivity.filter(m => m.count > 0).length || 0}
            </div>
            <div className="text-xs text-mono-light uppercase tracking-wider">Active Months</div>
          </div>

          <div className="border-4 border-white text-white p-6 text-center">
            <div className="text-5xl font-black mb-2">
              {totalThisYear || 0}
            </div>
            <div className="text-xs text-mono-light uppercase tracking-wider">Total {data.year}</div>
          </div>

          <div className="border-4 border-white p-6 text-center bg-white text-black">
            <div className="text-5xl font-black mb-2">
              {monthlyActivity.length > 0 ? (totalThisYear / Math.max(new Date().getMonth() + 1, 1)).toFixed(0) : 0}
            </div>
            <div className="text-xs uppercase tracking-wider font-bold">Avg/Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitySlide;
