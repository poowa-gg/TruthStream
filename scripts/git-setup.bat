@echo off
echo 🔗 Setting up Git repository for TruthStream...

:: Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    echo 📥 Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git detected: 
git --version

:: Initialize git repository
echo 📁 Initializing Git repository...
git init

:: Add all files
echo 📦 Adding files to repository...
git add .

:: Create initial commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: TruthStream - XION Proof of Concept Hackathon Submission"

echo ✅ Git repository initialized!
echo.
echo 🚀 Next steps:
echo 1. Create a new repository on GitHub
echo 2. Copy the repository URL
echo 3. Run: git remote add origin [YOUR_REPO_URL]
echo 4. Run: git branch -M main
echo 5. Run: git push -u origin main
echo.
echo 📝 Example:
echo git remote add origin https://github.com/yourusername/truthstream.git
echo git branch -M main
echo git push -u origin main
echo.
pause