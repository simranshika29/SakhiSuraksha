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
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Conditional import for react-native-maps (only on native platforms)
let MapView: any, Marker: any, PROVIDER_GOOGLE: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
}

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

interface Props {
  navigation: MapScreenNavigationProp;
}

interface Store {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  address: string;
  distance: number;
}

const MapScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  // Add state for native map components
  const [nativeMaps, setNativeMaps] = useState<any>({ MapView: null, Marker: null, PROVIDER_GOOGLE: null });

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
    if (Platform.OS !== 'web') {
      // Dynamically import react-native-maps only on native
      const Maps = require('react-native-maps');
      setNativeMaps({
        MapView: Maps.default,
        Marker: Maps.Marker,
        PROVIDER_GOOGLE: Maps.PROVIDER_GOOGLE,
      });
    }
  }, []);

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
        {Platform.OS === 'web' ? (
          <div style={{ height: 300, width: '100%' }}>
            <MapContainer
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* User location marker */}
              {location && (
                <LeafletMarker
                  position={[location.coords.latitude, location.coords.longitude]}
                >
                  <Popup>You are here</Popup>
                </LeafletMarker>
              )}
              {/* Store markers */}
              {stores.map((store) => (
                <LeafletMarker
                  key={store.id}
                  position={[store.latitude, store.longitude]}
                >
                  <Popup>{store.name} ({store.type})</Popup>
                </LeafletMarker>
              ))}
            </MapContainer>
          </div>
        ) :
          nativeMaps.MapView && nativeMaps.Marker && (
            <nativeMaps.MapView
              provider={nativeMaps.PROVIDER_GOOGLE}
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
                <nativeMaps.Marker
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
                <nativeMaps.Marker
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
            </nativeMaps.MapView>
          )
        }
      </View>

      {/* Store List */}
      <View style={styles.storeListContainer}>
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
      </View>

      {/* Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Tips</Text>
        <Text style={styles.tipsText}>
          • Call ahead to check product availability{'\n'}
          • Many stores offer home delivery{'\n'}
          • Look for stores with 24/7 service{'\n'}
          • Keep emergency contacts handy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  storeListContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 15,
    padding: 15,
    maxHeight: 200,
  },
  storeListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  storeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedStoreItem: {
    backgroundColor: '#E8F5E8',
    borderRadius: 10,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  storeType: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  storeAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  storeDistance: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  storeActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
  tipsContainer: {
    backgroundColor: '#E8F5E8',
    margin: 10,
    padding: 15,
    borderRadius: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MapScreen; 