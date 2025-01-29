// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   interpolate,
//   useSharedValue,
// } from 'react-native-reanimated';
// import {View, Pressable, StyleSheet, Dimensions, Platform} from 'react-native';

// import {VectorIcon} from '@components';
// import {kColors} from '@themes';
// import {MD3Theme} from 'react-native-paper';
// import {useThemedStyles} from '@hooks/useThemedStyles';
// import {HomeScreen} from '@screens/home';
// import {Home, MessageCircle, FileText, User} from 'lucide-react-native';
// import {useEffect} from 'react';

// const Tab = createBottomTabNavigator();
// const {width} = Dimensions.get('window');
// const TAB_WIDTH = width / 5;

// // const CustomTabBar = ({state, descriptors, navigation, styles}: any) => {
// //   const indicatorPosition = useAnimatedStyle(() => {
// //     return {
// //       transform: [
// //         {
// //           translateX: withSpring(state.index * TAB_WIDTH, {
// //             damping: 15,
// //             stiffness: 150,
// //           }),
// //         },
// //       ],
// //     };
// //   });

// //   return (
// //     <View style={styles.tabBar}>
// //       <Animated.View style={[styles.indicator, indicatorPosition]} />
// //       {state.routes.map((route, index) => {
// //         const {options} = descriptors[route.key];
// //         const isFocused = state.index === index;

// //         const onPress = () => {
// //           const event = navigation.emit({
// //             type: 'tabPress',
// //             target: route.key,
// //             canPreventDefault: true,
// //           });

// //           if (!isFocused && !event.defaultPrevented) {
// //             navigation.navigate(route.name);
// //           }
// //         };

// //         const iconStyle = useAnimatedStyle(() => {
// //           const scale = withSpring(isFocused ? 1.01 : 1);
// //           //   const color = interpolate(scale, [1, 1.1], [0.5, 1]);

// //           return {
// //             transform: [{scale}],
// //           };
// //         });

// //         return (
// //           <Pressable key={route.key} onPress={onPress} style={styles.tab}>
// //             <Animated.View style={iconStyle}>
// //               {getIcon(route.name, isFocused)}
// //             </Animated.View>
// //             <Animated.Text
// //               style={[
// //                 styles.label,
// //                 iconStyle,
// //                 {color: isFocused ? 'red' : '#999999'},
// //               ]}>
// //               {(() => {
// //                 if (route.name === 'Home') {
// //                   return 'Home';
// //                 }
// //                 return '';
// //               })()}
// //             </Animated.Text>
// //           </Pressable>
// //         );
// //       })}
// //     </View>
// //   );
// // };

// const CustomTabBar = ({state, descriptors, navigation, styles}: any) => {
//   const activeIndex = useSharedValue(state.index);

//   useEffect(() => {
//     activeIndex.value = withSpring(state.index);
//   }, [state.index, activeIndex]);

//   const indicatorStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{translateX: activeIndex.value * TAB_WIDTH}],
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabBar}>
//         <Animated.View style={[styles.indicator, indicatorStyle]} />
//         {state.routes.map((route, index) => {
//           const {options} = descriptors[route.key];
//           const isFocused = state.index === index;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name);
//             }
//           };

//           return (
//             <Pressable
//               key={route.key}
//               onPress={onPress}
//               style={styles.tabItem}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? {selected: true} : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}>
//               <View
//                 style={[
//                   styles.iconContainer,
//                   isFocused && styles.activeIconContainer,
//                 ]}>
//                 {getTabIcon(route.name, isFocused)}
//               </View>
//               <View
//                 style={{
//                   height: 4,
//                   width: 18,
//                   position: 'absolute',
//                   backgroundColor: '#FFFFFF',
//                   bottom: 0,
//                   borderTopLeftRadius: 18,
//                   borderTopRightRadius: 18,
//                 }}
//               />
//             </Pressable>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const getTabIcon = ({routeName, isFocused}) => {
//   const color = isFocused ? '#FFFFFF' : '#999999';
//   const size = 24;

