import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { TransitionPresets } from "@react-navigation/stack";

import Home from "./screens/Home";
import Details from "./screens/Details";
import CreateNotes from "./screens/CreateNotes";
import Search from "./screens/Search";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      PlusJakartaSansMedium: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
      PlusJakartaSansBold: require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
      PlusJakartaSansSemiBold: require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
      PlusJakartaSansRegular: require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
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
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          // ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="CreateNotes" component={CreateNotes} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
