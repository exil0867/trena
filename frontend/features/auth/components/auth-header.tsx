import { theme } from "@/lib/theme";
import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export default function AuthHeader({title, subtitle}: {title: string, subtitle: string}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
    color: theme.colors.text
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.mutedText
  },
})
