# 🚀 Deploy Your LeetCode Wrapped NOW!

## ⭐ Method 1: Vercel (EASIEST - 5 Minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open your browser - sign up with GitHub (free).

### Step 3: Deploy!
```bash
cd /Users/web1havv/leetcode_wrapup
vercel
```

Just press **ENTER** for all questions (defaults are fine).

### Step 4: Deploy to Production
```bash
vercel --prod
```

**DONE!** Your app will be live at: `https://your-project.vercel.app`

---

## 📱 Method 2: GitHub + Vercel (Via Web UI)

### Step 1: Push to GitHub
```bash
cd /Users/web1havv/leetcode_wrapup
git init
git add .
git commit -m "Initial commit: LeetCode Wrapped"
git branch -M main

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/leetcode-wrapped.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

**DONE!** Auto-deploys on every git push!

---

## 🐳 Method 3: Docker (For Self-Hosting)

### Create Dockerfile
Already included! Just run:

```bash
docker-compose up -d
```

Then deploy to:
- DigitalOcean App Platform
- AWS ECS
- Google Cloud Run
- fly.io

---

## 🌍 Method 4: Netlify + Railway

### Frontend (Netlify):
```bash
cd frontend
npm run build
npm install -g netlify-cli
netlify deploy --prod
```

### Backend (Railway):
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root: `/backend`

---

## ⚡ Quick Deploy Script

We've included a script:

```bash
cd /Users/web1havv/leetcode_wrapup
./deploy.sh
```

This will:
1. Install dependencies
2. Build frontend
3. Deploy to Vercel

---

## 🎯 Recommended: Vercel

**Why Vercel?**
✅ Free for personal projects
✅ Automatic HTTPS
✅ Global CDN
✅ Easy setup (5 minutes)
✅ Auto-deploys from GitHub
✅ No credit card needed
✅ Custom domain support

**Other Options:**
- Netlify: Great for static sites
- Railway: Good for backend
- Fly.io: Docker-based
- DigitalOcean: $5/month VPS

---

## 💰 Cost Comparison

| Platform | Cost | Setup Time | Difficulty |
|----------|------|------------|------------|
| **Vercel** | FREE | 5 min | ⭐ Easy |
| Netlify + Railway | FREE | 10 min | ⭐⭐ Medium |
| Fly.io | FREE tier | 15 min | ⭐⭐⭐ Hard |
| DigitalOcean | $5/mo | 30 min | ⭐⭐⭐⭐ Expert |

---

## 🚀 START DEPLOYING NOW

Run this command:

```bash
npm install -g vercel && vercel login
```

Then:

```bash
cd /Users/web1havv/leetcode_wrapup
vercel --prod
```

**Your app will be LIVE in 2 minutes!** 🎉

