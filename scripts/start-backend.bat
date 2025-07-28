@echo off
echo 🔧 Starting TruthStream Backend...

:: Check if .env exists
if not exist .env (
    echo ❌ .env file not found. Creating from example...
    copy .env.example .env
)

:: Start backend
echo 🚀 Starting backend server on port 3000...
cd backend
node server.js
pause