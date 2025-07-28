import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {ExperienceVerifier} from '../services/VerificationService';

const CreateExperienceScreen = ({navigation}) => {
  const [experienceType, setExperienceType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState([]);
  const [verifying, setVerifying] = useState(false);

  const experienceTypes = [
    {id: 'dining', name: 'Restaurant Visit', icon: 'restaurant'},
    {id: 'event', name: 'Event Attendance', icon: 'confirmation-number'},
    {id: 'purchase', name: 'Product Purchase', icon: 'shopping-bag'},
    {id: 'travel', name: 'Travel Experience', icon: 'flight'},
    {id: 'fitness', name: 'Fitness Activity', icon: 'fitness-center'},
    {id: 'entertainment', name: 'Entertainment', icon: 'movie'},
  ];

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 5,
      },
      response => {
        if (response.assets) {
          setPhotos([...photos, ...response.assets]);
        }
      },
    );
  };

  const handleCreateExperience = async () => {
    if (!experienceType || !title || !description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setVerifying(true);
    try {
      const verifier = new ExperienceVerifier();
      const experienceData = {
        type: experienceType,
        title,
        description,
        location,
        photos,
        timestamp: new Date().toISOString(),
      };

      // Navigate to verification screen
      navigation.navigate('Verification', {experienceData});
    } catch (error) {
      Alert.alert('Error', 'Failed to create experience');
      console.error('Create experience error:', error);
    } finally {
      setVerifying(false);
    }
  };

  const ExperienceTypeCard = ({type}) => (
    <TouchableOpacity
      style={[
        styles.typeCard,
        experienceType === type.id && styles.selectedTypeCard,
      ]}
      onPress={() => setExperienceType(type.id)}>
      <Icon
        name={type.icon}
        size={32}
        color={experienceType === type.id ? '#6366f1' : '#6b7280'}
      />
      <Text
        style={[
          styles.typeText,
          experienceType === type.id && styles.selectedTypeText,
        ]}>
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience Type</Text>
        <View style={styles.typeGrid}>
          {experienceTypes.map(type => (
            <ExperienceTypeCard key={type.id} type={type} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Dinner at The French Laundry"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your experience..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g., Yountville, CA"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <TouchableOpacity style={styles.photoButton} onPress={handleImagePicker}>
          <Icon name="add-a-photo" size={24} color="#6366f1" />
          <Text style={styles.photoButtonText}>Add Photos</Text>
        </TouchableOpacity>
        
        {photos.length > 0 && (
          <View style={styles.photoGrid}>
            {photos.map((photo, index) => (
              <Image key={index} source={{uri: photo.uri}} style={styles.photo} />
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.createButton, verifying && styles.disabledButton]}
        onPress={handleCreateExperience}
        disabled={verifying}>
        <Text style={styles.createButtonText}>
          {verifying ? 'Creating...' : 'Create & Verify Experience'}
        </Text>
      </TouchableOpacity>
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
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  selectedTypeCard: {
    borderColor: '#6366f1',
    backgroundColor: '#ede9fe',
  },
  typeText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedTypeText: {
    color: '#6366f1',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  photoButtonText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '500',
    marginLeft: 8,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  createButton: {
    backgroundColor: '#6366f1',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateExperienceScreen;