import { theme } from "@/lib/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({children}: {children: ReactNode}) {
  return <View className='flex-1'>{children}</View>
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
})
