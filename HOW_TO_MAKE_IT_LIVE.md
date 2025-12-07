# 🌐 How to Make LeetCode Wrapped LIVE

This guide will walk you through deploying your LeetCode Wrapped so anyone can use it!

## 🎯 Quickest Way to Go Live (5 minutes)

### Using Vercel (FREE & Easiest)

1. **Create a GitHub Account** (if you don't have one)
   - Go to [github.com](https://github.com) and sign up

2. **Push Your Code to GitHub**
   ```bash
   cd /Users/web1havv/leetcode_wrapup
   git init
   git add .
   git commit -m "Initial commit: LeetCode Wrapped"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/leetcode-wrapped.git
   git push -u origin main
   ```

3. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Sign up with your GitHub account

4. **Import Your Project**
   - Click "Add New Project"
   - Import your `leetcode-wrapped` repository
   - Vercel will auto-detect the configuration
   - Click "Deploy"

5. **Done!** 🎉
   - Your app will be live at `https://your-project.vercel.app`
   - Share the link with anyone!

---

## 📱 Alternative: Netlify (Also FREE)

### Frontend on Netlify

1. **Sign up at [netlify.com](https://netlify.com)**

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Build and Deploy**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod
   ```

4. **For Backend**, use one of these:

   **Option A: Railway (Recommended)**
   - Sign up at [railway.app](https://railway.app)
   - Create new project
   - Deploy from GitHub
   - Set root directory to `/backend`
   - Your backend will be live!

   **Option B: Render**
   - Sign up at [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repo
   - Set build command: `cd backend && npm install`
   - Set start command: `node backend/server.js`

5. **Update Frontend API URL**
   
   In `frontend/vite.config.js`, update the proxy:
   ```javascript
   proxy: {
     '/api': {
       target: 'https://your-backend-url.railway.app',
       changeOrigin: true
     }
   }
   ```

---

## 🐳 Using Docker (For Tech-Savvy Users)

1. **Create Dockerfiles** (already included in the project)

2. **Build and Run**
   ```bash
   docker-compose up -d
   ```

3. **Deploy to:**
   - [fly.io](https://fly.io)
   - [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform)
   - AWS, Google Cloud, Azure

---

## 🌍 Using Your Own Domain

### Add Custom Domain to Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `leetcodewrapped.com`)
3. Update your DNS records:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `cname.vercel-dns.com`

### Add Custom Domain to Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS as instructed

---

## 🔐 Security & Best Practices

1. **Rate Limiting**: Consider adding rate limiting to prevent API abuse
   ```bash
   npm install express-rate-limit
   ```

2. **HTTPS**: Vercel and Netlify provide free SSL certificates automatically

3. **Environment Variables**: Keep sensitive data in environment variables

4. **Monitoring**: Use Vercel Analytics or Google Analytics to track usage

---

## 💰 Cost Breakdown

All options below are **FREE** for personal projects:

| Service | Free Tier | Best For |
|---------|-----------|----------|
| Vercel | Unlimited personal projects | Full-stack apps |
| Netlify | 100GB bandwidth/month | Frontend + separate backend |
| Railway | 500 hours/month | Backend APIs |
| Render | 750 hours/month | Backend APIs |

---

## 🚀 One-Command Deploy

We've included a deployment script:

```bash
./deploy.sh
```

This will:
- ✅ Install dependencies
- ✅ Build the project
- ✅ Deploy to Vercel

---

## 🧪 Test Locally First

Before deploying, test locally:

```bash
./start-dev.sh
```

Then visit `http://localhost:5173` to test.

---

## 📊 After Deployment

### Share Your Project!
- Tweet about it with #LeetCodeWrapped
- Post on Reddit (r/leetcode)
- Share on LinkedIn
- Add to your portfolio

### Monitor Usage
- Check Vercel Analytics for page views
- Monitor API usage
- Check for errors in logs

### Improve
- Add more statistics
- Implement user authentication
- Add social sharing features
- Create year-over-year comparisons

---

## 🐛 Common Issues

### CORS Errors
- Make sure your backend CORS is configured correctly
- In `backend/server.js`, ensure CORS allows your frontend domain

### 404 on Routes
- Make sure your hosting provider is configured for SPA routing
- Vercel handles this automatically

### API Not Responding
- Check backend logs
- Ensure backend is deployed and running
- Verify API URL in frontend config

---

## 🎉 Success!

Once deployed, your LeetCode Wrapped will be accessible to anyone with the link!

Example: `https://leetcode-wrapped.vercel.app`

Share it with:
- Your friends on LeetCode
- Tech communities
- Social media
- Your resume/portfolio

---

## 📞 Need Help?

- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [LeetCode Subreddit](https://reddit.com/r/leetcode)
- Open an issue on GitHub

Happy deploying! 🚀✨

