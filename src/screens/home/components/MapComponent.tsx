import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet} from 'react-native';

export const MapComponent = ({children, coordinate, location}: any) => {
  return (
    <MapView
      style={styles.map}
      region={{
        longitude: coordinate?.longitude ?? location?.longitude,
        latitude: coordinate?.latitude ?? location?.latitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      maxZoomLevel={30}
      poiClickEnabled={false}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
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
