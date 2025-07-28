import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TruthStreamAPI} from '../services/ApiService';

const MarketplaceScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [challenges, setChallenges] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const tabs = [
    {id: 'challenges', name: 'Challenges', icon: 'emoji-events'},
    {id: 'opportunities', name: 'Opportunities', icon: 'work'},
    {id: 'rewards', name: 'Rewards', icon: 'card-giftcard'},
  ];

  useEffect(() => {
    loadMarketplaceData();
  }, [activeTab]);

  const loadMarketplaceData = async () => {
    try {
      const api = new TruthStreamAPI();
      if (activeTab === 'challenges') {
        const data = await api.getActiveChallenges();
        setChallenges(data);
      } else if (activeTab === 'opportunities') {
        const data = await api.getBrandOpportunities();
        setOpportunities(data);
      }
    } catch (error) {
      console.error('Failed to load marketplace data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMarketplaceData();
    setRefreshing(false);
  };

  const TabButton = ({tab}) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab.id && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(tab.id)}>
      <Icon
        name={tab.icon}
        size={20}
        color={activeTab === tab.id ? '#6366f1' : '#6b7280'}
      />
      <Text
        style={[
          styles.tabText,
          activeTab === tab.id && styles.activeTabText,
        ]}>
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

  const ChallengeCard = ({challenge}) => (
    <TouchableOpacity style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <Image source={{uri: challenge.brandLogo}} style={styles.brandLogo} />
        <View style={styles.challengeInfo}>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <Text style={styles.brandName}>{challenge.brandName}</Text>
        </View>
        <View style={styles.rewardBadge}>
          <Text style={styles.rewardAmount}>{challenge.reward} TST</Text>
        </View>
      </View>

      <Text style={styles.challengeDescription} numberOfLines={2}>
        {challenge.description}
      </Text>

      <View style={styles.challengeStats}>
        <View style={styles.stat}>
          <Icon name="people" size={16} color="#6b7280" />
          <Text style={styles.statText}>{challenge.participants} participants</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="schedule" size={16} color="#6b7280" />
          <Text style={styles.statText}>{challenge.timeLeft}</Text>
        </View>
      </View>

      <View style={styles.challengeFooter}>
        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyLabel}>Difficulty:</Text>
          <View style={[styles.difficultyBadge, getDifficultyStyle(challenge.difficulty)]}>
            <Text style={[styles.difficultyText, getDifficultyTextStyle(challenge.difficulty)]}>
              {challenge.difficulty}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Challenge</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const OpportunityCard = ({opportunity}) => (
    <TouchableOpacity style={styles.opportunityCard}>
      <View style={styles.opportunityHeader}>
        <Image source={{uri: opportunity.brandLogo}} style={styles.brandLogo} />
        <View style={styles.opportunityInfo}>
          <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
          <Text style={styles.brandName}>{opportunity.brandName}</Text>
        </View>
        <View style={styles.paymentBadge}>
          <Text style={styles.paymentAmount}>${opportunity.payment}</Text>
        </View>
      </View>

      <Text style={styles.opportunityDescription} numberOfLines={3}>
        {opportunity.description}
      </Text>

      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Requirements:</Text>
        {opportunity.requirements.map((req, index) => (
          <View key={index} style={styles.requirement}>
            <Icon name="check-circle" size={14} color="#10b981" />
            <Text style={styles.requirementText}>{req}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const getDifficultyStyle = difficulty => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return {backgroundColor: '#dcfce7'};
      case 'medium':
        return {backgroundColor: '#fef3c7'};
      case 'hard':
        return {backgroundColor: '#fee2e2'};
      default:
        return {backgroundColor: '#f3f4f6'};
    }
  };

  const getDifficultyTextStyle = difficulty => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return {color: '#16a34a'};
      case 'medium':
        return {color: '#d97706'};
      case 'hard':
        return {color: '#dc2626'};
      default:
        return {color: '#6b7280'};
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'challenges':
        return (
          <ScrollView
            style={styles.content}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {challenges.map((challenge, index) => (
              <ChallengeCard key={index} challenge={challenge} />
            ))}
          </ScrollView>
        );
      case 'opportunities':
        return (
          <ScrollView
            style={styles.content}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {opportunities.map((opportunity, index) => (
              <OpportunityCard key={index} opportunity={opportunity} />
            ))}
          </ScrollView>
        );
      case 'rewards':
        return (
          <View style={styles.comingSoon}>
            <Icon name="card-giftcard" size={64} color="#d1d5db" />
            <Text style={styles.comingSoonTitle}>Rewards Coming Soon</Text>
            <Text style={styles.comingSoonSubtitle}>
              Redeem your TST tokens for exclusive rewards
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
        <TouchableOpacity style={styles.walletButton}>
          <Icon name="account-balance-wallet" size={20} color="#6366f1" />
          <Text style={styles.walletText}>1,250 TST</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}>
        {tabs.map(tab => (
          <TabButton key={tab.id} tab={tab} />
        ))}
      </ScrollView>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede9fe',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  walletText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366f1',
    marginLeft: 6,
  },
  tabsContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
  tabsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  activeTabButton: {
    backgroundColor: '#ede9fe',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#6366f1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  challengeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  brandName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  rewardBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rewardAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  challengeStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  joinButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  opportunityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  opportunityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  opportunityInfo: {
    flex: 1,
  },
  opportunityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  paymentBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d97706',
  },
  opportunityDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  requirementsContainer: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  applyButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default MarketplaceScreen;