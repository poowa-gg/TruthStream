const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('demo'));

// Mock data for demo
const mockData = {
  userStats: {
    totalExperiences: 12,
    trustScore: 85,
    tokensEarned: 1250,
    rank: 156,
  },
  experiences: [
    {
      id: '1',
      type: 'dining',
      title: 'Dinner at The French Laundry',
      description: 'Amazing tasting menu experience',
      date: '2 days ago',
      trustScore: 95,
      tokensEarned: 150,
      verified: true,
    },
    {
      id: '2',
      type: 'event',
      title: 'Taylor Swift Concert',
      description: 'Incredible show at SoFi Stadium',
      date: '1 week ago',
      trustScore: 92,
      tokensEarned: 200,
      verified: true,
    },
  ],
  challenges: [
    {
      title: 'Coffee Shop Explorer',
      brandName: 'Starbucks',
      description: 'Visit 5 different Starbucks locations',
      reward: 500,
      participants: 1234,
      timeLeft: '5 days left',
      difficulty: 'Easy',
    },
  ],
};

// Routes
app.get('/demo', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api', (req, res) => {
  res.json({
    message: '🌊 Welcome to TruthStream API Demo!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/connect',
      userStats: '/api/user/stats',
      experiences: '/api/user/experiences',
      challenges: '/api/challenges',
      createExperience: 'POST /api/experiences'
    },
    demo: 'This is a working demo for the XION Proof of Concept hackathon',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'TruthStream API is running!',
    timestamp: new Date().toISOString() 
  });
});

app.post('/api/auth/connect', (req, res) => {
  res.json({
    token: 'demo-jwt-token',
    user: {
      id: 'demo-user',
      address: 'xion1demo123',
      name: 'Demo User',
      trustScore: 85,
    },
  });
});

app.get('/api/user/stats', (req, res) => {
  res.json(mockData.userStats);
});

app.get('/api/user/experiences', (req, res) => {
  const { filter } = req.query;
  let experiences = mockData.experiences;
  
  if (filter && filter !== 'all') {
    experiences = experiences.filter(exp => exp.type === filter);
  }
  
  res.json(experiences);
});

app.get('/api/user/activity', (req, res) => {
  res.json([
    {
      title: 'Restaurant verification completed',
      time: '2 hours ago',
      reward: 50,
      icon: 'restaurant',
    },
    {
      title: 'Concert attendance verified',
      time: '1 day ago',
      reward: 100,
      icon: 'confirmation-number',
    },
    {
      title: 'Trust score increased',
      time: '2 days ago',
      reward: 25,
      icon: 'star',
    },
  ]);
});

app.get('/api/opportunities', (req, res) => {
  res.json([
    {
      title: 'Restaurant Review Campaign',
      brandName: 'OpenTable',
      description: 'Write authentic reviews for fine dining restaurants',
      payment: 100,
      requirements: [
        'Verified dining experiences',
        'Trust score above 80',
        'Active social media presence',
      ],
    },
  ]);
});

app.get('/api/user/profile', (req, res) => {
  res.json({
    name: 'Demo User',
    trustScore: 85,
    totalExperiences: 12,
    tokensEarned: 1250,
    rank: 156,
    joinDate: 'January 2025',
    avatar: null,
  });
});

app.get('/api/challenges', (req, res) => {
  res.json(mockData.challenges);
});

app.post('/api/experiences', (req, res) => {
  const newExperience = {
    id: Date.now().toString(),
    ...req.body,
    verified: false,
    trustScore: 0,
    tokensEarned: 0,
    date: 'Just now',
  };
  res.status(201).json(newExperience);
});

// Start server
app.listen(PORT, () => {
  console.log(`🌊 TruthStream Demo API running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🎯 Demo Interface: http://localhost:${PORT}/demo`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ Ready for hackathon demo!`);
});

module.exports = app;