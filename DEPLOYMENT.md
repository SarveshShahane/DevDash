# DevDash Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
1. GitHub/Vercel account
2. API Keys for:
   - GitHub Personal Access Token
   - Clist.by username and API key

### Quick Deploy Steps

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Set Environment Variables** in Vercel dashboard:
   ```
   GITHUB_TOKEN=your_github_token_here
   CLIST_USERNAME=your_clist_username_here
   CLIST_API_KEY=your_clist_api_key_here
   ```

4. **Deploy!** - Vercel will automatically build and deploy

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd DevDash
   ```

2. **Install dependencies**:
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend  
   cd ../frontend && npm install
   ```

3. **Setup environment variables**:
   ```bash
   # Copy the example file
   cp backend/.env.example backend/.env
   
   # Edit backend/.env with your actual API keys
   ```

4. **Run locally**:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

### Project Structure
- `vercel.json` - Vercel deployment configuration
- `frontend/` - React frontend (builds to `/dist`)
- `backend/` - Express API server
- API routes are automatically proxied to `/api/*`

### Notes
- Environment variables are set in Vercel dashboard, not in code
- The project uses relative API calls (`/api/*`) that work in both dev and production
- All sensitive data should be in environment variables, never committed to Git

🎉 **Your project is deployment ready!**
