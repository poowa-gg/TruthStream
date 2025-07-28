# 🔗 GitHub Repository Setup Guide

Follow these steps to create a public GitHub repository for your TruthStream hackathon submission:

## 📋 **Step-by-Step Instructions**

### **Step 1: Prepare Your Local Repository**

1. **Initialize Git** (if not already done):
   ```bash
   scripts\git-setup.bat
   ```

   Or manually:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TruthStream - XION Proof of Concept Hackathon Submission"
   ```

### **Step 2: Create GitHub Repository**

1. **Go to GitHub**: https://github.com
2. **Sign in** to your GitHub account (create one if needed)
3. **Click the "+" icon** in the top right corner
4. **Select "New repository"**

### **Step 3: Repository Settings**

Fill in the repository details:

- **Repository name**: `truthstream`
- **Description**: `🌊 TruthStream - Verifiable Experience Marketplace for XION Proof of Concept Hackathon`
- **Visibility**: ✅ **Public** (required for hackathon)
- **Initialize repository**: ❌ **Don't check any boxes** (we already have files)

Click **"Create repository"**

### **Step 4: Connect Local to GitHub**

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/truthstream.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### **Step 5: Verify Upload**

1. **Refresh your GitHub repository page**
2. **Check that all files are uploaded**:
   - ✅ README.md with project description
   - ✅ All source code files
   - ✅ Documentation in `docs/` folder
   - ✅ Demo files in `demo/` folder
   - ✅ Smart contracts in `contracts/` folder

## 🎯 **For Hackathon Submission**

Your repository URL will be:
```
https://github.com/YOUR_USERNAME/truthstream
```

### **Required Files Checklist**

Make sure these are visible in your repository:

- [x] **README.md** - Project overview and setup instructions
- [x] **LICENSE** - MIT License
- [x] **package.json** - Dependencies and scripts
- [x] **src/** - React Native app source code
- [x] **backend/** - API server code
- [x] **contracts/** - Smart contracts
- [x] **demo/** - Working demo server
- [x] **docs/** - API and deployment documentation
- [x] **HACKATHON_SUBMISSION.md** - Detailed submission info

## 🚀 **Make Your Repository Stand Out**

### **Add Repository Topics**
1. Go to your repository on GitHub
2. Click the ⚙️ gear icon next to "About"
3. Add these topics:
   - `xion-hackathon`
   - `blockchain`
   - `react-native`
   - `zktls`
   - `nft`
   - `verification`
   - `marketplace`

### **Update Repository Description**
Set the description to:
```
🌊 TruthStream - Verifiable Experience Marketplace using XION blockchain, zkTLS verification, and React Native. XION Proof of Concept Hackathon submission.
```

### **Add Website URL**
If you deploy a demo, add the URL to your repository settings.

## 🔧 **Troubleshooting**

### **Common Issues**

1. **"Git not found"**
   - Install Git from: https://git-scm.com/download/win
   - Restart your command prompt

2. **"Permission denied"**
   - Make sure you're signed in to GitHub
   - Check your repository name is correct

3. **"Repository already exists"**
   - Choose a different name like `truthstream-xion` or `truthstream-hackathon`

4. **Large files rejected**
   - Check `.gitignore` is working
   - Remove `node_modules/` if accidentally added

### **Verify Everything Works**

After uploading, test that others can use your repository:

1. **Clone in a new folder**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/truthstream.git
   cd truthstream
   ```

2. **Test the demo**:
   ```bash
   scripts\demo.bat
   ```

3. **Visit**: http://localhost:3000/demo

## ✅ **Final Checklist**

Before submitting to the hackathon:

- [ ] Repository is **public**
- [ ] All code is uploaded and visible
- [ ] README.md explains the project clearly
- [ ] Demo works when following setup instructions
- [ ] Repository URL is accessible
- [ ] All required files are present
- [ ] License is included (MIT)

## 🎉 **You're Ready!**

Your repository URL for the hackathon submission:
```
https://github.com/YOUR_USERNAME/truthstream
```

**Congratulations! Your TruthStream project is now ready for the XION Proof of Concept hackathon! 🏆**