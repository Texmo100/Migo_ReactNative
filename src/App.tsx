import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

import { migoDarkTheme } from './assets/themes/migoDarkTheme';
import Animes from './pages/Animes';
import Mangas from './pages/Mangas';

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Animes') {
            iconName = focused ? 'tv' : 'tv-outline';
          } else if (route.name === 'Mangas') {
            iconName = focused ? 'book' : 'book-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={focused ? migoDarkTheme.colors.primary : 'gray'} />;
        },
        tabBarActiveTintColor: migoDarkTheme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Animes" component={Animes} />
      <Tab.Screen name="Mangas" component={Mangas} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <SafeAreaProvider>
        <RootTabs />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
