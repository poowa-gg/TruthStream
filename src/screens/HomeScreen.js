import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TruthStreamAPI} from '../services/ApiService';

const HomeScreen = ({navigation}) => {
  const [stats, setStats] = useState({
    totalExperiences: 0,
    trustScore: 0,
    tokensEarned: 0,
    rank: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const api = new TruthStreamAPI();
      const [userStats, activity] = await Promise.all([
        api.getUserStats(),
        api.getRecentActivity(),
      ]);
      setStats(userStats);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({title, value, icon, color}) => (
    <View style={[styles.statCard, {borderLeftColor: color}]}>
      <View style={styles.statHeader}>
        <Icon name={icon} size={24} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  const ActivityItem = ({item}) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Icon name={item.icon} size={20} color="#6366f1" />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
      <Text style={styles.activityReward}>+{item.reward} TST</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.subtitle}>Ready to verify some experiences?</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Experiences"
          value={stats.totalExperiences}
          icon="verified"
          color="#10b981"
        />
        <StatCard
          title="Trust Score"
          value={`${stats.trustScore}/100`}
          icon="star"
          color="#f59e0b"
        />
        <StatCard
          title="Tokens Earned"
          value={stats.tokensEarned}
          icon="account-balance-wallet"
          color="#6366f1"
        />
        <StatCard
          title="Global Rank"
          value={`#${stats.rank}`}
          icon="leaderboard"
          color="#ef4444"
        />
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateExperience')}>
        <Icon name="add" size={24} color="#ffffff" />
        <Text style={styles.createButtonText}>Create New Experience</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivity.map((item, index) => (
          <ActivityItem key={index} item={item} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="restaurant" size={24} color="#6366f1" />
            <Text style={styles.quickActionText}>Verify Dining</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="confirmation-number" size={24} color="#6366f1" />
            <Text style={styles.quickActionText}>Event Check-in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="shopping-bag" size={24} color="#6366f1" />
            <Text style={styles.quickActionText}>Purchase Proof</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  createButton: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  activityReward: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    width: '30%',
  },
  quickActionText: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;