import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {XionWallet} from '../services/XionService';

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleWalletConnect = async () => {
    setLoading(true);
    try {
      const wallet = new XionWallet();
      const connected = await wallet.connect();
      
      if (connected) {
        // Store user session
        navigation.replace('Main');
      } else {
        Alert.alert('Connection Failed', 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect wallet');
      console.error('Wallet connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🌊</Text>
        <Text style={styles.title}>Welcome to TruthStream</Text>
        <Text style={styles.subtitle}>
          Connect your XION wallet to start verifying experiences
        </Text>
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>✅</Text>
          <Text style={styles.featureText}>Verify real experiences</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🏆</Text>
          <Text style={styles.featureText}>Earn from authenticity</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🔒</Text>
          <Text style={styles.featureText}>Secure on-chain proof</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.connectButton}
        onPress={handleWalletConnect}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.connectButtonText}>Connect XION Wallet</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        By connecting, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  features: {
    marginVertical: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LoginScreen;