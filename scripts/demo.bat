@echo off
echo 🌊 Starting TruthStream Demo...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

:: Install minimal dependencies for demo
echo 📦 Installing demo dependencies...
call npm install express cors --no-save

:: Setup environment
if not exist .env (
    copy .env.example .env
)

:: Start demo server
echo 🚀 Starting demo server...
echo.
echo 🔗 Demo API will be available at: http://localhost:3000
echo 📊 Health check: http://localhost:3000/api/health
echo.
echo Press Ctrl+C to stop the server
echo.

node demo/simple-server.js
pause