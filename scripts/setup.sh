#!/bin/bash

# TruthStream Setup Script
echo "🌊 Setting up TruthStream..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install React Native CLI if not present
if ! command -v react-native &> /dev/null; then
    echo "📱 Installing React Native CLI..."
    npm install -g react-native-cli
fi

# Setup environment variables
if [ ! -f .env ]; then
    echo "⚙️ Setting up environment variables..."
    cp .env.example .env
    echo "📝 Please update .env file with your actual values"
fi

# Setup backend
echo "🔧 Setting up backend..."
cd backend
npm install
cd ..

# Install iOS dependencies (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Installing iOS dependencies..."
    cd ios
    if command -v pod &> /dev/null; then
        pod install
    else
        echo "⚠️ CocoaPods not found. Please install CocoaPods to build for iOS"
    fi
    cd ..
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p temp

# Set permissions
chmod +x scripts/*.sh

echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Start MongoDB: mongod"
echo "3. Start backend: npm run server"
echo "4. Start React Native: npm start"
echo "5. Run on device: npm run ios or npm run android"
echo ""
echo "📚 Documentation:"
echo "- API: docs/API.md"
echo "- Deployment: docs/DEPLOYMENT.md"
echo ""
echo "Happy coding! 🎉"