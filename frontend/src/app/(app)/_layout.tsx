import React, { useState } from "react";
import { Slot } from "expo-router";
import Sidebar from "@/components/sidebar";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SIDEBAR_WIDTH = 280;

export default function AppLayout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const [sidebarVisible, setSidebarVisible] = useState(isLargeScreen);
  const insets = useSafeAreaInsets();

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950 flex-row">
      <View
        style={{
          position: isLargeScreen ? "relative" : "absolute",
          height: "100%",
          zIndex: 60,
          width: sidebarVisible ? SIDEBAR_WIDTH : 0,
        }}
      >
        <Sidebar sidebarVisible={sidebarVisible} width={SIDEBAR_WIDTH} />
      </View>

      <View className="flex-1 relative">
        {/* Backdrop for mobile */}
        {sidebarVisible && !isLargeScreen && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleSidebar}
            className="absolute inset-0 bg-black/40 z-40"
          />
        )}

        {/* Toggle Button */}
        <TouchableOpacity
          onPress={toggleSidebar}
          style={{
            top: insets.top + 12,
            left: 16,
          }}
          className="absolute z-50 w-10 h-10 items-center justify-center bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800"
        >
          <Ionicons
            name={sidebarVisible ? "chevron-back" : "menu"}
            size={22}
            className="text-neutral-600 dark:text-neutral-400"
          />
        </TouchableOpacity>

        {/* Main Content */}
        <View className="flex-1">
          <Slot />
        </View>
      </View>
    </View>
  );
}
