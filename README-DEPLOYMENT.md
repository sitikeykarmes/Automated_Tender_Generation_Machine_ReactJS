# Tender Generator - Deployment Guide

## 🚀 Deployment Setup

This guide covers deploying the Tender Generator application with:
- **Frontend**: Vercel
- **Backend**: Render

## 📁 Project Structure
```
/app/
├── src/                    # React frontend source
├── server/                 # Node.js backend
├── vercel.json            # Vercel configuration
├── render.yaml            # Render configuration
├── .env.local             # Local development environment
└── .env.production        # Production environment
```

## 🔧 Backend Deployment (Render)

### 1. Deploy to Render
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure build settings:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (will use root)

### 2. Environment Variables (Set in Render Dashboard)
```
NODE_ENV=production
MONGO_URI=mongodb+srv://kartik:kartik@cluster0.tdwlgsp.mongodb.net/
JWT_SECRET=kartik
GOOGLE_CLIENT_ID=237308786705-nsr1qgam8usomo78970sble2m5cnbncr.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
FRONTEND_URL=https://your-app-name.vercel.app
```

### 3. Update Google OAuth Settings
In Google Cloud Console, add your Render backend URL to:
- **Authorized redirect URIs**: `https://your-backend-url.onrender.com/api/auth/google/callback`
- **Authorized JavaScript origins**: `https://your-backend-url.onrender.com`

## 🎨 Frontend Deployment (Vercel)

### 1. Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Import the project
3. Vercel will auto-detect it as a Vite React app

### 2. Environment Variables (Set in Vercel Dashboard)
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
VITE_APP_ENV=production
```

### 3. Build Settings (Auto-configured)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔄 CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative local)
- Your Vercel frontend URL (production)

## 🧪 Testing Deployment

### Backend Health Check
```bash
curl https://your-backend-url.onrender.com/
```

### Frontend Access
Visit your Vercel app URL and test:
- User registration/login
- Google OAuth authentication
- Tender creation and management

## 🔧 Local Development

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
npm install
npm run dev
```

## 📝 Important Notes

1. **First Render Deployment**: May take 10-20 minutes for initial build
2. **Cold Start**: Render free tier has cold starts (~30 seconds)
3. **Environment Variables**: Double-check all are set correctly
4. **HTTPS**: Both platforms use HTTPS in production
5. **MongoDB**: Ensure IP whitelist allows Render's IPs

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Errors**: Check environment variables and CORS configuration
2. **OAuth Redirect Issues**: Verify Google OAuth settings
3. **Build Failures**: Check for missing dependencies
4. **API Connection**: Verify backend URL in frontend env vars

### Debugging:
- Check Render logs for backend issues
- Check Vercel function logs for frontend issues
- Use browser dev tools for client-side debugging