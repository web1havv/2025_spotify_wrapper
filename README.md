# 🎁 LeetCode Year Wrapped

A Spotify Wrapped-style year wrap-up for your LeetCode journey! See your coding statistics, favorite topics, problem-solving patterns, and achievements from the past year.

## ✨ Features

- 📊 **Comprehensive Stats**: Total problems solved, acceptance rate, and difficulty breakdown
- 🎯 **Topic Analysis**: See which topics you practiced most
- 🔥 **Streak Tracking**: Your longest solving streak and active days
- 📈 **Progress Over Time**: Visualize your growth throughout the year
- 🏆 **Achievements**: Celebrate your milestones
- 🎨 **Beautiful UI**: Spotify Wrapped-inspired design

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Data Source**: LeetCode GraphQL API
- **Charts**: Chart.js / Recharts

## 🚀 Getting Started

### Quick Start (Easiest Way)

```bash
# Run the development script
./start-dev.sh
```

Then open `http://localhost:5173` in your browser!

### Manual Setup

**Prerequisites:**
- Node.js 18+
- npm or yarn

**Installation:**

1. Install backend dependencies
```bash
cd backend
npm install
```

2. Install frontend dependencies
```bash
cd ../frontend
npm install
```

3. Start the backend server
```bash
cd backend
npm run dev
```

4. Start the frontend (in a new terminal)
```bash
cd frontend
npm run dev
```

See [QUICKSTART.md](QUICKSTART.md) for detailed instructions.

## 📝 Usage

1. Open the app in your browser
2. Enter your LeetCode username
3. Wait for your data to load
4. Enjoy your personalized Year Wrapped! 🎉

## 🌐 Deploy & Make it Live

Want to share this with the world? Deploy it in minutes!

### 🚀 Quick Deploy to Vercel (Recommended)

```bash
./deploy.sh
```

Or manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**That's it!** Your app will be live at `https://your-project.vercel.app`

### 📖 Detailed Deployment Guides

- **[HOW_TO_MAKE_IT_LIVE.md](HOW_TO_MAKE_IT_LIVE.md)** - Complete deployment guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Advanced deployment options
- **[QUICKSTART.md](QUICKSTART.md)** - Local development guide

### 🌍 Deployment Options

| Platform | Difficulty | Time | Cost |
|----------|------------|------|------|
| **Vercel** | ⭐ Easy | 5 min | Free |
| **Netlify + Railway** | ⭐⭐ Medium | 10 min | Free |
| **Docker** | ⭐⭐⭐ Advanced | 20 min | Varies |
| **VPS** | ⭐⭐⭐⭐ Expert | 30 min | $5+/mo |

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT License

