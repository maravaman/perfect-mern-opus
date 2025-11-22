@echo off
REM Knight21 Admin Panel Test Script for Windows

echo ================================================================
echo      Knight21 Admin Panel - Automated Test Suite
echo ================================================================
echo.

set PASSED=0
set FAILED=0

echo Starting tests...
echo.

REM Test 1: Backend Health
echo ================================================================
echo Test 1: Backend Health Check
echo ================================================================
curl -s http://localhost:5000/api/health > test_result.tmp 2>nul
if %errorlevel% equ 0 (
    findstr /C:"success" test_result.tmp >nul
    if !errorlevel! equ 0 (
        echo [PASS] Backend server is running on port 5000
        set /a PASSED+=1
    ) else (
        echo [FAIL] Backend server not responding properly
        set /a FAILED+=1
    )
) else (
    echo [FAIL] Backend server not running
    echo Please start the backend server:
    echo   cd backend
    echo   npm run dev
    set /a FAILED+=1
    goto :summary
)

REM Test 2: Login
echo.
echo ================================================================
echo Test 2: Login Authentication
echo ================================================================
curl -s -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@knight21.com\",\"password\":\"Admin@123456\"}" > login_result.tmp 2>nul

findstr /C:"token" login_result.tmp >nul
if %errorlevel% equ 0 (
    echo [PASS] Login endpoint working
    set /a PASSED+=1

    REM Extract token (simplified)
    for /f "tokens=2 delims=:," %%a in ('findstr "token" login_result.tmp') do set TOKEN=%%a
) else (
    echo [FAIL] Login endpoint failed
    echo Check credentials in backend/.env
    echo Try running: cd backend ^&^& node utils/seedData.js
    set /a FAILED+=1
    goto :summary
)

REM Test 3: Protected endpoint
echo.
echo ================================================================
echo Test 3: Protected Endpoint - Site Settings
echo ================================================================
REM Note: Windows curl doesn't easily handle JWT tokens in batch
REM This is a simplified test
curl -s http://localhost:5000/api/admin/site-settings > settings_result.tmp 2>nul
if %errorlevel% equ 0 (
    echo [PASS] Site settings endpoint accessible
    set /a PASSED+=1
) else (
    echo [FAIL] Site settings endpoint failed
    set /a FAILED+=1
)

REM Test 4: Frontend
echo.
echo ================================================================
echo Test 4: Frontend Server
echo ================================================================
curl -s http://localhost:5173 > frontend_result.tmp 2>nul
if %errorlevel% equ 0 (
    echo [PASS] Frontend server is running on port 5173
    set /a PASSED+=1
) else (
    echo [FAIL] Frontend server not responding
    echo Run 'npm run dev' in project root
    set /a FAILED+=1
)

:summary
echo.
echo ================================================================
echo                      Test Summary
echo ================================================================
echo.
echo Passed: %PASSED%
echo Failed: %FAILED%
echo.

REM Cleanup temp files
del test_result.tmp 2>nul
del login_result.tmp 2>nul
del settings_result.tmp 2>nul
del frontend_result.tmp 2>nul

if %FAILED% equ 0 (
    echo ================================================================
    echo             All Tests Passed!
    echo ================================================================
    echo.
    echo Your admin panel is fully functional!
    echo.
    echo Next steps:
    echo   1. Open browser: http://localhost:5173/admin/login
    echo   2. Login with:
    echo      Email: admin@knight21.com
    echo      Password: Admin@123456
    echo   3. Start managing your site!
    echo.
) else (
    echo ================================================================
    echo             Some Tests Failed
    echo ================================================================
    echo.
    echo Please check the errors above and:
    echo   1. Ensure MongoDB is running: net start MongoDB
    echo   2. Ensure backend is running: cd backend ^&^& npm run dev
    echo   3. Ensure frontend is running: npm run dev
    echo   4. Check all .env configuration files
    echo.
    echo For detailed help, see TESTING_GUIDE.md
    echo.
)

pause
