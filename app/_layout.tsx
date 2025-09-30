import * as Sentry from "@sentry/react-native";
import type { Integration } from "@sentry/types";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

if (sentryDsn && !Sentry.getClient()) {
  Sentry.init({
    dsn: sentryDsn,
    sendDefaultPii: true,
    enableAutoSessionTracking: true,
    tracesSampleRate: 1.0,
    integrations: (defaultIntegrations: Integration[]) => {
      const extraIntegrations = [
        Sentry.mobileReplayIntegration?.(),
        Sentry.feedbackIntegration?.(),
      ].filter(Boolean) as Integration[];

      return [...defaultIntegrations, ...extraIntegrations];
    },
  });
} else if (!sentryDsn && __DEV__) {
  console.info("Sentry DSN not provided. Skipping Sentry initialization.");
}


/**
 * Loads custom fonts before mounting the router stack for the application.
 */
function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if(error) {
      console.error('Font loading error:', error);
      return;
    }
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(error) {
    return null; // Or return an error component
  }

  return <Stack screenOptions={{headerShown:false}} />;
}

export default sentryDsn ? Sentry.wrap(RootLayout) : RootLayout;