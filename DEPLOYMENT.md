# 🚀 Deployment Guide

This guide will help you deploy your LeetCode Wrapped application to make it live!

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel provides free hosting for frontend and backend APIs.

#### Steps:

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Build the Frontend**
```bash
cd frontend
npm run build
```

3. **Deploy to Vercel**
```bash
# From the root directory
vercel
```

4. **Configure Environment Variables** (in Vercel dashboard)
   - No special env vars needed for this project

5. **Done!** Your app will be live at `https://your-project.vercel.app`

---

### Option 2: Netlify + Railway

**Frontend on Netlify:**

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Backend on Railway:**

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repo
4. Set root directory to `/backend`
5. Deploy!

Update the frontend API endpoint to point to your Railway backend URL.

---

### Option 3: Docker (Self-hosted)

#### Backend Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
EXPOSE 3000
CMD ["node", "server.js"]
```

#### Frontend Dockerfile:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose:

```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
    
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

### Option 4: Traditional VPS (DigitalOcean, AWS, etc.)

1. **SSH into your server**

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone your repo**
```bash
git clone <your-repo-url>
cd leetcode_wrapup
```

4. **Setup Backend**
```bash
cd backend
npm install
npm install -g pm2
pm2 start server.js --name "leetcode-backend"
pm2 save
pm2 startup
```

5. **Setup Frontend**
```bash
cd ../frontend
npm install
npm run build
```

6. **Setup Nginx**
```bash
sudo apt install nginx
```

Create `/etc/nginx/sites-available/leetcode-wrapped`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/leetcode_wrapup/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Enable site and restart Nginx**
```bash
sudo ln -s /etc/nginx/sites-available/leetcode-wrapped /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables

Create `.env` file in the backend directory (if needed):

```env
PORT=3000
NODE_ENV=production
```

---

## Custom Domain

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

---

## CI/CD (Optional)

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Monitoring

- **Vercel**: Built-in analytics
- **PM2**: `pm2 monit`
- **Uptime Robot**: Free uptime monitoring

---

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure your backend's CORS configuration includes your frontend domain.

### API Not Working
Check that the frontend is pointing to the correct backend URL.

### Build Failures
Ensure all dependencies are installed and Node.js version is 18+.

---

## Performance Tips

1. Enable Gzip compression
2. Use CDN for static assets
3. Implement caching headers
4. Optimize images (if any)
5. Enable HTTP/2

---

🎉 **Congratulations!** Your LeetCode Wrapped is now live!

