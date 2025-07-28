@echo off
echo 🌊 Quick Setup for TruthStream Demo...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

:: Install core dependencies only
echo 📦 Installing core dependencies...
call npm install react react-native axios crypto-js --legacy-peer-deps

:: Setup environment variables
if not exist .env (
    echo ⚙️ Setting up environment variables...
    copy .env.example .env
    echo 📝 Please update .env file with your configuration
)

:: Setup backend with minimal dependencies
echo 🔧 Setting up backend...
cd backend
call npm install express cors dotenv --legacy-peer-deps
cd ..

:: Create necessary directories
echo 📁 Creating directories...
if not exist logs mkdir logs
if not exist uploads mkdir uploads
if not exist temp mkdir temp

echo ✅ Quick setup complete!
echo.
echo 🚀 To start development:
echo 1. Update .env file with your values
echo 2. Run: node backend/server.js
echo 3. In another terminal: npm start
echo.
echo 📝 Note: This is a minimal setup for demo purposes.
echo For full functionality, run the complete setup later.
echo.
pause