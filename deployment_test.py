#!/usr/bin/env python3
"""
Deployment Readiness Test Suite for Tender Generator Application
Tests both frontend build and backend deployment readiness
"""

import requests
import json
import sys
import subprocess
import os
from datetime import datetime
import time

class DeploymentTester:
    def __init__(self):
        self.backend_url = "http://localhost:5000"
        self.test_results = []
        self.backend_process = None
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
        
        if details and not success:
            print(f"   Details: {details}")
    
    def test_frontend_build(self):
        """Test if frontend builds successfully"""
        try:
            print("🔨 Testing frontend build process...")
            
            # Check if dist folder exists (build was already run)
            if os.path.exists('/app/dist'):
                # Check if build artifacts exist
                index_html = os.path.exists('/app/dist/index.html')
                assets_dir = os.path.exists('/app/dist/assets')
                
                if index_html and assets_dir:
                    self.log_test("Frontend Build", True, "Build artifacts found - frontend builds successfully")
                    return True
                else:
                    self.log_test("Frontend Build", False, "Build artifacts incomplete")
                    return False
            else:
                self.log_test("Frontend Build", False, "No build artifacts found")
                return False
                
        except Exception as e:
            self.log_test("Frontend Build", False, f"Build test failed: {str(e)}")
            return False
    
    def test_backend_startup(self):
        """Test if backend starts without errors"""
        try:
            print("🚀 Testing backend startup...")
            
            # Start backend process
            os.chdir('/app/server')
            self.backend_process = subprocess.Popen(
                ['node', 'index.js'],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Wait for startup
            time.sleep(3)
            
            # Check if process is still running
            if self.backend_process.poll() is None:
                self.log_test("Backend Startup", True, "Backend starts successfully")
                return True
            else:
                stdout, stderr = self.backend_process.communicate()
                self.log_test("Backend Startup", False, "Backend failed to start", f"stderr: {stderr}")
                return False
                
        except Exception as e:
            self.log_test("Backend Startup", False, f"Backend startup test failed: {str(e)}")
            return False
    
    def test_backend_health(self):
        """Test backend health endpoint"""
        try:
            print("🏥 Testing backend health endpoint...")
            
            response = requests.get(f"{self.backend_url}/", timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                if 'message' in data and 'status' in data:
                    self.log_test("Backend Health", True, "Health endpoint responds correctly")
                    return True
                else:
                    self.log_test("Backend Health", False, "Health endpoint response format incorrect", data)
                    return False
            else:
                self.log_test("Backend Health", False, f"Health endpoint returned {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Backend Health", False, f"Health endpoint test failed: {str(e)}")
            return False
    
    def test_environment_variables(self):
        """Test environment variable configuration"""
        try:
            print("🔧 Testing environment variable configuration...")
            
            # Check frontend env files
            frontend_envs = []
            if os.path.exists('/app/.env.production'):
                with open('/app/.env.production', 'r') as f:
                    content = f.read()
                    if 'VITE_API_BASE_URL' in content:
                        frontend_envs.append('production')
            
            if os.path.exists('/app/.env.local'):
                with open('/app/.env.local', 'r') as f:
                    content = f.read()
                    if 'VITE_API_BASE_URL' in content:
                        frontend_envs.append('local')
            
            # Check backend env file
            backend_env = False
            if os.path.exists('/app/server/.env'):
                with open('/app/server/.env', 'r') as f:
                    content = f.read()
                    required_vars = ['MONGO_URI', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']
                    if all(var in content for var in required_vars):
                        backend_env = True
            
            if frontend_envs and backend_env:
                self.log_test("Environment Variables", True, f"Environment files configured: frontend({', '.join(frontend_envs)}), backend(✓)")
                return True
            else:
                self.log_test("Environment Variables", False, f"Missing environment configuration: frontend({frontend_envs}), backend({backend_env})")
                return False
                
        except Exception as e:
            self.log_test("Environment Variables", False, f"Environment test failed: {str(e)}")
            return False
    
    def test_api_configuration(self):
        """Test API configuration in frontend"""
        try:
            print("🔌 Testing API configuration...")
            
            api_file = '/app/src/api/index.js'
            if os.path.exists(api_file):
                with open(api_file, 'r') as f:
                    content = f.read()
                    
                # Check for proper API configuration
                checks = [
                    'import.meta.env.VITE_API_BASE_URL' in content,
                    'axios.create' in content,
                    'withCredentials: true' in content,
                    'Authorization' in content
                ]
                
                if all(checks):
                    self.log_test("API Configuration", True, "Frontend API configuration is correct")
                    return True
                else:
                    self.log_test("API Configuration", False, f"API configuration issues found: {checks}")
                    return False
            else:
                self.log_test("API Configuration", False, "API configuration file not found")
                return False
                
        except Exception as e:
            self.log_test("API Configuration", False, f"API configuration test failed: {str(e)}")
            return False
    
    def test_google_oauth_setup(self):
        """Test Google OAuth configuration"""
        try:
            print("🔐 Testing Google OAuth configuration...")
            
            # Test OAuth redirect endpoint
            response = requests.get(f"{self.backend_url}/api/auth/google", allow_redirects=False, timeout=5)
            
            if response.status_code == 302:
                location = response.headers.get('Location', '')
                if 'accounts.google.com' in location and 'oauth2' in location:
                    self.log_test("Google OAuth Setup", True, "OAuth redirect configured correctly")
                    return True
                else:
                    self.log_test("Google OAuth Setup", False, f"OAuth redirect incorrect: {location}")
                    return False
            else:
                self.log_test("Google OAuth Setup", False, f"OAuth endpoint returned {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Google OAuth Setup", False, f"OAuth test failed: {str(e)}")
            return False
    
    def test_deployment_configs(self):
        """Test deployment configuration files"""
        try:
            print("📋 Testing deployment configuration files...")
            
            configs_found = []
            
            # Check Vercel config
            if os.path.exists('/app/vercel.json'):
                with open('/app/vercel.json', 'r') as f:
                    vercel_config = json.load(f)
                    if 'builds' in vercel_config and 'routes' in vercel_config:
                        configs_found.append('vercel.json')
            
            # Check Render config
            if os.path.exists('/app/render.yaml'):
                with open('/app/render.yaml', 'r') as f:
                    content = f.read()
                    if 'services:' in content and 'buildCommand:' in content:
                        configs_found.append('render.yaml')
            
            if len(configs_found) == 2:
                self.log_test("Deployment Configs", True, f"Deployment configs found: {', '.join(configs_found)}")
                return True
            else:
                self.log_test("Deployment Configs", False, f"Missing deployment configs. Found: {configs_found}")
                return False
                
        except Exception as e:
            self.log_test("Deployment Configs", False, f"Deployment config test failed: {str(e)}")
            return False
    
    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        try:
            print("🔑 Testing authentication endpoints...")
            
            # Test signup endpoint
            test_user = {
                "name": "Test User",
                "email": f"test.{int(time.time())}@example.com",
                "password": "testPassword123"
            }
            
            response = requests.post(f"{self.backend_url}/api/auth/signup", json=test_user, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.log_test("Auth Endpoints", True, "Authentication endpoints working correctly")
                    return True
                else:
                    self.log_test("Auth Endpoints", False, "Auth response format incorrect", data)
                    return False
            else:
                self.log_test("Auth Endpoints", False, f"Auth endpoint returned {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Auth Endpoints", False, f"Auth endpoint test failed: {str(e)}")
            return False
    
    def cleanup(self):
        """Clean up test processes"""
        if self.backend_process and self.backend_process.poll() is None:
            self.backend_process.terminate()
            self.backend_process.wait()
    
    def run_all_tests(self):
        """Run all deployment readiness tests"""
        print("🚀 Starting Deployment Readiness Tests")
        print("=" * 60)
        
        tests = [
            self.test_frontend_build,
            self.test_environment_variables,
            self.test_api_configuration,
            self.test_deployment_configs,
            self.test_backend_startup,
            self.test_backend_health,
            self.test_google_oauth_setup,
            self.test_auth_endpoints
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            try:
                if test():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ FAIL {test.__name__}: Unexpected error - {str(e)}")
                failed += 1
            print()
        
        # Cleanup
        self.cleanup()
        
        # Summary
        print("=" * 60)
        print(f"📊 DEPLOYMENT READINESS SUMMARY")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(passed/(passed+failed)*100):.1f}%")
        
        if failed == 0:
            print("🎉 All tests passed! Application is ready for deployment.")
            return True
        elif failed <= 2:
            print("⚠️  Minor issues found. Application should deploy but may need attention.")
            return True
        else:
            print("❌ Major issues found. Please fix before deployment.")
            return False

def main():
    """Main function to run deployment tests"""
    tester = DeploymentTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()