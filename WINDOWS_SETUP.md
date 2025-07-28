# TruthStream - Windows Setup Guide

## Quick Start for Windows

Since you're on Windows, use the batch files instead of shell scripts:

### 1. Initial Setup
```cmd
scripts\setup.bat
```

This will:
- Check Node.js installation
- Install all dependencies
- Set up environment variables
- Create necessary directories

### 2. Start Development Environment
```cmd
scripts\start-dev.bat
```

This will start:
- MongoDB (if installed locally)
- Backend API server
- React Native Metro bundler

### 3. Run the Mobile App

In a new command prompt:
```cmd
# For Android
npm run android

# For iOS (if you have Xcode on macOS)
npm run ios
```

## Alternative Manual Setup

If you prefer to run commands manually:

### Backend Setup
```cmd
cd backend
npm install
npm run dev
```

### Frontend Setup
```cmd
npm install
npm start
```

### Run Mobile App
```cmd
# In another terminal
npx react-native run-android
```

## Prerequisites for Windows

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
2. **Android Studio** - For Android development
3. **MongoDB** - Download from [mongodb.com](https://mongodb.com) or use MongoDB Atlas
4. **Git** - For version control

### Android Development Setup

1. Install Android Studio
2. Set up Android SDK
3. Create Android Virtual Device (AVD)
4. Set environment variables:
   ```cmd
   set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
   ```

## Environment Configuration

1. Copy `.env.example` to `.env`:
   ```cmd
   copy .env.example .env
   ```

2. Update `.env` with your values:
   ```
   API_BASE_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/truthstream
   JWT_SECRET=your-secret-key
   ```

## Troubleshooting

### Common Windows Issues

1. **PowerShell Execution Policy**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Metro Bundler Issues**
   ```cmd
   npx react-native start --reset-cache
   ```

3. **Android Build Issues**
   ```cmd
   cd android
   gradlew clean
   gradlew assembleDebug
   ```

4. **Port Already in Use**
   ```cmd
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

## Development Workflow

1. Start development environment: `scripts\start-dev.bat`
2. Make code changes
3. Hot reload will update the app automatically
4. Test on Android emulator or device
5. Check backend logs in the backend terminal window

## Building for Production

```cmd
# Set environment
set NODE_ENV=production

# Run deployment script
scripts\deploy.bat
```

## VS Code Setup (Recommended)

Install these extensions:
- React Native Tools
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

## Next Steps

1. Run `scripts\setup.bat` to get started
2. Update your `.env` file with actual values
3. Start development with `scripts\start-dev.bat`
4. Begin building your winning hackathon app! 🚀

Happy coding on Windows! 🎉