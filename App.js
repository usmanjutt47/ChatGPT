import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Home from "./screens/Home";
import Details from "./screens/Details";
import CreateNotes from "./screens/CreateNotes";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      PlusJakartaSansMedium: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
      PlusJakartaSansBold: require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
    });
  };

  useEffect(() => {
    const loadResources = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="CreateNotes" component={CreateNotes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
