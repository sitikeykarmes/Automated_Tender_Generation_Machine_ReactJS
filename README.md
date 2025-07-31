# 🚀 Tender Generator - Complete Deployment Guide

## 📋 Overview

Deploy your Tender Generator application with:

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: MongoDB Atlas (Already configured)

---

## 🏠 LOCAL DEVELOPMENT SETUP

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/sitikeykarmes/Automated_Tender_Generation_Machine_ReactJS.git
cd Automated_Tender_Generation_Machine_ReactJS
```

### Step 2: Backend Setup (Local)

1. Navigate to backend directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in `server` directory:

```env
NODE_ENV=development
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.tdwlgsp.mongodb.net/
JWT_SECRET=your-jwt-secret-for-local-dev
GOOGLE_CLIENT_ID=your-google-client-ID
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:5173
PORT=5000
```

4. Start backend server:

```bash
node index.js
```

**Default Backend URL**: `http://localhost:5000`

### Step 3: Frontend Setup (Local)

1. Navigate back to root directory:

```bash
cd ..
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

4. Start frontend development server:

```bash
npm run dev
```

**Default Frontend URL**: `http://localhost:5173`

### Step 4: Update Google OAuth for Local Development

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs**:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
5. Add to **Authorized JavaScript origins**:
   ```
   http://localhost:5000
   http://localhost:5173
   ```

### Step 5: Test Local Setup

1. Backend: Visit `http://localhost:5000` - should show API status
2. Frontend: Visit `http://localhost:5173` - should load the app
3. Test user registration, login, and Google OAuth

### 🔄 Switching Between Local and Production

#### For Local Development:

- **Backend .env**: `FRONTEND_URL=http://localhost:5173`
- **Frontend .env**: `VITE_API_BASE_URL=http://localhost:5000/api`

#### For Production Deployment:

- **Backend (Render)**: `FRONTEND_URL=https://your-vercel-app-name.vercel.app`
- **Frontend (Vercel)**: `VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api`

---

## 🎯 BACKEND DEPLOYMENT (Render)

### Step 1: Connect GitHub Repository

