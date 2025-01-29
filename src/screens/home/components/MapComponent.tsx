import {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';

import {getCurrentLocation} from '@helpers';

export const MapComponent = ({children}: any) => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const {coords} = await getCurrentLocation(false);
        console.log('Coords', coords);
        if (!!coords) {
          setLocation(coords);
        }
      } catch (error) {}
    };
    fetchLocation();
  }, []);
  if (!location) {
    return;
  }
  return (
    <MapView
      style={styles.map}
      region={{
        longitude: location?.longitude,
        latitude: location?.latitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      maxZoomLevel={30}
      poiClickEnabled={false}
      provider={PROVIDER_GOOGLE}
      // showsUserLocation
      zoomControlEnabled
      showsIndoors={false}
      showsBuildings={false}
      moveOnMarkerPress={false}
      showsPointsOfInterest={false}>
      {children}
    </MapView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});
