import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

type TrackerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tracker'>;

interface Props {
  navigation: TrackerScreenNavigationProp;
}

const TrackerScreen: React.FC<Props> = ({ navigation }) => {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [nextPeriodDate, setNextPeriodDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cycleLength, setCycleLength] = useState(28); // Default 28 days

  const calculateNextPeriod = (selectedDate: Date) => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + cycleLength);
    return nextDate;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setLastPeriodDate(selectedDate);
      const nextDate = calculateNextPeriod(selectedDate);
      setNextPeriodDate(nextDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysUntilNextPeriod = () => {
    if (!nextPeriodDate) return null;
    const today = new Date();
    const diffTime = nextPeriodDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCyclePhase = () => {
    if (!lastPeriodDate || !nextPeriodDate) return null;
    const today = new Date();
    const daysSinceLastPeriod = Math.floor(
      (today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastPeriod < 7) return 'Menstrual Phase';
    if (daysSinceLastPeriod < 14) return 'Follicular Phase';
    if (daysSinceLastPeriod < 21) return 'Ovulatory Phase';
    return 'Luteal Phase';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="calendar" size={48} color="#FF69B4" />
          <Text style={styles.title}>Track My Cycle</Text>
          <Text style={styles.subtitle}>
            Monitor your menstrual cycle and stay prepared
          </Text>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Period Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={24} color="#FF69B4" />
            <Text style={styles.dateButtonText}>
              {lastPeriodDate ? formatDate(lastPeriodDate) : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cycle Length Adjustment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cycle Length</Text>
          <View style={styles.cycleLengthContainer}>
            <TouchableOpacity
              style={styles.cycleButton}
              onPress={() => {
                if (cycleLength > 21) {
                  setCycleLength(cycleLength - 1);
                  if (lastPeriodDate) {
                    setNextPeriodDate(calculateNextPeriod(lastPeriodDate));
                  }
                }
              }}
            >
              <Ionicons name="remove" size={24} color="#FF69B4" />
            </TouchableOpacity>
            <Text style={styles.cycleLengthText}>{cycleLength} days</Text>
            <TouchableOpacity
              style={styles.cycleButton}
              onPress={() => {
                if (cycleLength < 35) {
                  setCycleLength(cycleLength + 1);
                  if (lastPeriodDate) {
                    setNextPeriodDate(calculateNextPeriod(lastPeriodDate));
                  }
                }
              }}
            >
              <Ionicons name="add" size={24} color="#FF69B4" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Next Period Prediction */}
        {nextPeriodDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Period Prediction</Text>
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionDate}>
                {formatDate(nextPeriodDate)}
              </Text>
              <Text style={styles.predictionDays}>
                {getDaysUntilNextPeriod()! > 0
                  ? `${getDaysUntilNextPeriod()} days away`
                  : getDaysUntilNextPeriod()! === 0
                  ? 'Today!'
                  : `${Math.abs(getDaysUntilNextPeriod()!)} days overdue`}
              </Text>
            </View>
          </View>
        )}

        {/* Current Cycle Phase */}
        {getCyclePhase() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Cycle Phase</Text>
            <View style={styles.phaseContainer}>
              <Text style={styles.phaseText}>{getCyclePhase()}</Text>
            </View>
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Tips</Text>
          <Text style={styles.tipsText}>
            • Track your period regularly for better predictions{'\n'}
            • Keep sanitary products ready 2-3 days before expected period{'\n'}
            • Note any symptoms or irregularities{'\n'}
            • Consult a doctor if you have concerns
          </Text>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={lastPeriodDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
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
    color: '#FF69B4',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#FF69B4',
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#FF69B4',
    marginLeft: 10,
    fontWeight: '500',
  },
  cycleLengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cycleButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    marginHorizontal: 15,
  },
  cycleLengthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    minWidth: 80,
    textAlign: 'center',
  },
  predictionContainer: {
    alignItems: 'center',
  },
  predictionDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 5,
  },
  predictionDays: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  phaseContainer: {
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default TrackerScreen; 