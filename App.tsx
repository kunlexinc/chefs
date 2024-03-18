import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './path/to/OnboardingScreen';
import HomeScreen from './path/to/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // Mark as launched
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // or a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
