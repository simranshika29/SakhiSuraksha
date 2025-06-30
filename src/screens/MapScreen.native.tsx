import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// ... existing types and sampleStores ...

const MapScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Sample store data - in a real app, this would come from an API
  const sampleStores: Store[] = [
    {
      id: 1,
      name: 'City Pharmacy',
      type: 'Pharmacy',
      latitude: 28.6139,
      longitude: 77.2090,
      address: '123 Main Street, New Delhi',
      distance: 0.5,
    },
    {
      id: 2,
      name: 'Health Mart',
      type: 'Medical Store',
      latitude: 28.6149,
      longitude: 77.2100,
      address: '456 Park Avenue, New Delhi',
      distance: 0.8,
    },
    {
      id: 3,
      name: 'Care Pharmacy',
      type: 'Pharmacy',
      latitude: 28.6129,
      longitude: 77.2080,
      address: '789 Market Road, New Delhi',
      distance: 1.2,
    },
    {
      id: 4,
      name: 'Wellness Store',
      type: 'Health Store',
      latitude: 28.6159,
      longitude: 77.2110,
      address: '321 Health Plaza, New Delhi',
      distance: 1.5,
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setStores(sampleStores);
    })();
  }, []);

  const handleStorePress = (store: Store) => {
    setSelectedStore(store);
  };

  const handleCallStore = (store: Store) => {
    Alert.alert(
      'Call Store',
      `Would you like to call ${store.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling store...') },
      ]
    );
  };

  const handleGetDirections = (store: Store) => {
    Alert.alert(
      'Get Directions',
      `Would you like to get directions to ${store.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Directions', onPress: () => console.log('Getting directions...') },
      ]
    );
  };

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="location" size={64} color="#FF5722" />
          <Text style={styles.errorTitle}>Location Access Required</Text>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <Text style={styles.errorText}>
            Please enable location permissions to find nearby stores.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="location" size={32} color="#4CAF50" />
        <Text style={styles.title}>Find Nearby Stores</Text>
        <Text style={styles.subtitle}>
          Locate pharmacies and stores with menstrual hygiene products
        </Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude || 28.6139,
            longitude: location?.coords.longitude || 77.2090,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* User location marker */}
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              description="You are here"
              pinColor="blue"
            />
          )}
          {/* Store markers */}
          {stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              title={store.name}
              description={store.type}
              pinColor={store.type === 'Pharmacy' ? 'red' : 'green'}
              onPress={() => handleStorePress(store)}
            />
          ))}
        </MapView>
      </View>
      <Text style={styles.storeListTitle}>Nearby Stores</Text>
      {stores.map((store) => (
        <TouchableOpacity
          key={store.id}
          style={[
            styles.storeItem,
            selectedStore?.id === store.id && styles.selectedStoreItem,
          ]}
          onPress={() => handleStorePress(store)}
        >
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.storeType}>{store.type}</Text>
            <Text style={styles.storeAddress}>{store.address}</Text>
            <Text style={styles.storeDistance}>{store.distance} km away</Text>
          </View>
          <View style={styles.storeActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCallStore(store)}
            >
              <Ionicons name="call" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleGetDirections(store)}
            >
              <Ionicons name="navigate" size={20} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Tips</Text>
        <Text style={styles.tipsText}>
          • Call ahead to check product availability{'
'}
          • Many stores offer home delivery{'
'}
          • Look for stores with 24/7 service{'
'}
          • Keep emergency contacts handy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... same styles as before ...
});

export default MapScreen; 