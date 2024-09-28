import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import MainScreen from './src/screens/MainScreen';
import CameraView from './src/screens/CameraView';
import AddCamera from './src/screens/AddCamera';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationsSettings from './src/screens/NotificationsSettings';
import StorageSettings from './src/screens/StorageSettings';
import LinksSettings from './src/screens/LinksSettings';
import LanguageSettings from './src/screens/LanguageSettings';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CameraView" component={CameraView} options={{ headerTitle: 'Cámara' }} />
          <Stack.Screen name="AddCamera" component={AddCamera} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: 'Configuraciones' }} />
          <Stack.Screen name="NotificationsSettings" component={NotificationsSettings} />
          <Stack.Screen name="StorageSettings" component={StorageSettings} />
          <Stack.Screen name="LinksSettings" component={LinksSettings} />
          <Stack.Screen name="LanguageSettings" component={LanguageSettings} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
