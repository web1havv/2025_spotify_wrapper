#!/bin/bash

echo "================================================"
echo "🚀 LeetCode Wrapped - Deploy to Vercel"
echo "================================================"
echo ""

# Step 1: Check if vercel is installed
echo "Step 1/4: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
else
    echo "✅ Vercel CLI already installed!"
fi

echo ""
echo "Step 2/4: Building frontend..."
cd frontend
npm run build
cd ..
echo "✅ Frontend built!"

echo ""
echo "Step 3/4: Deploying to Vercel..."
echo ""
echo "🔐 You'll be asked to login - use GitHub (it's free!)"
echo ""
read -p "Press ENTER to continue..."

vercel --prod

echo ""
echo "================================================"
echo "🎉 DEPLOYMENT COMPLETE!"
echo "================================================"
echo ""
echo "Your LeetCode Wrapped is now LIVE!"
echo ""
echo "Next steps:"
echo "1. Share the URL with friends"
echo "2. Add custom domain (optional)"
echo "3. Tweet about it!"
echo ""

