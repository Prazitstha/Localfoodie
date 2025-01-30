import React, {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MD3Theme,
  Portal,
  Searchbar,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {debounce} from 'lodash';
import {ChevronRight, Search} from 'lucide-react-native';

import {VectorIcon} from '@components';
import {useAppDispatch, useAppSelector} from '@hooks/rtkHooks';
import {signOut} from '@redux/features/appSlice';

export function SearchBar({handleModalOpen}: any) {
  const dispatch = useAppDispatch();
  const {vendorData} = useAppSelector(state => state.settings);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const styles = themedStyles(theme);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleNavigate = (query: string) => {
    if (query.trim()) {
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableRipple
      onPress={() => {
        setIsSearchActive(false);
        console.log('iTEM!!!', item);
        setTimeout(() => handleModalOpen(item), 300);
      }}>
      <View style={styles.itemContainer}>
        <View style={styles.leftIcon}>
          <View
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              padding: 6,
              borderRadius: 100,
            }}>
            <Search size={18} color={theme.colors.onBackground} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.name}>
            {item?.matched === true ? item?.searchedText : item?.name}
          </Text>
          {item.address && (
            <Text style={styles.location}>{item?.address ?? ''}</Text>
          )}
        </View>
        {item.distance && (
          <Text style={styles.distance}>{item?.distance ?? ''}</Text>
        )}
        <ChevronRight size={20} color="#666" />
      </View>
    </TouchableRipple>
  );

  const onChangeSearch = (text: string) => {
    setSearchQuery(text);
    handleSearch(text);
  };
  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = useCallback(
    debounce(async (text: string) => {
      if (!text) {
        setFilteredData([]);
      }
      handleOfflineSearch(text);
    }, 500),
    [vendorData],
  );

  const handleOfflineSearch = (text: string) => {
    let data = vendorData;

    if (text) {
      data = data.filter(
        item =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.location?.area.toLowerCase().includes(text.toLowerCase()),
      );
    }

    setFilteredData(data);
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 48,
        zIndex: 1,
        flex: 1,
        width: '100%',
      }}>
      <Searchbar
        placeholder="Search here"
        placeholderTextColor={theme.colors.outline}
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={2}
        style={styles.searchBar}
        onFocus={() => {
          setIsSearchActive(true);
        }}
        iconColor={theme.colors.outline}
      />
      {isSearchActive && (
        <Portal>
          <View
            style={{
              flex: 1,
              backgroundColor: '#F8F9FA',
              ...StyleSheet.absoluteFillObject,
              zIndex: 1,
              paddingTop: 48,
            }}>
            <Searchbar
              placeholder="Search here"
              placeholderTextColor={theme.colors.outline}
              onChangeText={onChangeSearch}
              value={searchQuery}
              elevation={1}
              style={styles.searchBar}
              icon={() => (
                <VectorIcon
                  type={'feather'}
                  name="arrow-left"
                  size={20}
                  color={theme.colors.onBackground}
                />
              )}
              onFocus={() => setIsSearchActive(true)}
              iconColor={theme.colors.outline}
              onIconPress={() => {
                setIsSearchActive(false);
              }}
              autoFocus
            />

            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Portal>
      )}
    </View>
  );
}

const themedStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
      overflow: 'hidden',
    },
    logoutButton: {
      // position: 'absolute',
      // zIndex: 1,
      // right: 24,
      // bott: 16,
    },
    header: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0,
    },
    headerText2: {
      ...theme.fonts.headlineMedium,
      fontWeight: 'bold',
    },
    headerSubtext: {
      ...theme.fonts.labelLarge,
      color: theme.colors.onSurfaceVariant,
    },
    searchBar: {
      marginHorizontal: 16,
      marginBottom: 16,
      backgroundColor: theme.colors.onPrimary,
    },
    listContainer: {
      backgroundColor: '#fff',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 70,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    leftIcon: {
      width: 24,
      alignItems: 'center',
      marginRight: 12,
    },
    contentContainer: {
      flex: 1,
      marginRight: 8,
    },
    name: {
      fontSize: 16,
      color: '#000',
    },
    location: {
      fontSize: 14,
      color: '#666',
    },
    distance: {
      fontSize: 14,
      color: '#666',
      marginRight: 8,
    },
  });
