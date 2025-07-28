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

const ExperienceScreen = ({navigation}) => {
  const [experiences, setExperiences] = useState([]);
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const filters = [
    {id: 'all', name: 'All', icon: 'apps'},
    {id: 'dining', name: 'Dining', icon: 'restaurant'},
    {id: 'event', name: 'Events', icon: 'confirmation-number'},
    {id: 'purchase', name: 'Shopping', icon: 'shopping-bag'},
    {id: 'travel', name: 'Travel', icon: 'flight'},
  ];

  useEffect(() => {
    loadExperiences();
  }, [filter]);

  const loadExperiences = async () => {
    try {
      const api = new TruthStreamAPI();
      const data = await api.getUserExperiences(filter);
      setExperiences(data);
    } catch (error) {
      console.error('Failed to load experiences:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExperiences();
    setRefreshing(false);
  };

  const FilterButton = ({filterItem}) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterItem.id && styles.activeFilterButton,
      ]}
      onPress={() => setFilter(filterItem.id)}>
      <Icon
        name={filterItem.icon}
        size={20}
        color={filter === filterItem.id ? '#ffffff' : '#6b7280'}
      />
      <Text
        style={[
          styles.filterText,
          filter === filterItem.id && styles.activeFilterText,
        ]}>
        {filterItem.name}
      </Text>
    </TouchableOpacity>
  );

  const ExperienceCard = ({experience}) => (
    <TouchableOpacity style={styles.experienceCard}>
      <View style={styles.cardHeader}>
        <View style={styles.experienceIcon}>
          <Icon name={getExperienceIcon(experience.type)} size={24} color="#6366f1" />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.experienceTitle}>{experience.title}</Text>
          <Text style={styles.experienceDate}>{experience.date}</Text>
        </View>
        <View style={styles.verificationBadge}>
          <Icon name="verified" size={16} color="#10b981" />
        </View>
      </View>

      {experience.image && (
        <Image source={{uri: experience.image}} style={styles.experienceImage} />
      )}

      <Text style={styles.experienceDescription} numberOfLines={2}>
        {experience.description}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Icon name="star" size={16} color="#f59e0b" />
            <Text style={styles.statText}>{experience.trustScore}</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="account-balance-wallet" size={16} color="#6366f1" />
            <Text style={styles.statText}>{experience.tokensEarned} TST</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share" size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const getExperienceIcon = type => {
    const icons = {
      dining: 'restaurant',
      event: 'confirmation-number',
      purchase: 'shopping-bag',
      travel: 'flight',
      fitness: 'fitness-center',
      entertainment: 'movie',
    };
    return icons[type] || 'verified';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Experiences</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateExperience')}>
          <Icon name="add" size={24} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}>
        {filters.map(filterItem => (
          <FilterButton key={filterItem.id} filterItem={filterItem} />
        ))}
      </ScrollView>

      <ScrollView
        style={styles.experiencesContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {experiences.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="verified" size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No Experiences Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start creating verified experiences to build your trust score
            </Text>
            <TouchableOpacity
              style={styles.createFirstButton}
              onPress={() => navigation.navigate('CreateExperience')}>
              <Text style={styles.createFirstButtonText}>Create First Experience</Text>
            </TouchableOpacity>
          </View>
        ) : (
          experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))
        )}
      </ScrollView>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  activeFilterButton: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 6,
  },
  activeFilterText: {
    color: '#ffffff',
  },
  experiencesContainer: {
    flex: 1,
    padding: 20,
  },
  experienceCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  experienceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  experienceDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  verificationBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  experienceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  experienceDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 4,
  },
  shareButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  createFirstButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createFirstButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExperienceScreen;