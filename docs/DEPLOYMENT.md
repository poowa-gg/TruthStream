# TruthStream Deployment Guide

## Prerequisites

- Node.js 18+
- React Native CLI
- XION Dave SDK
- MongoDB
- IPFS node (optional)

## Environment Setup

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Update the `.env` file with your actual values:
   - XION network configuration
   - MongoDB connection string
   - API keys for third-party services

## Backend Deployment

### Local Development
```bash
cd backend
npm install
npm run dev
```

### Production Deployment
```bash
cd backend
npm install --production
npm start
```

### Docker Deployment
```bash
docker build -t truthstream-backend .
docker run -p 3000:3000 --env-file .env truthstream-backend
```

## Smart Contract Deployment

### XION Testnet
```bash
# Install dependencies
npm install -g @xion/cli

# Deploy contracts
xion deploy contracts/TruthStreamNFT.sol --network testnet
xion deploy contracts/TruthStreamToken.sol --network testnet
```

### Contract Verification
```bash
xion verify <contract-address> --network testnet
```

## Mobile App Deployment

### iOS

1. Open `ios/TruthStream.xcworkspace` in Xcode
2. Configure signing certificates
3. Update bundle identifier
4. Build and archive for App Store

### Android

1. Generate signed APK:
```bash
cd android
./gradlew assembleRelease
```

2. Upload to Google Play Console

## XION Testnet Configuration

### Network Details
- Chain ID: `xion-testnet-1`
- RPC URL: `https://rpc.xion-testnet-1.burnt.com`
- Explorer: `https://explorer.xion-testnet-1.burnt.com`

### Faucet
Get test tokens from: `https://faucet.xion-testnet-1.burnt.com`

## Monitoring and Analytics

### Health Checks
- Backend: `GET /api/health`
- Database: MongoDB connection status
- Blockchain: XION node connectivity

### Logging
- Application logs: Winston
- Error tracking: Sentry (optional)
- Performance monitoring: New Relic (optional)

## Security Considerations

1. **API Security**
   - Rate limiting enabled
   - CORS configured
   - Input validation
   - JWT token authentication

2. **Smart Contract Security**
   - Access control modifiers
   - Reentrancy protection
   - Integer overflow protection

3. **Mobile App Security**
   - Certificate pinning
   - Secure storage for keys
   - Biometric authentication

## Scaling Considerations

### Database
- MongoDB replica set for high availability
- Indexing for query optimization
- Connection pooling

### API
- Load balancer (nginx)
- Horizontal scaling with PM2
- Caching with Redis

### Blockchain
- Multiple RPC endpoints
- Transaction retry logic
- Gas optimization

## Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Check XION network configuration
   - Verify contract addresses
   - Ensure sufficient gas

2. **Verification Timeout**
   - Check zkTLS service status
   - Verify API endpoints
   - Review network connectivity

3. **Database Connection Error**
   - Verify MongoDB URI
   - Check network access
   - Review authentication credentials

### Debug Mode
Enable debug logging by setting `DEBUG=true` in environment variables.

## Support

For deployment issues:
- Check logs: `docker logs <container-id>`
- Review configuration: Verify all environment variables
- Test connectivity: Use health check endpoints

## Updates and Maintenance

### Backend Updates
```bash
git pull origin main
npm install
npm run build
pm2 restart all
```

### Smart Contract Updates
```bash
# Deploy new version
xion deploy contracts/TruthStreamNFT.sol --network testnet

# Update frontend configuration
# Update mobile app configuration
```

### Mobile App Updates
- iOS: Submit new version to App Store
- Android: Upload new APK to Play Console