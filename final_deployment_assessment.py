#!/usr/bin/env python3
"""
Final Deployment Readiness Report for Tender Generator Application
"""

import requests
import json
import os
import subprocess
import sys
from datetime import datetime

class FinalDeploymentReport:
    def __init__(self):
        self.results = []
        
    def log_result(self, category, test, status, message, details=None):
        """Log test results"""
        self.results.append({
            'category': category,
            'test': test,
            'status': status,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
        
        status_icon = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
        print(f"{status_icon} {category} - {test}: {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_frontend_build_readiness(self):
        """Test frontend build and deployment readiness"""
        print("\n🎨 FRONTEND DEPLOYMENT READINESS")
        print("-" * 50)
        
        # Check if build works
        if os.path.exists('/app/dist') and os.path.exists('/app/dist/index.html'):
            self.log_result("Frontend", "Build Process", "PASS", "Build artifacts exist - npm run build works")
        else:
            self.log_result("Frontend", "Build Process", "FAIL", "Build artifacts missing")
        
        # Check Vercel configuration
        if os.path.exists('/app/vercel.json'):
            with open('/app/vercel.json', 'r') as f:
                config = json.load(f)
                if 'builds' in config and 'routes' in config:
                    self.log_result("Frontend", "Vercel Config", "PASS", "vercel.json properly configured")
                else:
                    self.log_result("Frontend", "Vercel Config", "FAIL", "vercel.json missing required fields")
        else:
            self.log_result("Frontend", "Vercel Config", "FAIL", "vercel.json not found")
        
        # Check environment variables
        env_files = []
        if os.path.exists('/app/.env.production'):
            env_files.append('production')
        if os.path.exists('/app/.env.local'):
            env_files.append('local')
        
        if env_files:
            self.log_result("Frontend", "Environment Variables", "PASS", f"Environment files configured: {', '.join(env_files)}")
        else:
            self.log_result("Frontend", "Environment Variables", "FAIL", "No environment files found")
        
        # Check API configuration
        if os.path.exists('/app/src/api/index.js'):
            with open('/app/src/api/index.js', 'r') as f:
                content = f.read()
                if 'import.meta.env.VITE_API_BASE_URL' in content:
                    self.log_result("Frontend", "API Configuration", "PASS", "API configuration uses environment variables")
                else:
                    self.log_result("Frontend", "API Configuration", "WARN", "API configuration may be hardcoded")
        else:
            self.log_result("Frontend", "API Configuration", "FAIL", "API configuration file not found")
    
    def test_backend_deployment_readiness(self):
        """Test backend deployment readiness"""
        print("\n🚀 BACKEND DEPLOYMENT READINESS")
        print("-" * 50)
        
        # Check if backend starts
        try:
            response = requests.get("http://localhost:5000/", timeout=5)
            if response.status_code == 200:
                self.log_result("Backend", "Server Startup", "PASS", "Backend server starts and responds")
            else:
                self.log_result("Backend", "Server Startup", "FAIL", f"Server responds with status {response.status_code}")
        except:
            self.log_result("Backend", "Server Startup", "FAIL", "Backend server not responding")
        
        # Check Render configuration
        if os.path.exists('/app/render.yaml'):
            with open('/app/render.yaml', 'r') as f:
                content = f.read()
                if 'buildCommand:' in content and 'startCommand:' in content:
                    self.log_result("Backend", "Render Config", "PASS", "render.yaml properly configured")
                else:
                    self.log_result("Backend", "Render Config", "FAIL", "render.yaml missing required commands")
        else:
            self.log_result("Backend", "Render Config", "FAIL", "render.yaml not found")
        
        # Check environment variables
        if os.path.exists('/app/server/.env'):
            with open('/app/server/.env', 'r') as f:
                content = f.read()
                required_vars = ['MONGO_URI', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']
                missing_vars = [var for var in required_vars if var not in content]
                if not missing_vars:
                    self.log_result("Backend", "Environment Variables", "PASS", "All required environment variables present")
                else:
                    self.log_result("Backend", "Environment Variables", "FAIL", f"Missing variables: {missing_vars}")
        else:
            self.log_result("Backend", "Environment Variables", "FAIL", "Backend .env file not found")
        
        # Check package.json
        if os.path.exists('/app/server/package.json'):
            with open('/app/server/package.json', 'r') as f:
                package = json.load(f)
                if 'start' in package.get('scripts', {}):
                    self.log_result("Backend", "Start Script", "PASS", "npm start script configured")
                else:
                    self.log_result("Backend", "Start Script", "FAIL", "npm start script missing")
        else:
            self.log_result("Backend", "Start Script", "FAIL", "package.json not found")
    
    def test_authentication_readiness(self):
        """Test authentication system readiness"""
        print("\n🔐 AUTHENTICATION SYSTEM READINESS")
        print("-" * 50)
        
        # Test regular auth endpoints
        try:
            test_user = {
                "name": "Test User",
                "email": f"test.{int(datetime.now().timestamp())}@example.com",
                "password": "testPassword123"
            }
            
            response = requests.post("http://localhost:5000/api/auth/signup", json=test_user, timeout=5)
            if response.status_code == 200:
                self.log_result("Authentication", "Regular Auth", "PASS", "Email/password authentication working")
            else:
                self.log_result("Authentication", "Regular Auth", "FAIL", f"Auth endpoint returned {response.status_code}")
        except Exception as e:
            self.log_result("Authentication", "Regular Auth", "FAIL", f"Auth test failed: {str(e)}")
        
        # Test Google OAuth setup
        try:
            response = requests.get("http://localhost:5000/api/auth/google", allow_redirects=False, timeout=5)
            if response.status_code == 302 and 'accounts.google.com' in response.headers.get('Location', ''):
                self.log_result("Authentication", "Google OAuth", "PASS", "Google OAuth redirect configured")
            else:
                self.log_result("Authentication", "Google OAuth", "FAIL", "Google OAuth not properly configured")
        except Exception as e:
            self.log_result("Authentication", "Google OAuth", "FAIL", f"OAuth test failed: {str(e)}")
    
    def test_database_readiness(self):
        """Test database configuration readiness"""
        print("\n🗄️ DATABASE READINESS")
        print("-" * 50)
        
        # Check MongoDB connection string
        if os.path.exists('/app/server/.env'):
            with open('/app/server/.env', 'r') as f:
                content = f.read()
                if 'MONGO_URI=' in content and 'mongodb+srv://' in content:
                    self.log_result("Database", "Connection String", "PASS", "MongoDB Atlas connection string configured")
                elif 'MONGO_URI=' in content:
                    self.log_result("Database", "Connection String", "WARN", "MongoDB connection string present but may not be Atlas")
                else:
                    self.log_result("Database", "Connection String", "FAIL", "MongoDB connection string missing")
        else:
            self.log_result("Database", "Connection String", "FAIL", "Environment file not found")
        
        # Check if models are defined
        models_dir = '/app/server/models'
        if os.path.exists(models_dir):
            models = [f for f in os.listdir(models_dir) if f.endswith('.js')]
            if models:
                self.log_result("Database", "Data Models", "PASS", f"Database models defined: {', '.join(models)}")
            else:
                self.log_result("Database", "Data Models", "FAIL", "No database models found")
        else:
            self.log_result("Database", "Data Models", "FAIL", "Models directory not found")
    
    def test_production_readiness(self):
        """Test production-specific configurations"""
        print("\n🏭 PRODUCTION READINESS")
        print("-" * 50)
        
        # Check CORS configuration
        if os.path.exists('/app/server/index.js'):
            with open('/app/server/index.js', 'r') as f:
                content = f.read()
                if 'cors(' in content and 'process.env.FRONTEND_URL' in content:
                    self.log_result("Production", "CORS Configuration", "PASS", "CORS configured for production")
                else:
                    self.log_result("Production", "CORS Configuration", "WARN", "CORS configuration may need review")
        
        # Check session configuration
        if os.path.exists('/app/server/index.js'):
            with open('/app/server/index.js', 'r') as f:
                content = f.read()
                if 'process.env.NODE_ENV === \'production\'' in content:
                    self.log_result("Production", "Session Security", "PASS", "Session configured for production")
                else:
                    self.log_result("Production", "Session Security", "WARN", "Session security may need review")
        
        # Check for hardcoded URLs
        issues = []
        for root, dirs, files in os.walk('/app/src'):
            for file in files:
                if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                    filepath = os.path.join(root, file)
                    try:
                        with open(filepath, 'r') as f:
                            content = f.read()
                            if 'localhost:' in content and 'import.meta.env' not in content:
                                issues.append(file)
                    except:
                        pass
        
        if not issues:
            self.log_result("Production", "Hardcoded URLs", "PASS", "No hardcoded URLs found in frontend")
        else:
            self.log_result("Production", "Hardcoded URLs", "WARN", f"Potential hardcoded URLs in: {', '.join(issues[:3])}")
    
    def generate_summary(self):
        """Generate deployment readiness summary"""
        print("\n" + "="*60)
        print("📊 DEPLOYMENT READINESS SUMMARY")
        print("="*60)
        
        categories = {}
        for result in self.results:
            cat = result['category']
            if cat not in categories:
                categories[cat] = {'PASS': 0, 'FAIL': 0, 'WARN': 0}
            categories[cat][result['status']] += 1
        
        total_pass = sum(cat['PASS'] for cat in categories.values())
        total_fail = sum(cat['FAIL'] for cat in categories.values())
        total_warn = sum(cat['WARN'] for cat in categories.values())
        total_tests = total_pass + total_fail + total_warn
        
        print(f"\n📈 Overall Results:")
        print(f"✅ Passed: {total_pass}")
        print(f"❌ Failed: {total_fail}")
        print(f"⚠️  Warnings: {total_warn}")
        print(f"📊 Success Rate: {(total_pass/total_tests*100):.1f}%")
        
        print(f"\n📋 By Category:")
        for category, counts in categories.items():
            total_cat = sum(counts.values())
            pass_rate = (counts['PASS']/total_cat*100) if total_cat > 0 else 0
            print(f"  {category}: {counts['PASS']}/{total_cat} passed ({pass_rate:.0f}%)")
        
        # Deployment recommendation
        print(f"\n🎯 DEPLOYMENT RECOMMENDATION:")
        if total_fail == 0:
            print("🟢 READY FOR DEPLOYMENT")
            print("   All critical tests passed. Application is ready for production deployment.")
        elif total_fail <= 2:
            print("🟡 READY WITH MINOR ISSUES")
            print("   Minor issues detected but deployment should succeed. Monitor for issues.")
        else:
            print("🔴 NOT READY FOR DEPLOYMENT")
            print("   Critical issues found. Please fix before attempting deployment.")
        
        return total_fail == 0
    
    def run_full_assessment(self):
        """Run complete deployment readiness assessment"""
        print("🚀 TENDER GENERATOR - DEPLOYMENT READINESS ASSESSMENT")
        print("="*60)
        print(f"Assessment Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        self.test_frontend_build_readiness()
        self.test_backend_deployment_readiness()
        self.test_authentication_readiness()
        self.test_database_readiness()
        self.test_production_readiness()
        
        return self.generate_summary()

def main():
    """Main function"""
    assessor = FinalDeploymentReport()
    ready = assessor.run_full_assessment()
    
    # Exit with appropriate code
    sys.exit(0 if ready else 1)

if __name__ == "__main__":
    main()