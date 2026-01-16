
import React, { useEffect } from "react";
import "../global.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const onLandingPage = segments[0] === undefined;

    if (!user) {
      // If not logged in and trying to access app, go to login
      // But allow staying on landing page (index)
      if (!inAuthGroup && !onLandingPage) {
        router.replace('/login');
      }
    } else {
      // If logged in
      if (inAuthGroup || onLandingPage) {
        // Redirect to dashboard from login or intro
        router.replace('/dashboard');
      }
    }
  }, [isLoading, user, segments]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
