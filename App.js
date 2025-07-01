import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import StartupScreen from "./src/screens/StartupScreen";
import AddCardScreen from "./src/screens/AddCardScreen";
import MainPageScreen from "./src/screens/MainPageScreen";
import ResultScreen from "./src/screens/ResultScreen";
import ManageCardScreen from "./src/screens/ManageCardScreen";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (<>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartupScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartupScreen" component={StartupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
        <Stack.Screen name="MainPageScreen" component={MainPageScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="ManageCardScreen" component={ManageCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast/>
    </>
  );
}
