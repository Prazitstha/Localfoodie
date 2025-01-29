import React, {useRef, useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {MD3Theme, Text} from 'react-native-paper';

import {PrimarySpinner} from '@components';
import {useThemedStyles} from '@hooks/useThemedStyles';
import {DetailBottomSheet, MapComponent, SearchBar} from './components';
import {vendorData} from '@constants/data';
import {Marker} from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';

export default function HomeScreen() {
  const themedStyles = useThemedStyles(styles);
  /*Display Overview modal and fetch data */
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<{} | null>(null);
  const [businessDataState, setBusinessDataState] = useState({});

  const handleOpenBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  // const fetchOverviewData = useCallback(
  //   async (_id: any) => {
  //     try {
  //       setNetworkCallStatus(true);
  //       baseApi.util.invalidateTags(['Overview']);
  //       const resp = await getOverviewDetail({
  //         businessId: _id,
  //       }).unwrap();
  //       if (resp) {
  //         setBusinessDataState(resp);
  //       }
  //       setNetworkCallStatus(false);
  //     } catch (error) {
  //       console.error('Error fetching top businesses:', error);
  //     } finally {
  //       console.log('HIIIII');
  //       setNetworkCallStatus(false);
  //     }
  //   },
  //   [selectedBusiness],
  // );

  const handleModalOpen = (item: any) => {
    setSelectedBusiness(item);
    // fetchOverviewData(item?._id);
    handleOpenBottomSheet();
  };
  if (false) return <PrimarySpinner />;

  return (
    <View style={themedStyles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <SearchBar />
      <MapComponent>
        {vendorData.map(vendor => (
          <Marker
            onPress={() => handleModalOpen(vendor)}
            key={vendor.id}
            coordinate={{
              latitude: vendor.location.latitude,
              longitude: vendor.location.longitude,
            }}
            title={vendor.name}
            description={`${vendor.type} | Rating: ${vendor.rating}`}
          />
        ))}
      </MapComponent>
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
  });
