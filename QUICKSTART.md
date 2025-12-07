# 🚀 Quick Start Guide

Get your LeetCode Wrapped running in 5 minutes!

## Prerequisites

- Node.js 18 or higher ([Download here](https://nodejs.org/))
- npm (comes with Node.js)

## Installation

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Backend

```bash
cd backend
npm run dev
```

The backend API will start on `http://localhost:3000`

### 3. Start the Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Open Your Browser

Navigate to `http://localhost:5173` and enjoy your LeetCode Wrapped! 🎉

## Usage

1. Enter your LeetCode username
2. Click "Generate My Wrapped"
3. Watch as your year in coding comes to life!

## Troubleshooting

### Port Already in Use

If you get a port error, you can change the ports:

**Backend** (`backend/server.js`):
```javascript
const PORT = process.env.PORT || 3001; // Change to any available port
```

**Frontend** (`frontend/vite.config.js`):
```javascript
server: {
  port: 5174, // Change to any available port
}
```

### Cannot Find LeetCode User

- Make sure the username is correct (case-sensitive)
- Check that the user has public profile and submissions
- Try again after a few seconds if you get a rate limit error

### Build Errors

Make sure you have Node.js 18+:
```bash
node --version
```

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- **Customize**: Edit the slides in `frontend/src/components/slides/`
- **Style**: Modify colors in `frontend/tailwind.config.js`
- **Deploy**: See `DEPLOYMENT.md` for deployment instructions

## API Endpoints

- `GET /api/leetcode/wrapped/:username?year=2024` - Get user's wrapped data
- `GET /api/leetcode/health` - Health check

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Data Source**: LeetCode GraphQL API

---

Need help? Check out the main [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md)!

Happy coding! 💻✨

