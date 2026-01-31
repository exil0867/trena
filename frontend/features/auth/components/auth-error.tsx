import { theme } from "@/lib/theme";
import { Text } from "@react-navigation/elements";
import { StyleSheet } from "react-native";

export default function AuthError({message}: {message: string | null}) {
  return (
    message ? <Text style={styles.message}>{message}</Text> : null
  )
}

const styles = StyleSheet.create({
  message: {
    color: theme.colors.danger,
    fontSize: 14,
    marginTop: 4
  },
})
