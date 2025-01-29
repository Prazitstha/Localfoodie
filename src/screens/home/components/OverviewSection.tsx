import {Divider, Icon, MD3Theme, Text, useTheme} from 'react-native-paper';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useThemedStyles} from '@hooks/useThemedStyles';

const {width} = Dimensions.get('screen');
export default function OverviewSection({businessData}: any) {
  const theme = useTheme();
  const styles = useThemedStyles(themedStyles);

  const RatingStars = ({rating}: {rating: number}) => {
    return (
      <View style={styles.starsContainer}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Icon
              key={i}
              source="star"
              size={20}
              color={i < rating ? '#7C3AED' : '#E4E4E7'}
            />
          ))}
      </View>
    );
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <View key={index} style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.charges}>
        Price: Nrs. {item.price.toLocaleString()}
      </Text>
    </View>
  );
  return (
    <BottomSheetScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.collegeName}>
          {businessData?.name}
        </Text>
        <View style={styles.header}>
          <View style={styles.ratingContainer}>
            <RatingStars rating={Math.floor(businessData?.rating ?? '4')} />
          </View>
          <Text style={styles.reviewCount}>
            {businessData?.reviews} Reviews
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Icon source="store" size={20} color={theme.colors.primary} />
          <Text variant="bodyMedium">{businessData?.type ?? 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon source="chef-hat" size={20} color={theme.colors.primary} />
          <Text variant="bodyMedium">{businessData?.cuisine ?? 'N/A'}</Text>
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Menu</Text>
          <Divider style={{flex: 1}} leftInset={true} />
        </View>
        <FlatList
          data={businessData?.menu}
          renderItem={renderItem}
          keyExtractor={index => index}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BottomSheetScrollView>
  );
}

const themedStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    serviceItem: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    serviceName: {
      ...theme.fonts.titleMedium,
      fontWeight: 'bold',
      color: theme.colors.onBackground,
      marginBottom: 4,
    },
    description: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.outline,
      // marginBottom: 8,
    },
    charges: {
      ...theme.fonts.labelLarge,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    starsContainer: {
      flexDirection: 'row',
      gap: 2,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      // marginTop: 18,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    ratingNumber: {
      fontSize: 24,
      fontWeight: '500',
      color: '#18181B',
    },
    reviewCount: {
      fontSize: 14,
      color: '#71717A',
    },
    contentContainer: {
      paddingBottom: 24,
    },
    content: {
      padding: 18,
    },
    collegeName: {
      fontWeight: 'bold',
      marginBottom: 16,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    touchableWrapper: {
      borderColor: '#E0E0E0',
      borderRadius: 18,
      borderWidth: 1,
    },
    buttonWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 18,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '500',
    },
    sectionTitle: {
      fontWeight: 'bold',
    },
    imageListContainer: {
      marginHorizontal: -18,
    },
    imageList: {
      gap: 8,
      paddingHorizontal: 16,
    },
    image: {
      width: width / 2,
      height: width / 2,
      borderRadius: 8,
    },
    socialLinks: {
      marginTop: 8,
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    },
    socialButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    favoriteButton: {
      marginTop: 16,
    },
  });