//   switch (routeName) {
//     case 'Home':
//       return <Home size={size} color={color} />;
//     case 'Orders':
//       return <MessageCircle size={size} color={color} />;
//     case 'About':
//       return <FileText size={size} color={color} />;
//     case 'Profile':
//       return <User size={size} color={color} />;
//     default:
//       return null;
//   }
// };

// const getIcon = (routeName: string, isFocused: boolean) => {
//   const color = isFocused ? 'red' : '#999999';
//   const size = 24;
//   let iconName;

//   if (routeName === 'Home') {
//     iconName = isFocused ? 'home' : 'home-outline';
//   } else if (routeName === 'Services') {
//     iconName = isFocused ? 'apps' : 'apps-outline';
//   } else if (routeName === 'AboutAPF') {
//     iconName = isFocused ? 'people' : 'people-outline';
//   } else if (routeName === 'Contact') {
//     iconName = isFocused ? 'chatbubbles' : 'chatbubbles-outline';
//   } else if (routeName === 'WorkWithUs') {
//     iconName = isFocused ? 'briefcase' : 'briefcase-outline';
//   }
//   return (
//     <VectorIcon
//       type={'ionicon'}
//       name={iconName}
//       size={size - 4}
//       color={color}
//     />
//   );
//   //   switch (routeName) {
//   //     case 'Home':
//   //       return <Home size={size} color={color} />;
//   //     case 'Saved':
//   //       return <Heart size={size} color={color} />;
//   //     case 'Search':
//   //       return <Search size={size} color={color} />;
//   //     case 'Lists':
//   //       return <Menu size={size} color={color} />;
//   //     default:
//   //       return null;
//   //   }
// };

// export default function TabNavigator() {
//   const styles = useThemedStyles(themedStyles);
//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomTabBar {...props} styles={styles} />}
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Tab.Screen
//         name="Home"
//         options={
//           {
//             // tabBarLabel: t('common:tab.home'),
//           }
//         }
//         component={HomeScreen}
//       />
//     </Tab.Navigator>
//   );
// }

// const themedStyles = (theme: MD3Theme) =>
//   StyleSheet.create({
//     screen: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     // tabBar: {
//     //   flexDirection: 'row',
//     //   // backgroundColor: kColors.apfSecondary,
//     //   borderTopColor: theme.colors.outlineVariant,
//     //   borderTopWidth: 1,
//     //   paddingTop: 12,
//     //   paddingBottom: Platform.OS === 'ios' ? 24 : 12,
//     //   // height: 180,
//     //   // paddingBottom: 20,
//     //   elevation: 8,
//     //   shadowColor: '#000',
//     //   shadowOffset: {
//     //     width: 0,
//     //     height: -2,
//     //   },
//     //   shadowOpacity: 0.1,
//     //   shadowRadius: 3,
//     // },
//     tab: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       gap: 4,
//     },
//     indicator: {
//       position: 'absolute',
//       top: -2,
//       width: TAB_WIDTH,
//       height: 2,
//       // backgroundColor: kColors.resources2,
//       borderRadius: 4,
//     },
//     label: {
//       fontSize: 12,
//       fontWeight: '500',
//     },
//     container: {
//       position: 'absolute',
//       bottom: 20,
//       left: 20,
//       right: 20,
//     },
//     tabBar: {
//       flexDirection: 'row',
//       backgroundColor: '#FFFFFF',
//       borderRadius: 20,
//       // height: 70,
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 8,
//       elevation: 5,
//       paddingVertical: 8,
//       // paddingHorizontal: 8,
//     },

//     tabItem: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       position: 'relative',
//     },
//     iconContainer: {
//       padding: 18,
//       borderRadius: 20,
//     },
//     activeIconContainer: {
//       backgroundColor: '#098964',
//       borderRadius: 20,
//       overflow: 'hidden',
//     },
//   });
