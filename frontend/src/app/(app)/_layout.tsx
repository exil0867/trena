// app/(app)/_layout.tsx

import React, { useState } from "react";
// NO need for useAuth or useRouter here for redirection!
import { Slot } from "expo-router";
import Sidebar from "@/components/sidebar";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SIDEBAR_WIDTH = 250;

// This is your protected layout
export default function AppLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // We can assume a user is always present here.
  // The root layout will handle redirection.
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {sidebarVisible && (
          <View
            style={{
              width: SIDEBAR_WIDTH,
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 10,
              backgroundColor: "#f4f4f4"
            }}
          >
          <Sidebar sidebarVisible={sidebarVisible} width={SIDEBAR_WIDTH} />
        </View>
      )}
      <View
          style={{
            flex: 1,
            marginLeft: sidebarVisible ? SIDEBAR_WIDTH : 0,
          }}
        >
          <TouchableOpacity
            onPress={() => setSidebarVisible(!sidebarVisible)}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 20,
              backgroundColor: "#3B82F6",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Ionicons
              name={sidebarVisible ? "chevron-back" : "menu"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Slot />
          </ScrollView>
        </View>
    </View>
  );
}


