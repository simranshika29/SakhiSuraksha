import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

interface Props {
  navigation: HelpScreenNavigationProp;
}

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  type: string;
  icon: string;
  color: string;
}

const HelpScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: 1,
      name: 'Emergency Services',
      phone: '112',
      type: 'National Emergency',
      icon: 'call',
      color: '#FF5722',
    },
    {
      id: 2,
      name: 'Women Helpline',
      phone: '1091',
      type: 'Women Safety',
      icon: 'shield',
      color: '#E91E63',
    },
    {
      id: 3,
      name: 'Police',
      phone: '100',
      type: 'Police Emergency',
      icon: 'car',
      color: '#2196F3',
    },
    {
      id: 4,
      name: 'Ambulance',
      phone: '102',
      type: 'Medical Emergency',
      icon: 'medical',
      color: '#4CAF50',
    },
  ];

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Permission to access location was denied. Please enable location permissions in settings.'
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      return currentLocation;
    } catch (error) {
      Alert.alert('Error', 'Unable to get current location');
      return;
    }
  };

  const handleEmergencyCall = (contact: EmergencyContact) => {
    Alert.alert(
      'Emergency Call',
      `Call ${contact.name} (${contact.phone})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${contact.phone}`);
          },
        },
      ]
    );
  };

  const handleSOS = async () => {
    Alert.alert(
      'SOS Emergency',
      'This will call emergency services and share your location. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'SOS',
          style: 'destructive',
          onPress: async () => {
            const currentLocation = await getCurrentLocation();
            if (currentLocation) {
              const { latitude, longitude } = currentLocation.coords;
              const locationMessage = `Emergency! I need help. My location: https://maps.google.com/?q=${latitude},${longitude}`;
              
              // Call emergency services
              Linking.openURL('tel:112');
              
              // Share location via SMS (if possible)
              setTimeout(() => {
                Linking.openURL(`sms:112&body=${locationMessage}`);
              }, 2000);
            } else {
              Linking.openURL('tel:112');
            }
          },
        },
      ]
    );
  };

  const handleShareLocation = async () => {
    const currentLocation = await getCurrentLocation();
    if (currentLocation) {
      const { latitude, longitude } = currentLocation.coords;
      const locationMessage = `My current location: https://maps.google.com/?q=${latitude},${longitude}`;
      
      Alert.alert(
        'Share Location',
        'Choose how to share your location:',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'SMS',
            onPress: () => {
              Linking.openURL(`sms:&body=${locationMessage}`);
            },
          },
          {
            text: 'WhatsApp',
            onPress: () => {
              Linking.openURL(`whatsapp://send?text=${locationMessage}`);
            },
          },
        ]
      );
    }
  };

  const handleAddTrustedContact = () => {
    Alert.alert(
      'Add Trusted Contact',
      'This feature will allow you to add trusted contacts for emergency situations. Coming soon!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="shield" size={48} color="#FF5722" />
          <Text style={styles.title}>Emergency Help</Text>
          <Text style={styles.subtitle}>
            Quick access to emergency services and trusted contacts
          </Text>
        </View>

        {/* SOS Button */}
        <TouchableOpacity
          style={styles.sosButton}
          onPress={handleSOS}
          activeOpacity={0.8}
        >
          <Ionicons name="warning" size={48} color="white" />
          <Text style={styles.sosText}>SOS EMERGENCY</Text>
          <Text style={styles.sosSubtext}>Call emergency services & share location</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleShareLocation}
            >
              <Ionicons name="location" size={32} color="#4CAF50" />
              <Text style={styles.quickActionText}>Share Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleAddTrustedContact}
            >
              <Ionicons name="person-add" size={32} color="#2196F3" />
              <Text style={styles.quickActionText}>Add Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.contactsContainer}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactItem}
              onPress={() => handleEmergencyCall(contact)}
              activeOpacity={0.7}
            >
              <View style={styles.contactInfo}>
                <View style={styles.contactHeader}>
                  <Ionicons
                    name={contact.icon as any}
                    size={24}
                    color={contact.color}
                  />
                  <Text style={styles.contactName}>{contact.name}</Text>
                </View>
                <Text style={styles.contactType}>{contact.type}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <Ionicons name="call" size={24} color={contact.color} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Safety Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>🛡️ Safety Tips</Text>
          <Text style={styles.tipsText}>
            • Keep emergency contacts easily accessible{'\n'}
            • Share your location with trusted friends/family{'\n'}
            • Trust your instincts - if you feel unsafe, seek help{'\n'}
            • Know your rights and available resources{'\n'}
            • Stay in well-lit, public areas when possible{'\n'}
            • Have a safety plan for different situations
          </Text>
        </View>

        {/* What to do in emergency */}
        <View style={styles.emergencyStepsContainer}>
          <Text style={styles.emergencyStepsTitle}>🚨 In Emergency</Text>
          <Text style={styles.emergencyStepsText}>
            1. Stay calm and assess the situation{'\n'}
            2. Call emergency services immediately{'\n'}
            3. Share your exact location{'\n'}
            4. Follow instructions from emergency responders{'\n'}
            5. Contact a trusted person if possible{'\n'}
            6. Document the incident if safe to do so
          </Text>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            This app provides emergency contact information and basic safety guidance. 
            In life-threatening situations, always call emergency services immediately.
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
    color: '#FF5722',
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  sosButton: {
    backgroundColor: '#FF5722',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sosText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
  },
  sosSubtext: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  quickActionsContainer: {
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  quickActionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  contactsContainer: {
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
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contactInfo: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  contactType: {
    fontSize: 14,
    color: '#666',
    marginLeft: 34,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 34,
  },
  tipsContainer: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F57C00',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emergencyStepsContainer: {
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  emergencyStepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D32F2F',
    marginBottom: 10,
  },
  emergencyStepsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  disclaimerContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HelpScreen; 