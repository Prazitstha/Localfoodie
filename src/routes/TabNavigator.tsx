import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {View, Pressable, StyleSheet, Dimensions, Platform} from 'react-native';
import {VectorIcon} from '@components';

import {kColors} from '@themes';
import {MD3Theme} from 'react-native-paper';
import {useThemedStyles} from '@hooks/useThemedStyles';
import {HomeScreen} from '@screens/home';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');
const TAB_WIDTH = width / 5;

const CustomTabBar = ({state, descriptors, navigation, styles}: any) => {
  const indicatorPosition = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(state.index * TAB_WIDTH, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.tabBar}>
      <Animated.View style={[styles.indicator, indicatorPosition]} />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconStyle = useAnimatedStyle(() => {
          const scale = withSpring(isFocused ? 1.01 : 1);
          //   const color = interpolate(scale, [1, 1.1], [0.5, 1]);

          return {
            transform: [{scale}],
          };
        });

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab}>
            <Animated.View style={iconStyle}>
              {getIcon(route.name, isFocused)}
            </Animated.View>
            <Animated.Text
              style={[
                styles.label,
                iconStyle,
                {color: isFocused ? 'red' : '#999999'},
              ]}>
              {(() => {
                if (route.name === 'Home') {
                  return t('common:tab.home');
                }
                return '';
              })()}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const getIcon = (routeName: string, isFocused: boolean) => {
  const color = isFocused ? 'red' : '#999999';
  const size = 24;
  let iconName;

  if (routeName === 'Home') {
    iconName = isFocused ? 'home' : 'home-outline';
  }
  return (
    <VectorIcon
      type={'ionicon'}
      name={iconName}
      size={size - 4}
      color={color}
    />
  );
};

export default function TabNavigator() {
  const styles = useThemedStyles(themedStyles);
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} styles={styles} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
        }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
}

const themedStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: 'red',
      borderTopColor: theme.colors.outlineVariant,
      borderTopWidth: 1,
      paddingTop: 12,
      paddingBottom: Platform.OS === 'ios' ? 24 : 12,
      // height: 180,
      // paddingBottom: 20,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
    },
    indicator: {
      position: 'absolute',
      top: -2,
      width: TAB_WIDTH,
      height: 2,
      backgroundColor: 'red',
      borderRadius: 4,
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
    },
  });
