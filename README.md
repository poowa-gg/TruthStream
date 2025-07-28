# 🌊 TruthStream - Verifiable Experience Marketplace

[![XION Hackathon](https://img.shields.io/badge/XION-Proof%20of%20Concept-blue)](https://xion.burnt.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev)

> **XION Proof of Concept Hackathon Submission**  
> A decentralized content authenticity marketplace that verifies and monetizes real-world experiences through multi-source data validation.


## 🎯 **Hackathon Demo**

🚀 **Quick Start Demo:**
```bash
# Clone the repository
git clone https://github.com/your-username/truthstream.git
cd truthstream

# Start the demo
scripts\demo.bat

# Visit the demo interface
# http://localhost:3000/demo
```

## 🏆 **What Makes TruthStream Special**

### **The Problem**
- **$1.3B** lost annually to influencer fraud
- **45%** of online reviews are fake
- Content creators can't prove authenticity
- Brands waste money on fake engagement

### **Our Solution**
TruthStream creates verifiable "Experience NFTs" using:
- 🔐 **zkTLS verification** from multiple data sources
- 📍 **Location + Payment + Social** proof
- 🏗️ **XION blockchain** for immutable records
- 💰 **Trust-based marketplace** for monetization

## 🛠️ **XION Integration**

✅ **Mobile Development Kit (Dave)**: Native iOS/Android app  
✅ **zkTLS**: Multi-source data verification without exposing private data  
✅ **On-chain Truth**: Smart contracts store verification hashes and trust scores  
✅ **XION Testnet**: Fully deployed and functional  

## 🚀 **Quick Start**

### **Option 1: Demo Mode (Recommended)**
```bash
scripts\demo.bat
```
Then visit: http://localhost:3000/demo

### **Option 2: Full Development Setup**
```bash
scripts\setup.bat
scripts\start-dev.bat
npm run android
```

### **Prerequisites**
- Node.js 18+
- Git
- Android Studio (for mobile app)

## 📱 **Features**

### **Core Functionality**
- [x] Multi-source experience verification
- [x] Experience NFT minting on XION
- [x] Trust score calculation and tracking
- [x] Token rewards for verified experiences
- [x] Brand-sponsored challenges
- [x] Verification-gated opportunities

### **Mobile App**
- [x] XION wallet integration
- [x] Camera and location services
- [x] Real-time verification progress
- [x] Social sharing capabilities
- [x] Intuitive user interface

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Backend API   │    │  XION Blockchain│
│  (React Native) │◄──►│   (Node.js)     │◄──►│ (Smart Contracts)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   zkTLS Service │    │    MongoDB      │    │      IPFS       │
│  (Verification) │    │   (User Data)   │    │   (Metadata)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📊 **Market Opportunity**

- **$6.8B** influencer marketing market
- **$45B** online review industry
- Growing demand for authenticity verification
- Clear path to enterprise adoption

## 🎮 **Developer Tracks**

### ✅ **Virality & Ce challenges
- Leaderboards and social sharing
- Achievement system with badges

### ✅ **Marketplaces**
- Trust-based experience trading
- Brand partnership opportunities
- Token-based reward economy

### ✅ **Verification Gating**
- Access control based on verified experiences
- Trust score requirements
- Premium content for verified users

## 📁 **Project Structure**

```
truthstream/
├── src/                    # React Native app source
│   ├── screens/           # App screens
│   └── services/          # API and blockchain services
├── backend/               # Node.js API server
├── contracts/             # Smart contracts
├── demo/                  # Demo server and interface
├── docs/                  # Documentation
└── scripts/               # Setup and deployment scripts
```

## 🔧 **Tech Stack**

- **Frontend**: React Native + XION Dave SDK
- **Backend**: Node.js + Express + MongoDB
- **Blockchain**: XION Testnet + Custom Smart Contracts
- **Verification**: zkTLS for multi-source validation
- **Storage**: IPFS for metadata

## 📖 **Documentation**

- [📋 API Documentation](docs/API.md)
- [🚀 Deployment Guide](docs/DEPLOYMENT.md)
- [🪟 Windows Setup](WINDOWS_SETUP.md)
- [🏆 Hackathon Submission](HACKATHON_SUBMISSION.md)

## 🎯 **Demo & Testing**

### **Live Demo**
- **Demo Interface**: http://localhost:3000/demo (after running `scripts\demo.bat`)
- **API Endpoints**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

### **Test the API**
```bash
scripts\test-api.bat
```

## 🏆 **Hackathon Submission**

This project demonstrates:
- ✅ **Innovation**: First multi-modal verification with monetization
- ✅ **XION Integration**: Full use of Dave, zkTLS, and on-chain storage
- ✅ **Market Fit**: Solves real $1.3B fraud problem
- ✅ **Scalability**: Clear path to enterprise adoption
- ✅ **Technical Excellence**: Production-ready codebase

## 🤝 **Contributing**

This is a hackathon submission, but we welcome feedback and suggestions!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **XION Team** for the amazing blockchain infrastructure
- **Hackathon Organizers** for this incredible opportunity
- **Open Source Community** for the tools and libraries

---

**Built with ❤️ for the XION Proof of Concept Hackathon**

🌊 **TruthStream - Where Authenticity Meets Opportunity**ompetitions**
- Gamified e