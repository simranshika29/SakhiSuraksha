import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';

type FeedbackScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feedback'>;

interface Props {
  navigation: FeedbackScreenNavigationProp;
}

const FeedbackScreen: React.FC<Props> = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'bug' | 'general'>('general');

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    // In a real app, you would send this to a server
    // For now, we'll just show a success message
    Alert.alert(
      'Thank You!',
      'Your feedback has been submitted successfully. We appreciate your input!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setFeedback('');
            setName('');
            setEmail('');
            setFeedbackType('general');
          },
        },
      ]
    );
  };

  const feedbackTypes = [
    { id: 'suggestion', label: 'Suggestion', icon: 'bulb' },
    { id: 'bug', label: 'Bug Report', icon: 'bug' },
    { id: 'general', label: 'General', icon: 'chatbubble' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="chatbubble" size={48} color="#9C27B0" />
          <Text style={styles.title}>Give Feedback</Text>
          <Text style={styles.subtitle}>
            Help us improve Sakhi Suraksha by sharing your thoughts
          </Text>
        </View>

        {/* Feedback Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback Type</Text>
          <View style={styles.feedbackTypeContainer}>
            {feedbackTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.feedbackTypeButton,
                  feedbackType === type.id && styles.selectedFeedbackType,
                ]}
                onPress={() => setFeedbackType(type.id as any)}
              >
                <Ionicons
                  name={type.icon as any}
                  size={24}
                  color={feedbackType === type.id ? 'white' : '#9C27B0'}
                />
                <Text
                  style={[
                    styles.feedbackTypeText,
                    feedbackType === type.id && styles.selectedFeedbackTypeText,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Name Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Name (Optional)</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Email Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email (Optional)</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Feedback Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Feedback *</Text>
          <TextInput
            style={[styles.input, styles.feedbackInput]}
            value={feedback}
            onChangeText={setFeedback}
            placeholder={
              feedbackType === 'suggestion'
                ? 'Share your suggestions for improving the app...'
                : feedbackType === 'bug'
                ? 'Describe the issue you encountered...'
                : 'Share your thoughts about Sakhi Suraksha...'
            }
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Ionicons name="send" size={24} color="white" />
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>

        {/* Additional Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>💡 How your feedback helps:</Text>
          <Text style={styles.infoText}>
            • Improves app features and user experience{'\n'}
            • Helps identify and fix bugs{'\n'}
            • Guides future development priorities{'\n'}
            • Makes the app more useful for all users{'\n'}
            • Your privacy is protected - feedback is anonymous
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>📞 Need Immediate Help?</Text>
          <Text style={styles.contactText}>
            For urgent issues or emergency situations, please use the Emergency Help section of the app or contact emergency services directly.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  feedbackTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedbackTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9C27B0',
    backgroundColor: 'white',
  },
  selectedFeedbackType: {
    backgroundColor: '#9C27B0',
  },
  feedbackTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9C27B0',
    marginLeft: 8,
  },
  selectedFeedbackTypeText: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  feedbackInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#9C27B0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  infoContainer: {
    backgroundColor: '#F3E5F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B1FA2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  contactContainer: {
    backgroundColor: '#E8F5E8',
    padding: 20,
    borderRadius: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default FeedbackScreen; 