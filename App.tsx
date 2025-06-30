import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import TrackerScreen from './src/screens/TrackerScreen';
import MapScreen from './src/screens/MapScreen';
import InfoScreen from './src/screens/InfoScreen';
import HelpScreen from './src/screens/HelpScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';

export type RootStackParamList = {
  Home: undefined;
  Tracker: undefined;
  Map: undefined;
  Info: undefined;
  Help: undefined;
  Feedback: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FF69B4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Sakhi Suraksha' }}
          />
          <Stack.Screen 
            name="Tracker" 
            component={TrackerScreen} 
            options={{ title: 'Track My Cycle' }}
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ title: 'Find Nearby Stores' }}
          />
          <Stack.Screen 
            name="Info" 
            component={InfoScreen} 
            options={{ title: 'Learn Menstrual Health' }}
          />
          <Stack.Screen 
            name="Help" 
            component={HelpScreen} 
            options={{ title: 'Emergency Help' }}
          />
          <Stack.Screen 
            name="Feedback" 
            component={FeedbackScreen} 
            options={{ title: 'Give Feedback' }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
