# 🚀 Tender Generator - Complete Deployment Guide

## 📋 Overview
Deploy your Tender Generator application with:
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: MongoDB Atlas (Already configured)

---

## 🎯 BACKEND DEPLOYMENT (Render)

### Step 1: Connect GitHub Repository
1. Go to [Render.com](https://render.com)
2. Sign up/Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### Step 2: Configure Build Settings
- **Name**: `tender-generator-backend`
- **Environment**: `Node`
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && npm start`

### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://kartik:kartik@cluster0.tdwlgsp.mongodb.net/
JWT_SECRET=kartik
GOOGLE_CLIENT_ID=237308786705-nsr1qgam8usomo78970sble2m5cnbncr.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
FRONTEND_URL=https://your-vercel-app-name.vercel.app
```

**Important**: Replace `your-vercel-app-name` with your actual Vercel app name after frontend deployment.

### Step 4: Deploy Backend
1. Click "Create Web Service"
2. Wait for build to complete (~5-10 minutes)
3. Note your backend URL: `https://tender-generator-backend.onrender.com`

---

## 🎨 FRONTEND DEPLOYMENT (Vercel)

### Step 1: Connect GitHub Repository
1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository

### Step 2: Configure Project Settings
- **Framework**: Vite (auto-detected)
- **Root Directory**: Leave as `.` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 3: Set Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
VITE_APP_ENV=production
```

**Important**: Replace `your-render-backend-url` with your actual Render backend URL.

### Step 4: Deploy Frontend
1. Click "Deploy"
2. Wait for build to complete (~3-5 minutes)
3. Note your frontend URL: `https://your-app-name.vercel.app`

---

## 🔄 UPDATE CROSS-REFERENCES

### Update Backend Environment (Render)
Go back to Render and update the `FRONTEND_URL` environment variable:
```
FRONTEND_URL=https://your-actual-vercel-app-name.vercel.app
```

### Update Google OAuth Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs**:
   ```
   https://your-render-backend-url.onrender.com/api/auth/google/callback
   ```
5. Add to **Authorized JavaScript origins**:
   ```
   https://your-render-backend-url.onrender.com
   https://your-vercel-app-name.vercel.app
   ```

---

## 🧪 TESTING DEPLOYMENT

### 1. Backend Health Check
```bash
curl https://your-render-backend-url.onrender.com/
```
Should return: `{"message":"Tender Generator Backend API is running!","status":"healthy"}`

### 2. Frontend Access
Visit your Vercel URL and test:
- ✅ Page loads correctly
- ✅ User registration works
- ✅ User login works
- ✅ Google OAuth works
- ✅ Tender creation works
- ✅ API calls succeed

### 3. Google OAuth Test
1. Click "Sign in with Google" on your deployed app
2. Should redirect to Google login
3. After login, should redirect back to your app with success

---

## ⚡ IMPORTANT NOTES

### Cold Starts (Render Free Tier)
- First request may take 30-60 seconds
- Backend "sleeps" after 15 minutes of inactivity
- Consider upgrading to paid plan for production use

### MongoDB Atlas
- Ensure IP whitelist includes `0.0.0.0/0` for Render
- Or add specific Render IP ranges

### HTTPS & Security
- Both platforms use HTTPS automatically
- Session cookies configured for production
- CORS properly configured for both domains

---

## 🐛 TROUBLESHOOTING

### Common Issues:

#### 1. Build Failures
- **Frontend**: Check if all dependencies are in `package.json`
- **Backend**: Ensure Node.js version compatibility
- **Solution**: Check build logs in platform dashboards

#### 2. API Connection Errors
- **Issue**: Frontend can't reach backend
- **Check**: Environment variables are correct
- **Solution**: Verify `VITE_API_BASE_URL` matches backend URL

#### 3. Google OAuth Redirect Issues
- **Issue**: OAuth callback fails
- **Check**: Google Cloud Console redirect URIs
- **Solution**: Ensure all URLs are added to Google OAuth settings

#### 4. CORS Errors
- **Issue**: Cross-origin requests blocked
- **Check**: Backend CORS configuration
- **Solution**: Verify frontend URL is in backend CORS origins

#### 5. Database Connection
- **Issue**: MongoDB connection fails
- **Check**: MongoDB Atlas IP whitelist
- **Solution**: Add `0.0.0.0/0` or specific Render IPs

### Debug Commands:
```bash
# Check backend logs (Render dashboard)
# Check frontend logs (Vercel dashboard)
# Check browser dev tools for client errors
# Test API endpoints individually
```

---

## 📈 PERFORMANCE OPTIMIZATION

### Frontend (Vercel)
- Automatic CDN and edge caching
- Image optimization
- Build optimization with Vite

### Backend (Render)
- Consider upgrading to avoid cold starts
- Database connection pooling (already configured)
- JWT token caching

---

## 🎉 DEPLOYMENT COMPLETE!

After following these steps, your Tender Generator application will be:
- ✅ Deployed and accessible worldwide
- ✅ HTTPS secured
- ✅ Google OAuth functional
- ✅ Database connected
- ✅ API endpoints working
- ✅ Production optimized

**Frontend URL**: `https://your-app-name.vercel.app`
**Backend URL**: `https://your-backend-name.onrender.com`