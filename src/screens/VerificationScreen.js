import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ExperienceVerifier} from '../services/VerificationService';
import {ZkTLSService} from '../services/ZkTLSService';
import {XionBlockchain} from '../services/XionService';

const VerificationScreen = ({navigation, route}) => {
  const {experienceData} = route.params;
  const [verificationSteps, setVerificationSteps] = useState([
    {id: 'location', name: 'Location Verification', status: 'pending', icon: 'location-on'},
    {id: 'payment', name: 'Payment Verification', status: 'pending', icon: 'payment'},
    {id: 'social', name: 'Social Verification', status: 'pending', icon: 'share'},
    {id: 'blockchain', name: 'Blockchain Recording', status: 'pending', icon: 'security'},
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    startVerification();
  }, []);

  const startVerification = async () => {
    setVerifying(true);
    
    try {
      const verifier = new ExperienceVerifier();
      const zkTLS = new ZkTLSService();
      const blockchain = new XionBlockchain();

      // Step 1: Location Verification
      await updateStepStatus(0, 'processing');
      const locationProof = await verifier.verifyLocation(experienceData);
      await updateStepStatus(0, locationProof ? 'completed' : 'failed');
      await delay(1000);

      // Step 2: Payment Verification
      await updateStepStatus(1, 'processing');
      const paymentProof = await zkTLS.verifyPayment(experienceData);
      await updateStepStatus(1, paymentProof ? 'completed' : 'failed');
      await delay(1000);

      // Step 3: Social Verification
      await updateStepStatus(2, 'processing');
      const socialProof = await zkTLS.verifySocialActivity(experienceData);
      await updateStepStatus(2, socialProof ? 'completed' : 'failed');
      await delay(1000);

      // Step 4: Blockchain Recording
      await updateStepStatus(3, 'processing');
      const nftResult = await blockchain.mintExperienceNFT({
        ...experienceData,
        proofs: {location: locationProof, payment: paymentProof, social: socialProof},
      });
      await updateStepStatus(3, nftResult ? 'completed' : 'failed');

      if (nftResult) {
        Alert.alert(
          'Success!',
          'Your experience has been verified and minted as an NFT',
          [
            {
              text: 'View Experience',
              onPress: () => navigation.navigate('Experiences'),
            },
          ],
        );
      }
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Verification Failed', 'Please try again later');
    } finally {
      setVerifying(false);
    }
  };

  const updateStepStatus = async (stepIndex, status) => {
    setCurrentStep(stepIndex);
    setVerificationSteps(prev =>
      prev.map((step, index) =>
        index === stepIndex ? {...step, status} : step,
      ),
    );
  };

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const getStepIcon = step => {
    switch (step.status) {
      case 'completed':
        return 'check-circle';
      case 'failed':
        return 'error';
      case 'processing':
        return 'hourglass-empty';
      default:
        return step.icon;
    }
  };

  const getStepColor = step => {
    switch (step.status) {
      case 'completed':
        return '#10b981';
      case 'failed':
        return '#ef4444';
      case 'processing':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const VerificationStep = ({step, index}) => (
    <View style={styles.stepContainer}>
      <View style={[styles.stepIcon, {backgroundColor: getStepColor(step) + '20'}]}>
        {step.status === 'processing' ? (
          <ActivityIndicator size="small" color={getStepColor(step)} />
        ) : (
          <Icon name={getStepIcon(step)} size={24} color={getStepColor(step)} />
        )}
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepName}>{step.name}</Text>
        <Text style={[styles.stepStatus, {color: getStepColor(step)}]}>
          {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
        </Text>
      </View>
      {index < verificationSteps.length - 1 && (
        <View
          style={[
            styles.stepConnector,
            {
              backgroundColor:
                step.status === 'completed' ? '#10b981' : '#e5e7eb',
            },
          ]}
        />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Verifying Experience</Text>
      </View>

      <View style={styles.experienceCard}>
        <Text style={styles.experienceTitle}>{experienceData.title}</Text>
        <Text style={styles.experienceDescription}>
          {experienceData.description}
        </Text>
        {experienceData.location && (
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={16} color="#6b7280" />
            <Text style={styles.locationText}>{experienceData.location}</Text>
          </View>
        )}
      </View>

      <View style={styles.verificationContainer}>
        <Text style={styles.sectionTitle}>Verification Progress</Text>
        <Text style={styles.sectionSubtitle}>
          We're verifying your experience using multiple data sources
        </Text>

        <View style={styles.stepsContainer}>
          {verificationSteps.map((step, index) => (
            <VerificationStep key={step.id} step={step} index={index} />
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <Icon name="info" size={24} color="#6366f1" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>How Verification Works</Text>
          <Text style={styles.infoText}>
            We use zkTLS technology to verify your experience data from multiple
            sources without exposing your private information. Once verified,
            your experience is minted as an NFT on the XION blockchain.
          </Text>
        </View>
      </View>

      {!verifying && verificationSteps.every(step => step.status !== 'pending') && (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  experienceCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  experienceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  verificationContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  stepsContainer: {
    position: 'relative',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  stepStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  stepConnector: {
    position: 'absolute',
    left: 23,
    top: 48,
    width: 2,
    height: 20,
  },
  infoCard: {
    backgroundColor: '#ede9fe',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6366f1',
    lineHeight: 20,
  },
  doneButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;