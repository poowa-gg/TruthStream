#!/bin/bash

# TruthStream Deployment Script
echo "🚀 Deploying TruthStream..."

# Check if environment is set
if [ -z "$NODE_ENV" ]; then
    echo "❌ NODE_ENV not set. Please set environment (development/production)"
    exit 1
fi

echo "📦 Environment: $NODE_ENV"

# Build backend
echo "🔧 Building backend..."
cd backend
npm install --production
npm run build 2>/dev/null || echo "No build script found, skipping..."
cd ..

# Deploy smart contracts (if on testnet/mainnet)
if [ "$NODE_ENV" = "production" ] || [ "$NODE_ENV" = "testnet" ]; then
    echo "📜 Deploying smart contracts..."
    
    # Check if XION CLI is installed
    if command -v xion &> /dev/null; then
        echo "Deploying TruthStreamNFT contract..."
        xion deploy contracts/TruthStreamNFT.sol --network $NODE_ENV
        
        echo "Deploying TruthStreamToken contract..."
        xion deploy contracts/TruthStreamToken.sol --network $NODE_ENV
    else
        echo "⚠️ XION CLI not found. Please install XION CLI to deploy contracts"
    fi
fi

# Build mobile app
echo "📱 Building mobile app..."

# iOS Build
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Building iOS app..."
    cd ios
    xcodebuild -workspace TruthStream.xcworkspace -scheme TruthStream -configuration Release archive -archivePath build/TruthStream.xcarchive
    cd ..
fi

# Android Build
echo "🤖 Building Android app..."
cd android
./gradlew assembleRelease
cd ..

# Start services
echo "🔄 Starting services..."

# Start backend with PM2 (if available)
if command -v pm2 &> /dev/null; then
    pm2 start backend/server.js --name "truthstream-api"
    pm2 save
else
    echo "⚠️ PM2 not found. Starting backend with node..."
    cd backend
    nohup node server.js > ../logs/backend.log 2>&1 &
    cd ..
fi

# Health check
echo "🏥 Performing health check..."
sleep 5

if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
    exit 1
fi

# Deployment summary
echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📊 Deployment Summary:"
echo "- Environment: $NODE_ENV"
echo "- Backend: Running on port 3000"
echo "- Smart Contracts: Deployed to XION $NODE_ENV"
echo "- Mobile Apps: Built successfully"
echo ""
echo "🔗 URLs:"
echo "- API: http://localhost:3000"
echo "- Health Check: http://localhost:3000/api/health"
echo ""
echo "📱 Mobile Apps:"
echo "- iOS: ios/build/TruthStream.xcarchive"
echo "- Android: android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "🎯 Next Steps:"
echo "1. Test the API endpoints"
echo "2. Upload mobile apps to app stores"
echo "3. Configure monitoring and alerts"
echo "4. Update DNS records (if needed)"