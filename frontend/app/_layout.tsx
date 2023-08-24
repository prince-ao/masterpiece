import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Colors from "../constants/Colors";
import { Appearance, useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  let colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? Colors.light : Colors.dark;
  const [fontsloaded] = useFonts({
    Spaceman: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DMsans: require("../assets/fonts/DMSans_Regular.ttf"),
    DMlight: require("../assets/fonts/DMSans_Light.ttf"),
    DMBold: require("../assets/fonts/DMSans_Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsloaded]);

  if (!fontsloaded) return null;
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: `${themeContainerStyle.background}`,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
