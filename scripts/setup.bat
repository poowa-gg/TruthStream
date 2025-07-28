@echo off
echo 🌊 Setting up TruthStream...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

:: Install dependencies
echo 📦 Installing dependencies...
call npm install --legacy-peer-deps

:: Install React Native CLI if not present
where react-native >nul 2>&1
if %errorlevel% neq 0 (
    echo 📱 Installing React Native CLI...
    call npm install -g react-native-cli
)

:: Setup environment variables
if not exist .env (
    echo ⚙️ Setting up environment variables...
    copy .env.example .env
    echo 📝 Please update .env file with your actual values
)

:: Setup backend
echo 🔧 Setting up backend...
cd backend
call npm install --legacy-peer-deps
cd ..

:: Create necessary directories
echo 📁 Creating directories...
if not exist logs mkdir logs
if not exist uploads mkdir uploads
if not exist temp mkdir temp

echo ✅ Setup complete!
echo.
echo 🚀 Next steps:
echo 1. Update .env file with your configuration
echo 2. Start MongoDB: mongod
echo 3. Start backend: npm run server
echo 4. Start React Native: npm start
echo 5. Run on device: npm run ios or npm run android
echo.
echo 📚 Documentation:
echo - API: docs/API.md
echo - Deployment: docs/DEPLOYMENT.md
echo.
echo Happy coding! 🎉
pause