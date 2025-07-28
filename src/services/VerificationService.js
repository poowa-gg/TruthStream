import Geolocation from 'react-native-geolocation-service';
import {ZkTLSService} from './ZkTLSService';

export class ExperienceVerifier {
  constructor() {
    this.zkTLS = new ZkTLSService();
  }

  async verifyLocation(experienceData) {
    try {
      // Get current location
      const position = await this.getCurrentLocation();
      
      if (!position) {
        throw new Error('Unable to get location');
      }

      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date().toISOString(),
      };

      // Verify location using zkTLS
      const locationProof = await this.zkTLS.verifyLocation(locationData);
      
      return locationProof;
    } catch (error) {
      console.error('Location verification error:', error);
      return null;
    }
  }

  async verifyPayment(experienceData) {
    try {
      // In a real implementation, this would connect to payment processors
      // via zkTLS to verify recent transactions
      
      const paymentData = {
        merchant: experienceData.location,
        timestamp: experienceData.timestamp,
        amount: experienceData.estimatedAmount || 0,
        type: experienceData.type,
      };

      const paymentProof = await this.zkTLS.verifyPayment(paymentData);
      return paymentProof;
    } catch (error) {
      console.error('Payment verification error:', error);
      return null;
    }
  }

  async verifySocialActivity(experienceData) {
    try {
      // In a real implementation, this would verify social media posts
      // related to the experience using zkTLS
      
      const socialData = {
        platform: 'instagram',
        content: experienceData.description,
        timestamp: experienceData.timestamp,
        location: experienceData.location,
        photos: experienceData.photos?.length || 0,
      };

      const socialProof = await this.zkTLS.verifySocialActivity(socialData);
      return socialProof;
    } catch (error) {
      console.error('Social verification error:', error);
      return null;
    }
  }

  async verifyExperience(experienceData) {
    try {
      const verificationResults = {
        location: null,
        payment: null,
        social: null,
        overall: false,
      };

      // Run all verifications in parallel
      const [locationProof, paymentProof, socialProof] = await Promise.all([
        this.verifyLocation(experienceData),
        this.verifyPayment(experienceData),
        this.verifySocialActivity(experienceData),
      ]);

      verificationResults.location = locationProof;
      verificationResults.payment = paymentProof;
      verificationResults.social = socialProof;

      // Calculate overall verification score
      const scores = [locationProof, paymentProof, socialProof].filter(Boolean);
      const averageConfidence = scores.reduce((sum, proof) => sum + proof.confidence, 0) / scores.length;
      
      verificationResults.overall = averageConfidence > 0.7 && scores.length >= 2;
      verificationResults.confidence = averageConfidence;

      return verificationResults;
    } catch (error) {
      console.error('Experience verification error:', error);
      return null;
    }
  }

  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  }

  async calculateTrustScore(userExperiences) {
    try {
      if (!userExperiences || userExperiences.length === 0) {
        return 0;
      }

      let totalScore = 0;
      let verifiedCount = 0;

      for (const experience of userExperiences) {
        if (experience.verified) {
          totalScore += experience.confidence * 100;
          verifiedCount++;
        }
      }

      if (verifiedCount === 0) {
        return 0;
      }

      // Base score from verified experiences
      const baseScore = totalScore / verifiedCount;

      // Bonus for quantity (up to 20 points)
      const quantityBonus = Math.min(verifiedCount * 2, 20);

      // Bonus for consistency (experiences over time)
      const consistencyBonus = this.calculateConsistencyBonus(userExperiences);

      const finalScore = Math.min(baseScore + quantityBonus + consistencyBonus, 100);
      return Math.round(finalScore);
    } catch (error) {
      console.error('Trust score calculation error:', error);
      return 0;
    }
  }

  calculateConsistencyBonus(experiences) {
    try {
      if (experiences.length < 2) return 0;

      // Sort experiences by date
      const sortedExperiences = experiences
        .filter(exp => exp.timestamp)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      if (sortedExperiences.length < 2) return 0;

      const firstDate = new Date(sortedExperiences[0].timestamp);
      const lastDate = new Date(sortedExperiences[sortedExperiences.length - 1].timestamp);
      const daysDiff = (lastDate - firstDate) / (1000 * 60 * 60 * 24);

      // Bonus for activity over longer periods (up to 10 points)
      if (daysDiff > 90) return 10;
      if (daysDiff > 30) return 7;
      if (daysDiff > 7) return 5;
      return 2;
    } catch (error) {
      console.error('Consistency bonus calculation error:', error);
      return 0;
    }
  }
}