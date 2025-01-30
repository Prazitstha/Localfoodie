import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {MD3Theme, Text} from 'react-native-paper';

import {PrimarySpinner, VectorIcon} from '@components';
import {useThemedStyles} from '@hooks/useThemedStyles';
import {Marker} from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLazyGetVendorDataQuery} from '@redux/features/appService';
import {useAppDispatch, useAppSelector} from '@hooks/rtkHooks';
import {setVendorData, signOut} from '@redux/features/appSlice';
import {getCurrentLocation} from '@helpers';
import {DetailBottomSheet, MapComponent, SearchBar} from './components';

export default function HomeScreen() {
  const themedStyles = useThemedStyles(styles);
  const dispatch = useAppDispatch();
  const [getVendorData, {isLoading, isError}] = useLazyGetVendorDataQuery();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<{} | null>(null);
  const {vendorData} = useAppSelector(state => state.settings);
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const {coords} = await getCurrentLocation(false);
        if (!!coords) {
          setLocation(coords);
        }
      } catch (error) {}
    };
    fetchLocation();
  }, []);
  const handleOpenBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  const fetch = useCallback(async () => {
    try {
      const response = await getVendorData().unwrap();
      if (response?.length > 0) {
        dispatch(setVendorData(response));
      }
    } catch (error) {
      console.error('Error fetching DATA:', error);
    }
  }, [vendorData]);

  useEffect(() => {
    fetch();
  }, []);

  const handleModalOpen = item => {
    setSelectedBusiness(item);
    handleOpenBottomSheet();
  };

  const handleLogout = () => {
    console.log('Hello');
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: () => dispatch(signOut())},
      ],
      {cancelable: true},
    );
  };

  if (isLoading || !location) return <PrimarySpinner />;

  return (
    <View style={themedStyles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <SearchBar handleModalOpen={handleModalOpen} />
      <MapComponent coordinate={selectedBusiness?.location} location={location}>
        {vendorData &&
          vendorData.map(vendor => (
            <Marker
              onPress={() => handleModalOpen(vendor)}
              key={vendor.id}
              coordinate={{
                latitude: vendor.location.latitude,
                longitude: vendor.location.longitude,
              }}
              title={vendor.name}
              description={`${vendor.location?.area} | Rating: ${vendor.reviews?.length}`}
            />
          ))}
      </MapComponent>
      <TouchableOpacity style={themedStyles.logout} onPress={handleLogout}>
        <Text>Logout</Text>
        <VectorIcon type="material" name="logout" size={20} color={'#000000'} />
      </TouchableOpacity>
      {/* )} */}
      <DetailBottomSheet
        bottomSheetRef={bottomSheetRef}
        selectedBusiness={selectedBusiness}
      />
    </View>
  );
}

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.elevation.level1,
      overflow: 'hidden',
      position: 'relative',
    },
    logout: {
      position: 'absolute',
      bottom: 18,
      left: 12,
      zIndex: 1,
      flex: 1,
      padding: 8,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderRadius: 8,
    },
  });
