import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import {MD3Theme, Portal} from 'react-native-paper';

import {useThemedStyles} from '@hooks/useThemedStyles';
import OverviewSection from './OverviewSection';

interface DetailBottomSheetProps {
  bottomSheetRef: any;
  selectedBusiness: any;
}

const DetailBottomSheet: React.FC<DetailBottomSheetProps> = ({
  bottomSheetRef,
  selectedBusiness,
}) => {
  const styles = useThemedStyles(themedStyles);
  const snapPoints = useMemo(() => ['60%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        animationConfigs={animationConfigs}
        animateOnMount={true}
        enableDynamicSizing={false}>
        {selectedBusiness && (
          <View style={styles.contentContainer}>
            <OverviewSection businessData={selectedBusiness} />
          </View>
        )}
      </BottomSheet>
    </Portal>
  );
};

const themedStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
  });

export default DetailBottomSheet;
