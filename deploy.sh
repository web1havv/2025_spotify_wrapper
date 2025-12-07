#!/bin/bash

echo "🚀 LeetCode Wrapped - Deployment Script"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if vercel is installed
if ! command -v vercel &> /dev/null
then
    echo -e "${RED}❌ Vercel CLI not found!${NC}"
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"
cd backend && npm install
cd ../frontend && npm install
cd ..

echo -e "${BLUE}🏗️  Building frontend...${NC}"
cd frontend && npm run build
cd ..

echo -e "${GREEN}✅ Build complete!${NC}"
echo ""
echo "Choose deployment option:"
echo "1) Deploy to Vercel (Recommended)"
echo "2) Just build (already done)"
echo "3) Local preview"
read -p "Enter choice [1-3]: " choice

case $choice in
  1)
    echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
    vercel --prod
    echo -e "${GREEN}✅ Deployed!${NC}"
    ;;
  2)
    echo -e "${GREEN}✅ Build files ready in frontend/dist${NC}"
    ;;
  3)
    echo -e "${BLUE}🌐 Starting local preview...${NC}"
    cd frontend && npm run preview
    ;;
  *)
    echo -e "${RED}Invalid choice${NC}"
    ;;
esac

