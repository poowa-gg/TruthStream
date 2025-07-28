import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TruthStreamAPI} from '../services/ApiService';
import {XionWallet} from '../services/XionService';

const ProfileScreen = ({navigation}) => {
  const [profile, setProfile] = useState({
    name: 'Anonymous User',
    trustScore: 85,
    totalExperiences: 12,
    tokensEarned: 1250,
    rank: 156,
    joinDate: 'January 2025',
    avatar: null,
  });
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const api = new TruthStreamAPI();
      const [profileData, userAchievements, userStats] = await Promise.all([
        api.getUserProfile(),
        api.getUserAchievements(),
        api.getUserDetailedStats(),
      ]);
      setProfile(profileData);
      setAchievements(userAchievements);
      setStats(userStats);
    } catch (error) {
      console.error('Failed to load profile data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const wallet = new XionWallet();
            await wallet.disconnect();
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          },
        },
      ],
    );
  };

  const StatCard = ({title, value, icon, color}) => (
    <View style={[styles.statCard, {borderLeftColor: color}]}>
      <Icon name={icon} size={24} color={color} />
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const AchievementBadge = ({achievement}) => (
    <View style={styles.achievementBadge}>
      <View style={[styles.badgeIcon, {backgroundColor: achievement.color + '20'}]}>
        <Icon name={achievement.icon} size={24} color={achievement.color} />
      </View>
      <Text style={styles.badgeTitle}>{achievement.title}</Text>
      <Text style={styles.badgeDescription}>{achievement.description}</Text>
    </View>
  );

  const MenuOption = ({icon, title, subtitle, onPress, showArrow = true}) => (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Icon name={icon} size={24} color="#6366f1" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && <Icon name="chevron-right" size={24} color="#d1d5db" />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {profile.avatar ? (
              <Image source={{uri: profile.avatar}} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="person" size={40} color="#6b7280" />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="edit" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.joinDate}>Member since {profile.joinDate}</Text>
            <View style={styles.trustScoreContainer}>
              <Icon name="star" size={16} color="#f59e0b" />
              <Text style={styles.trustScore}>Trust Score: {profile.trustScore}/100</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Experiences"
            value={profile.totalExperiences}
            icon="verified"
            color="#10b981"
          />
          <StatCard
            title="Tokens Earned"
            value={`${profile.tokensEarned} TST`}
            icon="account-balance-wallet"
            color="#6366f1"
          />
          <StatCard
            title="Global Rank"
            value={`#${profile.rank}`}
            icon="leaderboard"
            color="#ef4444"
          />
          <StatCard
            title="Trust Level"
            value="Verified"
            icon="security"
            color="#f59e0b"
          />
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsContainer}>
          {achievements.map((achievement, index) => (
            <AchievementBadge key={index} achievement={achievement} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuContainer}>
          <MenuOption
            icon="edit"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => {}}
          />
          <MenuOption
            icon="security"
            title="Privacy & Security"
            subtitle="Manage your privacy settings"
            onPress={() => {}}
          />
          <MenuOption
            icon="account-balance-wallet"
            title="Wallet Settings"
            subtitle="Manage your XION wallet"
            onPress={() => {}}
          />
          <MenuOption
            icon="notifications"
            title="Notifications"
            subtitle="Configure your notification preferences"
            onPress={() => {}}
          />
          <MenuOption
            icon="help"
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => {}}
          />
          <MenuOption
            icon="info"
            title="About TruthStream"
            subtitle="Learn more about our platform"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.dangerSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#c7d2fe',
    marginBottom: 8,
  },
  trustScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustScore: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statContent: {
    marginLeft: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementsContainer: {
    paddingRight: 20,
    gap: 12,
  },
  achievementBadge: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  dangerSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
});

export default ProfileScreen;