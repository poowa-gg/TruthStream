import axios from 'axios';

export class TruthStreamAPI {
  constructor() {
    this.baseURL = 'https://api.truthstream.app';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Mock data for development
    this.mockData = {
      userStats: {
        totalExperiences: 12,
        trustScore: 85,
        tokensEarned: 1250,
        rank: 156,
      },
      recentActivity: [
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
      ],
      experiences: [
        {
          id: '1',
          type: 'dining',
          title: 'Dinner at The French Laundry',
          description: 'Amazing tasting menu experience with perfect wine pairings',
          date: '2 days ago',
          location: 'Yountville, CA',
          trustScore: 95,
          tokensEarned: 150,
          verified: true,
          confidence: 0.95,
          image: 'https://example.com/french-laundry.jpg',
        },
        {
          id: '2',
          type: 'event',
          title: 'Taylor Swift Concert',
          description: 'Incredible show at SoFi Stadium, best seats in the house',
          date: '1 week ago',
          location: 'Los Angeles, CA',
          trustScore: 92,
          tokensEarned: 200,
          verified: true,
          confidence: 0.92,
          image: 'https://example.com/taylor-swift.jpg',
        },
      ],
      challenges: [
        {
          title: 'Coffee Shop Explorer',
          brandName: 'Starbucks',
          brandLogo: 'https://example.com/starbucks-logo.png',
          description: 'Visit 5 different Starbucks locations and share your experience',
          reward: 500,
          participants: 1234,
          timeLeft: '5 days left',
          difficulty: 'Easy',
        },
        {
          title: 'Fitness Challenge',
          brandName: 'Nike',
          brandLogo: 'https://example.com/nike-logo.png',
          description: 'Complete 10 workouts and verify with fitness tracker data',
          reward: 1000,
          participants: 567,
          timeLeft: '12 days left',
          difficulty: 'Medium',
        },
      ],
      opportunities: [
        {
          title: 'Restaurant Review Campaign',
          brandName: 'OpenTable',
          brandLogo: 'https://example.com/opentable-logo.png',
          description: 'Write authentic reviews for fine dining restaurants',
          payment: 100,
          requirements: [
            'Verified dining experiences',
            'Trust score above 80',
            'Active social media presence',
          ],
        },
        {
          title: 'Travel Content Creator',
          brandName: 'Airbnb',
          brandLogo: 'https://example.com/airbnb-logo.png',
          description: 'Create content about unique travel experiences',
          payment: 250,
          requirements: [
            'Verified travel experiences',
            'Photography skills',
            'Social media following',
          ],
        },
      ],
      profile: {
        name: 'Alex Johnson',
        trustScore: 85,
        totalExperiences: 12,
        tokensEarned: 1250,
        rank: 156,
        joinDate: 'January 2025',
        avatar: null,
      },
      achievements: [
        {
          title: 'First Steps',
          description: 'Created first experience',
          icon: 'star',
          color: '#f59e0b',
        },
        {
          title: 'Foodie',
          description: '10 dining experiences',
          icon: 'restaurant',
          color: '#10b981',
        },
        {
          title: 'Trusted',
          description: 'Trust score above 80',
          icon: 'verified',
          color: '#6366f1',
        },
      ],
    };
  }

  async getUserStats() {
    try {
      // In production, this would make a real API call
      // const response = await this.client.get('/user/stats');
      // return response.data;
      
      return this.mockData.userStats;
    } catch (error) {
      console.error('API Error - getUserStats:', error);
      return this.mockData.userStats;
    }
  }

  async getRecentActivity() {
    try {
      return this.mockData.recentActivity;
    } catch (error) {
      console.error('API Error - getRecentActivity:', error);
      return [];
    }
  }

  async getUserExperiences(filter = 'all') {
    try {
      let experiences = this.mockData.experiences;
      
      if (filter !== 'all') {
        experiences = experiences.filter(exp => exp.type === filter);
      }
      
      return experiences;
    } catch (error) {
      console.error('API Error - getUserExperiences:', error);
      return [];
    }
  }

  async createExperience(experienceData) {
    try {
      // In production, this would create the experience on the backend
      const newExperience = {
        id: Date.now().toString(),
        ...experienceData,
        verified: false,
        trustScore: 0,
        tokensEarned: 0,
        date: 'Just now',
      };

      return newExperience;
    } catch (error) {
      console.error('API Error - createExperience:', error);
      throw error;
    }
  }

  async getActiveChallenges() {
    try {
      return this.mockData.challenges;
    } catch (error) {
      console.error('API Error - getActiveChallenges:', error);
      return [];
    }
  }

  async getBrandOpportunities() {
    try {
      return this.mockData.opportunities;
    } catch (error) {
      console.error('API Error - getBrandOpportunities:', error);
      return [];
    }
  }

  async getUserProfile() {
    try {
      return this.mockData.profile;
    } catch (error) {
      console.error('API Error - getUserProfile:', error);
      return this.mockData.profile;
    }
  }

  async getUserAchievements() {
    try {
      return this.mockData.achievements;
    } catch (error) {
      console.error('API Error - getUserAchievements:', error);
      return [];
    }
  }

  async getUserDetailedStats() {
    try {
      return [
        {category: 'Dining', count: 5, percentage: 42},
        {category: 'Events', count: 3, percentage: 25},
        {category: 'Shopping', count: 2, percentage: 17},
        {category: 'Travel', count: 2, percentage: 16},
      ];
    } catch (error) {
      console.error('API Error - getUserDetailedStats:', error);
      return [];
    }
  }

  async joinChallenge(challengeId) {
    try {
      // In production, this would join the challenge
      return {success: true, message: 'Successfully joined challenge'};
    } catch (error) {
      console.error('API Error - joinChallenge:', error);
      throw error;
    }
  }

  async applyToOpportunity(opportunityId) {
    try {
      // In production, this would apply to the opportunity
      return {success: true, message: 'Application submitted successfully'};
    } catch (error) {
      console.error('API Error - applyToOpportunity:', error);
      throw error;
    }
  }

  async updateProfile(profileData) {
    try {
      // In production, this would update the user profile
      return {success: true, profile: {...this.mockData.profile, ...profileData}};
    } catch (error) {
      console.error('API Error - updateProfile:', error);
      throw error;
    }
  }
}