import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';

const SplashScreen = ({navigation}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🌊</Text>
          <Text style={styles.title}>TruthStream</Text>
        </View>
        <Text style={styles.subtitle}>Verify. Trust. Earn.</Text>
        <Text style={styles.tagline}>
          Authentic experiences, verified on-chain
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default SplashScreen;