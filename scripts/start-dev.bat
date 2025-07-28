@echo off
echo 🌊 Starting TruthStream Development Environment...

:: Check if .env exists
if not exist .env (
    echo ❌ .env file not found. Please run setup.bat first.
    pause
    exit /b 1
)

:: Start MongoDB (if installed locally)
echo 🗄️ Starting MongoDB...
start "MongoDB" mongod

:: Wait for MongoDB to start
timeout /t 3 /nobreak >nul

:: Start backend in new window
echo 🔧 Starting backend server...
start "TruthStream Backend" cmd /k "cd backend && npm run dev"

:: Wait for backend to start
timeout /t 5 /nobreak >nul

:: Start React Native Metro bundler
echo 📱 Starting React Native Metro bundler...
start "Metro Bundler" cmd /k "npm start"

echo ✅ Development environment started!
echo.
echo 🔗 Services:
echo - Backend API: http://localhost:3000
echo - Metro Bundler: http://localhost:8081
echo.
echo 📱 To run the app:
echo - Android: npm run android
echo - iOS: npm run ios (macOS only)
echo.
echo Press any key to continue...
pause >nul