import { theme } from "@/lib/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({children}: {children: ReactNode}) {
  return <SafeAreaView style={styles.safe}>
    <View className='flex-1 p-4'>{children}</View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    // backgroundColor: theme.colors.background
  },
})
