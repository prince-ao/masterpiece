import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()

export default function HomeLayout() {

  const [fonstloaded] = useFonts({
    Spaceman : require('../assets/fonts/SpaceMono-Regular.ttf'),
    DMsans : require('../assets/fonts/DMSans_Regular.ttf'),
    DMlight : require('../assets/fonts/DMSans_Light.ttf'),
    DMBold : require('../assets/fonts/DMSans_Bold.ttf')
  })

  const onLayoutRootView = useCallback (async () => {
    if (fonstloaded) {
      await SplashScreen.hideAsync()
    }
  },[fonstloaded])

  if(!fonstloaded) return null;
  return <Stack/>;
}