1. Go to [Render.com](https://render.com)
2. Sign up/Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### Step 2: Configure Build Settings

- **Name**: `automated-tender-generation-machine` (Change as per your wish)
- **Environment**: `Node`
- **Branch**: `main` (or your default branch)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`

### Step 3: Set Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.tdwlgsp.mongodb.net/
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-ID
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=https://your-vercel-app-name.vercel.app
PORT=10000
```

**Important**: Replace `your-vercel-app-name` with your actual Vercel app name after frontend deployment.

### Step 4: Deploy Backend

1. Click "Create Web Service"
2. Wait for build to complete (~5-10 minutes)
3. Note your backend URL: `https://your-render-backend-url.onrender.com`

---

## 🎨 FRONTEND DEPLOYMENT (Vercel)

### Step 1: Connect GitHub Repository

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository

### Step 2: Configure Project Settings

- **Framework**: Vite (auto-detected)
- **Root Directory**: Leave as `.` (root) or set to `client` if frontend is in subdirectory
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
# Local
curl http://localhost:5000/

# Production
curl https://your-render-backend-url.onrender.com/
```

Should return: `{"message":"Tender Generator Backend API is running!","status":"healthy"}`

### 2. Frontend Access

**Local**: Visit `http://localhost:5173`
**Production**: Visit your Vercel URL

Test checklist:

- ✅ Page loads correctly
- ✅ User registration works
- ✅ User login works
- ✅ Google OAuth works
- ✅ Tender creation works
- ✅ API calls succeed

### 3. Google OAuth Test

1. Click "Sign in with Google" on your app
2. Should redirect to Google login
3. After login, should redirect back to your app with success

---

## ⚡ IMPORTANT NOTES

### Local Development

- Backend runs on `http://localhost:5000` by default
- Frontend runs on `http://localhost:5173` by default (Vite)
- MongoDB Atlas works for both local and production
- Use different Google OAuth settings for local vs production

### Cold Starts (Render Free Tier)

- First request may take 30-60 seconds
- Backend "sleeps" after 15 minutes of inactivity
- Consider upgrading to paid plan for production use

### MongoDB Atlas

- Ensure IP whitelist includes `0.0.0.0/0` for both Render and local development
- Or add specific IP ranges for both environments

### HTTPS & Security

- Production: Both platforms use HTTPS automatically
- Local: Uses HTTP (standard for development)
- Session cookies configured appropriately for each environment

---

## 🐛 TROUBLESHOOTING

### Common Issues:

#### 1. Build Failures

- **Frontend**: Check if all dependencies are in `package.json`
- **Backend**: Ensure Node.js version compatibility
- **Solution**: Check build logs in platform dashboards or terminal

#### 2. API Connection Errors

- **Issue**: Frontend can't reach backend
- **Local**: Check if backend is running on correct port
- **Production**: Verify environment variables are correct
- **Solution**: Verify API base URLs match backend URLs

#### 3. Google OAuth Redirect Issues

- **Issue**: OAuth callback fails
- **Check**: Google Cloud Console redirect URIs for both environments
- **Solution**: Ensure both local and production URLs are added

#### 4. CORS Errors

- **Issue**: Cross-origin requests blocked
- **Local**: Backend should allow `http://localhost:5173`
- **Production**: Backend should allow your Vercel domain
- **Solution**: Check CORS configuration in backend

#### 5. Database Connection

- **Issue**: MongoDB connection fails
- **Check**: MongoDB Atlas IP whitelist and connection string
- **Solution**: Ensure local IP and `0.0.0.0/0` are whitelisted

#### 6. Environment Variables Not Loading

- **Local**: Ensure `.env` files are in correct directories
- **Production**: Check platform environment variable settings
- **Solution**: Restart servers after changing environment variables

### Debug Commands:

```bash
# Check if backend is running
curl http://localhost:5000/

# Check frontend build
npm run build

# Check environment variables (Node.js)
console.log(process.env.NODE_ENV)

# Check browser dev tools for client errors
# Check terminal logs for server errors
```

---

## 📈 PERFORMANCE OPTIMIZATION

### Local Development

- Use `npm run dev` for hot reloading
- Enable source maps for debugging
- Use development builds for faster compilation

### Frontend (Vercel)

- Automatic CDN and edge caching
- Image optimization
- Build optimization with Vite

### Backend (Render)

- Consider upgrading to avoid cold starts
- Database connection pooling (already configured)
- JWT token caching

---

## 🔧 DEVELOPMENT WORKFLOW

### Recommended Development Process:

1. **Start Local Development**:

   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client  # or stay in root if frontend is there
   npm run dev
   ```

2. **Test Locally**: Develop and test all features on `localhost`

3. **Deploy to Production**: Push to GitHub, which triggers automatic deployments

4. **Update Environment Variables**: Switch URLs for production deployment

### Git Workflow:

```bash
# Make changes locally
git add .
git commit -m "Your commit message"
git push origin main

# Automatic deployment triggers on both Vercel and Render
```

---

## 🎉 DEPLOYMENT COMPLETE!

After following these steps, your Tender Generator application will be available in both environments:

### Local Development:

- ✅ **Frontend**: `http://localhost:5173`
- ✅ **Backend**: `http://localhost:5000`
- ✅ Hot reloading enabled
- ✅ Development-optimized builds

### Production Deployment:

- ✅ **Frontend**: `https://your-app-name.vercel.app`
- ✅ **Backend**: `https://your-backend-name.onrender.com`
- ✅ HTTPS secured
- ✅ Production optimized
- ✅ Global CDN delivery

Both environments will have:

- ✅ Google OAuth functional
- ✅ Database connected
- ✅ API endpoints working
- ✅ Cross-origin requests configured

### Quick Reference URLs:

| Environment    | Frontend                      | Backend                         |
| -------------- | ----------------------------- | ------------------------------- |
| **Local**      | `http://localhost:5173`       | `http://localhost:5000`         |
| **Production** | `https://your-app.vercel.app` | `https://your-app.onrender.com` |
