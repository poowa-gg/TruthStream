const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/truthstream', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  address: {type: String, required: true, unique: true},
  name: {type: String, default: 'Anonymous User'},
  email: String,
  avatar: String,
  trustScore: {type: Number, default: 0},
  totalExperiences: {type: Number, default: 0},
  tokensEarned: {type: Number, default: 0},
  rank: {type: Number, default: 0},
  joinDate: {type: Date, default: Date.now},
  achievements: [{
    title: String,
    description: String,
    icon: String,
    color: String,
    earnedAt: {type: Date, default: Date.now},
  }],
});

// Experience Schema
const experienceSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  type: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  location: String,
  photos: [String],
  verified: {type: Boolean, default: false},
  confidence: {type: Number, default: 0},
  trustScore: {type: Number, default: 0},
  tokensEarned: {type: Number, default: 0},
  proofs: {
    location: Object,
    payment: Object,
    social: Object,
  },
  nftTokenId: String,
  createdAt: {type: Date, default: Date.now},
});

// Challenge Schema
const challengeSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  brandName: {type: String, required: true},
  brandLogo: String,
  reward: {type: Number, required: true},
  difficulty: {type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy'},
  participants: {type: Number, default: 0},
  maxParticipants: Number,
  startDate: {type: Date, default: Date.now},
  endDate: {type: Date, required: true},
  requirements: [String],
  active: {type: Boolean, default: true},
});

// Opportunity Schema
const opportunitySchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  brandName: {type: String, required: true},
  brandLogo: String,
  payment: {type: Number, required: true},
  requirements: [String],
  maxApplicants: Number,
  applicants: {type: Number, default: 0},
  active: {type: Boolean, default: true},
  createdAt: {type: Date, default: Date.now},
});

const User = mongoose.model('User', userSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Opportunity = mongoose.model('Opportunity', opportunitySchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'truthstream-secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// User authentication
app.post('/api/auth/connect', async (req, res) => {
  try {
    const {address, signature} = req.body;
    
    // Verify signature (simplified for demo)
    if (!address || !signature) {
      return res.status(400).json({error: 'Address and signature required'});
    }

    let user = await User.findOne({address});
    if (!user) {
      user = new User({address});
      await user.save();
    }

    const token = jwt.sign(
      {userId: user._id, address: user.address},
      process.env.JWT_SECRET || 'truthstream-secret',
      {expiresIn: '24h'}
    );

    res.json({token, user});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get user stats
app.get('/api/user/stats', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const experiences = await Experience.find({userId: req.user.userId});

    const stats = {
      totalExperiences: experiences.length,
      trustScore: user.trustScore,
      tokensEarned: user.tokensEarned,
      rank: user.rank,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get user experiences
app.get('/api/user/experiences', authenticateToken, async (req, res) => {
  try {
    const {filter} = req.query;
    let query = {userId: req.user.userId};
    
    if (filter && filter !== 'all') {
      query.type = filter;
    }

    const experiences = await Experience.find(query).sort({createdAt: -1});
    res.json(experiences);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Create experience
app.post('/api/experiences', authenticateToken, async (req, res) => {
  try {
    const experienceData = {
      ...req.body,
      userId: req.user.userId,
    };

    const experience = new Experience(experienceData);
    await experience.save();

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Update experience with verification results
app.put('/api/experiences/:id/verify', authenticateToken, async (req, res) => {
  try {
    const {proofs, verified, confidence, tokensEarned} = req.body;
    
    const experience = await Experience.findOneAndUpdate(
      {_id: req.params.id, userId: req.user.userId},
      {
        proofs,
        verified,
        confidence,
        tokensEarned,
        trustScore: Math.round(confidence * 100),
      },
      {new: true}
    );

    if (!experience) {
      return res.status(404).json({error: 'Experience not found'});
    }

    // Update user stats
    if (verified) {
      await User.findByIdAndUpdate(req.user.userId, {
        $inc: {
          totalExperiences: 1,
          tokensEarned: tokensEarned,
        },
      });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get active challenges
app.get('/api/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.find({
      active: true,
      endDate: {$gt: new Date()},
    }).sort({createdAt: -1});

    res.json(challenges);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get brand opportunities
app.get('/api/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find({active: true}).sort({createdAt: -1});
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Update user profile
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      req.body,
      {new: true}
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get recent activity
app.get('/api/user/activity', authenticateToken, async (req, res) => {
  try {
    const experiences = await Experience.find({userId: req.user.userId})
      .sort({createdAt: -1})
      .limit(10);

    const activity = experiences.map(exp => ({
      title: `${exp.type} verification completed`,
      time: getTimeAgo(exp.createdAt),
      reward: exp.tokensEarned,
      icon: getExperienceIcon(exp.type),
    }));

    res.json(activity);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Helper functions
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return 'Just now';
}

function getExperienceIcon(type) {
  const icons = {
    dining: 'restaurant',
    event: 'confirmation-number',
    purchase: 'shopping-bag',
    travel: 'flight',
    fitness: 'fitness-center',
    entertainment: 'movie',
  };
  return icons[type] || 'verified';
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({error: 'Internal server error'});
});

// Start server
app.listen(PORT, () => {
  console.log(`TruthStream API server running on port ${PORT}`);
});

module.exports = app;