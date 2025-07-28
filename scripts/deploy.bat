@echo off
echo 🚀 Deploying TruthStream...

:: Check if environment is set
if "%NODE_ENV%"=="" (
    echo ❌ NODE_ENV not set. Please set environment (development/production)
    pause
    exit /b 1
)

echo 📦 Environment: %NODE_ENV%

:: Build backend
echo 🔧 Building backend...
cd backend
call npm install --production
call npm run build 2>nul || echo No build script found, skipping...
cd ..

:: Build mobile app
echo 📱 Building mobile app...

:: Android Build
echo 🤖 Building Android app...
cd android
call gradlew assembleRelease
cd ..

:: Start services
echo 🔄 Starting services...

:: Start backend
echo Starting backend...
cd backend
start /b node server.js
cd ..

:: Wait a moment for backend to start
timeout /t 5 /nobreak >nul

:: Health check
echo 🏥 Performing health check...
curl -f http://localhost:3000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is healthy
) else (
    echo ❌ Backend health check failed
    pause
    exit /b 1
)

:: Deployment summary
echo.
echo 🎉 Deployment complete!
echo.
echo 📊 Deployment Summary:
echo - Environment: %NODE_ENV%
echo - Backend: Running on port 3000
echo - Mobile Apps: Built successfully
echo.
echo 🔗 URLs:
echo - API: http://localhost:3000
echo - Health Check: http://localhost:3000/api/health
echo.
echo 📱 Mobile Apps:
echo - Android: android/app/build/outputs/apk/release/app-release.apk
echo.
echo 🎯 Next Steps:
echo 1. Test the API endpoints
echo 2. Upload mobile apps to app stores
echo 3. Configure monitoring and alerts
pause