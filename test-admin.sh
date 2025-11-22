#!/bin/bash

# Knight21 Admin Panel Automated Test Script
# This script tests if everything is working correctly

echo "╔════════════════════════════════════════════════════════════╗"
echo "║      Knight21 Admin Panel - Automated Test Suite          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to print test result
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC} - $2"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC} - $2"
        FAILED=$((FAILED + 1))
        if [ ! -z "$3" ]; then
            echo -e "${YELLOW}   Error: $3${NC}"
        fi
    fi
}

echo "Starting tests..."
echo ""

# Test 1: Check if backend is running
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 1: Backend Health Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
HEALTH=$(curl -s -w "\n%{http_code}" http://localhost:5000/api/health 2>/dev/null)
HTTP_CODE=$(echo "$HEALTH" | tail -n 1)
RESPONSE=$(echo "$HEALTH" | head -n -1)

if [ "$HTTP_CODE" = "200" ] && [[ $RESPONSE == *"success"* ]]; then
    test_result 0 "Backend server is running on port 5000"
else
    test_result 1 "Backend server not responding" "Expected 200 OK, got $HTTP_CODE"
    echo ""
    echo "Please start the backend server:"
    echo "  cd backend"
    echo "  npm run dev"
    exit 1
fi

# Test 2: Check MongoDB connection
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 2: MongoDB Connection"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ $RESPONSE == *"MongoDB Connected"* ]] || [[ $RESPONSE == *"success"* ]]; then
    test_result 0 "MongoDB is connected"
else
    test_result 1 "MongoDB connection issue" "Check MONGODB_URI in backend/.env"
fi

# Test 3: Test login endpoint
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 3: Login Authentication"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
LOGIN=$(curl -s -w "\n%{http_code}" -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@knight21.com","password":"Admin@123456"}' 2>/dev/null)

HTTP_CODE=$(echo "$LOGIN" | tail -n 1)
RESPONSE=$(echo "$LOGIN" | head -n -1)

if [ "$HTTP_CODE" = "200" ] && [[ $RESPONSE == *"token"* ]]; then
    test_result 0 "Login endpoint working"
    TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "   Token received: ${TOKEN:0:20}..."
else
    test_result 1 "Login endpoint failed" "Check credentials in backend/.env"
    echo "   Response: $RESPONSE"
    echo ""
    echo "Try running: cd backend && node utils/seedData.js"
    exit 1
fi

# Test 4: Test protected endpoint - Site Settings
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 4: Protected Endpoint - Site Settings"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
SETTINGS=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/site-settings 2>/dev/null)

HTTP_CODE=$(echo "$SETTINGS" | tail -n 1)
RESPONSE=$(echo "$SETTINGS" | head -n -1)

if [ "$HTTP_CODE" = "200" ] && [[ $RESPONSE == *"success"* ]]; then
    test_result 0 "Site settings endpoint accessible"
else
    test_result 1 "Site settings endpoint failed" "JWT authentication issue"
fi

# Test 5: Test services endpoint
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 5: Services Endpoint"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
SERVICES=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/services 2>/dev/null)

HTTP_CODE=$(echo "$SERVICES" | tail -n 1)
RESPONSE=$(echo "$SERVICES" | head -n -1)

if [ "$HTTP_CODE" = "200" ] && [[ $RESPONSE == *"success"* ]]; then
    test_result 0 "Services endpoint accessible"
else
    test_result 1 "Services endpoint failed"
fi

# Test 6: Test courses endpoint
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 6: Courses Endpoint"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
COURSES=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/courses 2>/dev/null)

HTTP_CODE=$(echo "$COURSES" | tail -n 1)
RESPONSE=$(echo "$COURSES" | head -n -1)

if [ "$HTTP_CODE" = "200" ] && [[ $RESPONSE == *"success"* ]]; then
    test_result 0 "Courses endpoint accessible"
else
    test_result 1 "Courses endpoint failed"
fi

# Test 7: Test tools endpoint
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 7: Tools Endpoint"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
TOOLS=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/tools 2>/dev/null)

HTTP_CODE=$(echo "$TOOLS" | tail -n 1)
RESPONSE=$(echo "$TOOLS" | head -n -1)

if [ "$HTTP_CODE" = "200" ] && [[ $RESPONSE == *"success"* ]]; then
    test_result 0 "Tools endpoint accessible"
else
    test_result 1 "Tools endpoint failed"
fi

# Test 8: Test portfolio endpoint
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 8: Portfolio Endpoint"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
PORTFOLIO=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/portfolio 2>/dev/null)

HTTP_CODE=$(echo "$PORTFOLIO" | tail -n 1)
RESPONSE=$(echo "$PORTFOLIO" | head -n -1)

if [ "$HTTP_CODE" = "200" ] && [[ $RESPONSE == *"success"* ]]; then
    test_result 0 "Portfolio endpoint accessible"
else
    test_result 1 "Portfolio endpoint failed"
fi

# Test 9: Test frontend availability (if curl supports it)
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test 9: Frontend Server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
FRONTEND=$(curl -s -w "\n%{http_code}" http://localhost:5173 2>/dev/null)
HTTP_CODE=$(echo "$FRONTEND" | tail -n 1)

if [ "$HTTP_CODE" = "200" ]; then
    test_result 0 "Frontend server is running on port 5173"
else
    test_result 1 "Frontend server not responding" "Run 'npm run dev' in project root"
fi

# Summary
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                      Test Summary                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║             🎉 All Tests Passed! 🎉                        ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Your admin panel is fully functional!"
    echo ""
    echo "Next steps:"
    echo "  1. Open browser: http://localhost:5173/admin/login"
    echo "  2. Login with:"
    echo "     Email: admin@knight21.com"
    echo "     Password: Admin@123456"
    echo "  3. Start managing your site!"
    echo ""
    exit 0
else
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║             ⚠️  Some Tests Failed  ⚠️                      ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Please check the errors above and:"
    echo "  1. Ensure MongoDB is running"
    echo "  2. Ensure backend server is running (cd backend && npm run dev)"
    echo "  3. Ensure frontend server is running (npm run dev)"
    echo "  4. Check all .env configuration files"
    echo ""
    echo "For detailed help, see TESTING_GUIDE.md"
    echo ""
    exit 1
fi
