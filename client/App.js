import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./screens/Home";
import Details from "./screens/Details";
import CreateNotes from "./screens/CreateNotes";
import Search from "./screens/Search";
import Login from "./screens/Login";
import { NotesProvider } from "./context/NotesContext";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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

        const userId = await AsyncStorage.getItem("userId");
        setIsLoggedIn(userId !== null);
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  if (!fontsLoaded || isLoggedIn === null) {
    return null;
  }

  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "Home" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="CreateNotes" component={CreateNotes} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}
