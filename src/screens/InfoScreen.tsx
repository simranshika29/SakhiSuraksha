import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Info'>;

interface Props {
  navigation: InfoScreenNavigationProp;
}

interface InfoSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  color: string;
}

const InfoScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const infoSections: InfoSection[] = [
    {
      id: 'basics',
      title: 'Menstrual Cycle Basics',
      icon: 'information-circle',
      color: '#FF69B4',
      content: [
        '• The menstrual cycle typically lasts 21-35 days',
        '• Periods usually last 3-7 days',
        '• The cycle has four phases: menstrual, follicular, ovulatory, and luteal',
        '• Hormones (estrogen and progesterone) control the cycle',
        '• Regular periods indicate good reproductive health',
      ],
    },
    {
      id: 'hygiene',
      title: 'Hygiene Tips',
      icon: 'shield-checkmark',
      color: '#4CAF50',
      content: [
        '• Change sanitary pads every 4-6 hours',
        '• Wash hands before and after changing products',
        '• Use mild, unscented soap for intimate hygiene',
        '• Avoid using scented products or douches',
        '• Wear cotton underwear for better breathability',
        '• Take regular showers during your period',
        '• Keep your genital area clean and dry',
      ],
    },
    {
      id: 'products',
      title: 'Product Guide',
      icon: 'bag',
      color: '#2196F3',
      content: [
        '• Sanitary Pads: Disposable, easy to use, good for beginners',
        '• Tampons: Internal protection, good for swimming',
        '• Menstrual Cups: Reusable, eco-friendly, cost-effective',
        '• Period Panties: Comfortable, reusable, good for light flow',
        '• Choose products based on flow intensity and comfort',
        '• Always carry extra products during your period',
      ],
    },
    {
      id: 'myths',
      title: 'Myths vs Facts',
      icon: 'help-circle',
      color: '#FF9800',
      content: [
        '❌ Myth: You can\'t exercise during periods',
        '✅ Fact: Exercise can help reduce cramps and improve mood',
        '',
        '❌ Myth: Periods are dirty or shameful',
        '✅ Fact: Periods are natural and healthy',
        '',
        '❌ Myth: You can\'t get pregnant during periods',
        '✅ Fact: Pregnancy is possible, though less likely',
        '',
        '❌ Myth: Periods should be exactly 28 days',
        '✅ Fact: Cycles vary from 21-35 days and that\'s normal',
      ],
    },
    {
      id: 'disposal',
      title: 'Proper Disposal',
      icon: 'trash',
      color: '#9C27B0',
      content: [
        '• Wrap used pads/tampons in paper or plastic',
        '• Dispose in designated bins, not toilets',
        '• Never flush sanitary products down the toilet',
        '• Use biodegradable products when possible',
        '• Wash reusable products properly',
        '• Consider eco-friendly alternatives like menstrual cups',
      ],
    },
    {
      id: 'symptoms',
      title: 'Common Symptoms',
      icon: 'medical',
      color: '#F44336',
      content: [
        '• Cramps and abdominal pain',
        '• Bloating and water retention',
        '• Mood swings and irritability',
        '• Fatigue and tiredness',
        '• Breast tenderness',
        '• Food cravings',
        '• Headaches or backaches',
        '• Acne breakouts',
      ],
    },
    {
      id: 'when-to-seek-help',
      title: 'When to Seek Medical Help',
      icon: 'warning',
      color: '#FF5722',
      content: [
        '• Extremely heavy bleeding (soaking through pads every hour)',
        '• Periods lasting more than 7 days',
        '• Severe pain that doesn\'t improve with pain relievers',
        '• Irregular periods after having regular ones',
        '• No period for 3+ months (if not pregnant)',
        '• Bleeding between periods',
        '• Unusual discharge or odor',
        '• Fever during your period',
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="book" size={48} color="#2196F3" />
          <Text style={styles.title}>Learn Menstrual Health</Text>
          <Text style={styles.subtitle}>
            Essential information for your health and well-being
          </Text>
        </View>

        {/* Info Sections */}
        {infoSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionTitleContainer}>
                <Ionicons
                  name={section.icon as any}
                  size={24}
                  color={section.color}
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Ionicons
                name={
                  expandedSection === section.id
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={24}
                color="#666"
              />
            </TouchableOpacity>

            {expandedSection === section.id && (
              <View style={styles.sectionContent}>
                {section.content.map((item, index) => (
                  <Text key={index} style={styles.contentText}>
                    {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Additional Resources */}
        <View style={styles.resourcesContainer}>
          <Text style={styles.resourcesTitle}>📚 Additional Resources</Text>
          <Text style={styles.resourcesText}>
            • Talk to a trusted adult, teacher, or healthcare provider{'\n'}
            • Visit reliable health websites for more information{'\n'}
            • Join support groups or forums for young women{'\n'}
            • Read books about puberty and menstrual health{'\n'}
            • Remember: Every woman's experience is unique
          </Text>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergencyTitle}>🚨 Emergency</Text>
          <Text style={styles.emergencyText}>
            If you're experiencing severe symptoms or have concerns about your health, don't hesitate to seek medical attention immediately.
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
    color: '#2196F3',
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
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 15,
  },
  sectionContent: {
    padding: 20,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  resourcesContainer: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 10,
  },
  resourcesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emergencyContainer: {
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D32F2F',
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default InfoScreen; 