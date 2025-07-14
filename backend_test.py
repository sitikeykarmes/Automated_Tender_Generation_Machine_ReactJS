#!/usr/bin/env python3
"""
Backend API Testing Suite for Automated Tender Generation Application
Tests all authentication and tender management endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Base URL for the backend API
BASE_URL = "http://localhost:5000/api"

class BackendTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.auth_token = None
        self.user_id = None
        self.test_results = []
        self.created_tender_id = None
        
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
    
    def test_server_health(self):
        """Test if server is responding"""
        try:
            response = requests.get(f"{self.base_url.replace('/api', '')}", timeout=5)
            # Even if we get 404, it means server is running
            self.log_test("Server Health", True, "Server is responding")
            return True
        except requests.exceptions.ConnectionError:
            self.log_test("Server Health", False, "Server is not responding")
            return False
        except Exception as e:
            self.log_test("Server Health", False, f"Server health check failed: {str(e)}")
            return False
    
    def test_user_signup(self):
        """Test user registration endpoint"""
        test_user = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "securePassword123"
        }
        
        try:
            response = requests.post(f"{self.base_url}/auth/signup", json=test_user)
            
            if response.status_code == 200:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.auth_token = data['token']
                    self.log_test("User Signup", True, "User created successfully with JWT token")
                    return True
                else:
                    self.log_test("User Signup", False, "Response missing token or user data", data)
                    return False
            elif response.status_code == 400:
                # User might already exist, try with different email
                test_user['email'] = f"test.user.{datetime.now().timestamp()}@example.com"
                response = requests.post(f"{self.base_url}/auth/signup", json=test_user)
                
                if response.status_code == 200:
                    data = response.json()
                    self.auth_token = data['token']
                    self.log_test("User Signup", True, "User created successfully (with unique email)")
                    return True
                else:
                    self.log_test("User Signup", False, f"Signup failed with status {response.status_code}", response.text)
                    return False
            else:
                self.log_test("User Signup", False, f"Unexpected status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("User Signup", False, f"Request failed: {str(e)}")
            return False
    
    def test_user_login(self):
        """Test user login endpoint"""
        login_data = {
            "email": "john.doe@example.com",
            "password": "securePassword123"
        }
        
        try:
            response = requests.post(f"{self.base_url}/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.auth_token = data['token']
                    self.log_test("User Login", True, "Login successful with JWT token")
                    return True
                else:
                    self.log_test("User Login", False, "Response missing token or user data", data)
                    return False
            elif response.status_code == 400:
                # Try with a user that should exist (from signup test)
                self.log_test("User Login", False, "Login failed - user might not exist", response.json())
                return False
            else:
                self.log_test("User Login", False, f"Unexpected status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("User Login", False, f"Request failed: {str(e)}")
            return False
    
    def test_invalid_login(self):
        """Test login with invalid credentials"""
        invalid_login = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        
        try:
            response = requests.post(f"{self.base_url}/auth/login", json=invalid_login)
            
            if response.status_code == 400:
                self.log_test("Invalid Login", True, "Correctly rejected invalid credentials")
                return True
            else:
                self.log_test("Invalid Login", False, f"Expected 400, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Invalid Login", False, f"Request failed: {str(e)}")
            return False
    
    def test_save_tender(self):
        """Test saving a tender to history"""
        if not self.auth_token:
            self.log_test("Save Tender", False, "No auth token available")
            return False
        
        tender_data = {
            "title": "Software Development Tender",
            "categories": {
                "Technical Expertise": ["0", "1", "3"],
                "Project Management": ["0", "2"],
                "Quality Assurance": ["1", "2"]
            },
            "categoriesOrder": ["Technical Expertise", "Project Management", "Quality Assurance"]
        }
        
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            response = requests.post(f"{self.base_url}/tenders/save", json=tender_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if 'tender' in data and '_id' in data['tender']:
                    self.created_tender_id = data['tender']['_id']
                    self.log_test("Save Tender", True, "Tender saved successfully")
                    return True
                else:
                    self.log_test("Save Tender", False, "Response missing tender data", data)
                    return False
            else:
                self.log_test("Save Tender", False, f"Save failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Save Tender", False, f"Request failed: {str(e)}")
            return False
    
    def test_get_tender_history(self):
        """Test retrieving tender history"""
        if not self.auth_token:
            self.log_test("Get Tender History", False, "No auth token available")
            return False
        
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            response = requests.get(f"{self.base_url}/tenders/history", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Tender History", True, f"Retrieved {len(data)} tenders from history")
                    return True
                else:
                    self.log_test("Get Tender History", False, "Response is not an array", data)
                    return False
            else:
                self.log_test("Get Tender History", False, f"Request failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Tender History", False, f"Request failed: {str(e)}")
            return False
    
    def test_get_tender_by_id(self):
        """Test retrieving specific tender by ID"""
        if not self.auth_token:
            self.log_test("Get Tender by ID", False, "No auth token available")
            return False
        
        if not self.created_tender_id:
            self.log_test("Get Tender by ID", False, "No tender ID available")
            return False
        
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            response = requests.get(f"{self.base_url}/tenders/{self.created_tender_id}", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if '_id' in data and data['_id'] == self.created_tender_id:
                    self.log_test("Get Tender by ID", True, "Successfully retrieved tender by ID")
                    return True
                else:
                    self.log_test("Get Tender by ID", False, "Retrieved tender ID doesn't match", data)
                    return False
            elif response.status_code == 404:
                self.log_test("Get Tender by ID", False, "Tender not found", response.text)
                return False
            else:
                self.log_test("Get Tender by ID", False, f"Request failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Tender by ID", False, f"Request failed: {str(e)}")
            return False
    
    def test_unauthorized_access(self):
        """Test accessing protected routes without token"""
        try:
            # Test accessing tender history without token
            response = requests.get(f"{self.base_url}/tenders/history")
            
            if response.status_code == 401:
                self.log_test("Unauthorized Access", True, "Correctly blocked access without token")
                return True
            else:
                self.log_test("Unauthorized Access", False, f"Expected 401, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Unauthorized Access", False, f"Request failed: {str(e)}")
            return False
    
    def test_invalid_token_access(self):
        """Test accessing protected routes with invalid token"""
        invalid_headers = {"Authorization": "Bearer invalid_token_here"}
        
        try:
            response = requests.get(f"{self.base_url}/tenders/history", headers=invalid_headers)
            
            if response.status_code == 401:
                self.log_test("Invalid Token Access", True, "Correctly blocked access with invalid token")
                return True
            else:
                self.log_test("Invalid Token Access", False, f"Expected 401, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Invalid Token Access", False, f"Request failed: {str(e)}")
            return False
    
    def test_delete_tender(self):
        """Test deleting a tender"""
        if not self.auth_token:
            self.log_test("Delete Tender", False, "No auth token available")
            return False
        
        if not self.created_tender_id:
            self.log_test("Delete Tender", False, "No tender ID available")
            return False
        
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            response = requests.delete(f"{self.base_url}/tenders/{self.created_tender_id}", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if 'msg' in data and 'deleted' in data['msg'].lower():
                    self.log_test("Delete Tender", True, "Tender deleted successfully")
                    return True
                else:
                    self.log_test("Delete Tender", False, "Unexpected response format", data)
                    return False
            elif response.status_code == 404:
                self.log_test("Delete Tender", False, "Tender not found for deletion", response.text)
                return False
            else:
                self.log_test("Delete Tender", False, f"Delete failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Delete Tender", False, f"Request failed: {str(e)}")
            return False
    
    def test_delete_nonexistent_tender(self):
        """Test deleting a non-existent tender"""
        if not self.auth_token:
            self.log_test("Delete Nonexistent Tender", False, "No auth token available")
            return False
        
        fake_id = "507f1f77bcf86cd799439011"  # Valid ObjectId format but doesn't exist
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            response = requests.delete(f"{self.base_url}/tenders/{fake_id}", headers=headers)
            
            if response.status_code == 404:
                self.log_test("Delete Nonexistent Tender", True, "Correctly returned 404 for non-existent tender")
                return True
            else:
                self.log_test("Delete Nonexistent Tender", False, f"Expected 404, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Delete Nonexistent Tender", False, f"Request failed: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests in sequence"""
        print("🚀 Starting Backend API Tests for Automated Tender Generation")
        print("=" * 60)
        
        # Test sequence
        tests = [
            self.test_server_health,
            self.test_user_signup,
            self.test_user_login,
            self.test_invalid_login,
            self.test_unauthorized_access,
            self.test_invalid_token_access,
            self.test_save_tender,
            self.test_get_tender_history,
            self.test_get_tender_by_id,
            self.test_delete_tender,
            self.test_delete_nonexistent_tender
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
            print()  # Add spacing between tests
        
        # Summary
        print("=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(passed/(passed+failed)*100):.1f}%")
        
        if failed == 0:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Please check the issues above.")
            return False

def main():
    """Main function to run the tests"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()