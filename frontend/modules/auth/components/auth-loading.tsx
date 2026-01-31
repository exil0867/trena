import { theme } from "@/lib/theme"
import { Text } from "react-native"

export default function AuthLoading({ loading, message }: { loading: boolean, message: string }) {
  if (!loading) return null
  return <Text style={{color: theme.colors.secondaryText}}>{message}</Text>
}
